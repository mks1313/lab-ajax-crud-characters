const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {

  document.getElementById('fetch-all').addEventListener('click', () => {
    charactersAPI.getFullList()
      .then(characters => {
        displayCharacters(characters);
      })
      .catch(error => {
        console.error('Error fetching all characters:', error);
      });
  });

  document.getElementById('fetch-one').addEventListener('click', () => {
    const characterId = document.querySelector('input[name="character-id"]').value;
    charactersAPI.getOneRegister(characterId)
      .then(character => {
        displayCharacter(character);
      })
      .catch(error => {
        console.error('Error fetching character by id:', error);
      });
  });

  document.getElementById('delete-one').addEventListener('click', (event) => {
    const characterId = document.querySelector('input[name="character-id-delete"]').value;
    charactersAPI.deleteOneRegister(characterId)
      .then(result => {
        if (result === 'Character has been successfully deleted') {
          event.target.style.backgroundColor = 'green';
        } else {
          event.target.style.backgroundColor = 'red';
        }
      })
      .catch(error => {
        console.error('Error deleting character by id:', error);
        event.target.style.backgroundColor = 'red';
      });
  });

  document.getElementById('edit-character-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const characterId = document.querySelector('#edit-character-form input[name="chr-id"]').value;
    const characterData = {
      name: document.querySelector('#edit-character-form input[name="name"]').value,
      occupation: document.querySelector('#edit-character-form input[name="occupation"]').value,
      weapon: document.querySelector('#edit-character-form input[name="weapon"]').value,
      cartoon: document.querySelector('#edit-character-form input[name="cartoon"]').checked,
    };
    charactersAPI.updateOneRegister(characterId, characterData)
      .then(result => {
        if (result) {
          event.target.querySelector('button').style.backgroundColor = 'green';
        } else {
          event.target.querySelector('button').style.backgroundColor = 'red';
        }
      })
      .catch(error => {
        console.error('Error updating character:', error);
        event.target.querySelector('button').style.backgroundColor = 'red';
      });
  });
});

document.getElementById('new-character-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const characterData = {
    name: document.querySelector('input[name="name"]').value,
    occupation: document.querySelector('input[name="occupation"]').value,
    weapon: document.querySelector('input[name="weapon"]').value,
    cartoon: document.querySelector('input[name="cartoon"]').checked,
  };
  charactersAPI.createOneRegister(characterData)
    .then(result => {
      if (result) {
        event.target.querySelector('button').style.backgroundColor = 'green';
      } else {
        event.target.querySelector('button').style.backgroundColor = 'red';
      }
    })
    .catch(error => {
      console.error('Error creating character:', error);
      event.target.querySelector('button').style.backgroundColor = 'red';
    });
});

function displayCharacters(characters) {
  const charactersContainer = document.querySelector('.characters-container');
  charactersContainer.innerHTML = '';

  characters.forEach(character => {
    const characterInfo = document.createElement('div');
    characterInfo.classList.add('character-info');
    characterInfo.innerHTML = `
      <div class="id">ID: ${character.id}</div>
      <div class="name">Name: ${character.name}</div>
      <div class="occupation">Occupation: ${character.occupation}</div>
      <div class="cartoon">Is a Cartoon: ${character.cartoon ? 'true' : 'false'}</div>
      <div class="weapon">Weapon: ${character.weapon}</div>
    `;
    charactersContainer.appendChild(characterInfo);
  });
}

function displayCharacter(character) {
  const characterContainer = document.querySelector('.characters-container');
  characterContainer.innerHTML = '';

  const characterInfo = document.createElement('div');
  characterInfo.classList.add('character-info');
  characterInfo.innerHTML = `
    <div class="id">ID: ${character.id}</div>
    <div class="name">Name: ${character.name}</div>
    <div class="occupation">Occupation: ${character.occupation}</div>
    <div class="cartoon">Is a Cartoon: ${character.cartoon ? 'true' : 'false'}</div>
    <div class="weapon">Weapon: ${character.weapon}</div>
  `;
  characterContainer.appendChild(characterInfo);
}



