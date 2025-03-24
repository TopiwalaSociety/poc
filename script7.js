console.log("JavaScript file loaded!");

// DOM Elements
const mumbaiMapDiv = document.getElementById('mumbai-map-div');
const suburbDiv = document.getElementById('suburb-div');
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

// Data Collections
const localities = [
  "ABC Road", "BCD Coloney", "CDE Nagar", "DEF Road", "EFG Lane", 
  "FGH Road", "GHI Quarters", "HIJ Complex", "IJK Marg", "JKL Nagar",
  "KLM Complex", "LMN Street", "MNO Nagar", "NOP Road", "OPQ Nagar", 
  "PQR Coloney", "QRS Peth", "RST Nagar", "STU Marg", "TUV Road", 
  "UVW Road", "VWX Street", "WXY Coloney", "XYZ Nagar"
];

const projects = [
  "Project-001", "Project-002", "Project-003", "Project-004", "Project-005",
  "Project-006", "Project-007", "Project-008", "Project-009", "Project-010",
  "Project-011", "Project-012", "Project-013", "Project-014", "Project-015",
  "Project-016", "Project-017", "Project-018", "Project-019", "Project-020"
];

const developers = [
  "Lodha", "Seth Developers", "Prestige Group", "Kalpataru Builders", "Arkade Developers",
  "Modi Spaces", "Hiranandani", "New India", "Concord Developers", "Srushti Builders",
  "Samarth Group", "Mayfair", "Rustomjee", "Oberoi Realties", "Neelkanth Group",
  "Godrej Properties", "Brigade Group", "Mahindra Life Spaces", "Suntek Realy", "K Raheja",
  "L&T", "DLF", "Runwal", "Paranjpe", "Wascon", "J P Infra", "Shapurji Palonji", "Casa Grande",
  "Century Real Estate", "India Bulls"
];

// State variables
let currentImageIndex = 1;
let currentProjectId = '';
let currentSuburb = '';

// Initialize the application
function init() {
  loadDevelopers();
  setupEventListeners();
  setupSuburbPlaceholders();
  setupProjectPlaceholders();
  
  // Initialize map buttons
  const mapImage = document.getElementById('mumbai-map');
  if (mapImage.complete) {
    adjustButtonPositions();
  } else {
    mapImage.addEventListener('load', adjustButtonPositions);
  }
}

// Setup all event listeners
function setupEventListeners() {
  // Main navigation
  document.getElementById('search-by-location').addEventListener('click', (e) => {
    e.preventDefault();
    hideAllDivs();
    mumbaiMapDiv.classList.remove('hidden');
  });

  document.getElementById('search-by-developer').addEventListener('click', (e) => {
    e.preventDefault();
    hideAllDivs();
    developersDiv.classList.remove('hidden');
  });

  document.getElementById('hot-deals-link').addEventListener('click', (e) => {
    e.preventDefault();
    hideAllDivs();
    hotDealsDiv.classList.remove('hidden');
  });

  // Previous links
  document.querySelectorAll('.previous-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      handleBackNavigation();
    });
  });

  // Project image navigation
  prevImageLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentImageIndex > 1) {
      currentImageIndex--;
      updateProjectImage();
    }
  });

  nextImageLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentImageIndex < 5) {
      currentImageIndex++;
      updateProjectImage();
    }
  });

  // Window resize
  window.addEventListener('resize', adjustButtonPositions);
}

// Setup suburb placeholders
function setupSuburbPlaceholders() {
  const placeholders = document.querySelectorAll('#suburb-div .image-placeholder-location');
  placeholders.forEach(placeholder => {
    placeholder.addEventListener('click', () => {
      hideAllDivs();
      projectsDiv.classList.remove('hidden');
      setupProjectsContent();
    });
  });
}

// Setup project placeholders
function setupProjectPlaceholders() {
  const placeholders = document.querySelectorAll('#projects-div .image-placeholder');
  placeholders.forEach(placeholder => {
    placeholder.addEventListener('click', () => {
      currentProjectId = placeholder.id;
      currentImageIndex = 1;
      hideAllDivs();
      projectDetailsDiv.classList.remove('hidden');
      updateProjectImage();
    });
  });
}

