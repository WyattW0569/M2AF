function switchPage(sourceDivId, targetDivId) {
    const sourceDiv = document.getElementById(sourceDivId);
    const targetDiv = document.getElementById(targetDivId);
    targetDiv.innerHTML = sourceDiv.innerHTML;
}

document.addEventListener('DOMContentLoaded', function() {
    switchPage('home','page');
});

const audioElements = {};
let currentPlayingSound = null;

document.addEventListener('DOMContentLoaded', function() {
    const sounds = ['boxHover', 'select', 'back'];

    sounds.forEach(soundId => {
        const audio = document.createElement('audio');
        audio.src = `static/audio/${soundId}.mp3`;
        audio.preload = 'auto';
        audio.load();
        audioElements[soundId] = audio;

        audio.addEventListener('ended', function() {
            if (currentPlayingSound === soundId) {
                currentPlayingSound = null;
            }
            audio.currentTime = 0;
        });
    });
});

function PlaySound(soundId) {
    try {
        const audio = audioElements[soundId];
        if (!audio) {
            console.error(`Sound ${soundId} not found`);
            return;
        }

        // If another sound is playing, stop it
        if (currentPlayingSound && currentPlayingSound !== soundId) {
            StopSound(currentPlayingSound);
        }

        // Restart the sound if it's already playing
        if (currentPlayingSound === soundId) {
            audio.pause();
            audio.currentTime = 0;
        }

        currentPlayingSound = soundId;

        audio.play().catch(e => {
            console.error(`Playback failed: ${e}`);
            currentPlayingSound = null;
        });

    } catch (e) {
        console.error(`Error playing sound ${soundId}:`, e);
        currentPlayingSound = null;
    }
}

function StopSound(soundId) {
    const audio = audioElements[soundId];
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        if (currentPlayingSound === soundId) {
            currentPlayingSound = null;
        }
    }
}


function NewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}