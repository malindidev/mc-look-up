const searchBtn = document.getElementById('searchBtn');
const playerNameInput = document.getElementById('playerName');
const profileDetails = document.getElementById('profileDetails');
const avatarContainer = document.getElementById('avatar');

// Function to fetch player data from Mojang API
async function fetchPlayerData(playerName) {
  const uuidRes = await fetch(`https://api.mojang.com/users/profiles/minecraft/${playerName}`);
  const uuidData = await uuidRes.json();
  
  if (!uuidData.id) {
    profileDetails.innerHTML = `<p>Player not found. Please check the username.</p>`;
    return;
  }

  const playerUUID = uuidData.id;

  // Fetch player's profile info (like skins and name)
  const playerProfileRes = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${playerUUID}`);
  const playerProfile = await playerProfileRes.json();

  // Display player info
  displayPlayerInfo(playerProfile);
  displayPlayerAvatar(playerProfile);
}

// Display Player Info
function displayPlayerInfo(playerProfile) {
  profileDetails.innerHTML = `
    <h2>${playerProfile.name}</h2>
    <p>UUID: ${playerProfile.id}</p>
  `;
}

// Display Player Avatar (Skin)
function displayPlayerAvatar(playerProfile) {
  const skinURL = playerProfile.properties[0].value; // This is the base64 encoded skin URL
  const skinImage = `https://crafatar.com/avatars/${playerProfile.id}`;

  avatarContainer.innerHTML = `<img src="${skinImage}" alt="${playerProfile.name}'s Avatar" />`;
  render3DSkin(skinImage); // Optional: Render 3D skin using Three.js or other libraries
}

// Button click listener
searchBtn.addEventListener('click', () => {
  const playerName = playerNameInput.value;
  if (playerName) {
    fetchPlayerData(playerName);
  }
});

// Optional: You can add logic to render a 3D avatar here using Three.js or other libraries.
