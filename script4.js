function loader() {
  const originalImage = document.getElementById('india');
  const newImages = {
    "mumbai": document.getElementById('mumbai'),
    "pune": document.getElementById('pune'),
    "hyderabad": document.getElementById('hyderabad'),
    "kolkata": document.getElementById('kolkata'),
    "delhi": document.getElementById('delhi'),
    "chennai": document.getElementById('chennai'),
    "bangalore": document.getElementById('bangalore')
  };

  // Define click regions as percentages of the image dimensions
  const clickRegions = [
    {
      x1: 9.7,   // Top-left X coordinate of region 1 (percentage of image width)
      y1: 56.7,  // Top-left Y coordinate of region 1 (percentage of image height)
      x2: 18.6,  // Bottom-right X coordinate of region 1 (percentage of image width)
      y2: 65.8,  // Bottom-right Y coordinate of region 1 (percentage of image height)
      imageId: "mumbai" // New image to show for this region
    },
    {
      x1: 18.8,  // Top-left X coordinate of region 2
      y1: 62.4,  // Top-left Y coordinate of region 2
      x2: 21.3,  // Bottom-right X coordinate of region 2
      y2: 64.7,  // Bottom-right Y coordinate of region 2
      imageId: "pune"
    },
    {
      x1: 27.0,  // Top-left X coordinate of region 3
      y1: 81.7,  // Top-left Y coordinate of region 3
      x2: 31.6,  // Bottom-right X coordinate of region 3
      y2: 84.0,  // Bottom-right Y coordinate of region 3
      imageId: "bangalore"
    },
    {
      x1: 27.0,  // Top-left X coordinate of region 4
      y1: 29.5,  // Top-left Y coordinate of region 4
      x2: 31.4,  // Bottom-right X coordinate of region 4
      y2: 31.2,  // Bottom-right Y coordinate of region 4
      imageId: "delhi"
    },
    {
      x1: 69.6,  // Top-left X coordinate of region 5
      y1: 49.2,  // Top-left Y coordinate of region 5
      x2: 74.3,  // Bottom-right X coordinate of region 5
      y2: 51.6,  // Bottom-right Y coordinate of region 5
      imageId: "kolkata"
    },
    {
      x1: 42.0,  // Top-left X coordinate of region 6
      y1: 81.1,  // Top-left Y coordinate of region 6
      x2: 47.3,  // Bottom-right X coordinate of region 6
      y2: 82.9,  // Bottom-right Y coordinate of region 6
      imageId: "chennai"
    },
    {
      x1: 33.9,  // Top-left X coordinate of region 7
      y1: 67.0,  // Top-left Y coordinate of region 7
      x2: 39.3,  // Bottom-right X coordinate of region 7
      y2: 68.1,  // Bottom-right Y coordinate of region 7
      imageId: "hyderabad"
    }
  ];

  // Add a click event listener to the original image
  originalImage.addEventListener('click', function(event) {
    console.log("Click event fired on original image.");

    // Get the click coordinates relative to the image
    const rect = originalImage.getBoundingClientRect();
    const imageWidth = rect.width;
    const imageHeight = rect.height;
    const clickX = ((event.clientX - rect.left) / imageWidth) * 100; // Convert to percentage
    const clickY = ((event.clientY - rect.top) / imageHeight) * 100; // Convert to percentage

    console.log(`Clicked at (${clickX}%, ${clickY}%)`);

    // Check which region was clicked
    let selectedImageId = null;
    for (const region of clickRegions) {
      if (clickX >= region.x1 && clickX <= region.x2 &&
          clickY >= region.y1 && clickY <= region.y2) {
        selectedImageId = region.imageId;
        break;
      }
    }

    if (selectedImageId) {
      console.log("Selected image:", selectedImageId);

      // Fade out the original image in 5 seconds
      originalImage.style.transition = 'opacity 5s ease-in-out';
      originalImage.style.opacity = 0;

      // After fading out, hide the original image completely
      setTimeout(() => {
        originalImage.style.display = 'none';
      }, 5000);

      // Fade in the selected new image in 5 seconds
      const newImage = newImages[selectedImageId];
      newImage.style.transition = 'opacity 5s ease-in-out';
      newImage.style.opacity = 1;
      newImage.style.display = 'block'; // Ensure the new image is visible

      // Add a visual back arrow to all city images
      const backArrow = document.createElement('div');
      backArrow.className = 'back-arrow';
      document.querySelector('.image-container').appendChild(backArrow); // Append to .image-container

      // Handle back arrow click
      backArrow.addEventListener('click', function() {
        console.log("Back arrow clicked");

        // Fade out the current image
        newImage.style.transition = 'opacity 5s ease-in-out';
        newImage.style.opacity = 0;

        // After fading out, hide the current image completely
        setTimeout(() => {
          newImage.style.display = 'none';
          backArrow.remove(); // Remove the back arrow
        }, 5000);

        // Fade in the original image
        originalImage.style.transition = 'opacity 5s ease-in-out';
        originalImage.style.opacity = 1;
        originalImage.style.display = 'block'; // Ensure the original image is visible
      });
    } else {
      console.log("Clicked outside defined regions.");
    }
  });
}

window.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded.");
});

// Function to load developers overlay
function load_developers() {
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

  // Sort developers alphabetically
  developers.sort();

  // Add placeholders for 20 more names
  for (let i = 0; i < 20; i++) {
    developers.push(`Placeholder ${i + 1}`);
  }

  // Clear existing content
  overlayContent.innerHTML = "";

  // Populate the overlay with developers
  developers.forEach(dev => {
    const div = document.createElement("div");
    div.textContent = dev;
    overlayContent.appendChild(div);
  });

  // Show the overlay
  overlay.style.display = "flex";
}

// Close overlay when clicking outside
document.getElementById("overlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("overlay")) {
    document.getElementById("overlay").style.display = "none";
  }
});

function load_location() {
  const originalImage = document.getElementById('india');
  originalImage.style.display = 'block'; // Ensure the image is displayed
  originalImage.style.opacity = 1; // Fade in the image
  originalImage.style.pointerEvents = 'auto'; // Enable clicks
  loader(); // Initialize the click event listener
}