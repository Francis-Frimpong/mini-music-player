const trackTitleAndArtist = document.querySelector('.artist-name-title');
const nextSong = document.querySelector('.fa-forward-step');
const play = document.querySelector('.fa-play');
const pause = document.querySelector('.fa-pause');
let musicSlider = document.querySelector('.music-slider')







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

let music = new Audio();
music.src = `music/${playList[currentSong]}`



// Move to the next track
function nextTrack() {
    let nowPlaying = trackTitleAndArtist.textContent = playList[++currentSong]; 

    //if currentSong is playing previous song should stop playing.
    if(currentSong >= playList.length) {
        currentSong = 0;
        nowPlaying = trackTitleAndArtist.textContent = playList[currentSong];
        music.src = `music/${nowPlaying}`;

    }   

    music.src = `music/${nowPlaying}`;
    musicSlider.value = 0;
    
    play.style.display = 'block';
    pause.style.display = 'none';
    
    music.play()


}

// anytime music is being played update the UI of the controllers
music.addEventListener('play', () => {
    play.style.display = 'none';
    pause.style.display = 'block';
})

//Update music slider base on the timeupdate
music.addEventListener('timeupdate', () => {
    musicSlider.value =  (music.currentTime / music.duration) * 100;
})

//check if current song is less than the list of songs,if yes move to the next track else dont move to the next track
music.addEventListener('ended', () => {

    if(currentSong < playList.length - 1){
        nextTrack()
    }else {
        music.pause();
        currentSong = 0;
        let nowPlaying = trackTitleAndArtist.textContent = playList[currentSong];
        music.src = `music/${nowPlaying}`;
        play.style.display = 'block';
        pause.style.display = 'none';
    }

})


// Play & Pause function
function playPause(){
    if(music.paused){
        pause.style.display = 'block';
        play.style.display = 'none';
        music.play()
        
    }else{
        play.style.display = 'block';
        pause.style.display = 'none';
        music.pause()

    }
}



//Moves the slider when audio play(timeupdate)
function onAudioTick(){
    let percent = (music.currentTime / music.duration) * 100;
     musicSlider.value = percent;
}


// Forward the time stamp of the audio when slider is drag(input)
function onSliderDrag(){
    let seekTime = (musicSlider.value / 100) * music.duration;
    music.currentTime = seekTime;
}



//Contains all event listeners.
function eventListeners(){
    nextSong.addEventListener('click', nextTrack)
    
    music.addEventListener('timeupdate', onAudioTick);
    
    musicSlider.addEventListener('input', onSliderDrag);
    
    document.querySelector('.play-pause-btn').addEventListener('click', playPause)

}

//Calling all event listeners
eventListeners();