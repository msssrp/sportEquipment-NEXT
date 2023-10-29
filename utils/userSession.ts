import Cookies from 'js-cookie';
export function getUserSession() {
  const token = Cookies.get('token');

  if (!token) {
    return false
  }
  return true

}
