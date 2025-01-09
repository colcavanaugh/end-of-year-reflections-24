/**
 * Loading Management System
 * Handles the coordinated loading of splash screen and main content
 */
const LoadingManager = {
    splashImageLoaded: false,
    contentLoaded: false,
    initialized: false,

    init() {
        // Preload splash background image
        const img = new Image();
        img.src = 'assets/images/site-background-3.png';
        img.onload = () => {
            this.splashImageLoaded = true;
            this.checkLoadState();
        };

        // Track full content load
        window.addEventListener('load', () => {
            this.contentLoaded = true;
            this.checkLoadState();
        });
    },

    checkLoadState() {
        if (this.splashImageLoaded && this.contentLoaded && !this.initialized) {
            this.initialized = true;
            this.revealEnterButton();
        }
    },

    revealEnterButton() {
        const enterBtn = document.getElementById('enterBtn');
        enterBtn.style.display = 'block';
        
        // Now it's safe to prepare main content
        document.body.classList.add('content-loaded');
        
        // Initialize other systems only after loading is complete
        ContentManager.init();
        AudioPlayer.init();
    }
};

/**
 * Content Management System
 * Handles the creation, display, and navigation of content sections
 */
const ContentManager = {
    currentIndex: 0,
    container: null,
    sections: [],
    progressDots: [],
    isAnimating: false,

    // Content configuration
    content: [
        {
            type: 'image',
            src: 'assets/images/swan-belly.png',
            alt: 'Swan Belly'
        },
        {
            type: 'text',
            title: '[december 27th, 2024]',
            content: `this has been a crazy year... so full of change and growth, <br>alongside 
            a strong and sad sense of regression in my relationship to care for myself. <br><br>
            ♡ What do I want to acknowledge?<br>
            ♡ What have I learned this year?<br>
            ♡ What have I left behind?<br>
            ♡ What do I want to reclaim?<br>
            ♡ What do I want to let go?<br>
            `
        },
        {
            type: 'image',
            src: 'assets/images/trevor-of-frump.png',
            alt: 'Trevor of Frump'
        },
        {
            type: 'text',
            title: '[december 27th, 2024]',
            content: `i want to start my reflections on a positive note, since i have neglected
            gratitude for and pride in a lot of my work and growth this year.`
        },
        {
            type: 'image',
            src: 'assets/images/kyte-of-berkley-ft.png',
            alt: 'Kyte of Berkley Facetime'
        },
        {
            type: 'text',
            title: '[december 27th, 2024]<br>this year i...',
            content: `♡ finished my ms in optical sciences<br>♡ wrote and defended a thesis i am proud of<br>
                ♡ published a scientific paper<br>
                ♡ contributed to a cancer imaging system<br>
                ♡ learned so much about coding<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♡ matlab<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♡ mathematica<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♡ python<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♡ html/css/js<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♡ git<br>
                ♡ learned lost wax casting<br>
                ♡ joined a print exchange and made a few cute prints<br>
                ♡ drew lots<br>
                ♡ took up piano, again<br>
                ♡ learned to 3d model in blender and solidworks<br>
                ♡ learned to 3d print in resin<br>
                ♡ got an amazing job that allows me to learn, grow, write, <br>&nbsp;&nbsp;&nbsp;and contribute as a programmer and optical physicist<br>
                ♡ set up a fabulous irrigation system<br>
            `
        },
        {
            type: 'image',
            src: 'assets/images/hand-two-hands.png',
            alt: 'Hand Two Hands'
        },
        {
            type: 'text',
            title: '[december 27th, 2024]<br>i also...',
            content: `♡ enjoyed lots of other gardening shenanigans<br>
                ♡ learned to sew<br>
                ♡ had a few kombucha and sourdough stints<br>
                ♡ started budgeting (and stopped, hehe)<br>
                ♡ had a good stretch of going to the gym regularly<br>
                ♡ took a jewelry fabrication class<br>
                ♡ learned a ton about photography and took lots of cute pictures<br>
                ♡ started forming my own software development philosophy and method, slow development.<br>
                ♡ started work on studio, a software dev project<br>
                ♡ played baldur's gate 3<br>
                ♡ fixed up an old camera from the 1920s and took some cute pictures with it<br>
                ♡ showed a magnifying glass i made at the baltimore jewelry studio<br><br>
                and probably even more that i'm forgetting! no wonder i have felt so busy this year hehe.<br><br>
                i really am proud of and grateful so much of this beautiful, fun work i've <br>&nbsp;&nbsp;&nbsp;done, the opportunity to grow in these ways at this time in my life.
            `
        },
        {
            type: 'image',
            src: 'assets/images/kitty-smoosh.png',
            alt: 'Kitty Smoosh'
        },
        {
            type: 'text',
            title: '[december 27th, 2024]<br>at the same time, this has been a really sad, difficult, and anxiety-ridden year',
			content: `
			♡ i've been adjusting to post-grad life, and enduring the culture shock of starting at a tech startup<br>
			♡ i've been navigating moving in with trevor, my love<br>
			♡ nana passed away in the fall<br>
			♡ the election was won by trump<br>
			♡ genocide continues in gaza, and around the world<br><br>
			with all this change and pain, i have changed too — not always in ways i’m proud of.<br><br>
			i left behind some things i cherished and worked hard for, in the confusion of it all.
            `
        },
        {
            type: 'image',
            src: 'assets/images/oracle.png',
            alt: 'First Night in Oracle'
        },
        {
            type: 'text',
            title: '[december 27th, 2024]<br>i want to hold space now to acknowledge all things, big and small,<br>that i left behind and want to reclaim',
			content: `
			♡ regularly cooking well for myself<br><br>
			♡ routine health and care:<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♡ yoga<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♡ brekky<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♡ self-care and making cute<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♡ quiet time to journal, read, and think<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♡ meditation<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♡ a bedtime wind-down routine<br><br>
			♡ reading books<br><br>
			♡ an active lifestyle:<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♡ rock climbing<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♡ hiking<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♡ regular yoga and gym<br><br>
			♡ building community and relationships in tucson ♡<br><br>
			♡ political engagement and thoughtfulness<br><br>
			♡ simple joy, trust, and gratitude<br>
			` 
		},
        {
            type: 'image',
            src: 'assets/images/print-notes.png',
            alt: 'Print Notes'
        },
        {
            type: 'text',
            title: '[december 27th, 2024]<br>along with letting these things go, i picked up some old friends...',
			content: `
			♡ anxiety<br><br>
			♡ depression<br><br>
			♡ self-neglect and dissociation<br><br>
			♡ neglect of community and relationships<br><br>
			♡ spiraling and negative self-talk<br><br>
			♡ codependency and projection<br><br>
			♡ stuckness and passivity<br><br>
			♡ lack of gratitude<br><br>
			what a delightful crew! okay, that's enough list-writing for one day. until next time ♡
			` 
		},
        {
            type: 'image',
            src: 'assets/images/plingus.png',
            alt: 'Plingus'
        },
        {
            type: 'text',
            title: '[december 30th, 2024]',
			content: `
			just a few more days until i return back to work.<br><br>
			today, i have been a touch lost in my reactivity — again. it was similar yesterday...<br> 
            i had such a brief little window of clarity and groundedness when I got back to tucson, but, poof! there it goes.<br><br>
			i am feeling a few urges in response to this resurgence of anxiety and reactivity:<br><br>
			1. to map my mental landscape, as a tool for mindfulness and for reclaiming my agency when i’m looping<br><br>
			2. to finish off my end-of-year journaling with writings on who i want to be/become this year<br>
			&nbsp;&nbsp;&nbsp;there are a few other urges too, but i recognize them as traps and let them go ~<br><br>
			i suppose we can start with a map! 
			` 
		},
        {
            type: 'image',
            src: 'assets/images/internal-map.png',
            alt: 'Internal Map'
        },
        {
            type: 'text',
            title: '[december 30th, 2024]<br> okay, that was pretty cute and fun ♡',
			content: `
			now... what kind of person do i want to grow into this year?<br><br>
			♡ i want to be strong and take responsibility for my feelings and needs<br>
			♡ i want to be authentic and honest, unafraid to communicate my truth<br>
			♡ i want to share my heart and mind through art and community ♡<br>
			♡ i want to enjoy the day-to-day joys of living<br>
			♡ i want to connect deeply with nature<br>
			♡ i want to trust myself and nurture my perspective with care<br>
			` 
		},
        {
            type: 'image',
            src: 'assets/images/sabino-canyon.png',
            alt: 'Sabino Canyon'
        },
        {
            type: 'text',
            title: '[december 31, 2024]',
			content: `
			wow, the end of the year is finally here!<br><br>
			what do i do now, in light of all this reflection?<br>
			how do I create the shifts in my heart and life that i really need?<br><br>
			the biggest thing, i think, is to continue being mindful of what i'm feeling,<br> and to continue mapping out the places my mind goes now.<br><br>
			and i really need to write more about my relationship to productivity.<br>
			and, so importantly, i need to be patient with welcoming this shift and establishing new, wiser habits.
			` 
		},
        {
            type: 'image',
            src: 'assets/images/bob\'s-burgers.png',
            alt: 'Bob\'s Burgers'
        },
        {
            type: 'text',
            title: '[december 31, 2024]<br>new explorations in 2025',
			content: `
			so, i've got some major internal work to do.<br><br>
			but to close out my reflections, i want to look ahead to some new & continued explorations<br> 
			that i can trust myself to mindfully and patiently enjoy.<br><br>
			♡ woodworking<br>
			♡ sewing<br>
			♡ piano<br>
			♡ audio engineering<br>
			♡ drawing and painting<br>
			♡ yoga<br>
			♡ casting and 3d modeling<br>
			♡ graphic design and printing<br>
			` 
		},
        {
            type: 'image',
            src: 'assets/images/hand-one-plums.png',
            alt: 'Hand One, Plums'
        }
    ],

    init() {
        this.container = document.querySelector('.content-container');
        this.createSections();
        this.createProgressIndicator();
        this.setupEventListeners();
        this.showSection(0);
    },

    createSections() {
        this.content.forEach((item) => {
            const section = document.createElement('div');
            section.className = 'content-section';
            
            if (item.type === 'image') {
                section.appendChild(this.createImageElement(item));
            } else {
                section.appendChild(this.createTextElement(item));
            }

            this.container.appendChild(section);
            this.sections.push(section);
        });
    },

    createImageElement(item) {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.className = 'artwork';
        return img;
    },

    createTextElement(item) {
        const textContent = document.createElement('div');
        textContent.className = 'text-content';
        textContent.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.content}</p>
        `;
        return textContent;
    },

    createProgressIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'progress-indicator';
        
        this.content.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            dot.addEventListener('click', () => this.showSection(index));
            indicator.appendChild(dot);
            this.progressDots.push(dot);
        });

        document.body.appendChild(indicator);
    },

    setupEventListeners() {
        this.setupKeyboardNavigation();
        this.setupWheelNavigation();
        this.setupTouchNavigation();
    },

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.isAnimating) return;
            
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                this.nextSection();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                this.previousSection();
            }
        });
    },

    setupWheelNavigation() {
        let wheelTimeout;
        document.addEventListener('wheel', (e) => {
            if (this.isAnimating) return;
            
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                if (e.deltaY > 0) {
                    this.nextSection();
                } else {
                    this.previousSection();
                }
            }, 50);
        }, { passive: true });
    },

    setupTouchNavigation() {
        let touchStartY;
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            if (this.isAnimating) return;
            
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchEndY - touchStartY;
            
            if (Math.abs(deltaY) > 50) {
                if (deltaY < 0) {
                    this.nextSection();
                } else {
                    this.previousSection();
                }
            }
        });
    },

    showSection(index) {
        if (index < 0 || index >= this.sections.length || this.isAnimating) return;
        
        this.isAnimating = true;
        
        this.sections.forEach((section, i) => {
            section.classList.toggle('active', i === index);

            const childText = section.querySelector('.text-content');
            if (childText) {
              childText.classList.toggle('shown', i === index);
            }
        });

        this.progressDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        this.currentIndex = index;
        
        // Reset animation lock after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 500); // Match this with CSS transition duration
    },

    nextSection() {
        if (this.currentIndex < this.sections.length - 1) {
            this.showSection(this.currentIndex + 1);
        }
    },

    previousSection() {
        if (this.currentIndex > 0) {
            this.showSection(this.currentIndex - 1);
        }
    }
};

/**
 * Audio Player System
 * Handles music playback and controls
 */
const AudioPlayer = {
    tracks: [
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
    ],
    currentTrackIndex: 0,
    audio: null,
    elements: {},

    init() {
        this.audio = document.getElementById('myAudio');
        this.elements = {
            trackInfo: document.getElementById('trackInfo'),
            btnPlay: document.getElementById('btnPlay'),
            btnPause: document.getElementById('btnPause'),
            btnNext: document.getElementById('btnNext'),
            btnPrev: document.getElementById('btnPrev'),
            currentTime: document.getElementById('currentTime'),
            duration: document.getElementById('duration')
        };

        this.setupEventListeners();
        this.loadTrack(this.currentTrackIndex);
    },

    setupEventListeners() {
        this.audio.addEventListener('timeupdate', () => this.updateTime());
        this.audio.addEventListener('ended', () => this.nextTrack());
        this.elements.btnPlay.addEventListener('click', () => this.play());
        this.elements.btnPause.addEventListener('click', () => this.pause());
        this.elements.btnNext.addEventListener('click', () => this.nextTrack());
        this.elements.btnPrev.addEventListener('click', () => this.prevTrack());
    },

    loadTrack(index) {
        const track = this.tracks[index];
        this.audio.src = `assets/audio/${track.file}`;
        this.elements.trackInfo.textContent = track.title;
        this.audio.load();
    },

    play() {
        this.audio.play();
        this.elements.btnPlay.style.display = 'none';
        this.elements.btnPause.style.display = 'inline';
    },

    pause() {
        this.audio.pause();
        this.elements.btnPlay.style.display = 'inline';
        this.elements.btnPause.style.display = 'none';
    },

    updateTime() {
        this.elements.currentTime.textContent = this.formatTime(this.audio.currentTime);
        this.elements.duration.textContent = this.formatTime(this.audio.duration);
    },

    nextTrack() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        this.loadTrack(this.currentTrackIndex);
        this.play();
    },

    prevTrack() {
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
        this.loadTrack(this.currentTrackIndex);
        this.play();
    },

    formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
};

/**
 * Application Initialization
 * Coordinates the loading sequence and system initialization
 */

document.addEventListener('DOMContentLoaded', () => {
    // Start loading management
    LoadingManager.init();

    // Set up enter button handler
    const enterBtn = document.getElementById('enterBtn');
    const splashScreen = document.getElementById('splash-screen');
    const contentWrapper = document.querySelector('.content-wrapper');
    
    enterBtn.addEventListener('click', () => {
        // 1) Start audio
        AudioPlayer.play();
      
        // 2) Show the main site via a fade-in
        const mainSite = document.getElementById('main-site');
        mainSite.classList.add('fade-in');  // transitions from opacity: 0 → 1
      
        // 3) Fade out the splash
        const splashScreen = document.getElementById('splash-screen');
        splashScreen.classList.add('fade-out');
      
        // 4) After the splash fully disappears, remove it from layout
        splashScreen.addEventListener('transitionend', () => {
        //   splashScreen.style.display = 'none';
          // Show first content section, etc.
          ContentManager.showSection(0);
        }, { once: true });
      });      
});