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
    startDelay: 500,    
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
 * Animation
 */
const cards = document.querySelectorAll('.journey__card');
const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${index * 2}s`;
            entry.target.classList.add('card--visible');
            observer.unobserve(entry.target)
        }
    });
}, { threshold: 0.2 });

cards.forEach(card => { cardObserver.observe(card); })

const projects = document.querySelectorAll('.projects__project');
const projectObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${index * 2}s`;
            entry.target.classList.add('project--visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

projects.forEach(project => { projectObserver.observe(project); })

/**
 * TODO: Contact Form
 */
