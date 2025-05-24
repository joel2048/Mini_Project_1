// fetch api function
const fetchPkmn = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log(response.status); // Log the status code
      let result = await response.json();

      // add id
      pkmnList = result.results.map(elements => {
        const urlParted = elements.url.split("/");
        const id = parseInt(urlParted[urlParted.length-2]);
      return {
        ...elements,
        id: id
      };
    })

    return pkmnList;

    }catch(err) {
     throw new Error(`Failed to fetch Pokémon: ${err.message || err}`);
    }
}

// append fetched pokemon function
const appendPkmn = async (list) => {
    document.getElementById('grid-container').innerHTML = '';
    const container = document.getElementById('grid-container');
    for (let row = 0; row < 5; row++) {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'row mb-2';

        for (let col = 0; col < 4; col++) {

          const index = list[col+(row*4)+20*(pagecount-1)]; //list index depending on pagecount

          if (index !== undefined) {
            const img = document.createElement('img');
          
            const id = index.id;
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            let name = index.name;
            img.alt = name;
            img.style="width: 9rem";
            img.title = name.charAt(0).toUpperCase() + name.slice(1);

            let a = document.createElement('a')
            a.href = `pokedex.html?index=${id}`
            a.className = "col-3 ms-0"
            a.appendChild(img);
            rowDiv.appendChild(a);
          }
        }

      container.appendChild(rowDiv);
    }
}

// filter eventlistener
const input = document.getElementById("search")
input.addEventListener('keydown', async (event) => {
  if (event.key == 'Enter' && input.value !== "") {
    document.getElementById('grid-container').innerHTML = '';
    pagecount = 1
   


    // filter
    const Keyword = input.value;
    filteredList = pkmnList.filter(elements =>
      elements.name.toLowerCase().includes(Keyword.toLowerCase())
    );

    currentList = filteredList;

    //append
    appendPkmn(currentList);

  }
  if (event.key == 'Enter' && input.value == "") {
    pagecount = 1
    currentList = pkmnList;
    appendPkmn(currentList);
  }
})

// load next page function
const loadNext = () => {
  pagecount += 1;
  console.log(pagecount)
  appendPkmn(currentList);
}

const loadPrevious = () => {
  pagecount -= 1;
  console.log(pagecount)
  appendPkmn(currentList);
}

// buttons
nextButton = document.getElementById('load-next');
nextButton.addEventListener('click', loadNext);

preButton = document.getElementById('load-previous');
preButton.addEventListener('click', () => {
  if (pagecount > 1) {
    loadPrevious();
}});



// initializing page

let pkmnList = []
let filteredList = []
let currentList = []

let pagecount = 1
let search = false;

fetchPkmn().then(pkmnList => {
  appendPkmn(pkmnList);
  currentList = pkmnList
});


 
//background animation

(function() {
  // Variables
  var $curve = document.getElementById("curve");
  var last_known_scroll_position = 0;
  var defaultCurveValue = 350;
  var curveRate = 3;
  var ticking = false;
  var curveValue;

  // Handle the functionality
  function scrollEvent(scrollPos) {
    if (scrollPos >= 0 && scrollPos < defaultCurveValue) {
      curveValue = defaultCurveValue - parseFloat(scrollPos / curveRate);
      $curve.setAttribute(
        "d",
        "M 800 300 Q 400 " + curveValue + " 0 300 L 0 0 L 800 0 L 800 300 Z"
      );
    }
  }

  // Scroll Listener
  // https://developer.mozilla.org/en-US/docs/Web/Events/scroll
  window.addEventListener("scroll", function(e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        scrollEvent(last_known_scroll_position);
        ticking = false;
      });
    }

    ticking = true;
  });
})();

