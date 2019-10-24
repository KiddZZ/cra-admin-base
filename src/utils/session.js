import http from './http'

export function setUserToken (arg) {
  sessionStorage.Authorization = arg
  http.updateAuthorization()
}

export function getUserToken () {
  return sessionStorage.Authorization ? sessionStorage.Authorization : ''
}
