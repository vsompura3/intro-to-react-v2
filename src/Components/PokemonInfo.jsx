import { useContext } from "react";
import PokemonContext from "../PokemonContext";
import PokemonType from "../PokemonType";

function PokemonInfo() {
  const {
    state: { selectedPokemon },
  } = useContext(PokemonContext);
  return selectedPokemon ? (
    <div>
      <h1>{selectedPokemon.name.english}</h1>
      <table>
        <thead>
          <tr>
            <th>Base</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(selectedPokemon.base).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{selectedPokemon.base[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
}

PokemonInfo.propTypes = PokemonType;

export default PokemonInfo;
