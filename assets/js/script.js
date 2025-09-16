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
})