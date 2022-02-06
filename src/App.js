import { Component } from "react";
// import { useState, useEffect } from "react";
import "./App.css";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

function PokemonRow({ pokemon, onSelect }) {
  return (
    <tr>
      <td>{pokemon.name.english}</td>
      <td>{pokemon.type.join(", ")}</td>
      <td>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSelect(pokemon)}
        >
          Select
        </Button>
      </td>
    </tr>
  );
}

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
};

function PokemonInfo({ name, base }) {
  return (
    <div>
      <h1>{name.english}</h1>
      <table>
        <thead>
          <tr>
            <th>Base</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(base).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{base[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
};

const Title = styled.h1`
  padding: 1rem 0;
  margin-bottom: 2rem;
  font-weight: 800;
  font-size: 3rem;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 60% calc(40% - 1rem);
  column-gap: 1rem;
`;

const Container = styled.div`
  margin: auto;
  max-width: 50em;
  padding-top: 1rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.25rem 1rem;
  margin-bottom: 2rem;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      pokemon: [],
      selectedItem: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/intro-to-react-v2/pokemon.json")
      .then((res) => res.json())
      .then((pokemon) => this.setState({ ...this.state, pokemon }));
  }

  render() {
    return (
      <Container>
        <Title>Pokemon Search</Title>
        <TwoColumnLayout>
          <div>
            <Input
              value={this.state.filter}
              onChange={(e) =>
                this.setState({ ...this.state, filter: e.target.value })
              }
              placeholder="Search Pokemon"
            />
            <table width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {this.state.pokemon
                  .filter((pokemon) =>
                    pokemon.name.english
                      .toLowerCase()
                      .includes(this.state.filter.toLowerCase())
                  )
                  .slice(0, 25)
                  .map((pokemon) => (
                    <PokemonRow
                      key={pokemon.id}
                      pokemon={pokemon}
                      onSelect={(pokemon) =>
                        this.setState({ ...this.state, selectedItem: pokemon })
                      }
                    />
                  ))}
              </tbody>
            </table>
          </div>
          {this.state.selectedItem && (
            <PokemonInfo {...this.state.selectedItem} />
          )}
        </TwoColumnLayout>
      </Container>
    );
  }
}

// function App() {
//   const [filter, setFilter] = useState("");
//   const [pokemon, setPokemon] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);

//   useEffect(() => {
// fetch("http://localhost:3000/intro-to-react-v2/pokemon.json")
//   .then((res) => res.json())
//   .then((data) => setPokemon(data));
//   }, []);

//   return (
//     <Container>
//       <Title>Pokemon Search</Title>
//       <TwoColumnLayout>
//         <div>
//           <Input
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             placeholder="Search Pokemon"
//           />
//           <table width="100%">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Type</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pokemon
//                 .filter((pokemon) =>
//                   pokemon.name.english
//                     .toLowerCase()
//                     .includes(filter.toLowerCase())
//                 )
//                 .slice(0, 25)
//                 .map((pokemon) => (
//                   <PokemonRow
//                     key={pokemon.id}
//                     pokemon={pokemon}
//                     onSelect={(pokemon) => setSelectedItem(pokemon)}
//                   />
//                 ))}
//             </tbody>
//           </table>
//         </div>
//         {selectedItem && <PokemonInfo {...selectedItem} />}
//       </TwoColumnLayout>
//     </Container>
//   );
// }

export default App;
