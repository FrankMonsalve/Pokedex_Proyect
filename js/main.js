const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

let pokemons = [];

/* Recorre la pokedex 151 veces */
for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => {
            pokemons.push(data);
            if (pokemons.length === 151) {
                pokemons.sort((a, b) => a.id - b.id);
                pokemons.forEach(poke => mostrarPokemon(poke));
            }
        });
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name}">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2> 
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height} dm</p>
                <p class="stat">${poke.weight} hg</p>
            </div>
        </div>
    `;
    listaPokemon.appendChild(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    if (botonId === "ver-todos") {
        pokemons.forEach(poke => mostrarPokemon(poke));
    } else {
        pokemons.forEach(poke => {
            const tipos = poke.types.map(type => type.type.name);
            if (tipos.some(tipo => tipo.includes(botonId))) {
                mostrarPokemon(poke);
            }
        });
    }
}));

