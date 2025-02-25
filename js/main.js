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
        console.log("loadHeader() called");
        const data = await fetchData('data/header.json'); // Use dataService
        console.log("Data from header.json:", data);
        document.getElementById('header-title').textContent = data.title || "Default Title";
        document.getElementById('header-subtitle').textContent = data.subtitle || "Default Subtitle";
        console.log("Header title set to:", document.getElementById('header-title').textContent);
        console.log("Header subtitle set to:", document.getElementById('header-subtitle').textContent);
    } catch (error) {
        console.error('Error loading header:', error);
        document.getElementById('header-title').textContent = "Default Title";
        document.getElementById('header-subtitle').textContent = "Default Subtitle";
    }
}

export async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error so the calling function knows about it
    }
  }