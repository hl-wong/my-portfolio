/**
 * TODO: Preload
 */


/**
 * Navigation Bar
 */
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) { nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
});

/**
 * Hero Role
 */
const role = document.getElementById('hero__role');
var typed = new Typed(role, {
    strings: ['Software Engineer', 'Front-End Developer', 'Java Android Developer'],
    typeSpeed: 50,
    backSpeed: 50,
    startDelay: 1500,    
    backDelay: 1500,    
    loop: true,
});

/**
 * Mobile Menu
 */
const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('.header__menu');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('toggle--active');
    menu.classList.toggle('active');
})

const links = document.querySelectorAll('.header__link');
links.forEach(link => {
    link.addEventListener('click', () => {
        toggle.classList.toggle('toggle--active');
        menu.classList.toggle('active');
    })
})

window.addEventListener('resize', () => {
    toggle.classList.remove('toggle--active');
    menu.classList.remove('active');
});

/**
 * TODO: Contact Form
 */
