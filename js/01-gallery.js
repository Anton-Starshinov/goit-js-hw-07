import { galleryItems } from "./gallery-items.js";

const galleryConteiner = document.querySelector(".gallery");
const galleryMarcup = galleryLayoutTemplate(galleryItems);

galleryConteiner.insertAdjacentHTML("beforeend", galleryMarcup);
galleryConteiner.addEventListener("click", openingImg);

function galleryLayoutTemplate(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
  <div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

function openingImg(e) {
  e.preventDefault();
  const isImgSwatchEl = e.target.classList.contains("gallery__image");

  if (!isImgSwatchEl) {
    return;
  }

  const swatchEl = e.target.dataset.source;

  const instance = basicLightbox.create(`
    <img src="${swatchEl}" width="800" height="600">
`);

  instance.show();

  galleryConteiner.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      instance.close();
    }
  });
}
