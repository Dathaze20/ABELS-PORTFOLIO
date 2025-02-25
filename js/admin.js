document.getElementById('photoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Handle photo upload
    const title = document.getElementById('photoTitle').value;
    const file = document.getElementById('photoFile').files[0];
    console.log('Photo Title:', title);
    console.log('Photo File:', file);
    // Add your upload logic here
});

document.getElementById('videoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Handle video upload
    const title = document.getElementById('videoTitle').value;
    const file = document.getElementById('videoFile').files[0];
    console.log('Video Title:', title);
    console.log('Video File:', file);
    // Add your upload logic here
});

document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Handle project upload
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;
    const file = document.getElementById('projectFile').files[0];
    console.log('Project Title:', title);
    console.log('Project Description:', description);
    console.log('Project File:', file);
    // Add your upload logic here
});