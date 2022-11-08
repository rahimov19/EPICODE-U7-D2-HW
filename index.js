const options = {
  method: "GET",
  headers: {
    Authorization: "563492ad6f9170000100000118c7235b0fe94249b22da6b2592d6dce",
  },
};
fetch("https://api.pexels.com/v1/search?query=snow", options)
  .then((response) => response.json())
  .then((data) => {
    primaryButton.addEventListener("click", function () {
      setTimeout(function () {
        alert("Pictures are loaded. Enjoy!");
      }, 5000);

      getPhotos(data);
    });
    console.log(data.photos);
  })
  .catch((err) => console.error(err));

fetch("https://api.pexels.com/v1/search?query=ocean", options)
  .then((response) => response.json())
  .then((data) => {
    secondaryButton.addEventListener("click", function () {
      setTimeout(function () {
        alert("Pictures are loaded. Enjoy!");
      }, 5000);

      getPhotos(data);
    });
    // console.log(data.photos);
  })
  .catch((err) => console.error(err));

let search = document.querySelector("#search");
let searchPhotos = function () {
  fetch(`https://api.pexels.com/v1/search?query=${search.value}`, options)
    .then((response) => response.json())
    .then((data) => {
      getPhotos(data);
      console.log(data.photos);
    })
    .catch((err) => console.error(err));
  search.value = "";
};

fetch("https://api.pexels.com/v1/search?query=forest", options)
  .then((response) => response.json())
  .then((data) => {
    setCarousel(data);

    console.log(data.photos);
  })
  .catch((err) => console.error(err));

let carouselDiv = document.querySelector("#carousel");
setCarousel = function (data) {
  createCarDiv = document.createElement("div");
  createCarDiv.className = "carousel-item active";
  createImgCarousel = document.createElement("img");
  createImgCarousel.src = data.photos[0].src.landscape;
  createImgCarousel.className = "d-block w-100";
  carouselDiv.appendChild(createCarDiv);
  createCarDiv.appendChild(createImgCarousel);

  for (i = 1; i < data.photos.length; i++) {
    createCarDiv = document.createElement("div");
    createCarDiv.className = "carousel-item";
    createImgCarousel = document.createElement("img");
    createImgCarousel.src = data.photos[i].src.landscape;
    createImgCarousel.className = "d-block w-100";
    carouselDiv.appendChild(createCarDiv);
    createCarDiv.appendChild(createImgCarousel);
  }
};

let primaryButton = document.querySelector("#primary");
let secondaryButton = document.querySelector("#secondary");
let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", function () {
  setTimeout(function () {
    alert("Pictures are loaded. Enjoy!");
  }, 5000);
  searchPhotos();
});

let albumRow = document.querySelector("#albumRow");
let getPhotos = function (data) {
  albumRow.innerHTML = "";
  for (i = 0; i < data.photos.length; i++) {
    let createDiv = document.createElement("div");
    createDiv.className = "col-md-4";
    createDiv.innerHTML = `   <div class="card mb-4 shadow-sm">
<img src="${data.photos[i].src.landscape}" class="card-img-top" alt="...">
<div class="card-body closest">
  <p class="card-text">
    This is a wider card with supporting text below as a natural
    lead-in to additional content. This content is a little bit
    longer.
  </p>
  <div
    class="d-flex justify-content-between align-items-center"
  >
    <div class="btn-group">
      <button
        type="button"
        data-toggle="modal" data-target="#exampleModal"
        class="btn btn-sm btn-outline-secondary view"
      >
        View
      </button>
      <button
        type="button"
        class="btn btn-sm btn-outline-secondary hide" 
      >
        Hide
      </button>
    </div>
    <small class="text-muted">${data.photos[i].id}</small>
  </div>
</div>
</div>`;

    albumRow.appendChild(createDiv);
    let allHideButtons = document.querySelectorAll(".hide");
    for (j = 0; j < allHideButtons.length; j++) {
      allHideButtons[j].addEventListener("click", function handleClick(event) {
        event.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
          event.currentTarget.parentNode.parentNode.parentNode.parentNode
            .parentNode
        );
      });
    }

    let allViewButtons = document.querySelectorAll(".view");
    let modalDiv = document.querySelector("#modal");
    let element = document.querySelector(".closest");
    let closestImg = element.closest("img");
    for (h = 0; h < allHideButtons.length; h++) {
      allViewButtons[h].addEventListener("click", function handleClick(event) {
        modalDiv.src = event(closestImg);
      });
    }
  }
};
