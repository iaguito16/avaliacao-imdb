import chaveApi from "./dadosApi.js"


const campoBusca = document.querySelector(`#campoBusca`)
const btnBusca = document.querySelector(`#pesquisarFilmes`)
const dadosFilme = document.querySelector(`#dadosFilme`)

async function buscarFilmes() {

    dadosFilme.innerHTML = `Buscando filmes...`


    const textoDigitado = campoBusca.value.trim();
    if (textoDigitado.length === 0) {
        alert("Por favor, digite o nome de um filme");
        return;
    } 

    const url = `https://www.omdbapi.com/?s=${textoDigitado}&apikey=${chaveApi}`;
    try {
        const resposta = await fetch(url)
        const data = await resposta.json()
        console.log(data)
            mostrarFilmes(data);
    } catch (erro) {
        console.log(erro);
    }


}

btnBusca.addEventListener(`click`, buscarFilmes);
    const textoDigitado = campoBusca.value.trim();
    buscarFilmes(textoDigitado);
    campoBusca.value = '';


function mostrarFilmes(data) {
    if (!data.Search) {
        dadosFilme.innerHTML = 'Nenhum filme encontrado!';
        return;

    }

    dadosFilme.innerHTML = `<ul>
        ${data.Search.map(filme => `
            <li>
            ${filme.Title} <br>
            <img src="${filme.Poster}"> <br> 
            Ano:${filme.Year}</li>
            `).join('')}
    </ul>`;
}

/* buscador começa no i depois do ?, ai tem q trocar o i pelo t para buscar os filmes */
/*   const url = `https://www.omdbapi.com/?s=${textoDigitado}&apikey=${chaveApi}`;*/