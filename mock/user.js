const tokens = {
  admin:{
    token:'admin-token'
  },
  editor:{
    token:'editor-token'
  }
}

const users = {
  "admin-token":{
    roles:['admin'],
    introduction:"Super administrator",
    avatar:"",
    name:"Super Admin"
  },
  "editor-token":{
    roles:["editor"],
    introduction:"user",
    avatar:"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name:"Normal Editor"
  }
}

export default [
  //user login
  {
    url:'/user/login',
    type:'post',
    response:config => {
      const { username } = config.body
      const token = tokens[username]

      if(!token) {
        return {
          code:60204,
          message:'Account add password are incorrect.'
        }
      }

      return {
        code:2000,
        data:token
      }
    }
  },

  // get user info
  {
    url:'/user/info\.*',
    type:'get',
    response:config => {
      const { token } = config.query
      const info = users[token]

      if(!info) {
        return {
          code:50008,
          message:'Login failed,unable to get user details.'
        }
      }

      return {
        code: 20000,
        data:info
      }
    }
  },

  //user logout
  {
    url:'/user/logout',
    type:'post',
    response: _ => {
      return {
        code:20000,
        data:'success'
      }
    }
  }
]
