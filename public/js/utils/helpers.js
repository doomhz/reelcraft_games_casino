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