import { FC } from 'react'
import { IQuality } from '../../types'

export const Quality: FC<{ quality: IQuality }> = ({ quality }): JSX.Element => (
  <span key={quality._id} className={`badge bg-${quality.color} mx-1`}>
        {quality.name}
  </span>
)
