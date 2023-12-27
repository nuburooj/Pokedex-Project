// fetch("https://pokeapi.co/api/v2/pokemon/1?limit=1302")
// .then((resp) => resp.json())
// .then((data) => renderPokemon(data))

fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur")
.then((resp) => resp.json())
.then((data) => console.log(data.species))


function renderPokemon(pokeArr){
    
    const PokemonListLocation = document.querySelector('#pokemon-list-location')
    const PokeImage = document.querySelector('.pokemon-picture')
    const PokemonDetailsLocation = document.querySelector('#pokemon-detail-location')

    pokeArr.forEach((pokeObj) => {
        const PokeName = document.createElement("li")
        PokeName.textContent = pokeObj.name
        PokemonListLocation.append(PokeName)

        
        PokeImage.alt = pokeObj.name
        
    })
    //console.log(data)
}



// console.log("Hi")  