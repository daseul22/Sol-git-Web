export const cookie = {
  getCookie: (name: string): boolean => {
    return document.cookie.split(';').some(c => {
      return c.trim().startsWith(name + '=')
    })
  },
  setCookie: (cookie: string): void => {
    const now = new Date()
    const thirtyDaysFromNow = new Date().setDate(now.getDate() + 30)
    document.cookie = `${cookie}; expires=${new Date(thirtyDaysFromNow)}`
  },
  deleteCookie: (name: string, path: string, domain: string): void => {
    if (cookie.getCookie(name)) {
      document.cookie = name + '=' +
        ((path) ? ';path=' + path : '') +
        ((domain) ? ';domain=' + domain : '') +
        ';expires=Thu, 01 Jan 1970 00:00:01 GMT'
    }
  }
}
