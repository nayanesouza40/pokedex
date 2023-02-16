const getAllPokemonData = async (url) => {
    
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
  
      } catch (error) {
        deuMerda(error);
      }
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
        } else if (color == 'steel') {
            cor = '#5596A4'
        } else if (color == 'water') {
            cor = '#559EDF'
        }
        return cor
}  

// função de erro
const deuMerda = (error) => {
    console.log(error);
    const pokemonContainer = document.querySelector("#pokemon-container");
    const mensagemErro = document.createElement('div');
    mensagemErro.classList.add('pokemon-flex');
    pokemonContainer.appendChild(mensagemErro);
    mensagemErro.innerHTML = `
        <h3>Não achei nada aqui</h3>
    `;
}

// busca todos os pokemons
const displayAllPokemonData = async (url) => {

    const pokemonList = await getAllPokemonData(url);
    const pokemonContainer = document.getElementById("pokemon-container");
    
    pokemonList.forEach(async pokemon => {
        const pokemonData = await fetch(pokemon.url).then(res => res.json());
        // função para exibir o tipo do pokemon
      // colocar uma condicional aqui, se o tipo é aquele, e criar a div só se for
        const pokemonElement = document.createElement("div");
        pokemonElement.classList.add("pokemon-flex");
        pokemonElement.classList.add("col-2");

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

// busca o pokemon pelo nome dele - usada pelo campo de busca
const getPokemonInfo = async (pokemonName) => {
    const pokemonContainer = document.getElementById("pokemon-container");

    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(res => res.json())
        .catch(error => {deuMerda(error)});
  
    let [tipo1, tipo2] = pokemon.types.map(type => type.type.name);

    let cor = tipo1;

    if (tipo2 == undefined) {
        tipo2 = ''} else {
            tipo2= `<span class="tp">${tipo2}</span>`;
        }

        tipo1= `<span class="tp">${tipo1}</span>`;

        const pokemonElement = document.createElement("div");
        pokemonElement.classList.add("pokemon-flex");
        pokemonElement.classList.add("col-2")

    pokemonElement.innerHTML = `
    <div class="pokemon-card" style="background-color:${whatsColor(cor)}" ;
    ">
        <p class="pokemon-number">${pokemon.id}</p>
        <div class="pokemon-infos">
            <a class="${pokemon.name} pokemon-name">${pokemon.name}</a>
            <p class="pokemon-types">${tipo1}</p>
            <p class="pokemon-types">${tipo2}</p>
        </div>           
        <img class="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>                
    </div> 
    `;

    pokemonContainer.appendChild(pokemonElement);
  }

const clearPokemon = () => {
    const pokemonElement = document.querySelectorAll('.pokemon-flex');
    pokemonElement.forEach(div => div.parentNode.removeChild(div));
}

// busca todos os pokemons pelo tipo
const displayAllPokemonType = async (tipo) => {

    const pokemonList = await getAllPokemonData('https://pokeapi.co/api/v2/pokemon?limit=890');
    const pokemonContainer = document.getElementById("pokemon-container");
    
    pokemonList.forEach(async pokemon => {
        const pokemonData = await fetch(pokemon.url).then(res => res.json());
        let [tipo1, tipo2] = pokemonData.types.map(type => type.type.name);
        
        if ((tipo == tipo1) || (tipo == tipo2)) {
            const pokemonElement = document.createElement("div");
            pokemonElement.classList.add("pokemon-flex");
            pokemonElement.classList.add("col-2");

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
        }
    });
}

// eventos
document.querySelector('#form').addEventListener('submit', (event) => {
    event.preventDefault();
    let busca = document.querySelector('#input-busca').value.toLowerCase();
    clearPokemon();    
    document.querySelector('#tipos').value = 'all';
    document.querySelector('#geracao').value = 'all';
    console.log(busca);
    if (busca == '') {
        displayAllPokemonData('https://pokeapi.co/api/v2/pokemon?limit=151') 
    } else if (busca != '') {
        getPokemonInfo(busca);
        document.querySelector('#input-busca').value = '';
    } 
});

document.querySelector('#geracao').addEventListener('click', () => {
    document.querySelector('#geracao > .oculto').hidden = true;
});

document.querySelector('#tipos').addEventListener('click', () => {
    document.querySelector('#tipos > .oculto').hidden = true;
});

document.querySelector('#geracao').addEventListener('change', () => {
    let geracao = document.querySelector('#geracao').value;
    clearPokemon();
    if (geracao == 'all') {
        displayAllPokemonData(`https://pokeapi.co/api/v2/pokemon?limit=890`);
    } else {
        displayAllPokemonData(`https://pokeapi.co/api/v2/pokemon?${geracao}`);
    }
    document.querySelector('#input-busca').value = '';
    document.querySelector('#tipos').value = 'all';
});


document.querySelector('#tipos').addEventListener('change', () => {
    let tipo = document.querySelector('#tipos').value;
    clearPokemon();
    if (tipo == 'all') {
        displayAllPokemonData(`https://pokeapi.co/api/v2/pokemon?limit=890`);
    } else {
        displayAllPokemonType(tipo);
    }
    document.querySelector('#geracao').value = 'all';
    document.querySelector('#input-busca').value = '';
});


displayAllPokemonData('https://pokeapi.co/api/v2/pokemon?limit=151');