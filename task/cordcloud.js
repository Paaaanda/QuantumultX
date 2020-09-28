const cookieName = 'CordCloud'
const cookieKey = 'CookieCordCloud'
const cookieVal = $prefs.valueForKey(cookieKey)

function sign() {
  let url = {
    url: `https://www.cordcloud.site/user/checkin`,
    method: 'post',
    headers: {
      Cookie: cookieVal
    }
  }
  $task.fetch(url).then((response) => {
    let data = response.body
    let title = `${cookieName}`
    let detail = JSON.parse(data).msg
    $notify(title, "", detail)
  })
}

sign({})