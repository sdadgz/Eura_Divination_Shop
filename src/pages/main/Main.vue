<template>
  <div class="q-pa-md q-gutter-md row">
    <!--  第一坨，面板  -->
    <q-list bordered style="width: 300px">
      <!--    面板    -->
      <q-item>
        <q-item-section>
          <span style="font-size: 1.6em">面板</span>
        </q-item-section>
        <!--    更多    -->
        <q-card-section>
          <q-btn :label="showAllEntry ? '更少' : '更多'" flat @click="showAllEntry = !showAllEntry"/>
        </q-card-section>
      </q-item>
      <q-separator/>

      <!--   白字攻击力   -->
      <q-item>
        <q-item-section>
          <q-input
              v-model="baseAttack"
              label="白字攻击力"
              dense
              @click="baseAttack = null"
          />
        </q-item-section>
        <!--  总攻击力  -->
        <q-item-section>
          <q-input
              v-model="allAttack"
              label="总攻击力"
              dense
              @click="allAttack = null"
          />
        </q-item-section>
      </q-item>

      <!--  白字生命值  -->
      <q-item>
        <q-item-section>
          <q-input
              v-model="baseLife"
              label="白字生命值"
              dense
              @click="baseLife = null"
          />
        </q-item-section>
        <!--  总生命值  -->
        <q-item-section>
          <q-input
              v-model="allLife"
              label="总生命值"
              dense
              @click="allLife = null"
          />
        </q-item-section>
      </q-item>

      <!--  反应系数  -->
      <q-item>
        <q-item-section>
          <q-input
              v-model="responseCoefficient"
              label="反应系数"
              dense
              @click="responseCoefficient = null"
          >
            <template #append>
              <q-btn icon="help" round dense flat @click="responseCoefficientHelp">
                <q-tooltip>我不明白</q-tooltip>
              </q-btn>
            </template>
          </q-input>
        </q-item-section>
      </q-item>

      <!-- 增伤  -->
      <q-item>
        <q-item-section>
          <q-input v-model="increasedDamage" label="增伤" @click="increasedDamage = null"/>
        </q-item-section>
        <!-- 哪个增伤  -->
        <q-item-section>
          <q-btn-dropdown :label="getNameFormJsonName(whichBonus, increasedDamageNames)" flat>
            <q-list>
              <q-item
                  v-for="increaseDamageName in increasedDamageNames"
                  clickable
                  v-close-popup
                  @click="whichBonus = increaseDamageName.jsonName"
              >
                <q-item-section>
                  {{ increaseDamageName.name }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-item-section>
      </q-item>

      <!--  护魔  -->
      <q-item v-if="showAllEntry">
        <q-item-section>
          <q-input v-model="protectorPanel" label="护魔" @click="protectorPanel = null"/>
        </q-item-section>
      </q-item>

      <!--  暴击  -->
      <q-item>
        <q-item-section>
          <q-input v-model="critical" label="暴击" @click="critical = null"/>
        </q-item-section>
        <!--  暴伤  -->
        <q-item-section>
          <q-input v-model="criticalDamage" label="暴伤" @click="criticalDamage = null"/>
        </q-item-section>
      </q-item>

      <!--  充能  -->
      <q-item>
        <q-item-section>
          <q-input v-model="recharge" label="充能" @click="recharge = null"/>
        </q-item-section>
        <!--  精通  -->
        <q-item-section>
          <q-input v-model="elementalMastery" label="精通" @click="elementalMastery = null"/>
        </q-item-section>
      </q-item>
      <q-separator/>

      <!--   选一个你心仪的圣遗物套装   -->
      <q-item>
        <q-item-section>
          <q-btn-dropdown :label="getNameFormJsonName(whichHolyRelic, holyRelicNames)" flat>
            <q-list>
              <q-item
                  v-for="holyRelicName in holyRelicNames"
                  clickable
                  v-close-popup
                  @click="whichHolyRelic = holyRelicName.jsonName"
              >
                <q-item-section>
                  {{ holyRelicName.name }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-item-section>
        <!--    给谁传啊    -->
        <q-item-section>
          <q-btn-dropdown :label="whichPeople" flat>
            <q-list>
              <q-item
                  v-for="wife in Main.getPeopleList()"
                  clickable
                  v-close-popup
                  @click="whichPeople = wife"
              >
                <q-item-section>
                  {{ wife }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-item-section>
      </q-item>
      <q-separator/>

      <!--   开始测试   -->
      <q-item>
        <q-item-section>
          <q-btn label="开始暴力枚举" color="primary" @click="startViolence"/>
        </q-item-section>
      </q-item>
      <q-separator/>
    </q-list>

    <!--  第二托，外部  -->
    <q-list bordered style="width: 300px">
      <q-item>
        <q-item-section>
          <span style="font-size: 1.6em">外部属性</span>
        </q-item-section>
        <!--    添加    -->
        <q-card-section>
          <q-btn label="增加" flat @click="outShow = true">
            <!--      弹窗      -->
            <q-dialog v-model="outShow">
              <q-card class="q-pa-md">
                <!--        头        -->
                <q-card-section>
                  <span>添加外部属性</span>
                  <q-btn class="float-right" icon="close" flat dense round v-close-popup/>
                </q-card-section>

                <!--        内容1        -->
                <q-card-section class="row">
                  <!--  增伤  -->
                  <q-input v-model="increasedDamageOut" label="增伤" @click="increasedDamageOut = null"/>
                  <!--  护魔  -->
                  <q-input v-model="protectorOut" label="护魔" @click="protectorOut = null"/>
                </q-card-section>

                <!--        内容2        -->
                <q-card-section class="row">
                  <!--  攻击  -->
                  <q-input v-model="attackPercentageOut" label="攻击" @click="attackPercentageOut = null"/>
                  <!--  小攻击  -->
                  <q-input v-model="attackStaticOut" label="小攻击" @click="attackStaticOut = null"/>
                </q-card-section>

                <!--        内容3        -->
                <q-card-section class="row">
                  <!--  生命  -->
                  <q-input v-model="lifePercentageOut" label="生命" @click="lifePercentageOut = null"/>
                  <!--  小生命  -->
                  <q-input v-model="lifeStaticOut" label="小生命" @click="lifeStaticOut = null"/>
                </q-card-section>

                <!--        内容4        -->
                <q-card-section class="row">
                  <!--  防御  -->
                  <q-input v-model="defendPercentageOut" label="防御" @click="defendPercentageOut = null"/>
                  <!--  小防御  -->
                  <q-input v-model="defendStaticOut" label="小防御" @click="defendStaticOut = null"/>
                </q-card-section>

                <!--        内容5        -->
                <q-card-section class="row">
                  <!--  暴击  -->
                  <q-input v-model="criticalOut" label="暴击" @click="criticalOut = null"/>
                  <!--  暴伤  -->
                  <q-input v-model="criticalDamageOut" label="暴伤" @click="criticalDamageOut = null"/>
                </q-card-section>

                <!--        内容6        -->
                <q-card-section class="row">
                  <!--  充能  -->
                  <q-input v-model="rechargeOut" label="充能" @click="rechargeOut = null"/>
                  <!--  精通  -->
                  <q-input v-model="elementalMasteryOut" label="精通" @click="elementalMasteryOut = null"/>
                </q-card-section>

                <!--       底部按钮         -->
                <q-card-section class="row justify-between">
                  <q-btn label="重置" icon="undo" color="red" @click="resetOut"/>
                  <q-btn label="确定" icon="exposure_plus_1" color="primary" @click="addOut"/>
                </q-card-section>
              </q-card>
            </q-dialog>
          </q-btn>
        </q-card-section>
      </q-item>
      <q-separator/>

      <!--   外部列表   -->
      <q-item v-for="i in theOutList.length" class="row">
        <!--    复选框    -->
        <q-item-section class="col-auto">
          <q-checkbox v-model="theOutList[i - 1].must">
            <q-tooltip anchor="center left" self="center right" :delay="233">
              当前状态：{{ theOutList[i - 1].must ? '一定出现' : '参与枚举' }}
            </q-tooltip>
          </q-checkbox>
        </q-item-section>

        <!--    与谁互斥    -->
        <q-item-section class="col-auto">
          <q-btn icon="compare_arrows" dense flat round @click="mutuallyExclusiveHandler(i - 1)">
            <q-tooltip :delay="233">
              当前状态：
              {{
                theOutList[i - 1].mutuallyExclusive.length > 0 ?
                    '与' + theOutList[i - 1].mutuallyExclusive + '互斥' :
                    '不与任何人互斥'
              }}
            </q-tooltip>
          </q-btn>
        </q-item-section>

        <!--    删除    -->
        <q-item-section class="col-auto">
          <q-btn v-if="!theOutList[i - 1].omit" icon="backspace" dense flat round color="red"
                 @click="theOutList[i - 1].omit = true">
            <q-tooltip style="background-color: red;" :delay="233">
              删除当前外部属性
            </q-tooltip>
          </q-btn>
          <!--     回复     -->
          <q-btn v-else icon="history" dense flat round color="secondary" @click="theOutList[i - 1].omit = false">
            <q-tooltip style="background-color: #26A69A" :delay="233">
              恢复当前属性
            </q-tooltip>
          </q-btn>
        </q-item-section>

        <!--    显示部分信息    -->
        <q-item-section class="col omit-beyond-text cursor-pointer">
          {{ theOutList[i - 1].omit && '已删除' || theOutList[i - 1].out.toString() || '你上传空的干啥' }}
          <q-tooltip :delay="345">{{ theOutList[i - 1].out.toString() || '草' }}</q-tooltip>
        </q-item-section>
      </q-item>
      <q-separator/>

      <!--  按钮    -->
      <q-item>
        <q-item-section class="row justify-between">
          <q-btn
              icon="rowing"
              label="重置"
              color="secondary"
              @click="theOutList = [];CommSeccess('芜湖')"/>
        </q-item-section>
      </q-item>
      <q-separator/>

      <!--      外部互斥弹出窗      -->
      <q-dialog v-model="showMutuallyExclusive">
        <q-card class="q-pa-md">
          <!--        头        -->
          <q-card-section>
            当前索引：{{ currentOutIndex }}
            <q-btn class="float-right" icon="close" dense flat round v-close-popup/>
          </q-card-section>
          <q-separator/>

          <!--     当前属性预览     -->
          <q-card-section>
            当前属性预览：
            {{ theOutList[currentOutIndex].out.toString() || '空哒。。。' }}
          </q-card-section>
          <q-separator/>

          <!--     其他属性预览     -->
          <template v-for="i in theOutList.length">
            <q-card-section v-if="currentOutIndex !== i - 1">
              <q-checkbox
                  :model-value="theOutList[currentOutIndex].mutuallyExclusive.indexOf(i - 1) !== -1"
                  @click="changeMutuallyExclusiveHandler(theOutList[currentOutIndex].mutuallyExclusive.indexOf(i - 1) !== -1,i - 1)"
              />
              {{ theOutList[i - 1].out.toString() || '这个也是空的。。。' }}
              <q-tooltip anchor="center left" self="center right">
                当前索引：{{ i - 1 }}
              </q-tooltip>
            </q-card-section>
          </template>
        </q-card>
      </q-dialog>
    </q-list>

    <!--  第三坨，开关  -->
    <q-list bordered style="width: 300px">
      <q-item>
        <q-item-section>
          <span style="font-size: 1.6em">开关</span>
        </q-item-section>
        <!--   预留     -->
        <q-card-section>
          <q-btn flat/>
        </q-card-section>
      </q-item>
      <q-separator/>

      <!--   一堆开关   -->
      <q-item>
        <q-item-section>
          <q-toggle v-model="thorPassive" label="雷神被动"/>
          <q-toggle v-model="insulation" label="绝缘"/>
          <q-toggle v-model="walnut" label="胡桃e"/>
          <q-toggle v-model="yeLan" label="夜兰"/>
          <q-toggle v-model="protector" label="护魔"/>
          <q-toggle v-model="beakKnife" label="薙刀"/>
          <q-toggle v-model="witch" label="魔女"/>
        </q-item-section>
      </q-item>
      <q-separator/>

      <!--   垃圾回收开关   -->
      <q-item>
        <q-item-section>
          <q-toggle v-model="showSuggest" label="TODO 展示垃圾圣遗物">
            <q-tooltip>
              当前圣遗物中哪些词条是你认为有用的，打开它，所有词条都会有稀释，别跟傻逼似的只看双爆，除了特殊角色以外都需要注意加上攻击
              打反应的还得加上精通等等
            </q-tooltip>
          </q-toggle>
          <q-toggle v-if="showSuggest" v-model="useAttack" label="攻击"/>
          <q-toggle v-if="showSuggest" v-model="useCritical" label="暴击"/>
          <q-toggle v-if="showSuggest" v-model="useCriticalDamage" label="暴伤"/>
          <q-toggle v-if="showSuggest" v-model="useRecharge" label="充能"/>
          <q-toggle v-if="showSuggest" v-model="useLife" label="生命"/>
          <q-toggle v-if="showSuggest" v-model="useElementalMastery" label="精通"/>
        </q-item-section>
      </q-item>
      <q-separator/>
    </q-list>

    <!--  第三坨，结果  -->
    <q-list bordered style="width: 300px">
      <q-item>
        <q-item-section>
          <span style="font-size: 1.6em">结果集</span>
        </q-item-section>
        <!--   预留     -->
        <q-card-section>
          <q-btn flat/>
        </q-card-section>
      </q-item>
      <q-separator/>

      <!--   显示结果默认   -->
      <q-item v-if="typeof results == 'string'">
        <q-item-section>
          {{ results }}
        </q-item-section>
      </q-item>

      <!--   显示结果   -->
      <template v-else>
        <!--    最大    -->
        <q-item>
          <q-item-section>
            最大：期望{{ numberFormat(results[0][0].expectation) }}<br/>
            <template v-for="holyRelic in results[0][0].holyRelic">
              {{ holyRelicToString(holyRelic) }}<br/>
            </template>
          </q-item-section>
        </q-item>
        <q-separator/>

        <!--    最小    -->
        <q-item>
          <q-item-section>
            最小：期望{{ numberFormat(results[0][1].expectation) }}<br/>
            <template v-for="holyRelic in results[0][1].holyRelic">
              {{ holyRelicToString(holyRelic) }}<br/>
            </template>
          </q-item-section>
        </q-item>
        <q-separator/>

        <!--    计数    -->
        <q-item v-for="expectation in results[0][2]">
          <q-item-section>
            {{ expectation.count }}次：期望{{ numberFormat(expectation.expectation) }}<br/>
            <template v-for="holyRelic in expectation.holyRelic">
              {{ holyRelicToString(holyRelic) }}<br/>
            </template>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {People} from "components/home/People";
import {Expectation, Main, OutList, setMainPanel, setRubbishToggle, setToggle} from "components/home/Main";
import {CommSeccess} from "components/notifyTools";
import {MyArrays} from "components/MyArrays";
import {
  holyRelicNames,
  holyRelicsDeepToString,
  holyRelicToString,
  increasedDamageNames,
  JsonTransform
} from "components/home/HolyRelic";
import {numberFormat} from "components/Utils";

// 展示面板全部词条 =========================================================
const showAllEntry = ref(false);

// 面板
const baseAttack = ref(950); // 白字攻击力
const allAttack = ref(2826); // 白字生命值
const baseLife = ref(9020); // 白字生命值
const allLife = ref(16030); // 总生命值
const responseCoefficient = ref(1); // 反应系数

const increasedDamage = ref(83.3); // 增伤
const protectorPanel = ref(0.8); // 护魔
const whichBonus = ref('physicalBonus'); // 用哪个增伤 默认物理
const critical = ref(67.6); // 暴击
const criticalDamage = ref(170); // 暴伤
const recharge = ref(100); // 充能
const elementalMastery = ref(164); // 精通
const cureEffect = ref(0);

// 使用哪一套圣遗物
const whichHolyRelic = ref('paleFlame');

// 给哪个老婆穿衣服啊
const whichPeople = ref('选老婆');

// 获取哪个增伤的中文名字
function getNameFormJsonName(val: string, names: JsonTransform[]): string {
  for (let name of names) {
    if (name.jsonName === val) {
      return name.name;
    }
  }
  return '出错啦！';
}

// 元素反应帮助
function responseCoefficientHelp() {
  window.open('https://www.bing.com/search?q=原神反应系数');
}

// 开始暴力枚举
function startViolence() {
  CommSeccess("已经开始了，预计5-10分钟，去刷会抖音吧");
  const main = new Main();
  // 使用存储的信息
  main.useStoreCreate();
  // 设置which们 最先必须是他
  main.setWhich(whichPeople.value, whichHolyRelic.value, whichBonus.value);
  setMainPanel(baseAttack.value * 1, baseLife.value * 1, allAttack.value * 1, allLife.value * 1, responseCoefficient.value * 1);
  setToggle(thorPassive.value, insulation.value, walnut.value, yeLan.value, protector.value, beakKnife.value, witch.value);
  setRubbishToggle(showSuggest.value, useAttack.value, useCritical.value, useCriticalDamage.value, useRecharge.value, useLife.value, useElementalMastery.value);
  main.setBasePeople(increasedDamage.value / 100,
      protectorPanel.value * 1,
      critical.value / 100,
      criticalDamage.value / 100,
      recharge.value / 100,
      elementalMastery.value * 1,
      cureEffect.value / 100);
  main.setTheOutList(theOutList.value);

  results.value = main.start();
}

// 一堆外部 =========================================================

// 展示外部添加面板
const outShow = ref(false);

const increasedDamageOut = ref(0); // 增伤
const protectorOut = ref(0); // 护魔

const attackPercentageOut = ref(0); // 攻击
const attackStaticOut = ref(0); // 小攻击
const lifePercentageOut = ref(0); // 生命
const lifeStaticOut = ref(0); // 小生命
const defendPercentageOut = ref(0); // 防御
const defendStaticOut = ref(0); // 小防御

const criticalOut = ref(0); // 暴击
const criticalDamageOut = ref(0); // 暴伤
const rechargeOut = ref(0); // 充能
const elementalMasteryOut = ref(0); // 精通

// 重置外部
function resetOut() {
  increasedDamageOut.value = 0;
  protectorOut.value = 0;
  attackPercentageOut.value = 0;
  attackStaticOut.value = 0;
  lifePercentageOut.value = 0;
  lifeStaticOut.value = 0;
  defendPercentageOut.value = 0;
  defendStaticOut.value = 0;
  criticalOut.value = 0;
  criticalDamageOut.value = 0;
  rechargeOut.value = 0;
  elementalMasteryOut.value = 0;
}

// 储存外部
const theOutList = ref([] as OutList[]);

// 添加进去
function addOut() {
  const out = new People();
  // 用户输入的数据永远是字符串，得转一转
  out.addOut(increasedDamageOut.value / 100,
      protectorOut.value * 1,
      attackPercentageOut.value / 100,
      attackStaticOut.value * 1,
      lifePercentageOut.value / 100,
      lifeStaticOut.value * 1,
      defendPercentageOut.value / 100,
      defendStaticOut.value * 1,
      criticalOut.value / 100,
      criticalDamageOut.value / 100,
      rechargeOut.value / 100,
      elementalMasteryOut.value * 1);
  theOutList.value.push({out: out, must: false, mutuallyExclusive: [], omit: false});
  resetOut();
  CommSeccess("添加成功");
}

// 外部中的互斥关系设置
const showMutuallyExclusive = ref(false);
const currentOutIndex = ref(-1); // 当前点击的外部

// 互斥点击
function mutuallyExclusiveHandler(i: number) {
  currentOutIndex.value = i;
  showMutuallyExclusive.value = true;
}

// 修改互斥
function changeMutuallyExclusiveHandler(currentStatus: boolean, clickIndex: number) {
  if (currentStatus) {
    // 当前是选中状态 需要取消选中
    MyArrays.deleteElement(theOutList.value[currentOutIndex.value].mutuallyExclusive, clickIndex);
    MyArrays.deleteElement(theOutList.value[clickIndex].mutuallyExclusive, currentOutIndex.value);
  } else {
    // 当前状态未选中，需要选中
    theOutList.value[currentOutIndex.value].mutuallyExclusive.push(clickIndex);
    theOutList.value[clickIndex].mutuallyExclusive.push(currentOutIndex.value);
  }
}

// 一堆switch =========================================================

// 一堆开关的属性
const thorPassive = ref(false); // 雷神被动
const insulation = ref(false); // 绝缘
const walnut = ref(false); // 胡桃e
const yeLan = ref(false); // 夜兰
const protector = ref(false); // 护魔
const beakKnife = ref(false); // 薙刀
const witch = ref(false); // 魔女

// 垃圾回收开关
const showSuggest = ref(false); // 展示垃圾圣遗物
const useAttack = ref(false); // 攻击
const useCritical = ref(false); //  暴击
const useCriticalDamage = ref(false); // 暴伤
const useRecharge = ref(false); // 充能
const useLife = ref(false); // 生命
const useElementalMastery = ref(false); // 精通

// 结果集 =================================================================

const results = ref('欸嘿' as string | [[Expectation, Expectation, Expectation[]], [Expectation, Expectation, Expectation[]]]);

</script>

<style scoped>

/*  超出文本省略  */
.omit-beyond-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>