import React, { useContext, useState } from "react";
import IngredientsContext from "./IngredientsContext";
import axios from "axios";
import "./Recipes.css";
import { useDebounce } from "../hooks/debounceHook";

function Recipes() {
  const APP_KEY = "156680032f9a46938509c9ab77167cf9";
  const [recipes, setRecipes] = useState([]);
  const [noRecipes, setNoRecipes] = useState(false);
  const [ingredients, setIngredients] = useContext(IngredientsContext);
  const [loading, setLoading] = useState(false);

  const prepareSearchQuery = () => {
    const ingredientsString = ingredients.map((item) => item.name);
    const url = `https://api.spoonacular.com//recipes/findByIngredients?apiKey=${APP_KEY}&ingredients=${ingredientsString}&number=100&sort=popularity`;
    console.log(ingredientsString);
    return encodeURI(url);
  };

  const getRecipes = async () => {
    if (!ingredients || ingredients.length === 0) return;

    setLoading(true);

    const URL = prepareSearchQuery(ingredients);

    const response = await axios.get(URL).catch((err) => {
      console.log("Error:" + err);
    });

    if (response) {
      setRecipes(JSON.parse(JSON.stringify(response.data)));
      if (response.data && response.data.length === 0) {
        setNoRecipes(true);
      } else {
        setNoRecipes(false);
      }
      console.log(recipes);
    }
    setLoading(false);
  };

  useDebounce(ingredients, 500, getRecipes);

  return (
    <div className="recipes-container">
      <div className="recipe-content"></div>
    </div>
  );
}

export default Recipes;
