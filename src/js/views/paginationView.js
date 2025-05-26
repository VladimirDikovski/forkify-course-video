import icons from "url:../../img/icons.svg";
import View from "./view.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    //Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return `
          <button data-goto="${
            this._data.page + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="src/img/${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    //last page
    if (this._data.page === numPages && numPages > 1) {
      return ` <button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>`;
    }
    //Other page
    if (this._data.page < numPages) {
      return `<button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>
          <button data-goto="${
            this._data.page + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="src/img/${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    //page 1 , and there are no other pages
    return "";
  }

  _addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }
}

export default new PaginationView();
