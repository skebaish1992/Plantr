export function setProfile(profile) {
  return {type: 'ADD_PROFILE', profile};
}

export function setAboutMe(about) {
  return {type: 'ADD_ABOUT', about};
}

export function setAllFriends(allFriends) {
  return {type: 'SET_ALL_FRIENDS', allFriends}
}