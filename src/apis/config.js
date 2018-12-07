//开发环境
const EASY_MOCK = 'https://www.easy-mock.com/mock';
const MOCK_AUTH = EASY_MOCK + '/5c07837521ccb77413c403eb';

if (process.env.NODE_ENV === 'production') { // 发布环境
    //路径替换
}

// 权限接口地址
// export const MOCK_AUTH_ADMIN = MOCK_AUTH + '/admin'; // 管理员权限接口
// export const MOCK_AUTH_VISITOR = MOCK_AUTH + '/visitor' // 访问权限接口

//登录
export const LOGIN = MOCK_AUTH + '/login';
//退出
export const LOGOUT = MOCK_AUTH + '/logout';

