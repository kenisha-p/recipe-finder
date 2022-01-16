import React, { useState, useEffect, useRef, useContext } from "react";
import {
  SearchBarContainer,
  SearchInputContainer,
  CloseIcon,
  SearchInput,
  SearchIconSpan,
  LoadingWrapper,
  SearchContent,
  LineSeperator,
  WarningMessage,
} from "./SearchBar.jsx";
import { Ingredients, IngredientsClicked } from "./Ingredients";
import SearchIcon from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside, useOutsideClick } from "react-click-outside-hook";
import { MoonLoader } from "react-spinners";
import { useDebounce } from "../hooks/debounceHook.js";
import { Scrollbars } from "react-custom-scrollbars";
import axios from "axios";
import { RequiredIngredients } from "./SearchBar.jsx";
import { IngredientsContext } from "./IngredientsContext";

function SearchBar() {
  const APP_KEY = "156680032f9a46938509c9ab77167cf9";
  const [isExpanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [parentRef, isClickedOutisde] = useClickOutside();
  const [options, setOptions] = useState([]);
  const [noIngreds, setNoIngreds] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useContext(IngredientsContext); //useState([])
  const inputRef = useRef();

  const isEmpty = !options || options.length === 0;

  const ingredientsIsEmpty = !ingredients || ingredients.length === 0;

  const changeHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleClick = (newIngredient, image) => {
    if (!ingredients.some((element) => element.name === newIngredient)) {
      setIngredients((ingredients) => [
        ...ingredients,
        { name: newIngredient, image: image },
      ]);
    }
    setOptions((options) =>
      options.filter((ingredient) => {
        return ingredient.name !== newIngredient;
      })
    );
    console.log(ingredients);
  };

  const removeIngredient = (ingredientName, image, index) => {
    setIngredients((ingredients) =>
      ingredients.filter((ingredient) => {
        return ingredient.name !== ingredientName;
      })
    );
    setOptions((options) => [
      ...options,
      { name: ingredientName, image: image },
    ]);
    console.log(ingredients);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearch("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setLoading(false);
    setOptions([]);
    setNoIngreds(false);
    setIngredients([]);
  };

  const containerVariants = {
    expanded: {
      height: "18em",
    },
    collapsed: {
      height: "3.8em",
    },
  };

  const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

  const searchVariants = {
    expanded: {
      height: "15em",
    },
    collapsed: {
      height: "3.8em",
    },
  };

  useEffect(() => {
    if (isClickedOutisde) collapseContainer();
    if (search === "") setOptions([]);
  }, [isClickedOutisde, search]);

  const prepareSearchQuery = () => {
    const url = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${APP_KEY}&query=${search}&number=10&metaInformation=false`;

    return encodeURI(url);
  };

  const searchIngredients = async () => {
    if (!search || search.trim() === "") return;

    setLoading(true);

    const URL = prepareSearchQuery();

    const response = await axios.get(URL).catch((err) => {
      console.log("Error:" + err);
    });

    if (response) {
      console.log("Response:" + JSON.stringify(response.data));
      setOptions(JSON.parse(JSON.stringify(response.data)));
      if (response.data && response.data.length === 0) {
        setNoIngreds(true);
      } else {
        setNoIngreds(false);
      }
    }
    setLoading(false);
  };

  useDebounce(search, 500, searchIngredients);

  return (
    <SearchBarContainer
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <SearchInputContainer>
        <SearchIconSpan>
          <SearchIcon />
        </SearchIconSpan>
        {!ingredientsIsEmpty && (
          <RequiredIngredients>
            {ingredients.map((element, index) => {
              return (
                <IngredientsClicked
                  key={index}
                  thumbnailSrc={
                    "https://spoonacular.com/cdn/ingredients_100x100/" +
                    element.image
                  }
                  name={element.name}
                  onClick={() => {
                    removeIngredient(element.name, element.image, index);
                  }}
                />
              );
            })}
          </RequiredIngredients>
        )}
        <SearchInput
          placeholder="Enter an ingredient"
          onFocus={expandContainer}
          ref={inputRef}
          value={search}
          onChange={changeHandler}
        />
        <AnimatePresence>
          {isExpanded && (
            <CloseIcon
              key="close-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={collapseContainer}
            >
              <Close />
            </CloseIcon>
          )}
        </AnimatePresence>
      </SearchInputContainer>
      {isExpanded && <LineSeperator />}
      {isExpanded && (
        <Scrollbars autoHide>
          <SearchContent>
            {isLoading && (
              <LoadingWrapper>
                <MoonLoader loading color="#0ea19e" size={30} />
              </LoadingWrapper>
            )}
            {!isLoading && noIngreds && (
              <LoadingWrapper>
                <WarningMessage>No Ingredients Found</WarningMessage>
              </LoadingWrapper>
            )}
            {!isLoading && !isEmpty && (
              <div style={{ overflow: "auto" }}>
                {options.map((option, index) => (
                  <Ingredients
                    key={index}
                    thumbnailSrc={
                      "https://spoonacular.com/cdn/ingredients_100x100/" +
                      option.image
                    }
                    name={option.name}
                    onClick={() => {
                      handleClick(option.name, option.image, index);
                    }}
                  />
                ))}
              </div>
            )}
          </SearchContent>
        </Scrollbars>
      )}
    </SearchBarContainer>
  );
}

export default SearchBar;
