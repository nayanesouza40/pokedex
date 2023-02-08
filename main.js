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

    let cor = 'lightblue';

    
    const displayAllPokemonData = async () => {
    const pokemonList = await getAllPokemonData();
    const pokemonContainer = document.getElementById("pokemon-container");
    
    pokemonList.forEach(async pokemon => {
        const pokemonData = await fetch(pokemon.url).then(res => res.json());
      
        const pokemonElement = document.createElement("div");
        pokemonElement.classList.add("pokemon-flex");
        pokemonElement.classList.add("col-2")

        let [tipo1, tipo2] = pokemonData.types.map(type => type.type.name);
        

        if(tipo1 == 'bug') {
            cor = '#9DC130';
        } else if(tipo1 == 'dark') {
            cor = '#5F606D';
        } else if (tipo1 == 'dragon') {
            cor = '#0773C7';
        } else if (tipo1 == 'electric') {
            cor = '#F2D544';
        } else if (tipo1 == 'fairy') {
            cor = '#EF97E6'
        } else if (tipo1 == 'fighting') {
            cor = '#D94256'
        } else if (tipo1 == 'fire') {
            cor = '#F8A54F'
        } else if (tipo1 == 'flying') {
            cor = '#9BB4E8'
        } else if (tipo1 == 'ghost') {
            cor = '#6970C5'
        } else if (tipo1 == 'grass') {
            cor = '#5DBE62'
        } else if (tipo1 == 'ground') {
            cor = '#D78555'
        } else if (tipo1 == 'ice') {
            cor = '#7ED4C9'
        } else if (tipo1 == 'normal') {
            cor = '#9A9DA1'
        } else if (tipo1 == 'poison') {
            cor = '#B563CE'
        } else if (tipo1 == 'psychic') {
            cor = '#F87C7A'
        } else if (tipo1 == 'rock') {
            cor = '#CEC18C'
        } else if (tipo1 == 'stell') {
            cor = '#5596A4'
        } else if (tipo1 == 'water') {
            cor = '#559EDF'
        }

        tipo1= `<span class="tp">${tipo1}</span>`;

        if (tipo2 == undefined) {
            tipo2 = ''} else {
                tipo2= `<span class="tp">${tipo2}</span>`;
            }


        pokemonElement.innerHTML = `
            <div class="pokemon-card" style="background-color:${cor}">
                <p class="pokemon-number">${pokemonData.id}</p>
                <div class="pokemon-infos">
                    <p class="pokemon-name">${pokemon.name}</p>
                    <p class="pokemon-types">${tipo1}</p>
                    <p class="pokemon-types">${tipo2}</p>
                </div>           
                <img class="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png"/>                
            </div>   
            `
    
        pokemonContainer.appendChild(pokemonElement);
    });
}
    
displayAllPokemonData()