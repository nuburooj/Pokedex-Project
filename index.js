
let pokeValue = '1' // Used to change endpoints in the API for fetching
let selectedIndex = 0; // Track the selected index


//Fetch the main pokemon list
fetch('https://pokeapi.co/api/v2/pokemon?limit=486')
.then((resp) => resp.json())
.then((data) => renderPokeList(data.results))


//Fetch general Pokémon data with passed value from selectPokemon
function fetchPokemonData(pokemonId) {
    const pokeInfoURL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    fetch(pokeInfoURL)
    .then((resp) => resp.json())
    .then((data) => renderPokemon(data))
    
}

//Fetch Pokémon species data with passed value from selectPokemon
function fetchPokemonSpeciesData(pokemonId) {
    const pokeSpeciesURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
    fetch(pokeSpeciesURL)
    .then((resp) => resp.json())
    .then((data) => renderPokemonDetails(data))
    
    //Renders data from the Species endpoint of the API
    function renderPokemonDetails(pokeSpeciesArr){ 
        const pokemonName = document.querySelector('#name')
        const pokemonDescription = document.querySelector('#description')
        
        //Grabs pokemon name and flavor text and renders to page
        pokemonName.textContent = "Name: " + pokeSpeciesArr.names[8].name
        pokemonDescription.textContent = pokeSpeciesArr["flavor_text_entries"][0]["flavor_text"]
    }
}

function renderPokeList(pokeListArr) {

    document.addEventListener('keydown', function (event) { 
        if (event.key === 'ArrowDown') {
          // When down arrow key is pressed, increment the selectedIndex
          selectedIndex = selectedIndex < pokeList.length - 1 ? selectedIndex + 1 : selectedIndex;
          selectPokemon(pokeList[selectedIndex].name);
          const audioElement = new Audio("Pokemon (A Button) - Sound Effect (HD).mp3");
          audioElement.play();

        }
    })

    document.addEventListener('keydown', function (event) { 
        if (event.key === 'ArrowUp') {
          // When down arrow key is pressed, decrement the selectedIndex
          selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : 0;
          selectPokemon(pokeList[selectedIndex].name);
          const audioElement = new Audio("Pokemon (A Button) - Sound Effect (HD).mp3");
          audioElement.play();
        }
    })

    pokeListArr.forEach((pokeListObj, index) => {
        
        const pokemonListLocation = document.querySelector('#pokemon-list-location')
        //Making and appending list of pokemon 
        const pokeName = document.createElement("li")
        // console.log(pokeListObj.name)
        pokeName.textContent = pokeListObj.name.toUpperCase()
        //Creates an ID for each list item
        pokeName.id = `poke-${index}`
        pokemonListLocation.append(pokeName)
          

        pokeName.addEventListener('click', () => {
            // Assign selectedIndex to index, then call selectPokemon
            selectedIndex = index
            selectPokemon(pokeListObj.name)})
           
    })
    let pokeList = ""
    pokeList = pokeListArr
}

//Update pokeValue with selected pokemon name and pass to fetch functions
function selectPokemon(pokemonId) {
    pokeValue = pokemonId
     
    fetchPokemonData(pokeValue)
    fetchPokemonSpeciesData(pokeValue)
    const audioElement = new Audio("Pokemon (A Button) - Sound Effect (HD).mp3");
          audioElement.play();
    // Scroll to the selected Pokémon
    const selectedPoke = document.querySelector(`#poke-${selectedIndex}`);
    if (selectedPoke) {
        const listContainer = document.querySelector('#pokemon-list-location');
        listContainer.scrollTop = selectedPoke.offsetTop;
    }
}

function renderPokemon(pokeArr){
    //Locations of Divs
    const pokeImage = document.querySelector('.pokemon-picture')
    const PokemonDetailsLocation = document.querySelector('#pokemon-detail-location')
    
    //Details Info
    const pokemonType = document.querySelector('#type')
    const pokemonWeight = document.querySelector('#weight')
    const pokemonAbilities = document.querySelector('#abilities')
    
    
    //Changing attributes of Pokemon Picture
    pokeImage.src = pokeArr.sprites.front_default
    pokeImage.alt = pokeArr.name
    
    pokemonType.textContent = "Type: " + pokeArr.types[0].type.name
    pokemonWeight.textContent = "Weight: " + pokeArr.weight + " lbs"
    pokemonAbilities.textContent = "Abilities: " + pokeArr.abilities[0].ability.name
    
    
}

//Search Bar Functionality
const form = document.querySelector("#search-bar-location")
form.addEventListener('submit', (e) => {

    e.preventDefault()
    const audioElement = new Audio("Pokemon (A Button) - Sound Effect (HD).mp3");
          audioElement.play();
       let pokeInput = document.querySelector("#searchInput")
       let p = pokeInput.value
       //console.log(p)
        let pokeValue = p
        //Change API endpoint based on input
       fetchPokemonData(pokeValue)
       fetchPokemonSpeciesData(pokeValue)
})

//Sets 'bulbasaur' as the default on page load
window.addEventListener("load", (event) => {
    selectPokemon(1);
 })
