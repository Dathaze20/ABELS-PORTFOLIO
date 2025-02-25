<script type="module" src="js/main.js"></script>

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

const data = {
    "title": "Abel Arroyo - Portfolio",
    "subtitle": "Web Developer & Designer",
    "portfolio": [
        {
            "title": "Project 1",
            "description": "Description of project 1",
            "link": "http://example.com/project1"
        },
        {
            "title": "Project 2",
            "description": "Description of project 2",
            "link": "http://example.com/project2"
        }
    ],
    "blog": [
        {
            "title": "Blog Post 1",
            "date": "2025-02-25",
            "author": "Abel Arroyo",
            "content": "Content of blog post 1",
            "image": "path/to/image1.jpg",
            "video": "path/to/video1.mp4"
        },
        {
            "title": "Blog Post 2",
            "date": "2025-02-24",
            "author": "Abel Arroyo",
            "content": "Content of blog post 2",
            "image": "path/to/image2.jpg",
            "video": "path/to/video2.mp4"
        }
    ]
};