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
  e.preventDefault();
  hideAllDivs();
  mumbaiMapDiv.classList.remove('hidden');
});

document.getElementById('search-by-developer').addEventListener('click', (e) => {
  e.preventDefault();
  hideAllDivs();
  developersDiv.classList.remove('hidden');
  loadDevelopers();
});

document.getElementById('hot-deals-link').addEventListener('click', (e) => {
  e.preventDefault();
  hideAllDivs();
  hotDealsDiv.classList.remove('hidden');
});

document.querySelectorAll('.map-button').forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.add('active');
    setTimeout(() => {
      hideAllDivs();
      suburbDiv.classList.remove('hidden');
      suburbName.textContent = button.id;
    }, 1000);
  });
});

document.querySelectorAll('#suburb-div .image-placeholder').forEach((placeholder) => {
  placeholder.addEventListener('click', () => {
    hideAllDivs();
    localityDiv.classList.remove('hidden');
  });
});

document.querySelectorAll('#locality-div .image-placeholder').forEach((placeholder) => {
  placeholder.addEventListener('click', () => {
    const locality = `Locality ${placeholder.getAttribute('data-index')}`;
    localityName.textContent = locality;
    hideAllDivs();
    projectsDiv.classList.remove('hidden');
  });
});

document.querySelectorAll('#projects-div .image-placeholder').forEach((placeholder) => {
  placeholder.addEventListener('click', () => {
    hideAllDivs();
    projectDetailsDiv.classList.remove('hidden');
    projectImage.src = `project-image-${placeholder.getAttribute('data-index')}.jpg`;
  });
});

document.querySelectorAll('.previous-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (suburbDiv.classList.contains('hidden') === false) {
      hideAllDivs();
      mumbaiMapDiv.classList.remove('hidden');
    } else if (localityDiv.classList.contains('hidden') === false) {
      hideAllDivs();
      suburbDiv.classList.remove('hidden');
    } else if (projectsDiv.classList.contains('hidden') === false) {
      hideAllDivs();
      localityDiv.classList.remove('hidden');
    } else if (projectDetailsDiv.classList.contains('hidden') === false) {
      hideAllDivs();
      projectsDiv.classList.remove('hidden');
    } else if (hotDealsDiv.classList.contains('hidden') === false) {
      hideAllDivs();
    } else if (developersDiv.classList.contains('hidden') === false) {
      hideAllDivs();
    }
  });
});

const images = ['project-image-1.jpg', 'project-image-2.jpg', 'project-image-3.jpg'];
let currentImageIndex = 0;

prevImageLink.addEventListener('click', (e) => {
  e.preventDefault();
  if (currentImageIndex > 0) {
    currentImageIndex--;
    projectImage.src = images[currentImageIndex];
  }
});

nextImageLink.addEventListener('click', (e) => {
  e.preventDefault();
  if (currentImageIndex < images.length - 1) {
    currentImageIndex++;
    projectImage.src = images[currentImageIndex];
  }
});

function hideAllDivs() {
  mumbaiMapDiv.classList.add('hidden');
  suburbDiv.classList.add('hidden');
  localityDiv.classList.add('hidden');
  projectsDiv.classList.add('hidden');
  projectDetailsDiv.classList.add('hidden');
  hotDealsDiv.classList.add('hidden');
  developersDiv.classList.add('hidden');
}