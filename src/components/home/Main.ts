import {HolyRelic, holyRelicPositionNames} from "components/home/HolyRelic";
import {ref} from "vue";
import {People} from "components/home/People";

export let baseAttack = 1; // 白字攻击力
export let baseLife = 1; // 白字生命值
export let allAttack = 1; // 总攻击力
export let allLife = 1; // 总生命值
export let responseCoefficient = 1; // 反应系数

export let useEmptyHolyRelic = false; // 不穿别人的圣遗物

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

// 计算主体
export class Main {
    // 存储圣遗物
    flower: HolyRelic[] = [];
    feather: HolyRelic[] = [];
    hourglass: HolyRelic[] = [];
    cup: HolyRelic[] = [];
    head: HolyRelic[] = [];

    // 外部环境
    theOutList: OutList[] = [];

    // 脱光的老婆
    basePeople: People = new People();

    // 给谁穿
    whichPeople: string = '未定义';
    // 穿哪个圣遗物
    whichHolyRelic: string = '未定义';
    // 哪个伤害
    whichBonus: string = '未定义';

    bestResultList: Expectation[] = []; // 最好的结果集
    worseResultList: Expectation[] = []; // 最差的结果集

    // 开始计算
    start(): [[Expectation, Expectation, Expectation[]], [Expectation, Expectation, Expectation[]]] {
        this.addOut([], 0);
        return [this.result(this.bestResultList), this.result(this.worseResultList)];
    }

    // 处理结果集
    result(expectations: Expectation[]): [Expectation, Expectation, Expectation[]] {
        // 极值
        let max: Expectation = expectations[0];
        let min: Expectation = expectations[0];

        // 计数
        const count: Expectation[] = [];

        for (let expectation of expectations) {
            // 设置最大
            if (expectation.expectation > max.expectation) {
                max = expectation;
            }
            // 设置最小
            if (expectation.expectation < min.expectation) {
                min = expectation;
            }

            // 假定顺序不变
            let flag = false;
            for (let i = 0; i < count.length; i++) {
                flag = true;
                for (let j = 0; j < expectation.holyRelic.length; j++) {
                    if (expectation.holyRelic[j].index != count[i].holyRelic[j].index) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    // 找到了
                    // @ts-ignore
                    count[i].count++;
                    break;
                }
            }

            // 没找到了
            if (!flag) {
                expectation.count = 1;
                count.push(expectation);
            }
        }

        return [max, min, count];
    }

    // 添加外部
    private addOut(outPeopleList: OutList[], index: number) {
        // 写递归的第一步，不能放在最后了妈的老是忘
        if (index >= this.theOutList.length) {
            // 把OutList的东西放people里
            const outPeople = new People();
            if (outPeopleList.length > 0) {
                outPeopleList.forEach(op => {
                    outPeople.addPeople(op.out);
                })
            }
            this.addFive(outPeople);
            return;
        }

        // 枚举必须有不加的情况
        if (!this.theOutList[index].must) {
            this.addOut(outPeopleList, index + 1);
        }

        // 如果他被忽略，下一个
        if (this.theOutList[index].omit) {
            this.addOut(outPeopleList, index + 1);
            return;
        }

        // 如果他与别人互斥，下一个
        let flag = false;
        for (let outPeople of outPeopleList) {
            if (outPeople.mutuallyExclusive.indexOf(index) !== -1) {
                flag = true;
                break;
            }
        }
        if (flag) {
            this.addOut(outPeopleList, index + 1);
            return;
        }

        // 度过了九九八十一难，认可了
        this.addOut([...outPeopleList, this.theOutList[index]], index + 1);
    }

    // 把圣遗物加里面
    private addFive(outPeople: People) {
        // 最好和最差的期望存储
        const bestExpectation: Expectation = {
            people: new People(),
            outPeople: new People(),
            expectation: Number.MIN_SAFE_INTEGER,
            holyRelic: []
        };
        const worseExpectation: Expectation = {
            people: new People(),
            outPeople: new People(),
            expectation: Number.MAX_SAFE_INTEGER,
            holyRelic: []
        };

        // 最喜欢的暴力枚举，不是（因为只会这个）
        for (let i = 0; i < this.flower.length; i++) {
            if (this.flower[i].omit) {
                continue;
            }
            for (let j = 0; j < this.feather.length; j++) {
                if (this.feather[j].omit) {
                    continue;
                }
                for (let k = 0; k < this.hourglass.length; k++) {
                    if (this.hourglass[k].omit) {
                        continue;
                    }
                    for (let l = 0; l < this.cup.length; l++) {
                        if (this.cup[l].omit) {
                            continue;
                        }
                        for (let m = 0; m < this.head.length; m++) {
                            if (this.head[m].omit) {
                                continue;
                            }
                            // 圣遗物配套够不够四个
                            let count = 0;
                            // 遍历当前选中的圣遗物
                            [this.flower[i], this.feather[j], this.hourglass[k], this.cup[l], this.head[m]].forEach(holyRelic => {
                                if (useEmptyHolyRelic && !holyRelic.equip) {
                                    // 用套装不够4个代替flag
                                    count -= 5;
                                }
                                holyRelic.jsonName === this.whichHolyRelic && count++;
                            })

                            if (count < 4) {
                                continue;
                            }

                            const people = new People();
                            people.setBonus(this.whichBonus);
                            people.addPeople(this.basePeople);
                            people.addPeople(outPeople);

                            [this.flower[i], this.feather[j], this.hourglass[k], this.cup[l], this.head[m]].forEach(holyRelic => {
                                people.add(holyRelic);
                            })

                            const expectation = people.compute();

                            // 附到最大最小中
                            if (expectation > bestExpectation.expectation) {
                                bestExpectation.people = people;
                                bestExpectation.outPeople = outPeople;
                                bestExpectation.expectation = expectation;
                                bestExpectation.holyRelic = [this.flower[i], this.feather[j], this.hourglass[k], this.cup[l], this.head[m]];
                            }
                            if (expectation < worseExpectation.expectation) {
                                worseExpectation.people = people;
                                worseExpectation.outPeople = outPeople;
                                worseExpectation.expectation = expectation;
                                worseExpectation.holyRelic = [this.flower[i], this.feather[j], this.hourglass[k], this.cup[l], this.head[m]];
                            }
                        }
                    }
                }
            }
        }

        this.bestResultList.push(bestExpectation);
        this.worseResultList.push(worseExpectation);
    }

