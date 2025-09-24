import chaveApi from "./dadosApi.js"

const url = `http://www.omdbapi.com/?i=tt3896198&apikey=&${chaveApi}`


const campoBusca = document.querySelector(`#campoBusca`)
const btnBusca = document.querySelector(`#pesquisarFilmes`)
const dadosFilme = document.querySelector (`#dadosFilme`)

/* buscador começa no i depois do ?, ai tem q trocar o i pelo t para buscar os filmes */ 