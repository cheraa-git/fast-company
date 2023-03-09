import React, { FC } from 'react'
import { IQuality } from '../../types'

export const Quality: FC<{ qualities: IQuality[] }> = ({ qualities }) => (
  <td>
    {qualities.map((badge) => (
      <span key={badge._id} className={`badge bg-${badge.color} mx-1`}>
        {badge.name}
      </span>
    ))}
  </td>
)
