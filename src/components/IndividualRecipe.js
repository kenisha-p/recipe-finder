import React from "react";
import styled from "styled-components";
import "./IndividualRecipe.css";
import { motion } from "framer-motion";

function Recipe(props) {
  const { thumbnailSrc, name, onClick, id } = props;

  return (
    <div className="recipe-container" onClick={onClick} key={id}>
      <div className="recipe-image">
        <img src={thumbnailSrc} />
      </div>
      <div className="recipe-name">{name}</div>
    </div>
  );
}

export { Recipe };
