// DOM Elements
const mumbaiMapDiv = document.getElementById('mumbai-map-div');
const suburbDiv = document.getElementById('suburb-div');
const localityDiv = document.getElementById('locality-div');
const projectsDiv = document.getElementById('projects-div');
const projectDetailsDiv = document.getElementById('project-details-div');
const localityName = document.getElementById('locality-name');
const suburbName = document.getElementById('suburb-name');
const projectImage = document.getElementById('project-image');
const prevImageLink = document.getElementById('prev-image');
const nextImageLink = document.getElementById('next-image');
const overlay = document.getElementById("overlay");
const overlayContent = document.getElementById("overlay-content");

// List of developers
const developers = [
  "Lodha", "Seth Developers", "Prestige Group", "Kalpataru Builders", "Arkade Developers",
  "Modi Spaces", "Hiranandani", "New India", "Concord Developers", "Srushti Builders",
  "Samarth Group", "Mayfair", "Rustomjee", "Oberoi Realties", "Neelkanth Group",
  "Godrej Properties", "Brigade Group", "Mahindra Life Spaces", "Suntek Realy", "K Raheja",
  "L&T", "DLF", "Runwal", "Paranjpe", "Wascon", "J P Infra", "Shapurji Palonji", "Casa Grande",
  "Century Real Estate", "India Bulls"
];

// Function to load developers into the overlay
function load_developers() {
  // Clear existing content
  overlayContent.innerHTML = "";

  // Create buttons for each developer
  developers.forEach((dev) => {
    const button = document.createElement("button");
    button.textContent = dev;
    button.classList.add("developer-button");
    overlayContent.appendChild(button);
  });

  // Show the overlay
  overlay.style.display = "flex";
}

// Event listener for "Search By Developer" link
document.getElementById("search-by-developer").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default link behavior
  load_developers();
});

// Close overlay when clicking outside
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});

// Event Listeners
document.getElementById('search-by-location').addEventListener('click', () => {
  mumbaiMapDiv.classList.remove('hidden');
});

// Add event listeners for suburb buttons
document.querySelectorAll('.map-button').forEach((button) => {
  button.addEventListener('click', () => {
    mumbaiMapDiv.classList.add('hidden');
    suburbDiv.classList.remove('hidden');
    suburbName.textContent = button.id;
  });
});

document.querySelectorAll('#suburb-div .image-placeholder').forEach((placeholder) => {
  placeholder.addEventListener('click', () => {
    suburbDiv.classList.add('hidden');
    localityDiv.classList.remove('hidden');
  });
});

document.querySelectorAll('#locality-div .image-placeholder').forEach((placeholder) => {
  placeholder.addEventListener('click', () => {
    const locality = `Locality ${placeholder.getAttribute('data-index')}`;
    localityName.textContent = locality;
    localityDiv.classList.add('hidden');
    projectsDiv.classList.remove('hidden');
  });
});

document.querySelectorAll('#projects-div .image-placeholder').forEach((placeholder) => {
  placeholder.addEventListener('click', () => {
    projectsDiv.classList.add('hidden');
    projectDetailsDiv.classList.remove('hidden');
    projectImage.src = `project-image-${placeholder.getAttribute('data-index')}.jpg`;
  });
});

document.querySelectorAll('.previous-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (suburbDiv.classList.contains('hidden') === false) {
      suburbDiv.classList.add('hidden');
      mumbaiMapDiv.classList.remove('hidden');
    } else if (localityDiv.classList.contains('hidden') === false) {
      localityDiv.classList.add('hidden');
      suburbDiv.classList.remove('hidden');
    } else if (projectsDiv.classList.contains('hidden') === false) {
      projectsDiv.classList.add('hidden');
      localityDiv.classList.remove('hidden');
    } else if (projectDetailsDiv.classList.contains('hidden') === false) {
      projectDetailsDiv.classList.add('hidden');
      projectsDiv.classList.remove('hidden');
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