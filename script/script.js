const search       = document.querySelector("#search");
const number       = document.querySelector("#number");
const pokemonImage = document.querySelector('#pokemon-image');
const types        = document.querySelector('#types');
const baseStats    = document.querySelector('#base-stats');
const pokedex      = document.querySelector('#pokedex');
const statNumber   = document.querySelectorAll('.stat-number');
const barInner     = document.querySelectorAll('.bar-inner');
const barOuter     = document.querySelectorAll('.bar-outer');
const statDesc     = document.querySelectorAll('.stat-desc');

const typeColors = {
    'rock': [182, 158, 49],
    'ghost': [112, 85, 155],
    'steel': [183, 185, 208],
    'water': [100, 147, 235],
    'grass': [116, 203, 72],
    'psychic': [251, 85, 132],
    'ice': [154, 214, 223],
    'dark': [117, 87, 76],
    'fairy': [230, 158, 172],
    'normal': [170, 166, 127],
    'fighting': [193, 37, 57],
    'flying': [168, 145, 236],
    'poison': [164, 62, 158],
    'ground': [222, 193, 107],
    'bug': [167, 183, 35],
    'fire': [245, 125, 49],
    'electric': [249, 207, 48],
    'dragon': [112, 55, 255]
}

const fetchApi = async (pknmName) => {
    // Joining pokémom names that has more than one word
    pknmNameApi = pknmName.split(' ').join('-');


    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pknmNameApi);
    
    if (response.status === 200) {
        const pknmData = await response.json();
        return pknmData;
    }
    
    return false;

}

search.addEventListener('change', async (event) => {
    const pknmData = await fetchApi(event.target.value);

    // Validation when Pokémon does not exist
    if (!pknmData) {
        alert('Pokemon não existe.')
        return
    }

    // Main Pokémon color, in order to change UI theme
    const mainColor = typeColors[pknmData.types[0].type.name];
    baseStats.style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    pokedex.style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    

    // for debugging - will be removed later on
    console.log(pknmData);
    // Set pokemon #at the top the page
    number.innerHTML = '#' + pknmData.id.toString().padStart(3, '0');

    // Sets pokemon image
    pokemonImage.src = pknmData.sprites.other.home.front_default;

    // Upgrades 'types'
    types.innerHTML = '';
    
    pknmData.types.forEach((t) => {
        let newType = document.createElement('span');
        let color   = typeColors[t.type.name];

        newType.innerHTML = t.type.name;
        newType.classList.add('type');
        newType.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

        types.appendChild(newType);
    });

    // Update status
    pknmData.stats.forEach((s, i) => {
        statNumber[i].innerHTML = s.base_stat.toString().padStart(3, '0');
        barInner[i].style.width = `${s.base_stat}%`;
        barInner[i].style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
        barOuter[i].style.backgroundColor = `rgba(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]}, 0.3)`;
        statDesc[i].style.color           = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
        
    });

});