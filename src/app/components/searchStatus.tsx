import { FC } from 'react'
import { IUser } from '../../types'

export const SearchStatus: FC<{ users: IUser[] }> = ({ users }): JSX.Element => {
  const length = users.length
  const getLastNumb = () => {
    const strLength = String(length)
    if (strLength.at(-2) === '1') {
      return Number(`${strLength.at(-2) ?? ''}${strLength.at(-1) ?? ''}`)
    } else {
      return Number(strLength.at(-1))
    }
  }
  const label = getLastNumb() > 1 && getLastNumb() < 5 ? 'человека тусанут' : 'человек тусанет'
  return (
    <h2>
      {users.length === 0
        ? <span className="badge bg-danger">Никто с тобой не тусанет</span>
        : <span className="badge bg-primary">
          {length} {label} с тобой сегодня
        </span>
      }
    </h2>
  )
}
