const buttonPlay = document.getElementById('buttonPlay');
const buttonPrev = document.getElementById('buttonPrev');
const buttonNext = document.getElementById('buttonNext');
const music = document.querySelector('audio');
const album = document.getElementById('album');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const imagOne = document.getElementById('imgOne');
const imagTwo = document.getElementById('imgTwo');
let innerProgress = document.getElementById('innerProgress');
let musicCurrentTime = document.getElementById('currentTime');
let musicDuration = document.getElementById('duration');
let innerBar = document.getElementById('innerBar');
let heart = document.getElementById('heart');
let volumeId = document.getElementById('volumeId');
let volumeIcon = document.getElementById('volumeIcon');
let volumeSlider = document.getElementById('volumeSlider');




let songPlaying = false;

buttonPlay.addEventListener('click', (e) => {
    e.preventDefault();
    songPlaying ? pauseMusic() : playMusic();     // if else shorthand
});

const playMusic = () => {
    songPlaying = true;
    music.play();
    buttonPlay.classList.replace('fa-play', 'fa-pause');
};
const pauseMusic = () => {
    songPlaying = false;
    music.pause();
    buttonPlay.classList.replace('fa-pause', 'fa-play');

};



const songsData = [
    {
        name: 'Dark Love',
        album: 'Just Listen',
        title: 'Dark Love',
        artist: 'Sidhu Moose Wala',
    },
    {
        name: 'badnam gabru',
        album: 'Haryanvi',
        title: 'Badnam gabru',
        artist: 'Masoom Sharma & Manisha Sharma',
    },
    {
        name: 'Red Eyes',
        album: 'Single',
        title: 'Red eyes',
        artist: 'Karan Aujla',
    },
    {
        name: 'let me love you',
        album: 'Encore',
        title: 'Let me love you',
        artist: 'Justin beiber',
    },
    {
        name: 'Faded',
        album: 'Single',
        title: 'Faded',
        artist: 'Alan Walker',
    },
    {
        name: 'Hawayein',
        album: 'Jab harry met',
        title: 'Hawayein',
        artist: 'Arijit Singh',
    }
   
]



let songIndex = 0;


const nextSong = (e) => {
    e.preventDefault();
    // songIndex++;  // it will stop at last song , so we use module operator
    songIndex = (songIndex + 1) % songsData.length;
    loadSong(songsData[songIndex]);
    playMusic();
};


const prevSong = (e) => {
    e.preventDefault();
    songIndex = (songIndex - 1 + songsData.length) % songsData.length;
    loadSong(songsData[songIndex]);
    playMusic();
};

const loadSong = (songsData) => {
    album.textContent = songsData.album;
    title.textContent = songsData.title;
    artist.textContent = songsData.artist;
    music.src = `music/${songsData.name}.mp3`;
    imgOne.src = `image/${songsData.name}.jpg`;
    imgTwo.src = `image/${songsData.name}.jpg`;
};

buttonNext.addEventListener('click', nextSong);
buttonPrev.addEventListener('click', prevSong);

// Function for progress bar width change with music time
music.addEventListener('timeupdate', (e) => {
    const { currentTime, duration } = e.target;   // commant to get initial time and complete duration
    let progressWidthFormula = (currentTime / duration) * 100;   // formula to get accurate mid width
    innerProgress.style.width = `${progressWidthFormula}%`;    // add width style to innerProgress


    // currentTime and duration
    let minuteDuration = Math.floor(duration / 60);
    let secondDuration = Math.floor(duration % 60);



    if (secondDuration < 10) {
        secondDuration = `0${secondDuration}`;
    }
    // include music duration(total time) into DOM
    if (duration) {
        musicDuration.textContent = `${minuteDuration}:${secondDuration}`;   // if condition use to prevent from 'NaN' bug between song change
    }


    // include music currentTime(starting time) into DOM
    
    let minuteCurrentTime = Math.floor(currentTime / 60);
    let secondCurrentTime = Math.floor(currentTime % 60);


    if (secondCurrentTime < 10) {
        secondCurrentTime = `0${secondCurrentTime}`
    }
    
    musicCurrentTime.textContent = `${minuteCurrentTime}:${secondCurrentTime}`;


});

music.addEventListener('ended', nextSong);  //play next song after song ended


//Music control with progress slider
innerBar.addEventListener('click', (e) => {
    const { duration } = music;
    music.currentTime = (e.offsetX / e.target.clientWidth) * duration;
});


//Heart icon function

let heartColor = false;

heart.addEventListener('click', () => {
    heartColor ? heartGrey() : heartRed();
});

const heartRed = () => {
    heartColor = true;
    heart.classList.replace('heart-2', 'heart');
};
const heartGrey = () => {
    heartColor = false;
    heart.classList.add('heart', 'heart-2');
};


// Volume function
function volume_change() {
    music.volume = volumeId.value / 100;
}

volumeIcon.addEventListener('click', () => {
    if (volumeSlider.classList.contains('volumeHide')) {
        volumeSlider.classList.remove('volumeHide')
    }
    else {
        volumeSlider.classList.add('volumeHide')
    }
})