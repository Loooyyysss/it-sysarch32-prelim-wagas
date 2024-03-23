import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';


function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`);
      const data = await response.json();
      setPokemonList(data.data);
      setTotalPages(data.totalPages);
      setLoading(false);
    }
    fetchData();
  }, [currentPage]);

  const handlePagination = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="pokedex-container">
      <div className="language-buttons">
        <button onClick={() => handleLanguageChange('English')}>English</button>
        <button onClick={() => handleLanguageChange('Japanese')}>Japanese</button>
        <button onClick={() => handleLanguageChange('Chinese')}>Chinese</button>
        <button onClick={() => handleLanguageChange('French')}>French</button>
      </div>
      <p className="current-page"> {currentPage} out of {totalPages}</p>
      <div className="pagination">
        <button onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}>Back</button>
          {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page}
          onClick={() => handlePagination(page + 1)}
          className={currentPage === page + 1 ? "current-page-button" : ""}
          >
            {page + 1}
        </button>
  ))}
  <button onClick={() => handlePagination(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
</div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemon-list">
          {pokemonList.map(pokemon => (
            <Pokemon key={pokemon.id} pokemon={pokemon} language={language} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Pokedex;
