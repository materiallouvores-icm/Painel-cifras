const gallery = document.getElementById("gallery");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const viewer = document.getElementById("viewer");
const fullscreenImage = document.getElementById("fullscreenImage");
const closeBtn = document.getElementById("closeBtn");

let images = [];

/* CARREGA JSON */

fetch("images.json")
  .then(response => response.json())
  .then(data => {
    images = data;
  });

/* RENDERIZA */

function renderImages(list){

  gallery.innerHTML = "";

  if(list.length === 0){

    gallery.innerHTML = `
      <p style="
        text-align:center;
        color:#999;
        padding:40px 20px;
      ">
        Nenhuma imagem encontrada
      </p>
    `;

    return;
  }

  list.forEach(item => {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <img src="${item.url}" alt="${item.name}">
      <p>${item.name}</p>
    `;

    /* ABRIR FULLSCREEN */

    card.addEventListener("click", () => {
      openFullscreen(item.url);
    });

    gallery.appendChild(card);

  });

}

/* BOTÃO BUSCAR */

searchBtn.addEventListener("click", () => {

  const value = searchInput.value
    .toLowerCase()
    .trim();

  /* SE CAMPO VAZIO NÃO MOSTRA NADA */

  if(value === ""){
    gallery.innerHTML = "";
    return;
  }

  const filtered = images.filter(item =>
    item.name.toLowerCase().includes(value)
  );

  renderImages(filtered);

});

/* ENTER NO TECLADO */

searchInput.addEventListener("keypress", (e) => {

  if(e.key === "Enter"){
    searchBtn.click();
  }

});

/* FULLSCREEN */

function openFullscreen(url){

  fullscreenImage.src = url;

  viewer.classList.remove("hidden");

}

/* FECHAR */

closeBtn.addEventListener("click", () => {

  viewer.classList.add("hidden");

});

/* FECHAR CLICANDO FORA */

viewer.addEventListener("click", (e) => {

  if(e.target === viewer){

    viewer.classList.add("hidden");

  }

});
