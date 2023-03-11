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

export type IProfessions = Record<string, IProfession>
