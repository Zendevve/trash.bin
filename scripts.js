// Array of games
const games = [
  { title: 'Hades', platform: 'PS4', genre: 'Action', image: 'https://cdn2.steamgriddb.com/grid/ce8a253393a1bbbb3d72cd2093b81ede.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque.' },
  { title: 'Trackmania United Forever', platform: 'PC', genre: 'Adventure', image: 'https://cdn2.steamgriddb.com/grid/ee0fe8739468fb6e0214b071feb09590.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque.' },
  { title: 'Stardew Valley', platform: 'Xbox', genre: 'RPG', image: 'https://cdn2.steamgriddb.com/grid/992fbfcd780c3f522308d44f1b13ee19.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque.' },
  { title: 'Grand Theft Auto: San Andreas', platform: 'Switch', genre: 'Puzzle', image: 'https://cdn2.steamgriddb.com/grid/b53cbe6da81db747a73e52a5a48d2703.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque.' }
];

// DOM elements
const gameGallery = document.getElementById('gameGallery');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const platformFilter = document.getElementById('platformFilter');
const searchFilters = document.getElementById('searchFilters');
const gameModal = document.getElementById('gameModal');
const modalGameDetails = document.getElementById('modalGameDetails');
const logo = document.getElementById('logo');

// Initial display of games
populateFilters();
displayGames(games);

// Function to shuffle an array (Fisher-Yates shuffle algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to populate genre and platform filters
function populateFilters() {
  const genres = [...new Set(games.map(game => game.genre))];
  const platforms = [...new Set(games.map(game => game.platform))];

  genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });

  platforms.forEach(platform => {
    const option = document.createElement('option');
    option.value = platform;
    option.textContent = platform;
    platformFilter.appendChild(option);
  });
}

// Function to display filtered games
function displayGames(games) {
  gameGallery.innerHTML = '';
  games.forEach(game => {
    const card = document.createElement('div');
    card.classList.add('game-card');
    card.innerHTML = `
      <img src="${game.image}" alt="${game.title}">
      <div class="game-card-content">
        <h2>${game.title}</h2>
        <p><strong>Platform:</strong> ${game.platform}</p>
        <p><strong>Genre:</strong> ${game.genre}</p>
      </div>
    `;
    card.addEventListener('click', () => openModal(game));
    gameGallery.appendChild(card);
  });
}

// Function to filter games based on search, genre, and platform
function filterGames() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedGenre = genreFilter.value;
  const selectedPlatform = platformFilter.value;

  const filteredGames = games.filter(game => {
    return (
      game.title.toLowerCase().includes(searchTerm) &&
      (selectedGenre === '' || game.genre === selectedGenre) &&
      (selectedPlatform === '' || game.platform === selectedPlatform)
    );
  });

  displayGames(filteredGames);
}

// Function to open modal and display game details
function openModal(game) {
  modalGameDetails.innerHTML = `
    <h2>${game.title}</h2>
    <img src="${game.image}" alt="${game.title}">
    <p><strong>Platform:</strong> ${game.platform}</p>
    <p><strong>Genre:</strong> ${game.genre}</p>
    <p><strong>Description:</strong> ${game.description}</p>
    <a href="${game.link}" target="_blank" rel="noopener noreferrer">More Info</a>
  `;
  gameModal.style.display = 'block';
}


// Function to close modal
function closeModal() {
  gameModal.style.display = 'none';
}

// Event listeners

// Search input events
searchInput.addEventListener('focus', () => {
  searchFilters.style.display = 'block';
});

searchInput.addEventListener('input', filterGames);

// Document click event to close search filters
document.addEventListener('click', (event) => {
  if (!searchFilters.contains(event.target) && event.target !== searchInput) {
    searchFilters.style.display = 'none';
  }
  if (event.target === gameModal) {
    closeModal();
  }
});

// Prevent search filters from closing on click inside
searchFilters.addEventListener('click', (event) => {
  event.stopPropagation();
});

// Genre and platform filter events
genreFilter.addEventListener('change', filterGames);
platformFilter.addEventListener('change', filterGames);

// Logo click event to shuffle games and scroll to top
logo.addEventListener('click', handleLogoClick);

// Function to handle logo click (shuffle animation)
function handleLogoClick() {
  // Shuffle games array
  const shuffledGames = shuffleArray(games);

  // Display shuffled games directly (no fade or animation)
  displayGames(shuffledGames);

  // Scroll to top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
