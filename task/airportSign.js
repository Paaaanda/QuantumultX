const info = [
    {
        name: '',
        loginUrl: '',
        signUrl: '',
        userName: '',
        email: '',
        password: ''
    }
]
function task() {
    for (let i = 0; i < info.length; i++) {
        const item = info[i];
        login(item);

    }
}
function login(data) {
    post(data.loginUrl, { email: data.email, passwd: data.password }, function (res) {
        if (res.body.indexOf(data.userName) > -1) {
            sign(data)
        } else {
            if (JSON.parse(res.body).ret != 1) {
                $notify(data.name, "登录失败", JSON.parse(res.body).msg);
                return;
            }
            sign(data)
        }
    })
}
function sign(data) {
    post(data.signUrl, {}, function (response) {
        let res = response.body
        let title = data.name
        let detail = JSON.parse(res).msg
        $notify(title, "", detail)
    })
}

function post(u, data, f) {
    let myRequest = {
        url: u,
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    $task.fetch(myRequest).then(response => {
        f(response)
    }, reason => {
        $notify("请求出错", "", reason.error);
    });
}
task({})