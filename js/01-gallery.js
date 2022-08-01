import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryCardsMarkup(galleryItems);


galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <div class="gallery__item">
        <a class="gallery__link" href="${original}">
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

galleryContainer.addEventListener("click", onModalMarkup);

function onModalMarkup(e) {
  e.preventDefault();

  let instance = basicLightbox.create(
    `<img src="${e.target.dataset.source}">`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onCloseEsc);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onCloseEsc);
      },
    }
  );
  function onCloseEsc(e) {
    if (e.code === "Escape") {
      instance.close();
    } else {
      return;
    }
  }
  instance.show();
  return instance;
}
