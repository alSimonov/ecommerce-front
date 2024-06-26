import styled, { css } from "styled-components";
import {primary} from "@/lib/colors";



export const ButtonStyle = css`
    border: 0;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    font-weight: bold;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;


    &:hover {
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      }

    svg{
        height: 16px;
        margin-right: 5px; 
    }
    ${props => props.$block && css`
        display: block;
        width: 100%;
    `};
    ${props => props.$white && !props.$outline && css`
        background-color: #fff;
        color: #000;
    `};
    ${props => props.$white && props.$outline && css`
        background-color: transparent;
        color: #fff;
        border: 1px solid #fff;
    `};
    ${props => props.$black && !props.$outline && css`
        background-color: #000;
        color: #fff;
    `};
    ${props => props.$black && props.$outline && css`
        background-color: transparent;
        color: #000;
        border: 1px solid #000;
    `};
    ${props => props.$primary && !props.$outline && css`
        background-color: ${primary};
        border: 1px solid ${primary};
        color: #fff;

    `};
    ${props => props.$primary && props.$light && !props.$outline  && css`
        background-color: #fff;
        border: 1px solid ${primary};
        color: ${primary};

    `};
    ${props => props.$primary && props.$outline && css`
        background-color: transparent;
        border: 1px solid ${primary};
        color: ${primary};

    `};
    ${props => props.size === 'l' && css`
        font-size: 1.2rem;
        padding: 10px 20px;
        svg{
            height: 20px;
        }
    `};
    ${props => props.size === 's' && css`
        font-size: 1rem;
        padding: 0px 10px;
        svg{
            height: 10px;
        }
    `}
    
    ${props => props.size === 'icon' && props.$white && css`
        background-color: transparent;
        color: #fff;

        padding: 0px 5px;
        svg{
            height: 20px;
        }
    `}

    ${props => props.size === 'icon' && props.$red && css`
    background-color: transparent;
    color: #f00;

    padding: 0px 5px;
    svg{
        height: 20px;
    }
`}


`;

const StyledButton = styled.button`
   ${ButtonStyle}
`;

export default function Button({children,...rest}){
    return (
        <StyledButton {...rest}>
            {children}
        </StyledButton>
    );
}

