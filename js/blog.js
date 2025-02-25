import { fetchData } from './dataService.js';

export const loadBlog = async () => {
    try {
        const data = await fetchData();
        const blogSection = document.getElementById('blog');
        data.blog.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>Date: ${post.date}, Author: ${post.author}</p>
                <p>${post.content}</p>
                ${post.image ? `<img src="${post.image}" alt="${post.title}" width="200" loading="lazy">` : ''}
                ${post.video ? `<video src="${post.video}" controls width="400" loading="lazy"></video>` : ''}
            `;
            blogSection.appendChild(postDiv);
        });
    } catch (error) {
        console.error('Error loading blog:', error);
        const blogSection = document.getElementById('blog');
        blogSection.innerHTML = '<p>Error loading blog. Please try again later.</p>';
    }
};