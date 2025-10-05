// This event listener ensures the script runs only after the HTML document is fully loaded.
document.addEventListener('DOMContentLoaded', function() {

  // --- Logic for the live clock ---
  function startTime() {
    const today = new Date();
    const clockElement = document.getElementById('txt');

    // Check if the clock element exists before trying to update it
    if (clockElement) {
      // This replicates the original behavior of showing the full date string
      clockElement.innerHTML = today.toString();
    }

    // The function will call itself every 1000 milliseconds (1 second)
    setTimeout(startTime, 1000);
  }

  // This function is defined but was not used in the original clock logic.
  // It's kept here in case you want to format the time differently (e.g., HH:MM:SS).
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i; // add zero in front of numbers < 10
    }
    return i;
  }

  // --- Logic for the last updated date ---
  // Note: The HTML element with id="lastUpdated" is commented out.
  // This code will not cause an error, but it won't display anything unless you
  // uncomment that <p> tag in your index.html file.
  const lastUpdatedElement = document.getElementById("lastUpdated");
  if (lastUpdatedElement) {
    const lastModified = new Date(document.lastModified);
    const formattedDate = lastModified.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    lastUpdatedElement.innerHTML += formattedDate;
  }

  // --- Start the clock ---
  startTime();

});
