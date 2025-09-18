/**
 * Preload
 */
const links = ["About Me", "My Journey", "Projects", "Skills", "Contact"];
const nav_list = document.getElementById("nav__list");
const header_list = document.getElementById("header__list");

links.map(link => {
    const href = "#" + link.toLowerCase().replace(/\s+/g, "-");

    const nav_item = document.createElement("li");
    nav_item.className = "nav__item";
    nav_item.innerHTML = `<a href="${href}" class="nav__link">${link}</a>`;
    nav_list.append(nav_item);

    const header_item = document.createElement("li");
    header_item.className = "header__item";
    header_item.innerHTML = `<a href="${href}" class="header__link">${link}</a>`;
    header_list.append(header_item);
});

fetch('./assets/data/data.json')
    .then((res) => res.json())
    .then(data => {
        const work = data.work;
        const academic = data.academic;
        const projects = data.projects;
        const skills = data.skills;

        /**
         * Journey
         */
        let journeys = [...work, ...academic];

        function parseDate(dateStr) { return dateStr ? new Date(dateStr) : null; }
        journeys.sort((a, b) => parseDate(b.start) - parseDate(a.start));

        function formatDate(dateStr) {
            if (!dateStr) return "Present";
            const date = new Date(dateStr);
            return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
        }

        const journey_timeline = document.getElementById("journey__timeline");
        journeys.forEach(journey => {
            const journey_item = document.createElement("div");
            journey_item.className = "journey__item";

            journey_item.innerHTML = `
                <div class="journey__card">
                    <div class="journey__card-header">
                        <img src="${journey.image}" alt="${journey.title}" draggable="false" class="journey__card-icon" />
                        <div class="journey__card-info">
                            <h3 class="journey__card-title">${journey.title}</h3>
                            <p class="journey__card-sub">${journey.sub}</p>
                        </div>
                    </div>
                    
                    <div class="journey__card-details">
                        <div class="journey__card-range">
                            <span class="material-icons">date_range</span>
                            <p>${formatDate(journey.start)} - ${formatDate(journey.end)}</p>
                        </div>

                        <div class="journey__divider"></div>

                        <div class="journey__card-location">
                            <span class="material-icons">location_on</span>
                            <p>${journey.location}</p>
                        </div>
                    </div>

                    <ul class="tags">${journey.tags.map(tag => `<li class="tag">${tag}</li>`).join("")}</ul>
                </div>
            `;
            journey_timeline.append(journey_item);
            revealOnScroll('.journey__card', 'card--visible', 2);
        });


        /**
         * Projects
         */
        const projects_list = document.getElementById("projects__list");
        projects.forEach((project, index) => {
            const project_card = document.createElement("div");
            project_card.className = "projects__project";
            
            if (index % 2 == 1) project_card.classList.add("project--reverse");
            
            project_card.innerHTML = `
                <div class="projects__left">
                    <img src="${project.image}" alt="${project.title}" draggable="false" class="projects__img" />
                </div>
                <div class="projects__right">
                    <span class="projects__category">${project.category}</span>
                    <h3 class="projects__title">${project.title}</h3>
                    <p class="projects__desc">${project.desc}</p>

                    <ul class="tags">${project.tags.map(tag => `<li class="tag">${tag}</li>`).join("")}</ul>

                    <a href="${project.link}" target="_blank" class="btn btn-primary projects__btn">View Projects <span class="material-icons">arrow_outward</span></a>
                </div>
            `;
            projects_list.append(project_card);
            revealOnScroll('.projects__project', 'project--visible', 2);
        });

        /**
         * Skills
         */
        const skills_grid = document.getElementById("skills__grid");
        skills.forEach(skill => {
            const skill_card = document.createElement("div");
            skill_card.className = "skills__card";
            skill_card.innerHTML = `
                <img src="${skill.image}" alt="${skill.label}" class="skills__icon" />
                <p class="skills__text">${skill.label}</p>
            `;
            skills_grid.append(skill_card);
        });
    })
    .catch(error => console.error("Error loading JSON:", error));

/**
 * Reset the page to the top when refresh
 */
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

function resetToTop() {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0,0);
    html.style.scrollBehavior = prev;
}
window.addEventListener('load', resetToTop);

/**
 * Fix Safari load and jump issue
 */
window.addEventListener('pageshow', function(e) {
    if (e.persisted) resetToTop();
})
if (location.hash) history.replaceState(null, '', location.pathname + location.search);

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
});

const header_links = document.querySelectorAll('.header__link');
header_links.forEach(link => {
    link.addEventListener('click', () => {
        toggle.classList.toggle('toggle--active');
        menu.classList.toggle('active');
    })
});

window.addEventListener('resize', () => {
    toggle.classList.remove('toggle--active');
    menu.classList.remove('active');
});

/**
 * Animation
 */
function revealOnScroll(selector, visibleClass, delayStep) {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * delayStep}s`;
                entry.target.classList.add(visibleClass);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 })

    elements.forEach(el => observer.observe(el));
}
revealOnScroll('.section', 'section--visible', 2);

/**
 * Contact Form
 */
const contact_form = document.getElementById("contact__form");
contact_form.addEventListener('submit', function(event) {
    let formValid = true;

    const name = document.getElementById("contact__form-input-name").value;
    const error_name = document.getElementById("contact__form-error-name");

    if (!name) {
        formValid = false;
        error_name.textContent = "Please enter your name.";
        error_name.classList.add('error--visible');
    } else { error_name.classList.remove('error--visible'); }

    const email = document.getElementById("contact__form-input-email").value;
    const error_email = document.getElementById("contact__form-error-email");

    function validateEmail(email) {
        var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    if (!email) {
        formValid = false;
        error_email.textContent = "Please enter your email";
        error_email.classList.add('error--visible');
    }
    else if (!validateEmail(email)) {
        formValid = false;
        error_email.textContent = "Please enter your valid email";
        error_email.classList.add('error--visible');
    } else { error_email.classList.remove('error--visible'); }

    const subject = document.getElementById("contact__form-input-subject").value;
    const error_subject = document.getElementById("contact__form-error-subject");

    if (!subject) {
        formValid = false;
        error_subject.textContent = "Please enter your subject";
        error_subject.classList.add('error--visible');
    } else { error_subject.classList.remove('error--visible'); }

    const message = document.getElementById("contact__form-input-message").value;
    const error_message = document.getElementById("contact__form-error-message");

    if (!message) {
        formValid = false;
        error_message.textContent = "Please enter your message";
        error_message.classList.add('error--visible');
    }
    else { error_message.classList.remove('error--visible'); }

    if (!formValid) { event.preventDefault(); }
})


