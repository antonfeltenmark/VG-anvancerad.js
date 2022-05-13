import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { IExtendedAnimal } from "../models/IExtendedAnimal";

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

interface IStyledButton {
  color: string;
  background: string;
}
interface IStyledPTag {
  color: string;
}
const StyledButton = styled.button`
  margin: 0.5rem;
  border-radius: 5px;

  color: ${(props: IStyledButton) => props.color};
  background-color: ${(props: IStyledButton) => props.background};
`;
const StyledPTag = styled.p`
  color: ${(props: IStyledPTag) => props.color};
`;

export function Animal() {
  const [extAnimal, setExtAnimal] = useState<IExtendedAnimal>({
    id: 0,
    name: "",
    yearOfBirth: 0,
    isFed: false,
    lastFed: "",
    longDescription: "",
    latinName: "",
    imageUrl: "",
  });
  const [extAnimals, setExtAnimals] = useState<IExtendedAnimal[]>([]);

  let params = useParams();

  useEffect(() => {
    const animalFromLS = JSON.parse(
      localStorage.getItem("animalStorage") || "[]"
    );

    setExtAnimals(animalFromLS);
    animalFromLS.forEach((animal: IExtendedAnimal) => {
      if (params.id === animal.id.toString()) {
        setExtAnimal(animal);
      }
    });
  }, []);

  useEffect(() => {
    if (extAnimals.length !== 0) {
      extAnimals.forEach((animal: IExtendedAnimal, i: number) => {
        if (params.id === animal.id.toString()) {
          if (
            Date.parse(Date()) - Date.parse(animal.lastFed) >
            3000 * 60 * 60
          ) {
            extAnimals[i] = { ...extAnimal, isFed: false };

            setExtAnimals(extAnimals);

            localStorage.setItem("animalStorage", JSON.stringify(extAnimals));
            setExtAnimal({ ...extAnimal, isFed: false });

            setTimeout(() => {
              alert(animal.name + " " + "needs feeding!");
            }, 4000 * 60 * 60);
          }
        }
      });
    }
  }, [extAnimals]);

  function handleClick() {
    setExtAnimal({ ...extAnimal, isFed: true, lastFed: new Date().toString() });

    const animalFromLS = JSON.parse(
      localStorage.getItem("animalStorage") || "[]"
    );

    animalFromLS.forEach((animal: IExtendedAnimal, i: number) => {
      if (params.id === animal.id.toString()) {
        animalFromLS[i] = {
          ...extAnimal,
          isFed: true,
          lastFed: new Date().toString(),
        };
        localStorage.setItem("animalStorage", JSON.stringify(animalFromLS));

        /*   setTimeout(() => {
                   animalFromLS[i] = {...extAnimal, isFed : false};
                   localStorage.setItem("animalStorage", JSON.stringify(animalFromLS));

                },6000);  */

        //animalFromLS[i] = {...extAnimal, isFed : false};
        //localStorage.setItem("animalStorage" ,JSON.stringify(animalFromLS));
      }
    });
  }

  return (
    <StyledDiv className="animal-container">
      <img src={extAnimal?.imageUrl} alt={extAnimal?.latinName} />
      <StyledPTag color="orange">Name: {extAnimal?.name} </StyledPTag>
      <StyledPTag color="pink">Age: {extAnimal?.yearOfBirth}</StyledPTag>
      <StyledButton
        color="red"
        background="lightgrey"
        onClick={handleClick}
        disabled={extAnimal.isFed}
      >
        {" "}
        Feed animal
      </StyledButton>
      <StyledPTag color="grey">Last fed: {extAnimal?.lastFed}</StyledPTag>
      <StyledPTag color="blue" className="long-description">
        {extAnimal?.longDescription}
      </StyledPTag>
    </StyledDiv>
  );
}
