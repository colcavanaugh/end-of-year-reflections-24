const tracks = [
    {
      title: "Opening",
      file: "01 - Opening.mp3",
      artist: "Ann Annie",
      album: "The Wind",
    },
    {
      title: "With Violet",
      file: "02 - With Violet.mp3",
      artist: "Ann Annie",
      album: "The Wind",
    },
    {
      title: "Sweet Coast",
      file: "03 - Sweet Coast.mp3",
      artist: "Ann Annie",
      album: "The Wind",
    },
    {
      title: "Aviary Reverie (Waltz No. 2 in C)",
      file: "04 - Aviary Reverie (Waltz No. 2 in C).mp3",
      artist: "Ann Annie",
      album: "The Wind",
    },
    {
      title: "Introduction",
      file: "05 - Introduction.mp3",
      artist: "Ann Annie",
      album: "The Wind",
    },
    {
      title: "The Wind",
      file: "06 - The Wind.mp3",
      artist: "Ann Annie",
      album: "The Wind",
    },
    {
      title: "Lamb's Ear",
      file: "07 - Lamb's Ear.mp3",
      artist: "Ann Annie",
      album: "The Wind",
    },
    {
      title: "Interlude",
      file: "08 - Interlude.mp3",
      artist: "Ann Annie",
      album: "The Wind",
    },
    {
      title: "Willows",
      file: "09 - Willows.mp3",
      artist: "Ann Annie",
      album: "The Wind",
    },
    {
      title: "Drift Creek",
      file: "10 - Drift Creek.mp3",
      artist: "Ann Annie",
      album: "The Wind",
    },
    {
      title: "Silver Creek",
      file: "11 - Silver Creek.mp3",
      artist: "Ann Annie",
      album: "The Wind",
    },
    {
      title: "Cottonwood",
      file: "12 - Cottonwood.mp3",
      artist: "Ann Annie",
      album: "The Wind",
    },
    {
      title: "Three Chords",
      file: "13 - Three Chords.mp3",
      artist: "Ann Annie",
      album: "The Wind",
    }
];
  
let currentTrackIndex = 0;

const audio = document.getElementById("myAudio");
const trackInfo = document.getElementById("trackInfo");
const btnPlay = document.getElementById("btnPlay");
const btnPause = document.getElementById("btnPause");
const btnNext = document.getElementById("btnNext");
const btnPrev = document.getElementById("btnPrev");
const currentTimeSpan = document.getElementById("currentTime");
const durationSpan = document.getElementById("duration");

// Load the first track
function loadTrack(index) {
    const track = tracks[index];
    audio.src = `assets/audio/${track.file}`;
    trackInfo.textContent = `${track.title}`;  // Simplified to just show the title
    audio.load();
}

// Update time
audio.addEventListener("timeupdate", () => {
    const currentTime = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);
    currentTimeSpan.textContent = currentTime;
    durationSpan.textContent = duration;
});

// Play/Pause functionality
btnPlay.addEventListener("click", () => {
    audio.play();
});
btnPause.addEventListener("click", () => {
    audio.pause();
});

// Next/Prev functionality
btnNext.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
});
btnPrev.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
});

// Format time helper
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
}

// Initial load
loadTrack(currentTrackIndex);

// Image transition logic
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.artwork');
    const totalImages = images.length;
    const textSection = document.querySelector('.text-section');
    
    // Show first image on load
    images[0].classList.add('active');

    textSection.addEventListener('scroll', () => {
        // Calculate scroll progress based on text section
        const scrollHeight = textSection.scrollHeight - textSection.clientHeight;
        const scrollProgress = (textSection.scrollTop / scrollHeight) * 0.3;
        
        // Calculate which image should be shown
        const imageIndex = Math.min(
            Math.floor(scrollProgress * totalImages), 
            totalImages - 1
        );
        
        images.forEach((img, index) => {
            img.classList.toggle('active', index === imageIndex);
        });
    });
});