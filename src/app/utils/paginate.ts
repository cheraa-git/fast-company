import { IUser } from '../../types'

export function paginate(items: IUser[], pageNumber: number, pageSize: number): IUser[] {
  const startIndex = (pageNumber - 1) * pageSize
  return [...items].splice(startIndex, pageSize)
}
