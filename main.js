/*
// função que faz requisição dos dados detalhados de casa pokemon
async function displayPokemonData(pokemonName) {
    const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(res => res.json());
  
    const pokemonContainer = document.getElementById("pokemon-container");
  
    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add("pokemon");
  
    const pokemonNameElement = document.createElement("h2");
    pokemonNameElement.innerText = pokemonData.name;
    pokemonElement.appendChild(pokemonNameElement);
  
    const pokemonNumberElement = document.createElement("p");
    pokemonNumberElement.innerText = `Número: ${pokemonData.id}`;
    pokemonElement.appendChild(pokemonNumberElement);
  
    const pokemonTypesElement = document.createElement("p");
    pokemonTypesElement.innerText = `Tipos: ${pokemonData.types.map(type => type.type.name).join(", ")}`;
    pokemonElement.appendChild(pokemonTypesElement);
  
    const pokemonAbilitiesElement = document.createElement("p");
    pokemonAbilitiesElement.innerText = `Habilidades: ${pokemonData.abilities.map(ability => ability.ability.name).join(", ")}`;
    pokemonElement.appendChild(pokemonAbilitiesElement);
  

    const pokemonAboutElement = document.createElement("p");
    const flavorTextEntries = pokemonData.species && pokemonData.species.flavor_text_entries;
    const flavorTextEntry = flavorTextEntries && flavorTextEntries.find(entry => entry.language.name === "en");
pokemonAboutElement.innerText = flavorTextEntry ? `Sobre: ${flavorTextEntry.flavor_text}` : "Sobre: não disponível";
pokemonElement.appendChild(pokemonAboutElement);



    const pokemonRegionElement = document.createElement("p");
    pokemonRegionElement.innerText = `Região: ${pokemonData.location_area_encounters.split("/")[6]}`;
    pokemonElement.appendChild(pokemonRegionElement);

   
    
  
    const pokemonImageElement = document.createElement("img");
    pokemonImageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
    pokemonElement.appendChild(pokemonImageElement);
  
    pokemonContainer.appendChild(pokemonElement);
  }

*/

// função requisição de todos os pokemons
  async function getAllPokemonData() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error(error);
    }
  }

  // função que exibi todos os pokemons na tela
  async function displayAllPokemonData() {
    const pokemonList = await getAllPokemonData();
    const pokemonContainer = document.getElementById("pokemon-container");
  
    pokemonList.forEach(async pokemon => {
      const pokemonData = await fetch(pokemon.url).then(res => res.json());
  
      const pokemonElement = document.createElement("div");
      pokemonElement.classList.add("pokemon");
      pokemonElement.classList.add("col-3")

      pokemonElement.innerHTML = `
        <p>${pokemonData.id}</p>
        <h2>${pokemon.name}</h2> 
        <p>${pokemonData.types.map(type => type.type.name).join(", ")}</p>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png"/>     
      `
        /*
      pokemonNameElement.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('clicou no '+ pokemon.name)
        displayPokemonData(pokemon.name)
      })
      */

      pokemonContainer.appendChild(pokemonElement);
    });
  }
  
  displayAllPokemonData()