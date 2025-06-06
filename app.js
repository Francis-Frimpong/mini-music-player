const trackTitleAndArtist = document.querySelector('.artist-name-title');
const nextSong = document.querySelector('.fa-forward-step');
const previousSong = document.querySelector('.fa-backward-step');
const play = document.querySelector('.fa-play');
const pause = document.querySelector('.fa-pause');
let musicSlider = document.querySelector('.music-slider')

const playList = [
    "davido-inspired-176432.mp3",
    "alone-296348.mp3",
    "dont-talk-315229.mp3",
    "epic-trailer-background-music-emotional-dramatic-cinematic-intro-249656.mp3",
    "experimental-cinematic-hip-hop-315904.mp3",
    "gardens-stylish-chill-303261.mp3",
    "happy-playful-music-cute-sweet-kid-child-baby-background-intro-theme-277965.mp3",
    "hip-hop-black-angel-mid-2-161266.mp3",
    "off-the-grid-161305.mp3",
    "in-slow-motion-inspiring-ambient-lounge-219592.mp3",
    "kugelsicher-by-tremoxbeatz-302838.mp3",
    "so-fresh-315255.mp3",
    "royalty-free-word-strikes-i-hard-rap-beat-335823.mp3",
    "spring-easter-day-music-30-seconds-version-320430.mp3",
    "afro-house-x-afro-beat-mastery-292197.mp3",
    "melodic-sundays-south-african-amapiano-245447.mp3"
];

let currentSong = 0;
trackTitleAndArtist.textContent = playList[currentSong];

let music = new Audio();
music.src = `music/${playList[currentSong]}`




//function for total audio duration
function totalAudioDuration(){
    let padMinutes;
    let padSeconds;

    const musicDuration =  Math.floor(music.duration);
    let wholeMinutes = Math.floor(musicDuration / 60 )
    
    let remainingSeconds = wholeMinutes * 60;
    
    let convertDuration = musicDuration - remainingSeconds;

    if (wholeMinutes < 10){
        padMinutes = "0".concat(wholeMinutes);
    } else{
        padMinutes = currentMinutes;
    }

    if(convertDuration < 10){
        padSeconds = "0".concat(convertDuration);
    }else{
        padSeconds = convertDuration;
    }
    
    document.querySelector('.audio-duration').textContent = `${padMinutes}:${padSeconds}`
}

//function for audio timer when audio is being played
function audioTimer(){
    let padMinutes;
    let padSeconds;
    const currentMusicTime =  Math.floor(music.currentTime);
    let currentMinutes = Math.floor(currentMusicTime / 60 )
    
    let remainingSeconds = currentMinutes * 60
    let convertDuration = currentMusicTime - remainingSeconds

    if (currentMinutes < 10){
        padMinutes = "0".concat(currentMinutes);
    } else{
        padMinutes = currentMinutes;
    }

    if(convertDuration < 10){
        padSeconds = "0".concat(convertDuration);
    }else{
        padSeconds = convertDuration;
    }

    document.querySelector('.audio-timer').textContent = `${padMinutes}:${padSeconds}`
}



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

//Move to the previous track
function previousTrack() {
    let nowPlaying = trackTitleAndArtist.textContent = playList[--currentSong]; 

    if(currentSong < 0) {
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

//check if current song is less than the length of the list of songs,if yes move to the next track else dont move to the next track
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


// Loop current song function
music.loop = false;

function loopCurrentSong(){
    if(music.loop === false){
        music.loop = true;
        document.querySelector('.fa-repeat').classList.add('toggleColor');
    }else {
        music.loop = false;
        document.querySelector('.fa-repeat').classList.remove('toggleColor');
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
    previousSong.addEventListener('click', previousTrack)

    nextSong.addEventListener('click', nextTrack)
    
    music.addEventListener('timeupdate', onAudioTick);
    
    musicSlider.addEventListener('input', onSliderDrag);

    music.addEventListener('loadedmetadata', totalAudioDuration);

    music.addEventListener('timeupdate', audioTimer);
    
    document.querySelector('.play-pause-btn').addEventListener('click', playPause)

    document.querySelector('.repeat-btn').addEventListener('click', loopCurrentSong);



}

//Calling all event listeners
eventListeners();



