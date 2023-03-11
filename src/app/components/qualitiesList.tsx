import React, { FC } from 'react'
import { Quality } from './quality'
import { IQuality } from '../../types'

export const QualitiesList: FC<{ qualities: IQuality[] }> = ({ qualities }): JSX.Element => {
  return (
    <>
      {qualities.map(quality => <Quality key={quality._id} quality={quality} />)}
    </>
  )
}
