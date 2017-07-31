const initialUserState = {
  username: '',
  gardens: [],
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  about: '',
  profile: {},
  allFriends: []
}

const setAboutMe = (state, action) => {
  console.log('The about reducer action is: ', action);
  let newState = {};
  let newAbout = ''
  Object.assign(newState, state, {about: newAbout});
  return newState;
}

const setProfile = (state, action) => {
  console.log('The about reducer action is: ', action);
  let newState = {};
  let newProfile = {};
  Object.assign(newState, state, {profile: newProfile});
  return newState;
}

const userProfile = (state, action) => {
  console.log('IS USERPROFILE REDUCER EVER CALLED???')
  let newState = {};
  let {username, gardens} = state;
  Object.assign(newState, state, {username: action.username, gardens: action.gardens});
  return newState;
}

const setAllFriends = (state, action) => {
  console.log('The setAllFriends reducer action is: ', action);

  let newState = {};
  let {allFriends} = state;
  Object.assign(newState, state, {allFriends: action.allFriends})
  return newState
}

function userReducer(state = initialUserState, action) {
  switch (action.type) {
  case 'ADD_ABOUT' :
    return setAboutMe(state, action);
  case 'ADD_PROFILE' :
    return setProfile(state, action);
  case 'SET_ALL_FRIENDS' :
    return setAllFriends(state, action);
  // case 'LOGIN_REQUEST':
  //   return Object.assign({}, state, {
  //     isFetching: true,
  //     isAuthenticated: false,
  //     user: action.creds
  //   });
  // case 'LOGIN_SUCCESS':
  //   return Object.assign({}, state, {
  //     isFetching: false,
  //     isAuthenticated: true,
  //     errorMessage: ''
  //   });
  // case 'LOGIN_FAILURE':
  //   return Object.assign({}, state, {
  //     isFetching: false,
  //     isAuthenticated: false,
  //     errorMessage: action.message
  //   });
  // case 'LOGOUT_SUCCESS':
  //   return Object.assign({}, state, {
  //     isFetching: true,
  //     isAuthenticated: false
  //   });
  default:
    return state;
  }
}

export default userReducer;
