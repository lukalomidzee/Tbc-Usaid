// Global variables
let bars;
let mobileMenu;
let sidebarOpen;
let menuButton;
let overlay;

let questionOne;
let questionTwo;
let questionThree;

let questions;

let isQuestionOpen;

let sliderPhotos;
let sliderOne;
let sliderTwo;
let sliderThree;
let activeSlide;


document.addEventListener('DOMContentLoaded', function(){
    // Sidebar variables
    bars = document.getElementsByClassName('bar');
    sidebarOpen = false;
    mobileMenu = document.getElementById('mobile-menu');
    menuButton = document.getElementById('sidebar');
    overlay = document.getElementById('sidebar-overlay');
    // Close sidebar by clicking on the overlay
    overlay.addEventListener('click', function(){
        if (sidebarOpen === true){
            closeSidebar();
            menuButton.classList.remove('open');
            for (let bar of bars){
                bar.classList.toggle('x-gray');
            }
        }
    })

    // Question variables to identify each question
    questionOne = document.getElementById('question-one');
    questionTwo = document.getElementById('question-two');
    questionThree = document.getElementById('question-three');

    // Questions status
    isQuestionOpen = false;
    // Questions (together) variable created to add same event listener for each of the quesitons 
    questions = [questionOne, questionTwo, questionThree];

    // Questions
    for (let question of questions){
        question.addEventListener('click', function(){
            // Open question when other questions are closed
            if(isQuestionOpen == false){
                question.style.height = 'auto';
                question.setAttribute('type', 'open');
                question.children[0].children[1].children[0].style.display = 'none';
                question.children[0].children[1].children[1].style.display = 'block';
                isQuestionOpen = true;
            } else if (isQuestionOpen == true){
                // Close question if it is open
                if (question.getAttribute('type') === 'open'){
                    question.style.height = '80px';
                    question.setAttribute('type', 'closed');
                    question.children[0].children[1].children[0].style.display = 'block';
                    question.children[0].children[1].children[1].style.display = 'none';  
                    isQuestionOpen = false;              
                } else if (question.getAttribute('type') === 'closed'){
                    // Close opened question to open another one 
                    let openElement = document.querySelector('[type="open"]');
                    openElement.style.height = '80px';
                    openElement.setAttribute('type', 'closed');
                    openElement.children[0].children[1].children[0].style.display = 'block';
                    openElement.children[0].children[1].children[1].style.display = 'none';
                    isQuestionOpen = false;
                    // Open new question
                    question.style.height = 'auto';
                    question.setAttribute('type', 'open');
                    question.children[0].children[1].children[0].style.display = 'none';
                    question.children[0].children[1].children[1].style.display = 'block';
                    isQuestionOpen = true;
                }
            }
        })
    }

    // Slider
    sliderPhotos = document.getElementById('slider-photos');
    sliderOne = document.getElementById('slider-one');
    sliderTwo = document.getElementById('slider-two');
    sliderThree = document.getElementById('slider-three');

    pageOne();
    automaticTransition();
});

//////////////// Functions

// Sidebar
function toggleMobileMenu(menu) {
    menu.classList.toggle('open');
    for (let bar of bars){
        bar.classList.toggle('x-gray');
    }
    if (sidebarOpen === false){
        openSidebar();
    } else if (sidebarOpen === true){
        closeSidebar();
    }
}

function openSidebar(){
    mobileMenu.style.right = "0px";
    mobileMenu.style.display = "block";
    sidebarOpen = !sidebarOpen;
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    overlay.style.display = 'block';
}

function closeSidebar(){
    mobileMenu.style.right = "-200px";
    mobileMenu.style.display = "none";
    sidebarOpen = !sidebarOpen;
    document.body.style.height = 'auto';
    document.body.style.overflow = 'unset';
    overlay.style.display = 'none';
}


// Manual transitions
function pageOne(){
    activeSlide = document.getElementsByClassName('active-slide');
    activeSlide[0]?.classList.remove('active-slide');
    sliderOne.classList.add('active-slide');
    automaticTransition
}

function pageTwo(){
    activeSlide = document.getElementsByClassName('active-slide');
    activeSlide[0]?.classList.remove('active-slide');
    sliderTwo.classList.add('active-slide');
}

function pageThree(){
    activeSlide = document.getElementsByClassName('active-slide');
    activeSlide[0]?.classList.remove('active-slide'); 
    sliderThree.classList.add('active-slide');
}

// Automatic transitions
function automaticTransition() {
    let activeIndex = 0;
    let touchStartX = 0; 

    // Slide change
    function showSlide(index) {
        const slides = document.querySelectorAll('.slider-page');
        slides[activeIndex].classList.remove('active-slide');
        activeIndex = index;
        slides[activeIndex].classList.add('active-slide');
    }

    // Next slide count
    function nextSlide() {
        const totalSlides = document.querySelectorAll('.slider-page').length;
        showSlide((activeIndex + 1) % totalSlides);
    }

    // Previous slide count
    function prevSlide() {
        const totalSlides = document.querySelectorAll('.slider-page').length;
        showSlide((activeIndex - 1 + totalSlides) % totalSlides);
    }

    function handleDotClick(dotIndex) {
        showSlide(dotIndex);
    }

    // Slide finger
    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
    }
    
    function handleTouchEnd(event) {
        const touchEndX = event.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;

        if (deltaX > 0) {
            prevSlide();
        } else if (deltaX < 0) {
            nextSlide();
        }
    }

    // Timer
    setInterval(nextSlide, 4000);

    // Catch page dots
    const dots = document.querySelectorAll('.slider-dot');

    // Click on dot to change page
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            handleDotClick(index);
        });
    });

    // Catch arrow buttons
    const leftArrow = document.getElementById('slider-left'); // Assuming you have an element with id "slider-left"
    const rightArrow = document.getElementById('slider-right'); // Assuming you have an element with id "slider-right"

    // Click arrow to change
    leftArrow.addEventListener('click', () => {
        prevSlide();
    });

    rightArrow.addEventListener('click', () => {
        nextSlide();
    });

    // Slide to change
    const sliderContainer = document.getElementById('slider-photos'); // Assuming the container has id "slider-photos"
    sliderContainer.addEventListener('touchstart', handleTouchStart);
    sliderContainer.addEventListener('touchend', handleTouchEnd);
}