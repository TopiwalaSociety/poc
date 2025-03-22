console.log("JavaScript file loaded!");

// DOM Elements
const mumbaiMapDiv = document.getElementById('mumbai-map-div');
const suburbDiv = document.getElementById('suburb-div');
const localityDiv = document.getElementById('locality-div');
const projectsDiv = document.getElementById('projects-div');
const projectDetailsDiv = document.getElementById('project-details-div');
const hotDealsDiv = document.getElementById('hot-deals-div');
const developersDiv = document.getElementById('developers-div');
const localityName = document.getElementById('locality-name');
const suburbName = document.getElementById('suburb-name');
const projectImage = document.getElementById('project-image');
const prevImageLink = document.getElementById('prev-image');
const nextImageLink = document.getElementById('next-image');
const developersGrid = document.querySelector('.developers-grid');

// Log DOM elements for debugging
console.log("mumbaiMapDiv:", mumbaiMapDiv);
console.log("suburbDiv:", suburbDiv);
console.log("localityDiv:", localityDiv);
console.log("projectsDiv:", projectsDiv);
console.log("projectDetailsDiv:", projectDetailsDiv);
console.log("hotDealsDiv:", hotDealsDiv);
console.log("developersDiv:", developersDiv);

// List of developers
const developers = [
  "Lodha", "Seth Developers", "Prestige Group", "Kalpataru Builders", "Arkade Developers",
  "Modi Spaces", "Hiranandani", "New India", "Concord Developers", "Srushti Builders",
  "Samarth Group", "Mayfair", "Rustomjee", "Oberoi Realties", "Neelkanth Group",
  "Godrej Properties", "Brigade Group", "Mahindra Life Spaces", "Suntek Realy", "K Raheja",
  "L&T", "DLF", "Runwal", "Paranjpe", "Wascon", "J P Infra", "Shapurji Palonji", "Casa Grande",
  "Century Real Estate", "India Bulls"
];

// Function to load developers into the developers-div
function loadDevelopers() {
  console.log("Loading developers...");
  developersGrid.innerHTML = "";
  developers.forEach((dev) => {
    const button = document.createElement("button");
    button.textContent = dev;
    button.classList.add("developer-button");
    developersGrid.appendChild(button);
  });
}

// Event Listeners
document.getElementById('search-by-location').addEventListener('click', (e) => {
  console.log("Search By Location clicked!");
  e.preventDefault();
  hideAllDivs();
  mumbaiMapDiv.classList.remove('hidden');

  // Ensure the map image is loaded before adjusting button positions
  const mapImage = document.getElementById('mumbai-map');
  if (mapImage.complete) {
    adjustButtonPositions();
  } else {
    mapImage.addEventListener('load', adjustButtonPositions);
  }

  console.log("mumbaiMapDiv display:", window.getComputedStyle(mumbaiMapDiv).display);
});

document.getElementById('search-by-developer').addEventListener('click', (e) => {
  console.log("Search By Developer clicked!");
  e.preventDefault();
  hideAllDivs();
  developersDiv.classList.remove('hidden');

  // Log the class list and computed display style
  console.log("developersDiv class list:", developersDiv.classList);
  console.log("developersDiv display:", window.getComputedStyle(developersDiv).display);

  loadDevelopers();
});

// Function to handle map button clicks
function handleMapButtonClick(pos) {
  console.log(`Map button ${pos.id} clicked!`);
  hideAllDivs(); // Hide all divs first
  suburbDiv.classList.remove('hidden'); // Then show suburbDiv

  // Log the class list and computed display style
  console.log("suburbDiv class list:", suburbDiv.classList);
  console.log("suburbDiv display:", window.getComputedStyle(suburbDiv).display);

  suburbName.textContent = pos.id; // Update suburb name
}

