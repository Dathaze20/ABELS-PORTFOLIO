export function initMusicPlayer() {
    let audio = new Audio();
    let trackList = [
        { title: "Track 1", artist: "Artist 1", file: "track1.mp3", art: "art1.jpg" },
        { title: "Track 2", artist: "Artist 2", file: "track2.mp3", art: "art2.jpg" },
        { title: "Track 3", artist: "Artist 3", file: "track3.mp3", art: "art3.jpg" }
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

    document.getElementById('play-pause').addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            this.textContent = 'Pause';
        } else {
            audio.pause();
            this.textContent = 'Play';
        }
    });

    document.getElementById('next-track').addEventListener('click', function () {
        if (isShuffle) {
            currentTrack = Math.floor(Math.random() * trackList.length);
        } else {
            currentTrack = (currentTrack + 1) % trackList.length;
        }
        loadTrack(currentTrack);
        audio.play();
        document.getElementById('play-pause').textContent = 'Pause';
    });

    document.getElementById('prev-track').addEventListener('click', function () {
        currentTrack = (currentTrack - 1 + trackList.length) % trackList.length;
        loadTrack(currentTrack);
        audio.play();
        document.getElementById('play-pause').textContent = 'Pause';
    });

    document.getElementById('shuffle').addEventListener('click', function () {
        isShuffle = !isShuffle;
        this.classList.toggle('active', isShuffle);
    });

    document.getElementById('repeat').addEventListener('click', function () {
        isRepeat = !isRepeat;
        this.classList.toggle('active', isRepeat);
    });

    audio.addEventListener('ended', function () {
        if (isRepeat) {
            audio.currentTime = 0;
            audio.play();
        } else {
            document.getElementById('next-track').click();
        }
    });

    document.getElementById('progress-bar').addEventListener('input', function () {
        audio.currentTime = (audio.duration * this.value) / 100;
    });

    audio.addEventListener('timeupdate', function () {
        document.getElementById('progress-bar').value = (audio.currentTime / audio.duration) * 100;
    });

    document.getElementById('volume-control').addEventListener('input', function () {
        audio.volume = this.value;
    });

    loadTrack(currentTrack); // Load the first track
}