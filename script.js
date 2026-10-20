
const tuneWaveSongs = [
  { name: "Shape of You", artist: "Ed Sheeran", category: "trending", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { name: "Perfect", artist: "Ed Sheeran", category: "melody love", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { name: "Why This Kolaveri", artist: "Dhanush", category: "trending", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { name: "Arabic Kuthu", artist: "Anirudh", category: "love trending", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
];

let tuneWaveIndex = 0;
let likedSongNames = [];
let selectedCategory = "all";

function applySongFilters() {
  const search = document.getElementById("search");
  const query = search ? search.value.trim().toLowerCase() : "";

  document.querySelectorAll("#songList .song").forEach(function(card) {
    const title = card.querySelector("h3");
    const artist = card.querySelector("p");
    const name = title ? title.textContent.toLowerCase() : "";
    const singer = artist ? artist.textContent.toLowerCase() : "";

    const matchesSearch = name.includes(query) || singer.includes(query);
    const matchesCategory = selectedCategory === "all" ||
      (name.includes("perfect") && selectedCategory === "melody") ||
      ((name.includes("perfect") || name.includes("arabic kuthu")) && selectedCategory === "love") ||
      ((name.includes("shape of you") || name.includes("kolaveri") || name.includes("arabic kuthu")) && selectedCategory === "trending");

    card.style.display = matchesSearch && matchesCategory ? "" : "none";
  });
}

const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("input", applySongFilters);
}

function filterSongs(category) {
  selectedCategory = category;
  applySongFilters();
}

function playSong(name) {
  const index = tuneWaveSongs.findIndex(song => song.name === name);
  if (index !== -1) tuneWaveIndex = index;
  playTuneWaveSong();
}

function nextSong() {
  tuneWaveIndex = (tuneWaveIndex + 1) % tuneWaveSongs.length;
  playTuneWaveSong();
}

function previousSong() {
  tuneWaveIndex = (tuneWaveIndex - 1 + tuneWaveSongs.length) % tuneWaveSongs.length;
  playTuneWaveSong();
}

function playTuneWaveSong() {
  const song = tuneWaveSongs[tuneWaveIndex];
  const audio = document.getElementById("audioPlayer");
  const current = document.getElementById("currentSong");

  if (current) current.textContent = song.name + " - " + song.artist;

  const recent = document.getElementById("recentSong");
  if (recent) recent.textContent = "🎵 " + song.name + " - " + song.artist;

  if (audio) {
    audio.src = song.url;
    audio.play().catch(function() {});
  }
}

function toggleFavorite(button) {
  const card = button.closest(".song");
  const title = card ? card.querySelector("h3") : null;
  if (!title) return;

  const name = title.textContent.trim();
  if (likedSongNames.includes(name)) {
    likedSongNames = likedSongNames.filter(song => song !== name);
    button.textContent = "🤍";
  } else {
    likedSongNames.push(name);
    button.textContent = "❤️";
  }

  displayLikedSongs();
}

function displayLikedSongs() {
  const container = document.getElementById("likedSongs");
  if (!container) return;

  container.innerHTML = "";
  if (likedSongNames.length === 0) {
    container.textContent = "No liked songs yet.";
    return;
  }

  likedSongNames.forEach(function(name) {
    const item = document.createElement("p");
    item.textContent = "❤️ " + name;
    container.appendChild(item);
  });
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
  const button = document.getElementById("themeButton");

  if (button) {
    button.textContent = document.body.classList.contains("light-mode")
      ? "🌙 Dark Mode" : "☀️ Light Mode";
  }
}

function updateSongCount() {
  const count = document.getElementById("songCount");
  if (count) count.textContent = "🎵 Total Songs: " + document.querySelectorAll("#songList .song").length;
}

updateSongCount();
