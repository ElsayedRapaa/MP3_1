let show_Nav = document.querySelector('#show-nav'),
    show_List = document.querySelector('#show-list'),
    list_Option = document.querySelector('.navbar .option'),
    music_Icon = document.querySelector('#music'),
    mute_Icon = document.querySelector('#mute'),
    edit_Icon = document.querySelector('#edit'),
    list_Song = document.querySelector('.list-song'),
    play_Song = document.querySelectorAll('.play-song'),
    the_Img = document.querySelector('.img-part img'),
    main_Title = document.querySelector('.title'),
    main_Art = document.querySelector('.art'),
    list_Title = document.querySelectorAll('.list-title'),
    list_Art = document.querySelectorAll('.list-artist'),
    play_List_Btn = document.querySelectorAll('.play-list'),
    prev_Btn = document.querySelector('#prev'),
    play_Btn = document.querySelector('#play'),
    next_Btn = document.querySelector('#next'),
    the_Slider = document.querySelector('#slider');

let vol_Track = false,
    playing = false,
    timer,
    the_Auto = 0,
    index = 0;

let the_Track = document.createElement('audio');

const all_Info = [{
        name: 'مجبور الهيبة',
        path: './MUSIC/1.mp3',
        img: './Cartoon/1.jpg',
        singer: 'ناصف زيتون'
    },
    {
        name: 'أزمة ثقة الهيبة',
        path: './MUSIC/2.mp3',
        img: './Cartoon/2.jpg',
        singer: 'ناصف زيتون'
    },
    {
        name: 'جيتني صدفة',
        path: './MUSIC/3.mp3',
        img: './Cartoon/3.jpg',
        singer: 'أحمد علوي'
    },
    {
        name: 'سوكاك سوكاك',
        path: './MUSIC/4.mp3',
        img: './Cartoon/5.jpg',
        singer: 'تركية'
    },
    {
        name: 'بالبنط العريض',
        path: './MUSIC/5.mp3',
        img: './Cartoon/5.jpg',
        singer: 'حسين الجسمي'
    },
    {
        name: 'حبك مني واخدني',
        path: './MUSIC/6.mp3',
        img: './Cartoon/6.jpg',
        singer: 'رامي جمال'
    }
];

// let the_Char = 'ا ب ت ث ج ح خ د ذ ر ز س ش ع غ ف ق ك ص ض م ن ه و ي';

function the_All(index) {

    new_Song();
    clearInterval(timer);
    the_Img.src = all_Info[index].img;
    main_Title.textContent = all_Info[index].name;
    main_Art.textContent = all_Info[index].singer;
    the_Track.src = all_Info[index].path;
    the_Track.load();

    list_Title.forEach((title, index) => {
        title.textContent = all_Info[index].name;
    });

    list_Art.forEach((art, index) => {
        art.textContent = all_Info[index].singer;
    });

    play_Song.forEach((play, index) => {

        play.setAttribute('data-path', all_Info[index].path);
        play.setAttribute('data-img', all_Info[index].img);

        play.addEventListener('click', function(e) {

            play_Song.forEach((song) => {

                song.classList.remove('active');

            });

            e.target.classList.add('active');
            let the_Path = e.target.getAttribute('data-path');
            let img = e.target.getAttribute('data-img');

            the_Img.src = img;
            the_Track.src = the_Path;
            setTimeout(() => {

                played();

            }, 100);



        });

    });

    timer = setInterval(the_Range, 1000);


};

the_All(index);

function new_Song() {
    the_Slider.value = 0;
};


function sidbar() {

    show_Nav.classList.toggle('active');
    list_Option.classList.toggle('active');

};

function the_List() {

    show_List.classList.toggle('active');
    list_Song.classList.toggle('active');

};

function play() {

    if (playing == false) {

        played();

    } else {

        paused();

    };

};

function played() {

    play_Btn.innerHTML = `<i class="fas fa-pause"></i>`;
    playing = true;
    the_Track.play();

};

function paused() {

    play_Btn.innerHTML = `<i class="fas fa-play"></i>`;
    playing = false;
    the_Track.pause();

};

function next() {

    if (index < all_Info.length - 1) {

        index += 1;
        the_All(index);
        played();

        play_Song.forEach((song, index1) => {

            song.addEventListener('click', function(e) {

                index = index1;

            })

            song.classList.remove('active');

            if (index1 == index) {

                song.classList.add('active');

            };

        });

    } else {

        index = 0;
        the_All(index);
        played();

        play_Song.forEach((song, index1) => {

            song.addEventListener('click', function(e) {

                index = index1;

            })

            song.classList.remove('active');

            if (index1 == index) {

                song.classList.add('active');

            };

        });

    };

};

function prev() {

    if (index == 0) {

        index = all_Info.length;
        index -= 1;
        the_All(index);
        played();

        play_Song.forEach((song, index1) => {

            song.classList.remove('active');

            if (index1 == index) {

                song.classList.add('active');

            };

        });

    } else {

        index -= 1;
        the_All(index);
        played();

        play_Song.forEach((song, index1) => {

            song.classList.remove('active');

            if (index1 == index) {

                song.classList.add('active');

            };

        });

    };

};

function muted() {

    if (vol_Track == false) {

        vol_Up();

    } else {

        vol_Down();

    };


};

function vol_Up() {

    mute_Icon.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    vol_Track = true;
    the_Track.volume = 0 / 100;

};

function vol_Down() {

    mute_Icon.innerHTML = `<i class="fas fa-volume-up"></i>`;
    vol_Track = false;
    the_Track.volume = 100 / 100;

};

function change_Time() {

    let duration = the_Track.duration * (the_Slider.value / 100);
    the_Track.currentTime = duration;


};

function the_Range() {

    let position = 0;

    if (!isNaN(the_Track.duration)) {

        position = the_Track.currentTime * (100 / the_Track.duration);
        the_Slider.value = position;

        let min = Math.floor(the_Track.currentTime / 60),
            sec = Math.floor(the_Track.currentTime % 60);

        if (min < 10) {

            min = `0${min}`;

        };

        if (sec < 10) {

            sec = `0${sec}`;

        };

        document.querySelector('.range-slider > div').innerHTML = `${min}:${sec}`;

    };

    if (the_Track.ended) {

        play_Btn.innerHTML = `<i class="fas fa-play"></i>`;
        if (the_Auto == 0) {

            index += 1;
            the_All(index);
            played();

        } else {

            the_Auto = 1;
            index = 0;
            the_All(index);
            played();

        }

    };

};