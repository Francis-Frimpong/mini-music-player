const trackTitleAndArtist = document.querySelector('.artist-name-title');
const nextSong = document.querySelector('.fa-forward-step');
const play = document.querySelector('.fa-play');
const pause = document.querySelector('.fa-pause');







const playList = [
    "alone-296348.mp3",
    "dont-talk-315229.mp3",
    "epic-trailer-background-music-emotional-dramatic-cinematic-intro-249656.mp3",
    "experimental-cinematic-hip-hop-315904.mp3",
    "gardens-stylish-chill-303261.mp3",
    "happy-playful-music-cute-sweet-kid-child-baby-background-intro-theme-277965.mp3",
    "hip-hop-black-angel-mid-2-161266.mp3",
    "in-slow-motion-inspiring-ambient-lounge-219592.mp3",
    "kugelsicher-by-tremoxbeatz-302838.mp3",
    "so-fresh-315255.mp3",
    "spring-easter-day-music-30-seconds-version-320430.mp3"
];

let currentSong = 0;
trackTitleAndArtist.textContent = playList[currentSong];
let music;

function playMusic() {
    music = new Audio(`music/${playList[currentSong]}`)
    music.play();
}

function pauseMusic(){
    music.pause();
}


function nextTrack() {
    trackTitleAndArtist.textContent = playList[++currentSong] 

    //if currentSong is playing previous song should stop playing.
    if(currentSong >= playList.length) {
        currentSong = 0;
        trackTitleAndArtist.textContent = playList[currentSong];
    }   
}


nextSong.addEventListener('click', nextTrack)
play.addEventListener('click', playMusic);
pause.addEventListener('click', pauseMusic)

document.querySelector('.play-pause-btn').addEventListener('click', () => {
    if(!music.paused){
        pause.style.display = 'none';
        play.style.display = 'block';
        pauseMusic()
        
    }else if(music.paused){
        play.style.display = 'none';
        pause.style.display = 'block';
        playMusic()

    }
})