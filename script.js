function startUserTracking() {

  /**
   * Inspects an HTML element and returns a user-friendly category name.
   * @param {HTMLElement} element The HTML element to analyze.
   * @returns {string} A simplified category name for the element.
   */
  const determineObjectType = (element) => {
    if (!element || !element.tagName) {
      return 'unknown';
    }

    const tagName = element.tagName.toUpperCase();

    switch (tagName) {
      case 'A':
        return 'link';
      case 'BUTTON':
        return 'button';
      case 'IMG':
        return 'image';
      case 'SELECT':
        return 'drop_down';
      case 'INPUT':
        const type = element.type.toLowerCase();
        if (['button', 'submit', 'reset'].includes(type)) {
          return 'button';
        }
        if (['checkbox', 'radio'].includes(type)) {
          return type; // 'checkbox' or 'radio'
        }
        return 'text_input'; // Catches text, password, email, etc.
      case 'TEXTAREA':
        return 'text_area';
      case 'H1': case 'H2': case 'H3': case 'H4': case 'H5': case 'H6':
        return 'heading';
      case 'P': case 'SPAN': case 'DIV': case 'LI':
        return 'text_block';
      default:
        return tagName.toLowerCase(); // Fallback to the tag name
    }
  };

  // --- 1. CAPTURE PAGE VIEW ---
  const trackPageView = () => {
    const pageViewData = {
      Timestamp_of_click_view: new Date().toISOString(),
      type_of_event: 'view',
      event_object: 'page'
    };
    console.log("Event Captured:", pageViewData);
  };

  // --- 2. CAPTURE CLICK EVENTS ---
  const handleClick = (event) => {
    const targetElement = event.target;

    const clickData = {
      Timestamp_of_click_view: new Date().toISOString(),
      type_of_event: 'click',
      event_object: determineObjectType(targetElement)
    };

    console.log("Event Captured:", clickData);
  };

  // --- 3. INITIALIZE TRACKING ---
  trackPageView(); // Log the initial page view
  document.addEventListener('click', handleClick); // Listen for all clicks

  console.log("%cAdvanced tracking has started.", "color: blue; font-weight: bold;");
}

startUserTracking();

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
