// DOM Elements
const mumbaiMapDiv = document.getElementById('mumbai-map-div');
const suburbDiv = document.getElementById('suburb-div');
const projectsDiv = document.getElementById('projects-div');
const projectDetailsDiv = document.getElementById('project-details-div');
const hotDealsDiv = document.getElementById('hot-deals-div');
const developersDiv = document.getElementById('developers-div');
const projectsDeveloperDiv = document.getElementById('projects-developer-div');
const localityName = document.getElementById('locality-name');
const suburbName = document.getElementById('suburb-name');
const developerNameSpan = document.getElementById('developer-name');
const projectImage = document.getElementById('project-image');
const prevImageLink = document.getElementById('prev-image');
const nextImageLink = document.getElementById('next-image');
const developersGrid = document.querySelector('.developers-grid');

// OTP Flow Elements
const otpScreen = document.getElementById('otp-screen');
const budgetSelection = document.getElementById('budget-selection');
const otpEntry = document.getElementById('otp-entry');
const mobileInput = document.getElementById('mobile-number');
const otpInput = document.getElementById('otp-input');
const sendOtpBtn = document.getElementById('send-otp');
const resendOtpBtn = document.getElementById('resend-otp');
const verifyOtpBtn = document.getElementById('verify-otp');
const budgetNextBtn = document.getElementById('budget-next');
const otpVerifiedField = document.getElementById('otp-verified');
const mainLinks = document.querySelector('.links');

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

// Project Image Collections
const projectCollections = {
  project1: ['Project1-1', 'Project2-1', 'Project3-1', 'Project4-1', 'Project5-1'],
  project2: ['Project1-2', 'Project2-2', 'Project3-2', 'Project4-2', 'Project5-2'],
  project3: ['Project1-3', 'Project2-3', 'Project3-3', 'Project4-3', 'Project5-3'],
  project4: ['Project1-4', 'Project2-4', 'Project3-4', 'Project4-4', 'Project5-4'],
  project5: ['Project1-5', 'Project2-5', 'Project3-5', 'Project4-5', 'Project5-5']
};

// State variables
let currentImageIndex = 1;
let currentProjectId = '';
let currentSuburb = '';
let currentDeveloper = '';

// Initialize the application
function init() {
  // Update navigation link texts
  document.getElementById('search-by-location').textContent = 'Locations';
  document.getElementById('search-by-developer').textContent = 'Developers';
  document.getElementById('hot-deals-link').textContent = 'Hot Deals';

  // Hide all elements except banner
  document.querySelectorAll('.container > div:not(.banner)').forEach(div => {
    div.classList.add('hidden');
  });
  
  // Show banner
  document.querySelector('.banner').classList.remove('hidden');
  
  // Check if already verified
  if (otpVerifiedField.value === 'yes') {
    otpScreen.classList.add('hidden');
    mainLinks.classList.remove('hidden');
    mainLinks.classList.add('verified');
  } else {
    otpScreen.classList.remove('hidden');
    mainLinks.classList.remove('verified');
  }

  // Setup OTP flow
  setupOTPEvents();
  
  loadDevelopers();
  setupEventListeners();
  setupSuburbPlaceholders();
  setupProjectPlaceholders();
  
  const mapImage = document.getElementById('mumbai-map');
  if (mapImage.complete) {
    adjustButtonPositions();
  } else {
    mapImage.addEventListener('load', adjustButtonPositions);
  }
}

// OTP Flow Handlers
function setupOTPEvents() {
  budgetNextBtn.addEventListener('click', () => {
    budgetSelection.classList.add('hidden');
    otpEntry.classList.remove('hidden');
  });

  sendOtpBtn.addEventListener('click', () => {
    if (mobileInput.value.length > 0) {
      document.getElementById('otp-group').classList.remove('hidden');
      sendOtpBtn.classList.add('hidden');
      resendOtpBtn.classList.remove('hidden');
    }
  });

  otpInput.addEventListener('input', (e) => {
    verifyOtpBtn.disabled = e.target.value.length < 1;
  });

  verifyOtpBtn.addEventListener('click', () => {
    otpVerifiedField.value = 'yes';
    otpScreen.classList.add('hidden');
    mainLinks.classList.remove('hidden');
    mainLinks.classList.add('verified');
  });

  resendOtpBtn.addEventListener('click', () => {
    alert('OTP resent to ' + mobileInput.value);
  });
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
    setupHotDealsContent();
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
  const randomLocalities = getRandomItems(localities, placeholders.length);
  
  placeholders.forEach((placeholder, index) => {
    const name = randomLocalities[index];
    placeholder.id = name.replace(/\s+/g, '-');
    placeholder.innerHTML = `
      <div class="locality-name">${name}</div>
    `;
    placeholder.addEventListener('click', function() {
      localityName.textContent = name;
      hideAllDivs();
      projectsDiv.classList.remove('hidden');
      setupProjectsContent();
    });
  });
}

