import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import SearchView from "./views/searchVies.js";
import ResultView from "./views/resultView.js";
import PaginationView from "./views/paginationView.js";
import bookmarkView from "./views/bookmarkView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    bookmarkView.render(model.state.bookmakrs);
    recipeView.renderSpinner();

    const id = window.location.hash.slice(1);

    if (!id) return;

    //loalading recipe
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
    //render recipe
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {
    ResultView.renderSpinner();

    const query = SearchView.get_Queary();
    if (!query) return;
    await model.loadSearchRecipe(query);

    ResultView.render(model.getSearchResultsPage(1));
    PaginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlPagination = function (gotoPage) {
  //render new result
  ResultView.render(model.getSearchResultsPage(gotoPage));
  //render new pagination buttons
  PaginationView.render(model.state.search);
};

const contolUpdateServings = function (updateServings) {
  // update the servings
  model.updateServings(updateServings);

  // render new results
  // recipeView.render(model.state.recipe);

  //update new result
  recipeView.updateView(model.state.recipe);
};

const controlAddBokkmarks = function () {
  console.log(model.state.recipe);
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else {
    model.remoeBookmark(model.state.recipe.id);
  }

  recipeView.updateView(model.state.recipe);

  bookmarkView.render(model.state.bookmakrs);

  model.saveBookmarksToLocalStorage();
};

const init = function () {
  model.importDataFromLocalStorage();
  recipeView.handleRecipe(controlRecipe);
  recipeView.addHandlerUpdateServings(contolUpdateServings);
  SearchView.renderHandler(controlSearch);
  PaginationView._addHandlerClick(controlPagination);
  recipeView.addBookmarkHandler(controlAddBokkmarks);
};

init();
