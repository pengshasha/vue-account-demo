const setUserItems = (key, value)=>{
  window.localStorage.setItem(key, value);
}

const getUserItems = (key)=>{
  return window.localStorage.getItem(key);
}

const removeUserItem = (key)=>{
  window.localStorage.removeItem(key);
}

module.exports = {
  setUserItems,
  getUserItems,
 removeUserItem
}