// Setup all project placeholders
function setupProjectPlaceholders() {
  // Projects div
  document.querySelectorAll('#projects-div .image-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', function() {
      currentProjectId = this.id;
      currentImageIndex = 1;
      hideAllDivs();
      projectDetailsDiv.classList.remove('hidden');
      updateProjectImage();
    });
  });
  
  // Developer projects
  document.querySelectorAll('#projects-developer-div .image-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', function() {
      currentProjectId = this.id;
      currentImageIndex = 1;
      hideAllDivs();
      projectDetailsDiv.classList.remove('hidden');
      updateProjectImage();
    });
  });
  
  // Hot deals projects
  document.querySelectorAll('#hot-deals-div .image-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', function() {
      currentProjectId = this.id;
      currentImageIndex = 1;
      hideAllDivs();
      projectDetailsDiv.classList.remove('hidden');
      updateProjectImage();
    });
  });
}

// Load developers with click handlers
function loadDevelopers() {
  developersGrid.innerHTML = "";
  developers.forEach((dev) => {
    const button = document.createElement("button");
    button.textContent = dev;
    button.classList.add("developer-button");
    button.addEventListener('click', () => showDeveloperProjects(dev));
    developersGrid.appendChild(button);
  });
}

// Show projects for a specific developer
function showDeveloperProjects(developer) {
  currentDeveloper = developer;
  hideAllDivs();
  projectsDeveloperDiv.classList.remove('hidden');
  developerNameSpan.textContent = developer;
  
  const placeholders = document.querySelectorAll('#projects-developer-div .image-placeholder');
  const randomProjects = getRandomItems(projects, placeholders.length);
  
  placeholders.forEach((placeholder, index) => {
    const project = randomProjects[index];
    placeholder.id = project;
    placeholder.innerHTML = `
      <img src="${project}.jpg" alt="${project}" class="project-image">
      <div class="project-name">${project}</div>
    `;
  });
}

// Setup hot deals content
function setupHotDealsContent() {
  const placeholders = document.querySelectorAll('#hot-deals-div .image-placeholder');
  const randomProjects = getRandomItems(projects, placeholders.length);
  
  placeholders.forEach((placeholder, index) => {
    const project = randomProjects[index];
    placeholder.id = project;
    placeholder.innerHTML = `
      <img src="${project}.jpg" alt="${project}" class="project-image">
      <div class="project-name">${project}</div>
    `;
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
      <img src="${project}.jpg" alt="${project}" class="project-image">
      <div class="project-name">${project}</div>
    `;
  });
}

// Update project image in details view
function updateProjectImage() {
  const collectionKeys = Object.keys(projectCollections);
  const currentCollection = projectCollections[collectionKeys[currentImageIndex - 1]];
  const randomImage = currentCollection[Math.floor(Math.random() * currentCollection.length)];
  
  projectImage.src = `${randomImage}.jpg`;
  projectImage.alt = `${randomImage}`;
  
  // Show/hide navigation arrows
  prevImageLink.style.display = currentImageIndex === 1 ? 'none' : 'block';
  nextImageLink.style.display = currentImageIndex === 5 ? 'none' : 'block';
}

// Handle back navigation
function handleBackNavigation() {
  if (!projectDetailsDiv.classList.contains('hidden')) {
    hideAllDivs();
    if (document.querySelector(`#projects-div #${currentProjectId}`)) {
      projectsDiv.classList.remove('hidden');
    } 
    else if (document.querySelector(`#projects-developer-div #${currentProjectId}`)) {
      projectsDeveloperDiv.classList.remove('hidden');
    }
    else if (document.querySelector(`#hot-deals-div #${currentProjectId}`)) {
      hotDealsDiv.classList.remove('hidden');
    }
  } 
  else if (!projectsDiv.classList.contains('hidden')) {
    hideAllDivs();
    suburbDiv.classList.remove('hidden');
  }
  else if (!projectsDeveloperDiv.classList.contains('hidden')) {
    hideAllDivs();
    developersDiv.classList.remove('hidden');
  }
  else if (!hotDealsDiv.classList.contains('hidden')) {
    hideAllDivs();
  }
  else if (!suburbDiv.classList.contains('hidden')) {
    hideAllDivs();
    mumbaiMapDiv.classList.remove('hidden');
  } 
  else if (!developersDiv.classList.contains('hidden')) {
    hideAllDivs();
  }
}

// Get random items from array
function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
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

function handleMapButtonClick(pos) {
  hideAllDivs();
  suburbDiv.classList.remove('hidden');
  currentSuburb = pos.id;
  suburbName.textContent = currentSuburb.replace(/-/g, ' ');
  setupSuburbPlaceholders();
}

// Hide all divs function
function hideAllDivs() {
  document.querySelectorAll('.container > div:not(.banner):not(.links.verified)').forEach(div => {
    div.classList.add('hidden');
  });
}

// Initialize the app
window.addEventListener('load', init);