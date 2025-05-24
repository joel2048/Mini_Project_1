// get id
const params = new URLSearchParams(window.location.search);
const index = params.get('index');

// fetch pokemon data
const fetchPkmnData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log(response.status);
      let result = await response.json();

      return result;

    }catch(err) {
     throw new Error(`Failed to fetch Pokémon data: ${err.message || err}`);
    }
}

// fetch for flavor text / pokedex entry
const fetchPkmnFlavorText = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log(response.status);
      let result = await response.json();

      return result;

    }catch(err) {
     throw new Error(`Failed to fetch Pokémon data: ${err.message || err}`);
    }
}


const displayData = async () => {
  pkmnData = await fetchPkmnData();
  pkmnData.stats.forEach(element => {

    // stat bars
    const bar = document.getElementById(`bar-${element.stat.name}`);
    const targetValue = element.base_stat;

    setTimeout(() => { 
      bar.style.width = `${targetValue*0.392156862745098}%`;
    }, 100); //delay

    // display values
    const counter = document.getElementById(`${element.stat.name}-value`);
    counter.innerHTML = targetValue;

  });

  // name  
  document.getElementById("name").innerHTML = pkmnData.name.charAt(0).toUpperCase() + pkmnData.name.slice(1);
  
  //image
  const image = document.getElementById("image")
  image.src = "";
  image.src = pkmnData.sprites.other["official-artwork"].front_default;

  //pokedex description
  const entry = document.getElementById("entry");
  flavorTextData = await fetchPkmnFlavorText();
  allFlavorTexts = flavorTextData.flavor_text_entries;
  allFlavorTexts.forEach(element => {
    if (element.language.name == "en") { 
      entry.innerHTML = element.flavor_text;
    }
  // goes through all entries. But it ends up displaying
  // the "en" entry of the last version
  });
}


// document.addEventListener("DOMContentLoaded", () => {
//         const bar = document.getElementById("bar-one");
//         const targetValue = bar.getAttribute("aria-valuenow");

//         // Add slight delay so the transition is visible
//         setTimeout(() => {
//             bar.style.width = `${targetValue}%`;
//         }, 100); // small delay lets CSS transition animate
// });


displayData();


// 255*x = 100
// x = 0.392156862745098

