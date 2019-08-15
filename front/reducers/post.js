const dummy = {
  isLoggedIn:true,
  nickname:"장건일",
  Posts:[],
  Followings:[],
  Followers:[]
}

const dummy1 = {
  isLoggedIn:true,
  imagePaths:[],
  mainPosts:[{
    createAt:"2019-08-15",
    img:"http://www.earlyadopter.co.kr/wp-content/uploads/2017/06/line_friends_02.jpg",
    User:{
      id:1,
      nickname:"장건일",
    },
    content:"반가워요~"
  }]
}

export const initialState = {
  mainPosts:[{
    createAt:"2019-08-15",
    img:"http://www.earlyadopter.co.kr/wp-content/uploads/2017/06/line_friends_02.jpg",
    User:{
      id:1,
      nickname:"장건일",
    },
    content:"반가워요~"
  }]
}

export const ADD_POST = "ADD_POST";
export const ADD_DUMMY = "ADD_DUMMY";

const addPost = {
  type:ADD_POST,
}

export const addDummy = {
  type:ADD_DUMMY,
  data:{
    createAt:"2019-08-15",
    img:"http://www.earlyadopter.co.kr/wp-content/uploads/2017/06/line_friends_02.jpg",
    content:"Hello",
    UserId:1,
    User:{
      id:1,
      nickname:"홍길동"
    }
  }
}

 const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DUMMY:{
      return{
        ...state,
        mainPosts:[action.data, ...state.mainPosts]
      }
    }
    case ADD_POST:{
      return{
        ...state,
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
