import React from 'react';

function Pokemon({ pokemon, language }) {
  let name = pokemon.name.english; // Default name in English

  // Set name based on selected language
  if (language === 'Japanese') {
    name = pokemon.name.japanese;
  } else if (language === 'Chinese') {
    name = pokemon.name.chinese;
  } else if (language === 'French') {
    name = pokemon.name.french;
  }

  return (
    <div className="pokemon">
      <img src={pokemon.image} alt={name} />
      <p>[{pokemon.id}] {name}</p>
    </div>
  );
}

export default Pokemon;