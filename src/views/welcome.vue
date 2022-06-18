<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      :rules="rules"
      class="bg-white w-99/100 pl-8 pt-4"
    >
      <el-form-item label="省份" prop="provinces">
        <el-select
          v-model="form.provinces"
          @change="onChange"
          placeholder="请选择省份"
        >
          <el-option
            v-for="item in provincesData"
            :key="item.code"
            :label="item.label"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="单重" prop="weight">
        <el-input
          type="number"
          v-model="form.weight"
          placeholder="请输入单重"
          @input="countWeight"
        />
      </el-form-item>
      <el-form-item label="数量" prop="amount">
        <el-input
          type="number"
          @input="countAmount"
          v-model="form.amount"
          placeholder="请输入数量"
        />
      </el-form-item>
      <el-form-item label="总量" prop="total">
        <el-input
          type="number"
          v-model="form.total"
          placeholder="请输入总重量"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSearch(formRef)">
          比价
        </el-button>
        <el-button @click="resetForm(formRef)"> 重置 </el-button>
        <el-tooltip
          content="单重和数量输入一个, 就必须两个都输入. 总重可以单独输入"
        >
          <span class="ml-5 cursor">
            <IconifyIconOffline icon="warning" />
          </span>
        </el-tooltip>
      </el-form-item>
    </el-form>

    <el-row :gutter="20">
      <el-col :span="8" v-for="(item, index) in tableDataAll" :key="index">
        <div class="w-99/100 mt-4 p-2 bg-white">
          <div class="pt-1 pb-3 pl-2 pr-2 flex items-center justify-between">
            <div class="left">
              <span class="color-444">{{ item.provinces }}省</span>&nbsp;&nbsp;
              <span class="fs-14">重量：{{ item.total }}kg</span>&nbsp;&nbsp;
            </div>
            <div class="right pa-1" @click="clearResult(index)">
              <IconifyIconOffline icon="close-bold" class="fs-24" />
            </div>
          </div>
          <el-table :data="item.data" border>
            <el-table-column prop="type" label="物流商" />
            <el-table-column prop="weight" label="首重/kg" />
            <el-table-column prop="price" label="总价" />
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { FormInstance, FormRules } from "element-plus";
import { getProvinces, getPrice } from "/@/api/system";
import { floor } from "lodash-unified";
console.log("welcome");

const formRef = ref<FormInstance>();

let loading = ref(false); // 头部loading条
let tableDataAll = ref([]); // 查询结果信息

const form = reactive({
  provinces: "",
  weight: "",
  amount: "",
  total: ""
});

let provincesData = ref([]); // 省市信息
let allPrice = ref([]); // 物流商价格列表

async function getData() {
  // 省市信息
  let { data } = await getProvinces();
  provincesData.value = data;

  // 物流商价格信息
  let priceData = await getPrice();
  allPrice.value = priceData.data;
}
getData();

const rules = reactive<FormRules>({
  provinces: [{ required: true, message: "请选择省份", trigger: "change" }],
  weight: [{ message: "请输入单重", trigger: "blur" }],
  amount: [{ message: "请输入单重", trigger: "blur" }],
  total: [{ required: true, message: "请输入总重量", trigger: "blur" }]
});

// let table1 = {
//   provinces: "北京1",
//   city: "北京",
//   weight: 0,
//   amount: 0,
//   total: 0,
//   data: [
//     {
//       type: "百世快运",
//       weight: "10",
//       Continued: "10",
//       price: "10"
//     }
//   ]
// };

async function onSearch(formRef: FormInstance | undefined) {
  if (!formRef && !form.total) return;
  await formRef.validate(async valid => {
    // 表单校验
    if (!valid) return;

    loading.value = true;

    let pro = provincesData.value.find(item => {
      if (form.provinces === item.code) {
        return item.label;
      }
    });

    let TableData = {
      provinces: pro.label,
      weight: form.weight,
      amount: form.amount,
      total: form.total
    };

    let business = [];
    for (let index = 0; index < allPrice.value.length; index++) {
      const element = allPrice.value[index];

      for (let i = 0; i < element.data.length; i++) {
        const obj = element.data[i];
        if (form.provinces === obj.code) {
          business.push({
            type: element.name,
            weight: element.weight,
            price: await calculate(form.total, obj, element.weight)
          });
          TableData["data"] = business;
        }
      }
    }

    tableDataAll.value.push(TableData);

    setTimeout(() => {
      loading.value = false;
    }, 500);
  });
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const clearResult = (index: Number | String) => {
  tableDataAll.value.splice(index, 1);
};

const countWeight = (value: number) => {
  if (form.amount > 0 && value > 0) {
    form.total = floor(value * form.amount, 2);
  }
  if (!value) {
    form.total = "";
  }
};
const countAmount = (value: number) => {
  if (form.weight > 0 && value > 0) {
    form.total = floor(value * form.weight, 2);
  }
  if (!value) {
    form.total = "";
  }
};

const calculate = (total: Number, o: Object, firstWeight: Number) => {
  if (!total || o.price.length === 0) return 0;
  let price = 0;

  // 分辨快运种类
  switch (firstWeight) {
    case 3: // 百世
      // 判断省市并计算运费
      o.price.forEach(element => {
        if (element.length == 3 || element.length == 4) {
          if (element[0] <= total && total <= element[1]) {
            if (element.length == 3) {
              price = element[2];
            } else {
              price = floor(element[3] + (total - element[0]) * element[2], 2);
            }
          }
        } else {
          if (total > element[0]) {
            price = floor(total * element[1], 2);
          }
        }
      });
      break;
    case 25: {
      // 中通快运
      let minimum = o.price[0][2]; // 最低消费

      o.price.forEach(element => {
        if (total < firstWeight) {
          price = o.price[0][2];
        }
        if (element[0] <= total && total <= element[1]) {
          price = floor(total * element[2], 2);
        }
      });

      if (price <= minimum) price = minimum;
      break;
    }
    default:
      break;
  }

  return price;
};
</script>

<style>
.fs-24 {
  font-size: 24px;
  cursor: pointer;
}

.color-444 {
  color: #444;
}

.fs-14 {
  font-size: 14px;
  color: #444;
}

.cursor {
  cursor: pointer;
}
</style>
