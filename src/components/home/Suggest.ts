import {HolyRelic} from "components/home/HolyRelic";
import {
    Main, rubbishLength,
    useAttack,
    useCritical,
    useCriticalDamage,
    useElementalMastery,
    useLife,
    useRecharge
} from "components/home/Main";

export class Suggest {
    // 定值
    static baoji: number[] = [2.7, 3.1, 3.5, 3.9]; // 3.3
    static shengming: number[] = [4.1, 4.7, 5.3, 5.8]; // 4.975
    static gongji: number[] = Suggest.shengming;
    static chongneng: number[] = [4.5, 5.2, 5.8, 6.5]; // 5.5
    static baoshang: number[] = [5.4, 6.2, 7, 7.8]; // 6.6
    static jingtong: number[] = [16, 19, 21, 23]; // 19.75

    // 建议清理的太废的圣遗物
    static suggest(holyRelics: HolyRelic[]): SuggestItem {
        if (!holyRelics || holyRelics.length < 1) {
            return {count: -1, label: '传入了空的圣遗物组合', holyRelics: []};
        }
        let min = Number.MAX_SAFE_INTEGER;
        let arr = [] as HolyRelic[];

        holyRelics.forEach(holyRelic => {
            // count函数
            const cot = this.count(holyRelic);

            // 大于忽视，找最操蛋的圣遗物
            if (cot <= min) {
                if (cot > rubbishLength) {
                    if (cot < min) {
                        min = cot;
                        arr = [];
                    }
                } else if (min > rubbishLength) {
                    min = rubbishLength;
                    arr = [];
                }
                arr.push(holyRelic);
            }
        })

        // @ts-ignore
        return {count: min, label: holyRelics.pop().jsonName, holyRelics: arr};
    }

    // 多少条有用的词条
    static count(holyRelic: HolyRelic): number {
        let count = 0;
        if (useAttack) {
            count += this.entryCount(holyRelic.attackPercentage > .40 ? 0 : holyRelic.attackPercentage, Suggest.gongji);
        }
        if (useCritical) {
            count += this.entryCount(holyRelic.critical > .30 ? 0 : holyRelic.critical, Suggest.baoji);
        }
        if (useCriticalDamage) {
            count += this.entryCount(holyRelic.criticalDamage > .50 ? 0 : holyRelic.criticalDamage, Suggest.baoshang);
        }
        if (useRecharge) {
            count += this.entryCount(holyRelic.recharge > .50 ? 0 : holyRelic.recharge, Suggest.chongneng);
        }
        if (useLife) {
            count += this.entryCount(holyRelic.lifePercentage > .40 ? 0 : holyRelic.lifePercentage, Suggest.shengming);
        }
        if (useElementalMastery) {
            count += this.entryCount(holyRelic.elementalMastery > 150 ? 0 : holyRelic.elementalMastery, Suggest.jingtong);
        }
        return count;
    }

    // 该词条中了多少次
    static entryCount(value: number, defaultArr: number[]): number {
        const avg = defaultArr.reduce((previousValue: number, currentValue: number) => {
            return previousValue + currentValue;
        }, 0) / defaultArr.length;

        return Math.round(value * 100 / avg);
    }
}

// 返回数据类型
export interface SuggestItem {
    count: number,
    label?: string,
    holyRelics: HolyRelic[]
}