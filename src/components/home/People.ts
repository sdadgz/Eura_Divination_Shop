import {
    allAttack, allLife,
    baseAttack, baseLife,
    beakKnife,
    insulation,
    protector, responseCoefficient,
    thorPassive,
    walnut,
    witch,
    yeLan
} from "components/home/Main";
import {HolyRelic} from "components/home/HolyRelic";

export class People {
    // 人物专属的
    baseAttack: number = 0; // 白字攻击力
    baseLife: number = 0; // 白字生命值
    allAttack: number = 0; // 总攻击
    allLife: number = 0; // 总生命
    responseCoefficient: number = 0; // 反应系数
    increasedDamage: number = 0; // 增伤

    // 额外新增的
    protector: number = 0; // 护魔
    whichBonus: string = 'physicalBonus'; // 用哪个增伤 默认物理

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

    // 计算期望
    compute(): number {
        // 攻击力和生命值附上
        this.allAttack += this.baseAttack * this.attackPercentage + this.attackStatic;
        this.allLife += this.baseLife * this.lifePercentage + this.lifeStatic;

        // 护魔
        if (protector) {
            this.allAttack += this.allLife / 100 * this.protector;
        }
        // 胡桃e
        if (walnut) { // todo 写死了只能10级e
            this.allAttack += this.allLife / 100 * 6.26;
        }
        // 绝缘4
        if (insulation) {
            if (this.recharge > 3) {
                this.recharge = 3;
            }
            this.increasedDamage += this.recharge / 4;
        }
        // 夜兰
        if (yeLan) {
            this.allAttack = this.allLife;
        }
        // 薙刀
        if (thorPassive) {
            let temp = this.recharge;
            temp -= 1;
            if (temp > 0) {
                temp *= 0.4;
                this.increasedDamage += temp;
            }
        }
        // 薙刀
        if (beakKnife) {
            let temp = this.recharge;
            temp -= 1;
            if (temp > 0) {
                temp *= 0.28;
                if (temp > 0.8) {
                    temp = 0.8;
                }
                this.allAttack += this.baseAttack * temp;
            }
        }

        // 核心计算公式
        let b = this.critical;
        if (b > 1) {
            b = 1;
        }
        if (b < 0) { // 防傻，乱输值
            b = 0;
        }
        const s = this.criticalDamage;
        const criticalStrikeZone = b * (s + 1) + (1 - b); // 暴击乘区
        const increasedDamageMultiplicationArea = this.increasedDamage + 1; // 增伤乘区
        let reactionMultiplicationZone = 1; // 反应乘区
        let proficientInIncreasingDamage = 1; // 精通增伤
        if (this.responseCoefficient >= 1.5) {
            let witchBonus = witch ? 0.15 : 0; // 魔女加成
            proficientInIncreasingDamage = 2.78 * this.elementalMastery / (this.elementalMastery + 1400);
            reactionMultiplicationZone = this.responseCoefficient * (proficientInIncreasingDamage + 1 + witchBonus);
        }

        let ans = this.allAttack * criticalStrikeZone * increasedDamageMultiplicationArea * reactionMultiplicationZone;

        // todo 写死了胡桃第一段不反应第二段反应
        // 胡桃第一段和重击倍率
        const aPeriodOfMagnification = 83.6;
        const heavyHitMultiplier = 242.6;
        if (walnut) {
            const firstParagraph = ans * aPeriodOfMagnification / 100 / reactionMultiplicationZone;
            ans *= heavyHitMultiplier / 100;
            ans += firstParagraph;
        }

        return ans;
    }

    // 设置初始值
    set(): void {
        this.baseAttack += baseAttack;
        this.allAttack += allAttack;
        this.baseLife += baseLife;
        this.allLife += allLife;
        this.responseCoefficient += responseCoefficient;
    }

    // 穿个圣遗物
    add(holyRelic: HolyRelic): void {
        this.attackPercentage += holyRelic.attackPercentage;
        this.attackStatic += holyRelic.attackStatic;
        this.lifePercentage += holyRelic.lifePercentage;
        this.lifeStatic += holyRelic.lifeStatic;
        this.defendPercentage += holyRelic.defendPercentage;
        this.defendStatic += holyRelic.defendStatic;
        this.critical += holyRelic.critical;
        this.criticalDamage += holyRelic.criticalDamage;
        this.recharge += holyRelic.recharge;
        this.elementalMastery += holyRelic.elementalMastery;

        this.cureEffect += holyRelic.cureEffect;

        // 增伤特殊
        // @ts-ignore
        this.increasedDamage += holyRelic[`${this.whichBonus}`];
    }

    // 删除属性
    del(holyRelic: HolyRelic): void {
        this.attackPercentage -= holyRelic.attackPercentage;
        this.attackStatic -= holyRelic.attackStatic;
        this.lifePercentage -= holyRelic.lifePercentage;
        this.lifeStatic -= holyRelic.lifeStatic;
        this.defendPercentage -= holyRelic.defendPercentage;
        this.defendStatic -= holyRelic.defendStatic;
        this.critical -= holyRelic.critical;
        this.criticalDamage -= holyRelic.criticalDamage;
        this.recharge -= holyRelic.recharge;
        this.elementalMastery -= holyRelic.elementalMastery;

        this.cureEffect -= holyRelic.cureEffect;

        // 增伤特殊
        // @ts-ignore
        this.increasedDamage -= holyRelic[`${this.whichBonus}`];
    }
}