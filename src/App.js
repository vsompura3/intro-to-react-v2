import { useEffect, useReducer } from "react";
import "./App.css";
import { CssBaseline } from "@mui/material";
import styled from "@emotion/styled";
import PokemonTable from "./Components/PokemonTable";
import PokemonInfo from "./Components/PokemonInfo";
import PokemonFilter from "./Components/PokemonFilter";
import PokemonContext from "./PokemonContext";

const Title = styled.h1`
  padding: 0.25rem 0;
  margin-bottom: 0.5rem;
  font-weight: 800;
  font-size: 2.75rem;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 60% calc(40% - 1rem);
  column-gap: 1rem;
`;

const PageContainer = styled.div`
  margin: 0 auto;
  max-width: 50em;
`;

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    case "SET_POKEMON":
      return {
        ...state,
        pokemon: action.payload,
      };
    case "SET_SELECTEDPOKEMON":
      return {
        ...state,
        selectedPokemon: action.payload,
      };
    default:
      throw new Error("No action");
  }
};

function App() {
  const [state, dispatch] = useReducer(pokemonReducer, {
    pokemon: [],
    filter: "",
    selectedPokemon: null,
  });

  useEffect(() => {
    fetch("http://localhost:3000/pokemon.json")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "SET_POKEMON", payload: data }));
  }, []);

  if (!state.pokemon) {
    return <div>Loading Data</div>;
  }

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      <PageContainer>
        <CssBaseline>
          <Title>Pokemon Search</Title>
          <TwoColumnLayout>
            <div>
              <PokemonFilter />
              <PokemonTable />
            </div>
            <PokemonInfo />
          </TwoColumnLayout>
        </CssBaseline>
      </PageContainer>
    </PokemonContext.Provider>
  );
}

export default App;
