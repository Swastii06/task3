
function fetchCharacterData() {
    return fetch('https://swapi.dev/api/people/')
      .then(response => response.json())
      .then(data => data.results)
      .catch(error => console.error(error));
  }
  
 
  function createCharacterCard(character) {
    const container = document.querySelector('.container');
  
    const characterDiv = document.createElement('div');
    characterDiv.classList.add('character');
  
    const img = document.createElement('img');
    img.src = `https://starwars-visualguide.com/assets/img/characters/${getCharacterId(character.url)}.jpg`;
  
    const name = document.createElement('h1');
    name.textContent = character.name;
  
    const details = document.createElement('ul');
    details.innerHTML = `
      <li><strong>Gender:</strong> ${character.gender}</li>
      
      <li><strong>Age:</strong> ${character.birth_year}</li>
      
      <li><strong>Mass:</strong> ${character.mass}kg</li>
     
      <li><strong>Height:</strong> ${character.height}cm</li>
      
      <li><strong>Eye Color:</strong> ${character.eye_color}</li>
    
      <li><strong>Hair Color:</strong> ${character.hair_color}</li>
      
      <li><strong>Homeworld:</strong> <a href="${character.homeworld}">${character.homeworld}</a></li>
    
      <li><strong>Starship: </strong><a href="${character.starships[0]}">${character.starships[0]}</a></li>
    `;
  
    characterDiv.appendChild(img);
    characterDiv.appendChild(name);
    characterDiv.appendChild(details);
    container.appendChild(characterDiv);
  }
  
 
  function getCharacterId(url) {
    const pattern = /\/([0-9]+)\/$/;
    const matches = url.match(pattern);
    return matches ? matches[1] : '';
  }
  
 
  
  function populateCharacterSelect(characters) {
    const select = document.getElementById('character-select');
    select.innerHTML = '';
  
   
    characters.forEach(character => {
      const option = document.createElement('option');
      option.value = character.name;
      option.textContent = character.name;
      select.appendChild(option);
    });
  
    select.addEventListener('change', function () {
      const selectedCharacter = characters.find(character => character.name === select.value);
      if (selectedCharacter) {
        document.querySelector('.container').innerHTML = '';
        createCharacterCard(selectedCharacter);
      }
    });
  }
  
 
  fetchCharacterData().then(characters => {
    populateCharacterSelect(characters);
  });
  
  
