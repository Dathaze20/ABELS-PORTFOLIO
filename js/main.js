import { loadPortfolio } from './portfolio.js';
import { loadBlog } from './blog.js';
import { handleContactForm } from './contactForm.js';
import { initMusicPlayer } from './musicPlayer.js';
import { fetchData } from './dataService.js';

document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';

    Promise.all([loadHeader(), loadPortfolio(), loadBlog()])
        .then(() => {
            loadingIndicator.style.display = 'none';
            initMusicPlayer();
        })
        .catch(error => {
            console.error('Error loading initial data:', error);
            loadingIndicator.textContent = "Error loading initial data. Please try again later.";
        });

    handleContactForm();
});

async function loadHeader() {
    try {
        const response = await fetch('data/header.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById('header-title').textContent = data.title || "Default Title"; // Provide default if data is missing
        document.getElementById('header-subtitle').textContent = data.subtitle || "Default Subtitle";
    } catch (error) {
        console.error('Error loading header:', error);
        document.getElementById('header-title').textContent = "Default Title";
        document.getElementById('header-subtitle').textContent = "Default Subtitle";
    }
}