    // 将全部圣遗物扔进去
    allIn(obj: any) {
        // 遍历位置
        for (let position of holyRelicPositionNames) {
            const holyRelics = obj[`${position.jsonName}`];

            // 遍历每个位置的所有圣遗物
            for (let i = 0; i < holyRelics.length; i++) {
                const hr = new HolyRelic(holyRelics[i]);
                hr.setIndex(i);
                if (hr.allowJsonName() && !hr.omit) {
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

    // 设置人物和圣遗物
    setWhich(people: string, holyRelic: string, bonus: string) {
        this.whichPeople = people;
        this.whichHolyRelic = holyRelic;
        this.whichBonus = bonus;
    }

    // 设置人物基本属性
    setBasePeople(increasedDamage: number,
                  protector: number,
                  critical: number,
                  criticalDamage: number,
                  recharge: number,
                  elementalMastery: number,
                  cureEffect: number) {

        this.basePeople.baseAttack += baseAttack;
        this.basePeople.baseLife += baseLife;
        this.basePeople.allAttack += allAttack;
        this.basePeople.allLife += allLife;
        this.basePeople.responseCoefficient += responseCoefficient;

        this.basePeople.increasedDamage += increasedDamage;
        this.basePeople.protector += protector;
        this.basePeople.critical += critical;
        this.basePeople.criticalDamage += criticalDamage;
        this.basePeople.recharge += recharge;
        this.basePeople.elementalMastery += elementalMastery;
        this.basePeople.cureEffect += cureEffect;

        // 在设置完哪个老婆和哪个圣遗物和圣遗物列表之后
        [...this.flower, ...this.feather, ...this.hourglass, ...this.cup, ...this.head].forEach(holyRelic => {
            if (holyRelic.equip == this.whichPeople) {
                this.basePeople.del(holyRelic);
            }
        })
    }

    // 设置theOutList
    setTheOutList(outList: OutList[]) {
        this.theOutList = [...outList];
    }

    // 设置锁定圣遗物
    setLockPeople(lockPeopleList: string[]) {
        [...this.flower, ...this.feather, ...this.hourglass, ...this.cup, ...this.head].forEach(holyRelic => {
            for (let peopleName of lockPeopleList) {
                if (holyRelic.equip == peopleName) {
                    holyRelic.omit = true;
                }
            }
        })
    }

    // 获取人物列表
    static getPeopleList(): string[] {
        const main = new Main();
        main.useStoreCreate();
        const res: any = new Set<string>();
        [...main.flower, ...main.feather, ...main.hourglass, ...main.cup, ...main.head].forEach(holyRelic => {
            if (holyRelic.equip) {
                res.add(holyRelic.equip);
            }
        })
        return res;
    }
}

// 设置主要面板信息
export function setMainPanel(baseAttack0: number, baseLife0: number, allAttack0: number, allLife0: number, responseCoefficient0: number) {
    baseAttack = baseAttack0;
    baseLife = baseLife0;
    allAttack = allAttack0;
    allLife = allLife0;
    responseCoefficient = responseCoefficient0;
}

// 设置开关
export function setToggle(useEmptyHolyRelic0: boolean,
                          thorPassive0: boolean,
                          insulation0: boolean,
                          walnut0: boolean,
                          yeLan0: boolean,
                          protector0: boolean,
                          beakKnife0: boolean,
                          witch0: boolean) {

    useEmptyHolyRelic = useEmptyHolyRelic0;
    thorPassive = thorPassive0;
    insulation = insulation0;
    walnut = walnut0;
    yeLan = yeLan0;
    protector = protector0;
    beakKnife = beakKnife0;
    witch = witch0;
}

// 设置垃圾开关
export function setRubbishToggle(showSuggest0: boolean,
                                 useAttack0: boolean,
                                 useCritical0: boolean,
                                 useCriticalDamage0: boolean,
                                 useRecharge0: boolean,
                                 useLife0: boolean,
                                 useElementalMastery0: boolean) {

    showSuggest = showSuggest0;
    useAttack = useAttack0;
    useCritical = useCritical0;
    useCriticalDamage = useCriticalDamage0;
    useRecharge = useRecharge0;
    useLife = useLife0;
    useElementalMastery = useElementalMastery0;
}

// 外部属性列表
export interface OutList {
    out: People,
    must: boolean,
    mutuallyExclusive: number[],
    omit: boolean
}

// 期望存储
export interface Expectation {
    people: People,
    outPeople: People,
    expectation: number,
    holyRelic: HolyRelic[],
    count?: number
}