import { API_URL } from "./config.js";
import { ITEM_PER_PAGES } from "./config.js";
import { getJson } from "./helper.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultPerPage: ITEM_PER_PAGES,
    page: 1,
  },
  bookmakrs: [],
};

export const loadRecipe = async function (id) {
  try {
    //get date from API
    const data = await getJson(`${API_URL}${id}`);

    let { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      cookingTime: recipe.cooking_time,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
    };
    if (state.bookmakrs.some((b) => b.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmakrs = false;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchRecipe = async function (query) {
  try {
    const data = await getJson(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = page.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage; //0
  const end = page * state.search.resultPerPage; //9

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  //Add bookmark
  state.bookmakrs.push(recipe);

  //mark curent recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const remoeBookmark = function (id) {
  const index = state.bookmakrs.findIndex((el) => el.id === id);
  state.bookmakrs.splice(index, 1);

  //mark curent recipe as not bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

export const saveBookmarksToLocalStorage = function () {
  localStorage.setItem("bookmark", JSON.stringify(state.bookmakrs));
};

export const importDataFromLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem("bookmark"));
  state.bookmakrs = data;
};
