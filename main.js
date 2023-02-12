const getAllPokemonData = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
  
      } catch (error) {
        console.error(error);
      }
    }

const clearPokemon = () => {
    const pokemonElement = document.querySelectorAll('.pokemon-escuro')
    pokemonElement.forEach(div => div.parentNode.removeChild(div))
}

const getPokemonInfo = async (pokemonName) => {
    const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(res => res.json())
        .catch(error => console.error(error));
  
    let [tipo1, tipo2] = pokemonData.types.map(type => type.type.name);

    if (tipo2 == undefined) {
        tipo2 = ''}

    let [habilidade1, habilidade2] = pokemonData.abilities.map(ability => ability.ability.name);
  
    const pokemonContainer = document.getElementById("pokemon-container");
    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add("pokemon-escuro");

    pokemonElement.innerHTML = `
        <div class="pokemon-pop" style="background-color:${whatsColor(tipo1)}">
            <p onClick="clearPokemon()">x</p>
            <img class="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png"/>   
            <p>${pokemonData.id}</p>
            <p>${pokemonName}</p>
            <p>${tipo1}</p>
            <p>${tipo2}</p>
            <p>${habilidade1}</p>
            <p>${habilidade2}</p>
        </div>
    `
    pokemonContainer.appendChild(pokemonElement);

  }

const whatsColor = (color) => {
    let cor = 'lightblue';  

        if(color == 'bug') {
            cor = '#9DC130';
        } else if(color == 'dark') {
            cor = '#5F606D';
        } else if (color == 'dragon') {
            cor = '#0773C7';
        } else if (color == 'electric') {
            cor = '#F2D544';
        } else if (color == 'fairy') {
            cor = '#EF97E6'
        } else if (color == 'fighting') {
            cor = '#D94256'
        } else if (color == 'fire') {
            cor = '#F8A54F'
        } else if (color == 'flying') {
            cor = '#9BB4E8'
        } else if (color == 'ghost') {
            cor = '#6970C5'
        } else if (color == 'grass') {
            cor = '#5DBE62'
        } else if (color == 'ground') {
            cor = '#D78555'
        } else if (color == 'ice') {
            cor = '#7ED4C9'
        } else if (color == 'normal') {
            cor = '#9A9DA1'
        } else if (color == 'poison') {
            cor = '#B563CE'
        } else if (color == 'psychic') {
            cor = '#F87C7A'
        } else if (color == 'rock') {
            cor = '#CEC18C'
        } else if (color == 'stell') {
            cor = '#5596A4'
        } else if (color == 'water') {
            cor = '#559EDF'
        }
        return cor
}  

const displayAllPokemonData = async () => {
    const pokemonList = await getAllPokemonData();
    const pokemonContainer = document.getElementById("pokemon-container");
    
    pokemonList.forEach(async pokemon => {
        const pokemonData = await fetch(pokemon.url).then(res => res.json());
      
        const pokemonElement = document.createElement("div");
        pokemonElement.classList.add("pokemon-flex");
        pokemonElement.classList.add("col-2")

        let [tipo1, tipo2] = pokemonData.types.map(type => type.type.name);

        let color = tipo1;

        tipo1= `<span class="tp">${tipo1}</span>`;

        if (tipo2 == undefined) {
            tipo2 = ''} else {
                tipo2= `<span class="tp">${tipo2}</span>`;
            }

        pokemonElement.innerHTML = `
            <div class="pokemon-card" style="background-color:${whatsColor(color)}" onClick="getPokemonInfo('${pokemon.name}');
            ">
                <p class="pokemon-number">${pokemonData.id}</p>
                <div class="pokemon-infos">
                    <a class="${pokemon.name} pokemon-name">${pokemon.name}</a>
                    <p class="pokemon-types">${tipo1}</p>
                    <p class="pokemon-types">${tipo2}</p>
                </div>           
                <img class="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png"/>                
            </div>   
            `
        pokemonContainer.appendChild(pokemonElement);
    });
}
    

displayAllPokemonData();
