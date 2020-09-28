const email = "",password=""
function login() {
    post("/auth/login", { email: email, passwd: password }, function (res) {
        console.log(res.body)
        if (res.body.indexOf("用户中心") > -1) {
            sign()
        } else {
            if (JSON.parse(res.body).ret != 1) {
                $notify("登录失败", "", JSON.parse(res.body).msg); // Error!
                return;
            }
            sign()
        }
    })
}
function sign() {
    post("/user/checkin",{},function(response){
        let data = response.body
        let title = "CordCloud"
        let detail = JSON.parse(data).msg
        $notify(title, "", detail)
    })
}

function post(u, data, f) {
    let myRequest = {
        url: 'https://www.cordcloud.site' + u,
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    console.log(myRequest)
    $task.fetch(myRequest).then(response => {
        f(response)
    }, reason => {
        $notify("请求出错", "", reason.error); // Error!
    });
}
login({})