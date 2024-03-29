import {
    Main,
    useAttack,
    useCritical,
    useCriticalDamage,
    useElementalMastery,
    useLife,
    useRecharge
} from "components/home/Main";
import {numberFormat} from "components/Utils";

export class HolyRelic {
    // 方便统计
    index: number = -1;
    // 属性外的主要信息
    position: string = ''; // 定位
    jsonName: string = ''; // 脚本给他的名字
    name: string = ''; // 我给他的名字

    // 随地大小变
    attackPercentage: number = 0; // 攻击
    attackStatic: number = 0; // 小攻击
    lifePercentage: number = 0; // 生命
    lifeStatic: number = 0; // 小生命
    defendPercentage: number = 0; // 防御
    defendStatic: number = 0; // 小防御

    // 其他词条
    critical: number = 0; // 暴击
    criticalDamage: number = 0; // 暴伤
    recharge: number = 0; // 充能
    elementalMastery: number = 0; // 精通

    // 治疗加成
    cureEffect: number = 0;

    // 各种伤
    physicalBonus: number = 0; // 物伤
    fireBonus: number = 0; // 火伤
    waterBonus: number = 0; // 水伤
    dendroBonus: number = 0; // 草伤
    thunderBonus: number = 0; // 雷伤
    windBonus: number = 0; // 风伤
    iceBonus: number = 0; // 冰伤
    rockBonus: number = 0; // 岩伤

    // 其他属性 
    omit: boolean = true; // 是否忽略
    level: number = 0; // 等级
    start: number = 0; // 星级
    equip: string = ''; // 被谁穿上了

    // 反序列化
    constructor(obj: any) {
        this.position = obj.position;
        this.jsonName = obj.setName;
        this.level = obj.level;
        this.start = obj.start;
        this.equip = obj.equip;

        // 属性
        this.add(obj.mainTag);
        for (let o of obj.normalTags) {
            this.add(o);
        }

        // 20级的不可忽略（只考虑20级的）
        this.omit = obj.level != 20;
    }

    // 设置索引
    setIndex(index: number) {
        this.index = index;
    }

    // 把键值对赋值进去
    add(kv: any): void {
        // @ts-ignore
        this[`${kv.name}`] += kv.value;
    }

    // 是否是允许的名字
    allowJsonName(): boolean {
        return true;
        // 只接受规定的圣遗物
        // for (let name of holyRelicNames) {
        //     if (name.jsonName == this.jsonName){
        //         this.name = name.name;
        //         return true;
        //     }
        // }
        // return false;
    }

    // 比较出更操蛋的，比this差返回参数，否则返回null
    static getLoser(baseHR: HolyRelic, holyRelic: HolyRelic): HolyRelic | false {
        return this.compare(baseHR, holyRelic) && holyRelic;
    }

    // 是不是比this差 参数等级低时返回true
    private static compare(baseHR: HolyRelic, holyRelic: HolyRelic): boolean {
        let all = 0;
        let count = 0;
        if (useAttack) {
            all++;
            holyRelic.attackPercentage <= baseHR.attackPercentage && count++;
        }
        if (useCritical) {
            all++;
            holyRelic.critical <= baseHR.critical && count++;
        }
        if (useCriticalDamage) {
            all++;
            holyRelic.criticalDamage <= baseHR.criticalDamage && count++;
        }
        if (useRecharge) {
            all++;
            holyRelic.recharge <= baseHR.recharge && count++;

        }
        if (useLife) {
            all++;
            holyRelic.lifePercentage <= baseHR.lifePercentage && count++;

        }
        if (useElementalMastery) {
            all++;
            holyRelic.elementalMastery <= baseHR.elementalMastery && count++;
        }

        all += 8;
        holyRelic.physicalBonus <= baseHR.physicalBonus && count++;
        holyRelic.fireBonus <= baseHR.fireBonus && count++;
        holyRelic.waterBonus <= baseHR.waterBonus && count++;
        holyRelic.dendroBonus <= baseHR.dendroBonus && count++;
        holyRelic.thunderBonus <= baseHR.thunderBonus && count++;
        holyRelic.windBonus <= baseHR.windBonus && count++;
        holyRelic.iceBonus <= baseHR.iceBonus && count++;
        holyRelic.rockBonus <= baseHR.rockBonus && count++;
        return count == all;
    }

    // 展示信息
    toString(): string {
        let res = '';
        for (let entryName of holyRelicEntryNames) {
            // @ts-ignore
            const thisValue = this[`${entryName.jsonName}`];
            if (thisValue && thisValue > 0) {
                res += entryName.name + thisValue + ' ';
            }
        }
        return res;
    }

    // 展示信息
    static toString(holyRelic: HolyRelic): string {
        let res = '';
        for (let entryName of holyRelicEntryNames) {
            // @ts-ignore
            const thisValue = holyRelic[`${entryName.jsonName}`];
            if (thisValue && thisValue > 0) {
                res += entryName.name + numberFormat(thisValue) + ' ';
            }
        }
        return res;
    }

