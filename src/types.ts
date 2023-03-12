import { ReactNode } from 'react'

export interface IUser {
  _id: string
  name: string
  profession: IProfession
  qualities: IQuality[]
  completedMeetings: number
  rate: number
  bookmark: boolean
}

export interface IQuality {
  _id: string
  name: string
  color: string
}

export interface IProfession {
  _id: string
  name: string
}

export type IProfessions = IProfession[]

export interface Sort {
  path: string
  order: 'asc' | 'desc'
}

export interface Column<ItemType = any> {
  path?: string
  name?: string
  component?: ((item: ItemType) => ReactNode) | string
}

export type Columns<ItemType = any> = Record<string, Column<ItemType>>
