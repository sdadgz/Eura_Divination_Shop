<template>
  <q-layout view="hHh Lpr lFf" style="background-color: #eff3f9">

    <!--  头  -->
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" @click="drawer = !drawer"/>
        <q-toolbar-title style="font-weight: bold">优菈占卜铺</q-toolbar-title>
        <q-btn label="不是退出登录" flat icon="logout"/>
      </q-toolbar>
    </q-header>

    <!--  左侧栏  -->
    <q-drawer v-model="drawer" bordered style="background-color: #f8f8f8">
      <q-list separator v-for="item in drawerList">
        <q-item clickable style="height: 60px;color: #1976D2" :to="item.url">
          <!--     图标     -->
          <q-item-section avatar>
            <q-icon :name="item.icon" :style="{color: item.url === drawerSelected ? '#1976D2' : '#484848'}"/>
          </q-item-section>

          <!--     标题     -->
          <q-item-section
              :style="{color: item.url === drawerSelected ? '#1976D2' : '#464545'}"
              style="font-weight: 567;"
          >
            {{ item.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!--  内容  -->
    <q-page-container>
      <router-view/>
    </q-page-container>

    <!--  备案信息  -->
    <q-footer
        reveal
        style="background-color: unset"
    >
      <div class="row justify-center">
        <div class="col-auto justify-center">
          <a
              style="color: #1D1D1D;text-decoration: none"
              href="https://beian.miit.gov.cn/"
              target="_blank"
          >
            京ICP备2022019075号-1
          </a>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">

import {ref, watch} from "vue";
import {DrawerItems} from "components/home/DrawerItem";
import {useRoute} from "vue-router";
import {People} from "components/home/People";

const $route = useRoute();

// 控制左侧栏
const drawer = ref(true);
const drawerList = ref(DrawerItems); // 左侧栏有什么
const drawerSelected = ref('home'); // 控制当前选中

// 路径改变
watch(() => $route.path, () => {
  // 修改drawer选中
  let path = $route.path;
  let split = path.split('/');
  drawerSelected.value = split[1];
}, {immediate: true, deep: true});

</script>
