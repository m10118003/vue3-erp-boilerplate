import {  } from '@/router'

export interface MenuModel {
    name: string
    fullPath:string
    path: string
    icon?: string
    sort?:number
    children: MenuModel[]
}