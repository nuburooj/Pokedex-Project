fetch('https://pokeapi.co/api/v2/pokemon?limit=1302')
.then((resp) => resp.json())
.then((data) => renderPokeList(data.results))

function renderPokeList(pokeListArr) {
    
    pokeListArr.forEach((pokeListObj) => {

    const PokemonListLocation = document.querySelector('#pokemon-list-location')
    //Making and appending list of pokemon 
    const PokeName = document.createElement("li")
    // console.log(pokeListObj.name)
    PokeName.textContent = pokeListObj.name
    PokemonListLocation.append(PokeName)
    })
}

fetch("https://pokeapi.co/api/v2/pokemon/1")
.then((resp) => resp.json())
.then((data) => renderPokemon(data))


function renderPokemon(pokeArr){
    
    //Locations of Divs
    const PokeImage = document.querySelector('.pokemon-picture')
    const PokemonDetailsLocation = document.querySelector('#pokemon-detail-location')
    
    //Details Info
    const PokemonName = document.querySelector('.name')
    const PokemonType = document.querySelector('.type')
    const PokemonWeight = document.querySelector('.weight')
    const PokemonAbilities = document.querySelector('.abilities')
    const PokemonDescription = document.querySelector('.description')
    
    
    
    
    
    
    //Changing attributes of Pokemon Picture
    PokeImage.src = pokeArr.sprites.front_default
    PokeImage.alt = pokeArr.name
    
    PokemonType.textContent = pokeArr.types[0,1].type.name
    PokemonWeight.textContent = pokeArr.weight + " lbs"
    PokemonAbilities.textContent = pokeArr.abilities[0].ability.name
    
    
    fetch("https://pokeapi.co/api/v2/pokemon-species/1")
    .then((resp) => resp.json())
    .then((data) => renderPokemonDetails(data))


    function renderPokemonDetails(PokeSpeciesArr){ 
        
        //Changing Attributes of Details 
        PokemonName.textContent = PokeSpeciesArr.names[8].name
        PokemonDescription.textContent = PokeSpeciesArr["flavor_text_entries"][0]["flavor_text"]
    }
    
    //console.log(data)
}



// console.log("Hi")  