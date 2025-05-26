import icons from "..//../img/icons.svg";
export default class View {
  _data;
  _parentElement;
  render(data) {
    this._data = data;
    const html = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const html = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderError() {
    const html = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>No recipes found for your query. Please try again!</p>
          </div>`;

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  updateView(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElement = [...newDom.querySelectorAll("*")];
    const curentElement = [...this._parentElement.querySelectorAll("*")];

    //change text content
    newElement.forEach((newEl, i) => {
      const currenEl = curentElement[i];
      if (
        !newEl.isEqualNode(currenEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        currenEl.textContent = newEl.textContent;
      }
      //update changed ATTRIBUES
      if (!newEl.isEqualNode(currenEl)) {
        [...newEl.attributes].forEach((attr) =>
          currenEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
}
