const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");

const viewer = document.getElementById("viewer");
const fullscreenImage = document.getElementById("fullscreenImage");
const closeBtn = document.getElementById("closeBtn");

let images = [];

fetch("images.json")
  .then(response => response.json())
  .then(data => {
    images = data;
    renderImages(images);
  });

function renderImages(list) {
  gallery.innerHTML = "";

  list.forEach(item => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.url}" alt="${item.name}">
      <p>${item.name}</p>
    `;

    card.addEventListener("click", () => {
      openFullscreen(item.url);
    });

    gallery.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {

  const value = searchInput.value.toLowerCase();

  const filtered = images.filter(item =>
    item.name.toLowerCase().includes(value)
  );

  renderImages(filtered);
});

function openFullscreen(url) {
  fullscreenImage.src = url;
  viewer.classList.remove("hidden");
}

closeBtn.addEventListener("click", () => {
  viewer.classList.add("hidden");
});

viewer.addEventListener("click", (e) => {
  if (e.target === viewer) {
    viewer.classList.add("hidden");
  }
});