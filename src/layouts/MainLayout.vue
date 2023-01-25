<template>
  <q-layout view="hHh Lpr fFf" style="background-color: #eff3f9">

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
      <q-list separator>
        <q-item clickable style="color: #1976D2;height: 60px">
          <!--     图标     -->
          <q-item-section avatar>
            <q-icon name="home"/>
          </q-item-section>

          <!--     标题     -->
          <q-item-section>
            <strong>不是首页</strong>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!--  内容  -->
    <q-page-container>
      <router-view/>
    </q-page-container>

    <!--  备案信息  -->
    <q-footer reveal style="background-color: unset">
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

const drawer = ref(true);

</script>
