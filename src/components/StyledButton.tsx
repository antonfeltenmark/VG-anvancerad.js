import styled  from "styled-components";

interface IStyledButton{
    color: string;
    background : string;
}
export const StyledButton = styled.button.attrs({type : "button"})`
margin: 1.5rem;
border-radius: 5px;

color : ${(props : IStyledButton) => props.color};
background-color: ${(props : IStyledButton) => props.background};
`
    



