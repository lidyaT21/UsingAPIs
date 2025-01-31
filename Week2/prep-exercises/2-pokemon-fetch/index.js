'use strict';
/*------------------------------------------------------------------------------
 * In this exercise you will practice fetching data from a web API, using
 * `fetch`, promises, async/await and try/catch.
 *
 * Your solution should both work for the "happy" path (using VALID_URL) as
 * well handle the error in the "unhappy" path (when selecting INVALID_URL).
 *
 * You will need to decide which functions need to be made `async` and where
 * `try/catch` blocks should be added.
 *
 * The HTML file already contains the necessary HTML elements.
 *----------------------------------------------------------------------------*/

const VALID_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=5';
const INVALID_URL = 'https://pokeapi.co/api/v2/pokemons/?limit=5';

async function fetchJSON(url) {
    try {
    const response = await fetch(url);
    
    if (!response.ok) {
    
      throw new Error(`HTTP ERROR ${response.status}`);
    }
    
    return await response.json(); 
  } catch (error) {
    throw new Error(error); 
  }
}

function renderResults(pokemons) {
  const errorElement = document.querySelector('#error');
  errorElement.innerText = '';

  const pokemonsElement = document.querySelector('#json');
  pokemonsElement.innerText = JSON.stringify(pokemons.results, null, 2);
}

function renderError(err) {
 
  const pokemonsElement = document.querySelector('#json');
  pokemonsElement.innerText = '';

 
  const errorElement = document.querySelector('#error');
  errorElement.innerText = `Error: ${err.message}`;
}

 function main() {
  const button = document.querySelector('#button');
  button.addEventListener('click', async() => {
   
    const option = document.querySelector('#option');
    const url = option.checked ? INVALID_URL : VALID_URL;
    
    
   try {
     
      const pokemon = await fetchJSON(url);
      
     
      renderResults(pokemon);
    } catch (error) {
      
      renderError(error);
    }
  });
}


window.addEventListener('load', main);