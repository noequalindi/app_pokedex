import React from 'react';
import './PokemonCard.css';  // Estilos para la tarjeta de Pokémon

// Componente para mostrar una tarjeta de un Pokémon
function PokemonCard({ pokemon }) {
  const defaultImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png'; // Imagen genérica de Ditto

  return (
    <div className="pokemon-card">
      <img src={pokemon.image || defaultImage} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>Tipo: {pokemon.type}</p>
    </div>
  );
}

export default PokemonCard;
