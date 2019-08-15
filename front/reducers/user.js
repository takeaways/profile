export const initialState = {
  isLoggedIn:false,
  user:{
    nickname:"장건일",
    Posts:[],
    Followings:[],
    Followers:[]
  },
};


const dummy = {
  isLoggedIn:true,
  nickname:"장건일",
  Posts:[1,2,3],
  Followings:[1,2,4,5],
  Followers:[2],
  signUpData:{
    id:'',
    password:'',
    nickname:''
  },
}


export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SIGN_UP = "SIGN_UP";


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:{
      return{
        ...state,
        isLoggedIn:true,
        user:dummy
      }
    }
    case LOG_OUT:{
      return{
        ...state,
        isLoggedIn:false,
        user:{}
      }
    }
    case SIGN_UP:{
      return{
        ...state,
        signUpData:action.data
      }
    }
    default:{
      return{
        ...state,
      }
    }

  }
}

export default reducer
