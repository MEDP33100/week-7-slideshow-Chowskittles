const pokemon_display = document.getElementById("pokemon-display");
const pokemon_img = document.getElementById("pokemon-img");
const pokemon_name = document.getElementById("pokemon-name");
const prev_btn = document.getElementById("prev-btn");
const next_btn = document.getElementById("next-btn");

let pokemon_data = [];
let current_index = 0;

// fetch all pokemon
async function fetch_pokemon() {
    try {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1010");
        let data = await response.json();
        pokemon_data = data.results;
        load_pokemon(current_index);
    } catch (error) {
        console.error("error fetching pokemon data:", error);
    }
}

// load pokemon details
async function load_pokemon(index) {
    if (index < 0 || index >= pokemon_data.length) return;

    try {
        let response = await fetch(pokemon_data[index].url);
        let data = await response.json();
        pokemon_img.src = data.sprites.front_default;
        pokemon_name.textContent = data.name;
        current_index = index;
    } catch (error) {
        console.error("error fetching pokemon details:", error);
    }
}

// button functionality
prev_btn.addEventListener("click", () => {
    current_index = (current_index - 1 + pokemon_data.length) % pokemon_data.length;
    load_pokemon(current_index);
});

next_btn.addEventListener("click", () => {
    current_index = (current_index + 1) % pokemon_data.length;
    load_pokemon(current_index);
});

// initial fetch
fetch_pokemon();
