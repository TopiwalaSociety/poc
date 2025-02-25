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

  // Define click regions and their corresponding new images
  const clickRegions = [
    {
      x1: 77,  // Top-left X coordinate of region 1
      y1: 500,  // Top-left Y coordinate of region 1
      x2: 148,  // Bottom-right X coordinate of region 1
      y2: 580,  // Bottom-right Y coordinate of region 1
      imageId: "mumbai" // New image to show for this region
    },
    {
      x1: 150,  // Top-left X coordinate of region 1
      y1: 550,  // Top-left Y coordinate of region 1
      x2: 170,  // Bottom-right X coordinate of region 1
      y2: 570,  // Bottom-right Y coordinate of region 1
      imageId: "pune" // New image to show for this region
    },
    {
      x1: 215,  // Top-left X coordinate of region 1
      y1: 720,  // Top-left Y coordinate of region 1
      x2: 252,  // Bottom-right X coordinate of region 1
      y2: 740,  // Bottom-right Y coordinate of region 1
      imageId: "bangalore" // New image to show for this region
    },
    {
      x1: 215,  // Top-left X coordinate of region 1
      y1: 260,  // Top-left Y coordinate of region 1
      x2: 250,  // Bottom-right X coordinate of region 1
      y2: 275,  // Bottom-right Y coordinate of region 1
      imageId: "delhi" // New image to show for this region
    },
    {
      x1: 555,  // Top-left X coordinate of region 1
      y1: 434,  // Top-left Y coordinate of region 1
      x2: 592,  // Bottom-right X coordinate of region 1
      y2: 455,  // Bottom-right Y coordinate of region 1
      imageId: "kolkata" // New image to show for this region
    },
    {
      x1: 335,  // Top-left X coordinate of region 1
      y1: 715,  // Top-left Y coordinate of region 1
      x2: 377,  // Bottom-right X coordinate of region 1
      y2: 730,  // Bottom-right Y coordinate of region 1
      imageId: "chennai" // New image to show for this region
    },
    {
      x1: 270,  // Top-left X coordinate of region 1
      y1: 590,  // Top-left Y coordinate of region 1
      x2: 313,  // Bottom-right X coordinate of region 1
      y2: 600,  // Bottom-right Y coordinate of region 1
      imageId: "hyderabad" // New image to show for this region
    }
  ];

  // Add a click event listener to the original image
  originalImage.addEventListener('click', function(event) {
    // Get the click coordinates relative to the image
    const rect = originalImage.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    //alert('clickX: ' + clickX + ' clickY: ' + clickY);

    console.log(`Clicked at (${clickX}, ${clickY})`);

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

window.onload = function() {
  loader();
};

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
  originalImage.style.opacity = 1;
  loader();
}