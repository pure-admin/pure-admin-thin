<script setup lang="ts">
import { useUserStoreHook } from "@/store/modules/user";
import { OperationLogDTO } from "@/api/system/log";

/** TODO 有其他方式  来换掉这个props 父子组件传值吗？ */
const props = defineProps<OperationLogDTO>();

const operationLogStatusMap =
  useUserStoreHook().dictionaryMap["sysOperationLog.status"];
</script>

<template>
  <el-descriptions
    direction="horizontal"
    :column="2"
    :labelStyle="'white-space:nowrap;'"
    :contentStyle="'word-break:break-all;'"
    :size="'large'"
  >
    <!-- 开头前两列设置宽度 -->
    <el-descriptions-item label="操作编号:" :width="'25%'">{{
      props.operationId
    }}</el-descriptions-item>
    <el-descriptions-item label="请求模块:" :width="'25%'">{{
      props.requestModule
    }}</el-descriptions-item>
    <el-descriptions-item :span="2" label="操作类型:">{{
      props.businessTypeStr
    }}</el-descriptions-item>
    <el-descriptions-item label="操作人:">{{
      props.username
    }}</el-descriptions-item>
    <el-descriptions-item label="操作人ID:">{{
      props.userId
    }}</el-descriptions-item>
    <el-descriptions-item label="操作人类型:">{{
      props.operatorTypeStr
    }}</el-descriptions-item>
    <el-descriptions-item label="操作人部门:">{{
      props.deptName
    }}</el-descriptions-item>
    <el-descriptions-item label="操作人IP:">{{
      props.operatorIp
    }}</el-descriptions-item>
    <el-descriptions-item :span="2" label="操作人地址:">{{
      props.operatorLocation
    }}</el-descriptions-item>

    <el-descriptions-item label="请求链接:">{{
      props.requestUrl
    }}</el-descriptions-item>
    <el-descriptions-item label="请求方式:">{{
      props.requestMethod
    }}</el-descriptions-item>
    <el-descriptions-item :span="2" label="请求参数:">
      <!-- 长度可能较长的字符串使用el-text包住 避免超出框 -->
      <el-text>
        {{ props.operationParam }}
      </el-text>
    </el-descriptions-item>
    <el-descriptions-item :span="2" label="调用方法:">
      <el-text>
        {{ props.calledMethod }}
      </el-text>
    </el-descriptions-item>
    <el-descriptions-item :span="2" label="返回结果:">
      <el-text>
        {{ props.operationResult }}
      </el-text>
    </el-descriptions-item>
    <el-descriptions-item :span="2" label="错误详情:">
      <el-text>
        {{ props.errorStack }}
      </el-text>
    </el-descriptions-item>
    <el-descriptions-item label="状态:"
      ><el-tag
        :type="operationLogStatusMap[props.status].cssTag"
        effect="plain"
      >
        {{ operationLogStatusMap[props.status].label }}
      </el-tag></el-descriptions-item
    >
    <el-descriptions-item label="操作时间:">{{
      props.operationTime
    }}</el-descriptions-item>
  </el-descriptions>
</template>
<style>
.el-descriptions {
  margin-top: 20px;
}
</style>
