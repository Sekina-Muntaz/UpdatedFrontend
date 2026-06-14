export function isJwtExpired(token) {
  if (!token) return true

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const now = Math.floor(Date.now() / 1000)
    return payload.exp ? payload.exp < now : false
  } catch (error) {
    return true
  }
}