import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

const ButtonWrapper = styled.button`
    width: 100px;
    height: 50px;
    background: ${palette.sgsOrange};
    color: white;
    outline: none;
    border: none;
    border-radius: 3px;
    font-weight: bold;
    margin: 1rem;
`;

const Button = ({ onClick, text }) => {
    return <ButtonWrapper onClick={() => onClick()}>{text}</ButtonWrapper>;
};

export default Button;
