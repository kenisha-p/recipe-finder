import styled from "styled-components";

export const IngredientsContainer = styled.button`
  background-color: white;
  position: relative;
  margin: 5px 5px 5px 5px;
  border: 2px solid #dbe9ff;
  width: fit-content;
  box-sizing: border-box;
  height: 2em;
  float: left;
  display: flex;
  border-radius: 16px;
  padding: 6px 8px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #dbe9ff;
    color: white;
  }
`;

export const ReqIngredientsContainer = styled.button`
  background-color: white;
  position: relative;
  margin: 5px 5px 5px 10px;
  border: 2px solid #dbe9ff;
  width: fit-content;
  box-sizing: border-box;
  height: 2em;
  float: left;
  display: flex;
  border-radius: 16px;
  padding: 6px 8px;
  align-items: center;
  cursor: default;

  &:hover {
    background-color: #dbe9ff;
    color: white;
  }
`;

export const Image = styled.div`
  width: auto;
  height: 100%;
  position: relative;
  display: flex;

  img {
    width: auto;
    height: 90%;
  }
`;

export const Name = styled.h3`
  font-size: 16px;
  color: #000;
  margin-left: 10px;
  margin-bottom: 15px;
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;
