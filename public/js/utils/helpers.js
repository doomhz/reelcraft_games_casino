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

export const gamesList = [
  {id: 1, key: "casino_war", name: "Casino War", class: "CasinoWar", type: "cards", description: "The fastest casino card game you will ever play!"},
  {id: 2, key: "lucky7", name: "Lucky 7", class: "Lucky7", type: "slot", bonus: true, description: "Play 3-reel slot machine Lucky 7 and win the Progressive Jackpot."},
  {id: 3, key: "roulette", name: "Roulette", class: "Roulette", bonus: true, description: "Play single-zero roulette, we offer you the best odds."},
  {id: 4, key: "blackjack", name: "Blackjack", class: "Blackjack", type: "cards", bonus: true, description: "The most popular casino card game you will ever play!"},
  {id: 5, key: "video_poker", name: "Video Poker", class: "VideoPoker", type: "cards", bonus: true, description: "The most popular gambling game you will ever play!"}
]