// Function to adjust button positions based on map size
function adjustButtonPositions() {
  console.log("Adjusting button positions...");
  const map = document.getElementById('mumbai-map');
  const mapWidth = map.clientWidth;
  const mapHeight = map.clientHeight;

  if (mapWidth === 0 || mapHeight === 0) {
    console.log("Map dimensions are zero. Retrying...");
    setTimeout(adjustButtonPositions, 100); // Retry after 100ms
    return;
  }

  // Original map dimensions
  const originalMapWidth = 1200; // Width of mumbai-suburb-map.jpg
  const originalMapHeight = 1398; // Height of mumbai-suburb-map.jpg

  // Scale factors
  const scaleX = mapWidth / originalMapWidth;
  const scaleY = mapHeight / originalMapHeight;

  console.log(`Scale X: ${scaleX}, Scale Y: ${scaleY}`);

  // Button positions (x, y) in original map dimensions
  const buttonPositions = [
    { id: 'Dahisar-West', x: 325, y: 235 },
    { id: 'Dahisar-East', x: 418, y: 217 },
    { id: 'Borivali-West', x: 311, y: 312 },
    { id: 'Kandivali-West', x: 276, y: 370 },
    { id: 'Malad-West', x: 275, y: 452 },
    { id: 'Goregaon-West', x: 293, y: 534 },
    { id: 'Jogeshwari-West', x: 306, y: 599 },
    { id: 'Andheri-West', x: 238, y: 642 },
    { id: 'Parle-West', x: 274, y: 681 },
    { id: 'Santacruz-West', x: 252, y: 779 },
    { id: 'Khar-West', x: 247, y: 824 },
    { id: 'Bandra-West', x: 241, y: 867 },
    { id: 'Goregaon-East', x: 452, y: 541 },
    { id: 'Jogeshwari-East', x: 435, y: 629 },
    { id: 'Borivali-East', x: 405, y: 276 },
    { id: 'Bhandup-East', x: 723, y: 585 },
    { id: 'Ghatkopar-West', x: 541, y: 756 },
    { id: 'Sion', x: 440, y: 919 },
    { id: 'Thane-West', x: 750, y: 368 },
    { id: 'Dadar-East', x: 412, y: 1009 },
    { id: 'Parel', x: 312, y: 1054 },
    { id: 'Ghatkopar-East', x: 653, y: 799 },
  ];

  // Adjust all map buttons and attach event listeners
  buttonPositions.forEach((pos) => {
    const button = document.getElementById(pos.id);
    if (button) {
      const newLeft = pos.x * scaleX;
      const newTop = pos.y * scaleY;
      button.style.left = `${newLeft}px`;
      button.style.top = `${newTop}px`;
      console.log(`Button ${pos.id}: Left=${newLeft}, Top=${newTop}`);

      // Remove existing event listeners before adding new ones
      button.removeEventListener('click', () => handleMapButtonClick(pos));
      button.addEventListener('click', () => handleMapButtonClick(pos));
    } else {
      console.error(`Button with ID ${pos.id} not found!`);
    }
  });
}

// Add event listeners for "previous" links
document.querySelectorAll('.previous-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("Previous link clicked!");

    if (!suburbDiv.classList.contains('hidden')) {
      // If suburbDiv is visible, go back to mumbaiMapDiv
      hideAllDivs();
      mumbaiMapDiv.classList.remove('hidden');
    } else if (!localityDiv.classList.contains('hidden')) {
      // If localityDiv is visible, go back to suburbDiv
      hideAllDivs();
      suburbDiv.classList.remove('hidden');
    } else if (!projectsDiv.classList.contains('hidden')) {
      // If projectsDiv is visible, go back to localityDiv
      hideAllDivs();
      localityDiv.classList.remove('hidden');
    } else if (!projectDetailsDiv.classList.contains('hidden')) {
      // If projectDetailsDiv is visible, go back to projectsDiv
      hideAllDivs();
      projectsDiv.classList.remove('hidden');
    } else if (!developersDiv.classList.contains('hidden')) {
      // If developersDiv is visible, hide all divs
      hideAllDivs();
    }
  });
});

// Adjust button positions on window resize
window.addEventListener('resize', adjustButtonPositions);

// Hide all divs function
function hideAllDivs() {
  console.log("Hiding all divs...");
  mumbaiMapDiv.classList.add('hidden');
  suburbDiv.classList.add('hidden');
  localityDiv.classList.add('hidden');
  projectsDiv.classList.add('hidden');
  projectDetailsDiv.classList.add('hidden');
  hotDealsDiv.classList.add('hidden');
  developersDiv.classList.add('hidden');
}