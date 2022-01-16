import React, { createContext, useState } from "react";

export const IngredientsContext = React.createContext([]);

const { Provider } = IngredientsContext;

export const IngredientsProvider = (props) => {
  const [ingredients, setIngredients] = useState([]);

  return (
    <Provider value={[ingredients, setIngredients]}>{props.children}</Provider>
  );
};

export default IngredientsContext;
