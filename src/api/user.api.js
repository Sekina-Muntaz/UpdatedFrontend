import api from './axios'

export function getProfileApi() {
  return api.get('/users/me')
}
