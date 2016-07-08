import axios from 'axios'

export function getUserInfo(){
  return axios.get("/user")
}

export function createUser(){
  return axios.post("/user")
}

export function deleteUser(){
  return axios.delete("/user")
}

export function updateUser(data){
  return axios.put("/user", data)
}

export function getGamesList(){
  return axios.get("https://reelcraftgames.com/games/list/all")
}

export function createSession(){
  return axios.post("/rcg_api/create_session")
}

export function closeSession(token){
  return axios.post("/rcg_api/close_session", {token: token})
}