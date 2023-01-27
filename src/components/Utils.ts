// 遇到问题睡大觉
export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 不可以输入空值哦
export const notNull = [(val: any) => (val && val.length > 0) || '不行'];

export function numberFormat(number: number):string{
    const regExpExecArray = /^(-|\d)\d*(?:\.\d{0,2}[1-9]?)?/.exec(String(number));
    return !regExpExecArray ? '' : regExpExecArray[0];
}

export function openUrl(url: string){
    window.open(url);
}