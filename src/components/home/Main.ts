import {HolyRelic, holyRelicPositionNames} from "components/home/HolyRelic";
import {ref} from "vue";

export let baseAttack = 1; // 白字攻击力
export let baseLife = 1; // 白字生命值
export let allAttack = 1; // 总攻击力
export let allLife = 1; // 总生命值
export let responseCoefficient = 1; // 反应系数

export let thorPassive = false; // 雷神被动
export let insulation = false; // 绝缘
export let walnut = false; // 胡桃e
export let yeLan = false; // 夜兰
export let protector = false; // 护魔
export let beakKnife = false; // 薙刀
export let witch = false; // 魔女

// 圣遗物垃圾回收
export let showSuggest = false; // 展示垃圾圣遗物
export let useAttack = false; // 攻击
export let useCritical = false; //  暴击
export let useCriticalDamage = false; // 暴伤
export let useRecharge = false; // 充能
export let useLife = false; // 生命
export let useElementalMastery = false; // 精通

export class Main {
    // 存储圣遗物
    flower: HolyRelic[] = [];
    feather: HolyRelic[] = [];
    hourglass: HolyRelic[] = [];
    cup: HolyRelic[] = [];
    head: HolyRelic[] = [];

    // 将全部圣遗物扔进去
    allIn(obj: any) {
        // 遍历位置
        for (let position of holyRelicPositionNames) {
            const holyRelics = obj[`${position.jsonName}`];

            // 遍历每个位置的所有圣遗物
            for (let holyRelic of holyRelics) {
                const hr = new HolyRelic(holyRelic);
                if (hr.allowJsonName()) {
                    // @ts-ignore
                    this[`${position.name}`].push(hr);
                }
            }
        }
        this.store();
    }

    // 使用储存的圣遗物创建
    useStoreCreate() {
        this.flower = JSON.parse(localStorage.getItem("flower") || '');
        this.feather = JSON.parse(localStorage.getItem("feather") || '');
        this.hourglass = JSON.parse(localStorage.getItem("hourglass") || '');
        this.cup = JSON.parse(localStorage.getItem("cup") || '');
        this.head = JSON.parse(localStorage.getItem("head") || '');
    }

    // 存储到本地
    store() {
        localStorage.setItem("flower", JSON.stringify(this.flower));
        localStorage.setItem("feather", JSON.stringify(this.feather));
        localStorage.setItem("hourglass", JSON.stringify(this.hourglass));
        localStorage.setItem("cup", JSON.stringify(this.cup));
        localStorage.setItem("head", JSON.stringify(this.head));
    }
}