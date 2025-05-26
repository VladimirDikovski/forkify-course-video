import icons from "url:../../img/icons.svg";

class SearchViews {
  _parentElemnt = document.querySelector(".search");

  get_Queary() {
    return (this._parentElemnt =
      document.querySelector(".search__field").value);
  }

  renderHandler(handler) {
    this._parentElemnt.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchViews();
