const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const results = document.getElementById("results");

const playlist = document.getElementById("playlist");

const viewer = document.getElementById("viewer");
const fullscreenImage = document.getElementById("fullscreenImage");
const backBtn = document.getElementById("backBtn");

let images = [];

let selectedSongs = [];

/* CARREGA JSON */

fetch("images.json")
  .then(response => response.json())
  .then(data => {

    images = data;

  });

/* BUSCA */

searchBtn.addEventListener("click", searchSongs);

searchInput.addEventListener("keypress", (e) => {

  if(e.key === "Enter"){
    searchSongs();
  }

});

function searchSongs(){

  const value = searchInput.value
    .toLowerCase()
    .trim();

  results.innerHTML = "";

  if(value === ""){
    return;
  }

  const filtered = images.filter(item =>
    item.name.toLowerCase().includes(value)
  );

  if(filtered.length === 0){

    results.innerHTML = `
      <div class="result-item">
        <div class="result-name">
          Nenhum resultado encontrado
        </div>
      </div>
    `;

    return;
  }

  filtered.forEach(item => {

    const div = document.createElement("div");

    div.className = "result-item";

    div.innerHTML = `
      <div class="result-name">
        ${item.name}
      </div>
    `;

    /* CLICAR NO NOME = ADICIONAR */

    div.addEventListener("click", () => {

      addToPlaylist(item);

    });

    results.appendChild(div);

  });

}

/* ADICIONAR À LISTA */

function addToPlaylist(item){

  const exists = selectedSongs.find(song =>
    song.name === item.name
  );

  if(exists){
    return;
  }

  selectedSongs.push(item);

  renderPlaylist();

}

/* RENDERIZA LISTA */

function renderPlaylist(){

  playlist.innerHTML = "";

  if(selectedSongs.length === 0){

    playlist.innerHTML = `
      <div class="playlist-item">
        <div class="playlist-name">
          Nenhum louvor selecionado
        </div>
      </div>
    `;

    return;
  }

  selectedSongs.forEach((item, index) => {

    const div = document.createElement("div");

    div.className = "playlist-item";

    div.innerHTML = `
      <div class="playlist-name">
        ${index + 1}. ${item.name}
      </div>

      <button class="remove-btn">
        X
      </button>
    `;

    /* CLICAR NO NOME = ABRIR */

    div.querySelector(".playlist-name")
      .addEventListener("click", () => {

        openFullscreen(item.url);

      });

    /* REMOVER */

    div.querySelector(".remove-btn")
      .addEventListener("click", () => {

        removeFromPlaylist(item.name);

      });

    playlist.appendChild(div);

  });

}

/* REMOVER */

function removeFromPlaylist(name){

  selectedSongs = selectedSongs.filter(item =>
    item.name !== name
  );

  renderPlaylist();

}

/* FULLSCREEN */

function openFullscreen(url){

  window.open(url, "_blank");

}

/* VOLTAR */

backBtn.addEventListener("click", () => {

  viewer.classList.add("hidden");

});

/* INICIAR */

renderPlaylist();
