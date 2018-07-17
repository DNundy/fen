const service = {
    AccountLogin: {
        url: '/api/index/Account/login',
        method: 'post'
    },
    AccountRegister: {
        url: '/api/index/Account/register',
        method: 'post'
    },
    AccountForget: {
        url: '/api/index/Account/forget',
        method: 'post'
    },
    AccountRefresh: {
        url: '/api/index/Account/refresh',
        method: 'post'
    }
}

export default service
