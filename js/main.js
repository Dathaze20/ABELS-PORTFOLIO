/**
 * main.js
 *
 * This module serves as the main entry point for the web developer portfolio.
 * It orchestrates the loading and initialization of various components,
 * including the header, portfolio projects, blog posts, contact form handling,
 * and the music player. It also manages the display of a loading indicator
 * and handles any errors that may occur during the initialization process.
 */

/**
 * The code is now more precise to address that the imports must exist.
 */
import {
    loadPortfolio,
    filterProjects
} from './portfolio.js';
// Import all the other functions to know there are all real.
import {
    loadBlog
} from './blog.js';
import {
    handleContactForm
} from './contactForm.js';
import {
    initMusicPlayer
} from './musicPlayer.js';
import {
    fetchData
} from './dataService.js';

/**
 * Executes when the DOM is fully loaded, orchestrating the initialization of the
 * portfolio. It loads the header content, portfolio projects, and blog posts concurrently,
 * manages a loading indicator, initializes the music player, attaches the event
 * listener to the filter button, and handles any errors during the process.
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired. Starting portfolio initialization.");

    // 1.  Get DOM Elements - Get the key static DOM elements
    const loadingIndicator = document.getElementById('loadingIndicator');
    const filterButton = document.getElementById('filter-button');

    // 2. Set Initial UI State - Shows loading indicator and clears content
    loadingIndicator.style.display = 'block'; // Show loading indicator

    // 3. Load Data and Initialize Components - Call all JS files

    // Use Promise.all to load the JS files
    Promise.all([
            loadHeader(),
            loadPortfolio(),
            loadBlog()
        ])
        .then(() => {
            console.log("All initial data loaded successfully.");
            loadingIndicator.style.display = 'none'; // Hide loading indicator when all sections have loaded
            initMusicPlayer(); // Initialize the music player

            // 4. Attach Event Listeners (after content is loaded)

            // Attaches event listener to the filter button to filter projects
            filterButton.addEventListener('click', handleFilterButtonClick); // Event listener for filter button
            console.log("Filter button event listener attached.");
        })
        .catch(error => {
            //Show the error and stop the load so the user knows something is wrong.
            console.error('Error loading initial data:', error);
            loadingIndicator.textContent = "Error loading initial data. Please try again later.";
        });

    // 5. Initialize other functionality - Start processes.

    handleContactForm(); // Initialize contact form functionality
    console.log("Contact form functionality initialized.");
});

/**
 * Handles the click event for the filter button. It retrieves the selected
 * category and tags from the filter inputs, trims the tags, and then calls
 * the filterProjects function to filter the portfolio items.
 */
function handleFilterButtonClick() {
    console.log("Filter button clicked.");
    const category = document.getElementById('category-filter').value;
    const tagsInput = document.getElementById('tag-filter').value;
    // 1. Split and clean tags
    const tags = tagsInput.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== ''); //removes empty strings and ensures that only valid values stay.

    //2. Execute filter
    filterProjects(category, tags); // Call the filterProjects function

    // 3. Log results in the console.
    console.log(`Filtering projects by category: ${category} and tags: ${tags.join(', ')}`);
}

/**
 * Loads the header content from the header.json file using the dataService module.
 * It updates the header title and subtitle elements with the loaded data and provides
 * fallback default values in case of errors.
 */
async function loadHeader() {
    try {
        console.log("loadHeader() called");

        // 1. Get data
        const data = await fetchData('data/header.json'); // Use dataService
        console.log("Data from header.json:", data);

        // 2. Get the DOM static elements from the index file.
        const headerTitle = document.getElementById('header-title');
        const headerSubtitle = document.getElementById('header-subtitle');

        // 3. Set all the data, if its not valid set the fallbacks to default.
        headerTitle.textContent = data.title || "Default Title"; //If the value is valid set that value if not, set "Default Title"
        headerSubtitle.textContent = data.subtitle || "Default Subtitle"; //If the value is valid set that value if not, set "Default Subtitle"

        // 4. If all goes well log the header title and header Subtitle to the console.
        console.log("Header title set to:", headerTitle.textContent);
        console.log("Header subtitle set to:", headerSubtitle.textContent);
    } catch (error) {
        console.error('Error loading header:', error);
        document.getElementById('header-title').textContent = "Default Title";
        document.getElementById('header-subtitle').textContent = "Default Subtitle";
    }
}

/**
 * Asynchronously fetches data from a given URL, parses it as JSON, and returns the result.
 * Provides robust error handling, logging, and re-throwing of errors for higher-level
 * error management.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} A promise that resolves with the parsed JSON data.
 * @throws {Error} If there's an HTTP error or if the data fetching fails.
 */
export async function fetchData(url) {
    try {
        console.log(`Fetching data from: ${url}`);
        // 1. Try to get the data from the URL.
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // 2. Parse data into JSON format.
        const data = await response.json();
        // 3.Log for a successful load
        console.log(`Data fetched successfully from: ${url}`);

        // 4. return to the code
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        throw error; // Re-throw the error so the calling function knows about it.
    }
}