var nun_index = async (ctx, next) => {
  ctx.render('index.html', {
    title: 'Welcome'
  })
}

var nun_login = async (ctx, next) => {
  ctx.render('login.html')
}

var nun_signin = async (ctx, next) => {
  console.log(ctx)
  var email = ctx.requset.body.email || '',
      password = ctx.requset.body.password || '';
  if (email === 'admin@example.com' && password === '123456') {
    //登陆成功
    ctx.render('signin-ok.html', {
      title: 'Sign In OK',
      name: 'Mr Node'
    })
  } else {
    //登陆失败
    ctx.render('signin-failed.html', {
      title: 'Sign In Failed'
    })
  }
}

module.exports = { 
  'GET /': nun_index,
  'GET /login': nun_login,
  'POST /signin': nun_signin
 }