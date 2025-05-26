import icons from "../../img/icons.svg";
import View from "./view.js";

class bookmarkView extends View {
  _parentElement = document.querySelector(".bookmarks__list");

  _generateMarkup() {
    return this._data
      .map(
        (el) => `
        <li class="preview">
          <a class="preview__link" href="#${el.id}">
            <figure class="preview__fig">
              <img src="${el.image}" alt="${el.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${el.title}</h4>
              <p class="preview__publisher">${el.publisher}</p>
            </div>
          </a>
        </li>`
      )
      .join("");
  }
}
export default new bookmarkView();
