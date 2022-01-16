import React from "react";
import styled from "styled-components";
import {
  Name,
  Image,
  IngredientsContainer,
  ReqIngredientsContainer,
} from "./Ingredients.jsx";
import Close from "@mui/icons-material/Close";
import { motion } from "framer-motion";

export const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 3px;
  margin-left: 5px;
  vertical-align: middle;
  cursor: pointer;
  &:hover {
    color: #dfdfdf;
  }
`;

function Ingredients(props) {
  const { thumbnailSrc, name, onClick } = props;

  return (
    <IngredientsContainer onClick={onClick}>
      <Image>
        <img src={thumbnailSrc} />
      </Image>
      <Name>{name}</Name>
    </IngredientsContainer>
  );
}

function IngredientsClicked(props) {
  const { thumbnailSrc, name, onClick } = props;

  return (
    <ReqIngredientsContainer>
      <Image>
        <img src={thumbnailSrc} />
      </Image>
      <Name>{name}</Name>
      <CloseIcon
        key="close-icon"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Close onClick={onClick} />
      </CloseIcon>
    </ReqIngredientsContainer>
  );
}

export { Ingredients, IngredientsClicked };
