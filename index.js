function renderPokemon(pokeArr){
    
    const PokemonListLocation = document.querySelector('#pokemon-list-location')
            
    pokeArr.forEach((pokeObj) => {
        const PokeName = document.createElement("li")
        PokeName.textContent = pokeObj.name
        PokemonListLocation.append(PokeName)

        
    });
    //console.log(data)
}



//console.log("Hi")  