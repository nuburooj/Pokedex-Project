
let pokeValue = '1'
let selectedIndex = 0; // Track the selected index



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

//Fetch Pokémon species data ith passed value from selectPokemon
function fetchPokemonSpeciesData(pokemonId) {
    const pokeSpeciesURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
    fetch(pokeSpeciesURL)
    .then((resp) => resp.json())
    .then((data) => renderPokemonDetails(data))
    
    function renderPokemonDetails(PokeSpeciesArr){ 
        const PokemonName = document.querySelector('#name')
        const PokemonDescription = document.querySelector('#description')
        
        //Changing Attributes of Details 
        PokemonName.textContent = "Name: " + PokeSpeciesArr.names[8].name
        PokemonDescription.textContent = PokeSpeciesArr["flavor_text_entries"][0]["flavor_text"]
    }
}

function renderPokeList(pokeListArr) {

    document.addEventListener('keydown', function (event) { 
        if (event.key === 'ArrowDown') {
          // When down arrow key is pressed, increment the selectedIndex
          selectedIndex = (selectedIndex + 1) % pokeList.length;
          selectPokemon(pokeList[selectedIndex].name);
        }
    })

    document.addEventListener('keydown', function (event) { 
        if (event.key === 'ArrowUp') {
          // When down arrow key is pressed, decrement the selectedIndex
          selectedIndex = (selectedIndex - 1) % pokeList.length;
          selectPokemon(pokeList[selectedIndex].name);
        }
    })

    pokeListArr.forEach((pokeListObj) => {
        
        const PokemonListLocation = document.querySelector('#pokemon-list-location')
        //Making and appending list of pokemon 
        const PokeName = document.createElement("li")
        // console.log(pokeListObj.name)
        PokeName.textContent = pokeListObj.name
        PokemonListLocation.append(PokeName)
          

        PokeName.addEventListener('click', () => selectPokemon(pokeListObj.name))
  
           
    })
    let pokeList = ""
    pokeList = pokeListArr
}

//Update pokeValue with selected pokemon name and pass to fetch functions
function selectPokemon(pokemonId) {
    pokeValue = pokemonId
    fetchPokemonData(pokeValue)
    fetchPokemonSpeciesData(pokeValue)
}

function renderPokemon(pokeArr){
    //Locations of Divs
    const PokeImage = document.querySelector('.pokemon-picture')
    const PokemonDetailsLocation = document.querySelector('#pokemon-detail-location')
    
    //Details Info
    const PokemonType = document.querySelector('#type')
    const PokemonWeight = document.querySelector('#weight')
    const PokemonAbilities = document.querySelector('#abilities')
    
    
    //Changing attributes of Pokemon Picture
    PokeImage.src = pokeArr.sprites.front_default
    PokeImage.alt = pokeArr.name
    
    PokemonType.textContent = "Type: " + pokeArr.types[0].type.name
    PokemonWeight.textContent = "Weight: " + pokeArr.weight + " lbs"
    PokemonAbilities.textContent = "Abilities: " + pokeArr.abilities[0].ability.name
    
    
}

//Search Bar Functionality
const form = document.querySelector("#search-bar-location")
form.addEventListener('submit', (e) => {

    e.preventDefault()
       let pokeInput = document.querySelector("#searchInput")
       let p = pokeInput.value
       //console.log(p)
        let pokeValue = p
    
       fetchPokemonData(pokeValue)
       fetchPokemonSpeciesData(pokeValue)
})

