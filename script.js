const searchInput =
  document.getElementById("searchInput");

const searchBtn =
  document.getElementById("searchBtn");

const results =
  document.getElementById("results");

const playlist =
  document.getElementById("playlist");

/* IMAGENS */

let images = [];

/* LISTA */

let selectedSongs = [];

/* CARREGA JSON */

fetch("images.json")
  .then(response => response.json())
  .then(data => {

    images = data;

  });

/* BUSCA */

searchBtn.addEventListener(
  "click",
  searchSongs
);

searchInput.addEventListener(
  "keypress",
  (e) => {

    if(e.key === "Enter"){

      searchSongs();

    }

  }
);

function searchSongs(){

  const value =
    searchInput.value
      .toLowerCase()
      .trim();

  results.innerHTML = "";

  if(value === ""){
    return;
  }

  const filtered = images.filter(item =>

    item.name
      .toLowerCase()
      .includes(value)

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

    const div =
      document.createElement("div");

    div.className = "result-item";

    div.innerHTML = `
      <div class="result-name">
        ${item.name}
      </div>
    `;

    /* ADICIONAR À LISTA */

    div.addEventListener(
      "click",
      () => {

        addToPlaylist(item);

      }
    );

    results.appendChild(div);

  });

}

/* ADICIONAR */

function addToPlaylist(item){

  const exists =
    selectedSongs.find(song =>

      song.name === item.name

    );

  if(exists){
    return;
  }

  selectedSongs.push(item);

  renderPlaylist();

}

/* RENDERIZA */

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

    const div =
      document.createElement("div");

    div.className = "playlist-item";

    div.innerHTML = `
      <div class="playlist-name">
        ${index + 1}. ${item.name}
      </div>
    `;

    const nameElement =
      div.querySelector(".playlist-name");

    /* ABRIR IMAGEM */

    nameElement.addEventListener(
      "click",
      () => {

        openFullscreen(item.id);

      }
    );

    /* SEGURAR PARA REMOVER */

    let pressTimer;

    nameElement.addEventListener(
      "touchstart",
      () => {

        pressTimer = setTimeout(() => {

          const confirmDelete =
            confirm(
              `Deseja remover "${item.name}" da lista?`
            );

          if(confirmDelete){

            removeFromPlaylist(item.name);

          }

        }, 700);

      }
    );

    nameElement.addEventListener(
      "touchend",
      () => {

        clearTimeout(pressTimer);

      }
    );

    nameElement.addEventListener(
      "mousedown",
      () => {

        pressTimer = setTimeout(() => {

          const confirmDelete =
            confirm(
              `Deseja remover "${item.name}" da lista?`
            );

          if(confirmDelete){

            removeFromPlaylist(item.name);

          }

        }, 700);

      }
    );

    nameElement.addEventListener(
      "mouseup",
      () => {

        clearTimeout(pressTimer);

      }
    );

    nameElement.addEventListener(
      "mouseleave",
      () => {

        clearTimeout(pressTimer);

      }
    );

    playlist.appendChild(div);

  });

}

/* REMOVER */

function removeFromPlaylist(name){

  selectedSongs =
    selectedSongs.filter(item =>

      item.name !== name

    );

  renderPlaylist();

}

/* ABRIR IMAGEM */

function openFullscreen(id){

  const imageUrl =
    `https://lh3.googleusercontent.com/d/${id}`;

  window.open(
    imageUrl,
    "_blank"
  );

}

/* INICIAR */

renderPlaylist();
