import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";



interface IStyledHeader {
    background: string;
    color : string;
    
  }

interface IStyledLi{
    color : string;
}
  


const StyledLayoutDiv = styled.div`
  text-align: center;
  justify-content: center;
  

`;

const StyledHeader = styled.header`
display: flex;
align-items: center;
justify-content: space-between;
padding-left: 45%;
padding-right: 1rem;
background-color: ${(props: IStyledHeader) => props.background};
color : ${(props : IStyledHeader) => props.color};
`

const StyledUl = styled.ul`

`;
const StyledLi = styled.li`

color: ${(props: IStyledLi) => props.color};
padding:0.5rem;
`;
    

    


export const Layout = () => {
  return (
    <StyledLayoutDiv >
      <StyledHeader background="lightyellow" color="orange">
         <h2>Animal shelter</h2> 
        <nav>
          <StyledUl >
            <StyledLi color="lightyellow">
              <Link to="/" style={{textDecoration :"none"}}>Home</Link>
            </StyledLi>
            <StyledLi color="lightyellow">
              <Link to="/animals" style={{textDecoration :"none"}}>Animals</Link>
            </StyledLi>
          </StyledUl>
        </nav>
      </StyledHeader>
      <section >
        <main>
          <Outlet />
        </main>
      </section>
      
    </StyledLayoutDiv>
  );
};
