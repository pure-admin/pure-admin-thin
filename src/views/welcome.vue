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
        />
      </el-form-item>
      <el-form-item label="数量" prop="total">
        <el-input type="number" v-model="form.total" placeholder="请输入数量" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSearch(formRef)">
          比价
        </el-button>
        <el-button @click="resetForm(formRef)"> 重置 </el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="20">
      <el-col :span="8" v-for="(item, index) in tableDataAll" :key="index">
        <div class="w-99/100 mt-4 p-2 bg-white">
          <div class="pt-1 pb-3 pl-2 pr-2 flex items-center justify-between">
            <div class="left">
              <span class="color-444">{{ item.provinces }}省</span>&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span class="fs-14">单重：{{ item.weight }}kg</span>&nbsp;&nbsp;
              <span class="fs-14">数量：{{ item.total }}</span
              >&nbsp;&nbsp;
              <span class="fs-14"
                >总重：{{ floor(item.weight * item.total, 2) }}kg</span
              >
            </div>
            <div class="right pa-1" @click="clearResult(index)">
              <IconifyIconOffline icon="close-bold" class="fs-24" />
            </div>
          </div>
          <el-table :data="item.data" border>
            <el-table-column prop="type" label="物流商" />
            <el-table-column prop="weight" label="首重" />
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

const formRef = ref<FormInstance>();

let loading = ref(false); // 头部loading条
let tableDataAll = ref([]); // 查询结果信息

const form = reactive({
  provinces: "",
  weight: "",
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
  console.log(priceData);

  allPrice.value = priceData.data;
}
getData();

const rules = reactive<FormRules>({
  provinces: [{ required: true, message: "请选择省份", trigger: "change" }],
  weight: [{ required: true, message: "请输入单重", trigger: "blur" }],
  total: [{ required: true, message: "请输入数量", trigger: "blur" }]
});

// let table1 = {
//   provinces: "北京1",
//   city: "北京",
//   weight: 0,
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
  if (!formRef) return;
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
      total: form.total
    };

    for (let index = 0; index < allPrice.value.length; index++) {
      const element = allPrice.value[index];
      let business = [];

      for (let i = 0; i < element.data.length; i++) {
        const obj = element.data[i];
        if (form.provinces === obj.code) {
          business.push({
            type: element.name,
            weight: element.weight,
            price: await calculate(
              floor(form.weight * form.total, 2),
              obj,
              element.weight
            )
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

const calculate = (weight: Number, o: Object) => {
  if (!weight) return;
  let price = 0;

  // 判断省市并计算运费
  o.price.forEach(element => {
    if (element.length == 3 || element.length == 4) {
      if (element[0] <= weight && weight <= element[1]) {
        if (element.length == 3) {
          price = element[2];
        } else {
          price = floor(element[3] + (weight - element[0]) * element[2], 2);
        }
      }
    } else {
      if (weight > element[0]) {
        price = floor(weight * element[1], 2);
      }
    }
  });

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
</style>
