import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { IAnimal } from "../models/IAnimal";

const StyledDiv = styled.div`
  padding-top: 2rem;
  text-align: center;
  justify-content: center;
  margin-left: 2rem;
  margin-right: 2rem;
  img {
    width: 80%;
  }
`;

interface IStyledH3 {
  color: string;
}
interface IStyledPTag {
  color: string;
}

const StyledPTag = styled.p`
  color: ${(props: IStyledPTag) => props.color};
`;
const StyledH3 = styled.h3`
  color: ${(props: IStyledH3) => props.color};
`;

export function Animals() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  useEffect(() => {
    axios
      .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
      .then((response) => {
        setAnimals(response.data);
      });
  });

  useEffect(() => {
    if (
      localStorage.getItem("animalStorage") === null &&
      animals.length !== 0
    ) {
      localStorage.setItem("animalStorage", JSON.stringify(animals));
    }
  }, [animals]);

  return (
    <StyledDiv>
      {animals.map((animal) => {
        return (
          <Link key={animal.id} to={"/animals/" + animal.id}>
            <img src={animal.imageUrl} alt={animal.latinName} />
            <StyledH3 color="brown">{animal.name}</StyledH3>
            <StyledPTag color="green">{animal.yearOfBirth}</StyledPTag>
            <StyledH3 color="orange">{animal.shortDescription}</StyledH3>
          </Link>
        );
      })}
    </StyledDiv>
  );
}