// Handle map button click
function handleMapButtonClick(pos) {
  hideAllDivs();
  suburbDiv.classList.remove('hidden');
  currentSuburb = pos.id;
  suburbName.textContent = currentSuburb;
  
  // Setup locality content
  const placeholders = document.querySelectorAll('#suburb-div .image-placeholder-location');
  const randomLocalities = getRandomItems(localities, placeholders.length);
  
  placeholders.forEach((placeholder, index) => {
    const name = randomLocalities[index];
    const nameParts = name.split(' ');
    const formattedName = nameParts.length > 1 
      ? `${nameParts.slice(0, -1).join(' ')}<br>${nameParts[nameParts.length - 1]}`
      : name;
    
    placeholder.id = name.replace(/\s+/g, '-');
    placeholder.innerHTML = `<div class="locality-name">${formattedName}</div>`;
  });
}

// Setup projects content
function setupProjectsContent() {
  const placeholders = document.querySelectorAll('#projects-div .image-placeholder');
  const randomProjects = getRandomItems(projects, placeholders.length);
  
  placeholders.forEach((placeholder, index) => {
    const project = randomProjects[index];
    placeholder.id = project;
    placeholder.innerHTML = `
      <img src="${project}.png" alt="${project}" class="project-image">
      <div class="project-name">${project}</div>
    `;
  });
}

// Update project image in details view
function updateProjectImage() {
  const imageSrc = `${currentProjectId}${currentImageIndex}.jpg`;
  projectImage.src = imageSrc;
  projectImage.alt = `${currentProjectId} - Image ${currentImageIndex}`;
  
  // Show/hide navigation arrows
  prevImageLink.style.display = currentImageIndex === 1 ? 'none' : 'block';
  nextImageLink.style.display = currentImageIndex === 5 ? 'none' : 'block';
}

// Handle back navigation
function handleBackNavigation() {
  if (!projectDetailsDiv.classList.contains('hidden')) {
    hideAllDivs();
    projectsDiv.classList.remove('hidden');
  } 
  else if (!projectsDiv.classList.contains('hidden')) {
    hideAllDivs();
    suburbDiv.classList.remove('hidden');
  } 
  else if (!suburbDiv.classList.contains('hidden')) {
    hideAllDivs();
    mumbaiMapDiv.classList.remove('hidden');
  } 
  else {
    hideAllDivs();
  }
}

// Get random items from array
function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Load developers
function loadDevelopers() {
  developersGrid.innerHTML = "";
  developers.forEach((dev) => {
    const button = document.createElement("button");
    button.textContent = dev;
    button.classList.add("developer-button");
    developersGrid.appendChild(button);
  });
}

// Adjust map button positions
function adjustButtonPositions() {
  const map = document.getElementById('mumbai-map');
  const mapWidth = map.clientWidth;
  const mapHeight = map.clientHeight;

  if (mapWidth === 0 || mapHeight === 0) {
    setTimeout(adjustButtonPositions, 100);
    return;
  }

  const originalMapWidth = 1200;
  const originalMapHeight = 1398;
  const scaleX = mapWidth / originalMapWidth;
  const scaleY = mapHeight / originalMapHeight;

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

  buttonPositions.forEach((pos) => {
    const button = document.getElementById(pos.id);
    if (button) {
      button.style.left = `${pos.x * scaleX}px`;
      button.style.top = `${pos.y * scaleY}px`;
      button.onclick = () => handleMapButtonClick(pos);
    }
  });
}

// Hide all divs
function hideAllDivs() {
  mumbaiMapDiv.classList.add('hidden');
  suburbDiv.classList.add('hidden');
  projectsDiv.classList.add('hidden');
  projectDetailsDiv.classList.add('hidden');
  hotDealsDiv.classList.add('hidden');
  developersDiv.classList.add('hidden');
}

// Initialize the app
window.addEventListener('load', init);