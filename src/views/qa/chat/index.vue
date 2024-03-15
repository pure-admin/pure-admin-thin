<template>
  <div class="qa-chat">
    <div class="chat-container">
      <div
        class="messages"
        ref="messagesContainer"
        :style="
          chatHistory.length === 0
            ? { backgroundImage: 'url(/chat_background-removebg-preview.png)' }
            : {}
        "
      >
        <div
          v-for="(message, index) in chatHistory"
          :key="index"
          class="message"
          :class="{
            'user-message': message.type === 'user',
            'system-message': message.type === 'system'
          }"
        >
          <strong>{{ message.type.toUpperCase() }}:</strong>
          {{ message.content }}
        </div>
      </div>
      <div class="input-container">
        <button
          :disabled="modelLoading"
          :class="{ 'model-button': true, 'model-active': modelActive }"
          @click="toggleModel"
        >
          <span v-if="modelLoading" class="loading-spinner" />
          <span v-else>{{ modelActive ? "关闭模型" : "创建模型" }}</span>
        </button>
        <textarea
          ref="textareaRef"
          v-model="userInput"
          @input="adjustTextareaHeight"
          @keyup.enter="sendMessage"
          placeholder="输入问题..."
        />
        <div class="button-container">
          <button @click="sendMessage">上传</button>
          <div v-if="isLoading" class="loading-spinner" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { chat, createModel, terminateModel } from "@/api/qa";

const userInput = ref("");
const chatHistory = ref([]);
const messagesContainer = ref(null);
const textareaRef = ref(null);
const isLoading = ref(false);
const modelActive = ref(false);
const modelLoading = ref(false);

const sendMessage = async () => {
  if (userInput.value.trim() === "") return;

  chatHistory.value.push({ content: userInput.value, type: "user" });

  isLoading.value = true;

  try {
    const response = await chat({ prompt: userInput.value });
    chatHistory.value.push({ content: response.content, type: "system" });

    await nextTick();
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  } catch (error) {
    console.error("Error sending message:", error);
  } finally {
    isLoading.value = false;
  }

  userInput.value = "";
  textareaRef.value.style.height = "auto";
};

const adjustTextareaHeight = () => {
  textareaRef.value.style.height = "auto";
  textareaRef.value.style.height =
    Math.min(textareaRef.value.scrollHeight, 3 * 24) + "px";
};

const toggleModel = async () => {
  modelLoading.value = true;

  try {
    if (modelActive.value) {
      await terminateModel();
      modelActive.value = false;
    } else {
      await createModel();
      modelActive.value = true;
    }
  } catch (error) {
    alert(`操作失败: ${error.message}`);
  } finally {
    modelLoading.value = false;
  }
};
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.qa-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 60px; /* 调整这个值以适应输入框的高度 */
}

/* .messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
} */

.messages {
  flex-grow: 1;
  height: calc(100vh - 200px); /* 根据实际情况调整 */
  padding: 10px;
  overflow-y: auto;
  background-repeat: no-repeat; /* 防止背景图片重复 */
  background-position: center; /* 将背景图片居中 */
  background-size: 36%; /* 将背景图片缩小到原来的50% */
}

.message {
  padding: 5px;
  margin-bottom: 10px;
  word-wrap: break-word;
  border-radius: 5px;
}

.user-message {
  align-self: flex-end;
  background-color: #f0f0f0;
}

.system-message {
  align-self: flex-start;
  background-color: #e0e0e0;
}

.input-container {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
  background-color: white;
  box-shadow: 0 -2px 5px rgb(0 0 0 / 10%);
}

textarea {
  width: 60%;
  padding: 5px 10px;
  margin-right: 10px;
  overflow-y: auto;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}

.button-container {
  display: flex;
  align-items: center;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #3498db; /* Blue */
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

.model-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  margin-right: 10px;
  color: white;
  cursor: pointer;
  background-color: #ccc;
  border: none;
  border-radius: 5px;
}

.model-active {
  background-color: #007bff;
}
</style>
