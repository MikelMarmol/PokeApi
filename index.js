const form = document.getElementById("form")
const container = document.querySelector(".pokemon-container")
const input = document.getElementById("pokemonid")
// ----------------------------------------------------------- // 
// Llamo al form.
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const pokemonId = input.value
    if(!pokemonId) {
        showError('Por favor, ingresa un numero valido.')
        return;
    }
    await fetchPokemon(pokemonId);
});

// Funcion auxiliar del ShowError.
function showError(message) {
    const errorMessage = document.createElement("div")
    errorMessage.classList.add("error")
    errorMessage.textContent = message
    container.innerHTML = "";
    container.appendChild(errorMessage)
};


// Solicitud a la API de PokeAPI.
async function fetchPokemon(number) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
        const pokemonData = await response.json();

        const name = pokemonData.name
        const types = pokemonData.types.map(type => type.type.name).join(', ')
        const height = (pokemonData.height / 10).toFixed(1);
        const weight = (pokemonData.weight / 10).toFixed(1);
        const pokemonImage = pokemonData.sprites.front_default

        const createPokemonTemplate = (name, types, height, weight, pokemonImage) => {
            return `<div class="pokemon-container">
            <div class="pokemon-info">
            <img src="${pokemonImage}" alt="${name}">
            <h3 class="pokemon-name">${name}</h3>
            <p class="pokemon-type">${types}</p>
            <span class="pokemon-height">Altura: ${height}cm</span>
            <span class="pokemon-weight">Peso: ${weight}kg</span>
            </div>
        </div> `
        }
        const pokemonTemplate = createPokemonTemplate(name, types, height, weight, pokemonImage)
        container.innerHTML = pokemonTemplate
    } catch (error) {
        showError("No se pudo encontrar a ningun Pokemon con ese ID")
    }
};