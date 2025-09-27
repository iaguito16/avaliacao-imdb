import chaveApi from "./dadosApi.js";

const campoBusca = document.querySelector("#campoBusca");
const btnBusca = document.querySelector("#pesquisarFilmes");
const dadosFilme = document.querySelector("#dadosFilme");

async function buscarFilmes() {
  const textoDigitado = campoBusca.value.trim();

  if (textoDigitado.length === 0) {
    dadosFilme.innerHTML = '<p style="color:#f87171">⚠️ Digite o nome de um filme.</p>';
    return;
  }

  dadosFilme.innerHTML = "Buscando filmes...";

  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(textoDigitado)}&apikey=${chaveApi}`;

  try {
    const resposta = await fetch(url);
    const data = await resposta.json();
    console.log(data);
    mostrarFilmes(data);
    campoBusca.value = ""; // limpa só depois da busca
  } catch (erro) {
    console.error("Erro na busca:", erro);
    dadosFilme.innerHTML = '<p style="color:#f87171">Ocorreu um erro ao buscar os filmes. Tente novamente.</p>';
  }
}

function mostrarFilmes(data) {
  if (!data || data.Response === "False" || !data.Search) {
    dadosFilme.innerHTML = 'Nenhum filme encontrado!';
    return;
  }

  dadosFilme.innerHTML = `<ul>
    ${data.Search.map(filme => {
      const poster = filme.Poster && filme.Poster !== "N/A"
        ? filme.Poster
        : "https://via.placeholder.com/80x120?text=Sem+Imagem";
      return `
        <li>
          <strong>${filme.Title}</strong><br>
          <img src="${poster}" alt="Poster de ${filme.Title}"><br>
          Ano: ${filme.Year}
        </li>
      `;
    }).join("")}
  </ul>`;
}

btnBusca.addEventListener("click", buscarFilmes);


campoBusca.addEventListener("keydown", (e) => {
  if (e.key === "Enter") buscarFilmes();
});
