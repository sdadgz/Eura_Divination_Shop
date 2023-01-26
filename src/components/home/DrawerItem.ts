export const DrawerItems: DrawerItems[] = [
    {icon: 'home',label: '不是首页', url: 'home'},
    {icon: 'upload',label: '不需要提前上传圣遗物', url: 'upload'},
    {icon: 'info',label: '关于', url: 'about'},
]

// 芜湖，老熟人接口
interface DrawerItems {
    icon: string,
    label: string,
    url: string,
}