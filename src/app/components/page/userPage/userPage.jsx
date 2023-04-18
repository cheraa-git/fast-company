import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../api'
import { Spinner } from '../../ui/Spinner'
import { QualitiesList } from '../../ui/qualities/qualitiesList'
import { getRandomAvatar } from '../../../utils/randomAvatar'

const UserPage = () => {
  const { userId } = useParams()
  const history = useHistory()
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(userId).then(response => setUser(response))
  }, [])

  if (!user) return <Spinner />
  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <div className="card mb-3">
            <div className="card-body">
              <button
                className="position-absolute top-0 end-0 btn btn-light btn-sm"
                onClick={() => history.push(`/users/${userId}/edit`)}
              >
                <i className="bi bi-gear" />
              </button>
              <div className="d-flex flex-column align-items-center text-center position-relative">
                <img
                  src={getRandomAvatar()}
                  className="rounded-circle shadow-1-strong me-3"
                  alt="avatar"
                  width="200"
                  height="200"
                />
                <div className="mt-3">
                  <h4>{user.name}</h4>
                  <p className="text-secondary mb-1">{user.profession.name}</p>
                  <div className="text-muted">
                    <i className="bi bi-caret-down-fill text-primary" role="button" />
                    <i className="bi bi-caret-up text-secondary" role="button"></i>
                    <span className="ms-2">{user.rate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
              <h5 className="card-title">
                <span>Qualities</span>
              </h5>
              <div>
                <QualitiesList qualities={user.qualities} />
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
              <h5 className="card-title">
                <span>Completed meetings</span>
              </h5>
              <h1 className="display-1">{user.completedMeetings}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card mb-2">
            <div className="card-body">
              <div>
                <h2>New comment</h2>
                <div className="mb-4">
                  <select className="form-select" name="userId" value="">
                    <option disabled value="" selected>Выберите пользователя</option>
                    <option>Доктор</option>
                    <option>Тусер</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Сообщение</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" />
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h2>Comments</h2>
              <hr />
              <div className="bg-light card-body mb-3">
                <div className="row">
                  <div className="col">
                    <div className="d-flex flex-start">
                      <img
                        src={getRandomAvatar()}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="65"
                        height="65"
                      />
                      <div className="flex-grow-1 flex-shrink-1">
                        <div className="mb-4">
                          <div
                            className="d-flex justify-content-between align-items-center">
                            <p className="mb-1">
                              Джон Дориан
                              <span className="small">5 минут назад</span>
                            </p>
                            <button className="btn btn-sm text-primary d-flex align-items-center">
                              <i className="bi bi-x-lg" />
                            </button>
                          </div>
                          <p className="small mb-0">
                            Lorem ipsum dolor sit
                            amet consectetur
                            adipisicing elit.
                            Corporis, soluta facilis
                            fugit hic quasi sapiente
                            accusamus quia
                            voluptatem dolorum
                            laboriosam id iste
                            voluptas modi animi eius
                            voluptatum adipisci amet
                            officiis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { UserPage }
