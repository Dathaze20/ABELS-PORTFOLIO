/**
 * main.js
 *
 * This module serves as the main entry point for the web developer portfolio.
 * It orchestrates the loading and initialization of various components,
 * including the header, portfolio projects, blog posts, contact form handling,
 * and the music player. It also manages the display of a loading indicator
 * and handles any errors that may occur during the initialization process.
 */

import { loadPortfolio, filterProjects } from './portfolio.js';
import { loadBlog } from './blog.js';
import { handleContactForm } from './contactForm.js';
import { initMusicPlayer } from './musicPlayer.js';
import { fetchData } from './dataService.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired. Starting portfolio initialization.");

    const loadingIndicator = document.getElementById('loadingIndicator');
    const filterButton = document.getElementById('filter-button');

    loadingIndicator.style.display = 'block'; // Show loading indicator

    Promise.all([loadHeader(), loadPortfolio(), loadBlog()])
        .then(() => {
            console.log("All initial data loaded successfully.");
            loadingIndicator.style.display = 'none'; // Hide loading indicator when all sections have loaded
            initMusicPlayer(); // Initialize the music player

            filterButton.addEventListener('click', handleFilterButtonClick); // Event listener for filter button
            console.log("Filter button event listener attached.");
        })
        .catch(error => {
            console.error('Error loading initial data:', error);
            loadingIndicator.textContent = "Error loading initial data. Please try again later.";
        });

    handleContactForm(); // Initialize contact form functionality
    console.log("Contact form functionality initialized.");
});

function handleFilterButtonClick() {
    console.log("Filter button clicked.");
    const category = document.getElementById('category-filter').value;
    const tagsInput = document.getElementById('tag-filter').value;
    const tags = tagsInput.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== ''); // Remove empty strings and ensure valid values

    filterProjects(category, tags); // Call the filterProjects function
    console.log(`Filtering projects by category: ${category} and tags: ${tags.join(', ')}`);
}

async function loadHeader() {
    try {
        console.log("loadHeader() called");
        const data = await fetchData('data/header.json'); // Use dataService
        console.log("Data from header.json:", data);

        const headerTitle = document.getElementById('header-title');
        const headerSubtitle = document.getElementById('header-subtitle');

        headerTitle.textContent = data.title || "Default Title"; // Fallback to default if value is invalid
        headerSubtitle.textContent = data.subtitle || "Default Subtitle"; // Fallback to default if value is invalid

        console.log("Header title set to:", headerTitle.textContent);
        console.log("Header subtitle set to:", headerSubtitle.textContent);
    } catch (error) {
        console.error('Error loading header:', error);
        document.getElementById('header-title').textContent = "Default Title";
        document.getElementById('header-subtitle').textContent = "Default Subtitle";
    }
}

