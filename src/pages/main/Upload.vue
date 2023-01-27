<template>
  <div class="q-pa-md q-gutter-md">
    <div class="column q-gutter-sm" style="width: 300px;">
      <!--   文件   -->
      <div class="col">
        <q-file
            class="col"
            v-model="jsonFile"
            outlined
            label="上传mona.json"
            accept=".json"
        />
      </div>

      <div class="row justify-between col">
        <!--   按钮   -->
        <q-btn label="删除" color="red" icon="delete_forever" @click="jsonFile = null"/>
        <q-btn label="上传" color="primary" icon="upload" @click="jsonFileHandler"/>
      </div>
    </div>

    <div class="row q-gutter-md" style="width: 300px">
      <q-btn class="col" label="如何获取mona.json" color="primary" @click="openUrl('https://github.com/wormtql/yas')"/>
      <q-btn class="col-auto" icon="help" color="secondary" rounded @click="openUrl('https://search.bilibili.com/all?keyword=%E5%B0%8F%E5%AD%A6%E8%AF%AD%E6%96%87')">
        <q-tooltip>
          我看不懂中文的文档
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {Main} from "components/home/Main";
import {CommSeccess} from "components/notifyTools";
import {openUrl} from "components/Utils";

// json文件
const jsonFile = ref(null);

// 上传json文件
function jsonFileHandler() {
  if (jsonFile.value) {
    const fileReader = new FileReader();
    fileReader.readAsText(jsonFile.value);
    fileReader.addEventListener('load', res => {
      if (res.target && typeof res.target.result == 'string') {
        serialization(res.target.result);
        CommSeccess("行了");
      }
    })
  }
}

// 反序列化
function serialization(json: string) {
  const obj = JSON.parse(json);
  const main = new Main();
  main.allIn(obj);
}

</script>

<style scoped>

</style>