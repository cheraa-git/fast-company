import { useMockData } from '../utils/mockData'
import { ProgressBar } from '../components/common/progressBar'

export const MainLayout = () => {
  const { initialize, status, progress, error } = useMockData()
  const handleClick = () => {
    initialize()
  }
  return (
    <div className="container mt-5">
      <h1 className="ms-5">Main</h1>
      <h3>Инициализация данных в Firebase</h3>
      <div className="d-flex mb-3">
        <button onClick={handleClick} className="btn btn-primary me-4">Инициализировать</button>
        <p className="align-self-center mb-0"><b>Status</b>: {status}</p>
      </div>
      {error && <p>{error}</p>}
      <ProgressBar progress={progress} isError={status === 'Error occurred'} />
    </div>
  )
}
