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
        } else if (color == 'stell') {
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

// busca todos os pokemons pelo tipo
const displayTypesPokemonData = async (url) => {

    const pokemonList = await getAllPokemonData(url);
    const pokemonContainer = document.getElementById("pokemon-container");
    
    pokemonList.forEach(async pokemon => {
        const pokemonData = await fetch(pokemon.url).then(res => res.json());
      
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

// busca todos os pokemons da primeira geração
const displayAllPokemonData = async (url) => {

    const pokemonList = await getAllPokemonData(url);
    const pokemonContainer = document.getElementById("pokemon-container");
    
    pokemonList.forEach(async pokemon => {
        const pokemonData = await fetch(pokemon.url).then(res => res.json());
      
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

// busca o pokemon pelo nome dele
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
    
document.querySelector('#form').addEventListener('submit', (event) => {
    event.preventDefault();
    const busca = document.querySelector('#input-busca').value;
    clearPokemon();    

    console.log(tipo);

    if (busca == 0) {
        displayAllPokemonData('https://pokeapi.co/api/v2/pokemon?limit=151') 
    } else if (busca != 0) {
        getPokemonInfo(busca);
    } 
})

const tipo = document.querySelector('#tipos').value;
    displayAllPokemonData('https://pokeapi.co/api/v2/pokemon?limit=151');


/*

FUNÇÃO QUE EXIBI MAIS DETALHES SOBRE O POKEMON QUANDO CLICAR NA TELA

const clearPokemon = () => {
    const pokemonElement = document.querySelectorAll('.pokemon-escuro')
    pokemonElement.forEach(div => div.parentNode.removeChild(div))
}

const getPokemonInfo = async (pokemonName) => {
    const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(res => res.json())
        .catch(error => console.error(error));
  
    let [tipo1, tipo2] = pokemonData.types.map(type => type.type.name);

    let cor = tipo1;

    if (tipo2 == undefined) {
        tipo2 = ''} else {
            tipo2= `<span class="tp">${tipo2}</span>`;
        }

        tipo1= `<span class="tp">${tipo1}</span>`;

    let [habilidade1, habilidade2] = pokemonData.abilities.map(ability => ability.ability.name);

    const pokemonContainer = document.getElementById("pokemon-container");
    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add("pokemon-escuro");

    pokemonElement.innerHTML = `
        <div class="pokemon-pop" style="background-color:${whatsColor(cor)}">
            <p onClick="clearPokemon()" class="x">x</p>
            <img class="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png"/>   
            <p class="pokemon-number">${pokemonData.id}</p>
            <p class="pokemon-name">${pokemonName}</p>
            <div class="types">
                <p class="pokemon-types">${tipo1}</p>
                <p class="pokemon-types">${tipo2}</p>
            </div>
            <p>${habilidade1}</p>
            <p>${habilidade2}</p>
        </div>
    `

    pokemonContainer.appendChild(pokemonElement);

  }

*/
