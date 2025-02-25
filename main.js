import { loadPortfolio } from './portfolio.js';
import { loadBlog } from './blog.js';
import { handleContactForm } from './contactForm.js';
import './musicPlayer.js';
import { fetchData } from './dataService.js';

document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';

    Promise.all([loadHeader(), loadPortfolio(), loadBlog()])
        .then(() => {
            loadingIndicator.style.display = 'none';
        })
        .catch(error => {
            console.error('Error loading data:', error);
            loadingIndicator.textContent = "Error loading data. Please try again later.";
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
        document.getElementById('header-title').textContent = data.title;
        document.getElementById('header-subtitle').textContent = data.subtitle;
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

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

export const handleContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            formMessage.textContent = 'Thank you for your message!';
            formMessage.style.color = 'green';
            contactForm.reset();
        } else {
            formMessage.textContent = 'Please fill out all fields.';
            formMessage.style.color = 'red';
        }
    });
};

let audio = new Audio();
let trackList = [
    {title: "Track 1", artist: "Artist 1", file: "track1.mp3", art: "art1.jpg"},
    {title: "Track 2", artist: "Artist 2", file: "track2.mp3", art: "art2.jpg"},
    {title: "Track 3", artist: "Artist 3", file: "track3.mp3", art: "art3.jpg"}
];
let currentTrack = 0;
let isShuffle = false;
let isRepeat = false;

function loadTrack(trackIndex) {
    audio.src = trackList[trackIndex].file;
    document.getElementById('track-title').textContent = trackList[trackIndex].title;
    document.getElementById('artist').textContent = trackList[trackIndex].artist;
    document.getElementById('album-art').src = trackList[trackIndex].art;
    audio.load();
}

document.getElementById('play-pause').addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        this.textContent = 'Pause';
    } else {
        audio.pause();
        this.textContent = 'Play';
    }
});

document.getElementById('next-track').addEventListener('click', function() {
    if (isShuffle) {
        currentTrack = Math.floor(Math.random() * trackList.length);
    } else {
        currentTrack = (currentTrack + 1) % trackList.length;
    }
    loadTrack(currentTrack);
    audio.play();
    document.getElementById('play-pause').textContent = 'Pause';
});

document.getElementById('prev-track').addEventListener('click', function() {
    currentTrack = (currentTrack - 1 + trackList.length) % trackList.length;
    loadTrack(currentTrack);
    audio.play();
    document.getElementById('play-pause').textContent = 'Pause';
});

document.getElementById('shuffle').addEventListener('click', function() {
    isShuffle = !isShuffle;
    this.classList.toggle('active', isShuffle);
});

document.getElementById('repeat').addEventListener('click', function() {
    isRepeat = !isRepeat;
    this.classList.toggle('active', isRepeat);
});

audio.addEventListener('ended', function() {
    if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
    } else {
        document.getElementById('next-track').click();
    }
});

document.getElementById('progress-bar').addEventListener('input', function() {
    audio.currentTime = (audio.duration * this.value) / 100;
});

audio.addEventListener('timeupdate', function() {
    document.getElementById('progress-bar').value = (audio.currentTime / audio.duration) * 100;
});

document.getElementById('volume-control').addEventListener('input', function() {
    audio.volume = this.value;
});

loadTrack(currentTrack); // Load the first track

export const fetchData = async () => {
    try {
        const response = await fetch('data/data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw to allow components to handle the error as well
    }
};

<script type="module" src="js/main.js"></script>