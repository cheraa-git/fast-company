import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

export const ProgressBar = ({ progress, isError }) => {
  const [color, setColor] = useState('primary')

  useEffect(() => {
    if (isError) {
      setColor('danger')
    }
    if (progress === 100) {
      setColor('success')
    }
    if (progress === 0) {
      setColor('primary')
    }
  }, [progress])

  return (
    <div className="progress" hidden={progress === 0}>
      <div className={`progress-bar progress-bar-striped progress-bar-animated bg-${color}`}
           style={{ width: `${progress}%` }}
           role="progressbar"
           aria-valuenow={progress}
           aria-valuemin="0"
           aria-valuemax="100"
      >
        {progress}%
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  progress: PropTypes.number,
  isError: PropTypes.bool
}