    // 是否相等
    static equals(hr1: HolyRelic, hr2: HolyRelic): boolean {
        return hr1.index == hr2.index;
    }
}

// 深度toString
export function holyRelicsDeepToString(holyRelics: HolyRelic[]): string {
    let res = '';
    for (let holyRelic of holyRelics) {
        res += holyRelicToString(holyRelic) + ' | ';
    }
    return res;
}

// 展示信息
export function holyRelicToString(holyRelic: HolyRelic): string {
    let res = '';
    for (let entryName of holyRelicEntryNames) {
        // @ts-ignore
        const thisValue = holyRelic[`${entryName.jsonName}`];
        if (thisValue && (thisValue > 0 || typeof thisValue == 'string')) {
            const regExpExecArray = /^(-|\d)\d*(?:\.\d{0,2}[1-9]?)?/.exec(thisValue);
            res += entryName.name + (regExpExecArray && regExpExecArray[0] || thisValue) + ' ';
        }
    }
    return res;
}

// 词条转义
export const entryNames: JsonTransform[] = [
    {name: '白字攻击力', jsonName: 'baseAttack'},
    {name: '白字生命值', jsonName: 'baseLife'},
    {name: '总攻击', jsonName: 'allAttack'},
    {name: '总生命', jsonName: 'allLife'},
    {name: '反应系数', jsonName: 'responseCoefficient'},
    {name: '增伤', jsonName: 'increasedDamage'},
    {name: '护魔', jsonName: 'protector'},
    {name: '攻击', jsonName: 'attackPercentage'},
    {name: '小攻击', jsonName: 'attackStatic'},
    {name: '生命', jsonName: 'lifePercentage'},
    {name: '小生命', jsonName: 'lifeStatic'},
    {name: '防御', jsonName: 'defendPercentage'},
    {name: '暴击', jsonName: 'critical'},
    {name: '暴伤', jsonName: 'criticalDamage'},
    {name: '充能', jsonName: 'recharge'},
    {name: '精通', jsonName: 'elementalMastery'},
    {name: '治疗加成', jsonName: 'cureEffect'},
]

// 圣遗物词条转义
export const holyRelicEntryNames: JsonTransform[] = [
    {name: '位置', jsonName: 'position'},
    {name: '名字', jsonName: 'name'},
    {name: '攻击', jsonName: 'attackPercentage'},
    {name: '小攻击', jsonName: 'attackStatic'},
    {name: '生命', jsonName: 'lifePercentage'},
    {name: '小生命', jsonName: 'lifeStatic'},
    {name: '防御', jsonName: 'defendPercentage'},
    {name: '小防御', jsonName: 'defendStatic'},
    {name: '暴击', jsonName: 'critical'},
    {name: '暴伤', jsonName: 'criticalDamage'},
    {name: '充能', jsonName: 'recharge'},
    {name: '精通', jsonName: 'elementalMastery'},
    {name: '治疗加成', jsonName: 'cureEffect'},
    {name: '物伤', jsonName: 'physicalBonus'},
    {name: '火伤', jsonName: 'fireBonus'},
    {name: '水伤', jsonName: 'waterBonus'},
    {name: '草伤', jsonName: 'dendroBonus'},
    {name: '雷伤', jsonName: 'thunderBonus'},
    {name: '风伤', jsonName: 'windBonus'},
    {name: '冰伤', jsonName: 'iceBonus'},
    {name: '岩伤', jsonName: 'rockBonus'},
    {name: '装备', jsonName: 'equip'},
]

// 圣遗物名字列表
export const holyRelicNames: JsonTransform[] = [
    {name: '苍白', jsonName: 'paleFlame'},
    {name: '追忆', jsonName: 'shimenawaReminiscence'},
    {name: '绝缘', jsonName: 'emblemOfSeveredFate'},
    {name: '魔女', jsonName: 'crimsonWitch'},
    {name: '乐团', jsonName: 'wandererTroupe'},
]

// 增伤名字列表
export const increasedDamageNames: JsonTransform[] = [
    {name: '物伤', jsonName: 'physicalBonus'},
    {name: '火伤', jsonName: 'fireBonus'},
    {name: '水伤', jsonName: 'waterBonus'},
    {name: '草伤', jsonName: 'dendroBonus'},
    {name: '雷伤', jsonName: 'thunderBonus'},
    {name: '风伤', jsonName: 'windBonus'},
    {name: '冰伤', jsonName: 'iceBonus'},
    {name: '岩伤', jsonName: 'rockBonus'},
]

// 圣遗物位置名字列表
export const holyRelicPositionNames: JsonTransform[] = [
    {name: 'hourglass', jsonName: 'sand'},
    {name: 'flower', jsonName: 'flower'},
    {name: 'feather', jsonName: 'feather'},
    {name: 'cup', jsonName: 'cup'},
    {name: 'head', jsonName: 'head'},
]

// 圣遗物名字
export interface JsonTransform {
    name: string,
    jsonName: string,
}