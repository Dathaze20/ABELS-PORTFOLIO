import { fetchData } from './dataService.js';

export const loadPortfolio = async () => {
    try {
        const data = await fetchData();
        const portfolioSection = document.getElementById('portfolio');
        data.portfolio.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}">View Project</a>
            `;
            portfolioSection.appendChild(projectDiv);
        });
    } catch (error) {
        console.error('Error loading portfolio:', error);
        const portfolioSection = document.getElementById('portfolio');
        portfolioSection.innerHTML = '<p>Error loading portfolio. Please try again later.</p>';
    }
};