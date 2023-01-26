// 遇到问题睡大觉
export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 不可以输入空值哦
export const notNull = [(val: any) => (val && val.length > 0) || '不行'];