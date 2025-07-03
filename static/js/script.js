function test() {
  document.getElementById("test").innerHTML = "Paragraph changed.";
}

const audioElements = {};
const soundStates = {};

document.addEventListener('DOMContentLoaded', function() {
    const sounds = ['boxHover', 'select'];
    
    sounds.forEach(soundId => {
        const audio = document.createElement('audio');
        audio.src = `static/audio/${soundId}.mp3`;
        audio.preload = 'auto';
        audio.load();
        audioElements[soundId] = audio;
        soundStates[soundId] = false;
        
        audio.addEventListener('ended', function() {
            soundStates[soundId] = false;
            audio.currentTime = 0;
        });
    });
});

function PlaySound(soundId) {
    try {
        if (soundStates[soundId]) {
            console.log(`Sound ${soundId} is already playing`);
            return;
        }
        
        const audio = audioElements[soundId];
        if (!audio) {
            console.error(`Sound ${soundId} not found`);
            return;
        }
        
        soundStates[soundId] = true;
        audio.currentTime = 0;
        audio.play().catch(e => {
            console.error(`Playback failed: ${e}`);
            soundStates[soundId] = false;
        });
        
    } catch (e) {
        console.error(`Error playing sound ${soundId}:`, e);
        soundStates[soundId] = false;
    }
}

function StopSound(soundId) {
    const audio = audioElements[soundId];
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        soundStates[soundId] = false;
    }
}


function NewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}