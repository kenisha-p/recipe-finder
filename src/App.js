import "./App.css";
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { IngredientsProvider } from "./components/IngredientsContext";
import Recipes from "./components/Recipes";

function App(props) {
  const [ingredients, setIngredients] = useState([]);

  return (
    <div className="App">
      <IngredientsProvider>
        <SearchBar />
        <Recipes />
      </IngredientsProvider>
    </div>
  );
}

export default App;
