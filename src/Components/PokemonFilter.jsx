import { useContext } from "react";
import PokemonContext from "../PokemonContext";
import styled from "@emotion/styled";

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.25rem 1rem;
  margin-bottom: 1rem;
`;

function PokemonFilter() {
  const {
    state: { filter },
    dispatch,
  } = useContext(PokemonContext);
  return (
    <Input
      value={filter}
      onChange={(e) =>
        dispatch({ type: "SET_FILTER", payload: e.target.value })
      }
      placeholder="Search Pokemon"
    />
  );
}

export default PokemonFilter;
