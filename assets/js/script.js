const navDesktopEl = document.querySelector(".nav--desktop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    navDesktopEl.classList.add("nav--scrolled");
  } else {
    navDesktopEl.classList.remove("nav--scrolled");
  }
});

const navToggleEl = document.querySelector(".nav__toggle");
const navMobileEl = document.querySelector(".nav--mobile");
navToggleEl.addEventListener("click", () => {
  navToggleEl.classList.toggle("nav__toggle--active");
  navMobileEl.classList.toggle("nav--open");
});

const navMobileLinkEl = navMobileEl.querySelectorAll(".nav__link");
navMobileLinkEl.forEach((l) => {
  l.addEventListener("click", () => {
    navToggleEl.classList.toggle("nav__toggle--active");
    navMobileEl.classList.toggle("nav--open");
  });
});

function formatDate(dateStr) {
  if (!dateStr) return;
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

function revealOnScroll(selector, visibleClass, delayStep) {
  const elements = document.querySelectorAll(selector);

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.computedStyleMap.animationDelay = `${index * delayStep}s`;
          entry.target.classList.add(visibleClass);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  elements.forEach((el) => observer.observe(el));
}
revealOnScroll(".section", "section--visible", 2);

fetch("./assets/data/data.json")
  .then((res) => res.json())
  .then((data) => {
    const journeyData = [
      ...data.academic.map((a) => ({ ...a, type: "academic" })),
      ...data.experience.map((e) => ({ ...e, type: "experience" })),
    ].sort((a, b) => new Date(b.start) - new Date(a.start));
    journey.init(journeyData);

    const projectData = data.projects;
    projects.init(projectData);

    const skillsData = data.skills;
    skills.init(skillsData);
  });

const journey = {
  journeyTimelineEl: document.querySelector(".journey__timeline"),

  init(data) {
    Object.values(data).forEach((j, i) => {
      const journeyItemEl = document.createElement("div");
      journeyItemEl.classList.add("journey__item");
      journeyItemEl.innerHTML = `
        <div class="journey__card">
            <div class="journey__card-header">
                <h3>${j.position || j.course}</h3>
                <h4>${j.company || j.school}</h4>

                <div class="journey__card-header-date">
                    <span class="material-icons">calendar_month</span>
                    <span>${formatDate(j.start)} - ${formatDate(j.end)}</span>
                </div>

                <div class="journey__card-header-location">
                    <span class="material-icons">location_on</span>
                    <span>${j.location}</span>
                </div>
            </div>

            ${
              j.type === "experience"
                ? `
                <div class="journey__card-content">
                    <div class="journey__card-content-wrapper">
                        ${
                          j.responsibilities &&
                          `
                            <div class="journey__card-content-responsibility">
                                <h5>Key Responsibilities</h5>
                                <ul>${j.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul>
                            </div>
                        `
                        }
                        ${
                          j.skills &&
                          `
                            <div class="journey__card-content-skills">
                                <h5>Skills</h5>
                                <ul>${j.skills.map((s) => `<li>${s}</li>`).join("")}</ul>
                            </div>    
                        `
                        }
                    </div>
                </div>
                `
                : ``
            }

            ${
              j.type === "experience" && (j.responsibilities || j.skills)
                ? `
                <div class="journey__card-footer">
                    <button class="journey__card-footer-btn" data-id="${i}" aria-expanded="false">
                        View More
                        <span class="material-icons">keyboard_arrow_down</span>
                    </button>
                </div>
                `
                : ``
            }
        </div>
        <img src="${j.logo}" alt="${j.type === "experience" ? "company" : "academic"}" draggable="false" class="journey__marker" />
      `;
      journeyItemEl.addEventListener("click", (e) => {
        const journeyCardFooterBtnEl = e.target.closest(
          ".journey__card-footer-btn",
        );
        if (!journeyCardFooterBtnEl) return;

        const journeyCardEl = journeyCardFooterBtnEl.closest(".journey__card");
        journeyCardEl.classList.toggle("journey__card--expanded");

        const isExpanded = journeyCardEl.classList.contains(
          "journey__card--expanded",
        );
        if (isExpanded) {
          journeyCardFooterBtnEl.innerHTML = `View Less <span class="material-icons">keyboard_arrow_up</span>`;
        } else {
          journeyCardFooterBtnEl.innerHTML = `View More <span class="material-icons">keyboard_arrow_down</span>`;
        }
      });
      this.journeyTimelineEl.append(journeyItemEl);
    });
    revealOnScroll(".journey__indicator", "journey__indicator--grow", 2);
    revealOnScroll(".journey__card", "journey__card--visible", 2);
  },
};

const projects = {
  projectsGridEl: document.querySelector(".projects__grid"),

  init(data) {
    Object.values(data).forEach((p) => {
      const projectsCardEl = document.createElement("div");
      projectsCardEl.classList.add("projects__card");
      projectsCardEl.innerHTML = `
        <div class="projects__card-wrapper">
            <div class="projects__card-img">
                <img src="${p.image}" alt="project" />
            </div>
            <h3>${p.title}</h3>
            <h4>${p.category}</h4>
            <p>${p.description}</p>

            <ul class="projects__card-skills">
                ${p.skills
                  .map(
                    (s) => `
                    <li>
                        <img src="${s.icon}" alt="${s.name}" />
                        <span>${s.name}</span>
                    </li>`,
                  )
                  .join("")}
            </ul>
        </div>

        <div class="projects__card-actions">
            ${
              p.github
                ? `
                <a href="${p.github}" target="_blank" class="btn btn--primary">
                    <i class="devicon-github-original"></i>
                    <span>GitHub</span>
                </a>`
                : ``
            }
            ${
              p.demo
                ? `
                <a href="${p.demo}" target="_blank" class="btn btn--secondary">
                    <span class="material-icons">open_in_new</span>
                    <span>Demo</span>
                </a>
                `
                : ``
            }
        </div>
      `;
      this.projectsGridEl.append(projectsCardEl);
    });
    revealOnScroll(".projects__card", "projects__card--visible", 2);
  },
};

const skills = {
  skillsGridEl: document.querySelector(".skills__grid"),

  init(data) {
    Object.values(data).forEach((s) => {
      const skillsCardEl = document.createElement("div");
      skillsCardEl.classList.add("skills__card");
      skillsCardEl.innerHTML = `
        <img src="${s.icon}" alt="${s.name}" />
        <span>${s.name}</span>
      `;
      this.skillsGridEl.append(skillsCardEl);
    });
    revealOnScroll(".skills__card", "skills__card--visible", 2);
  },
};

function resetToTop() {
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  html.style.scrollBehavior = prev;
}
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.addEventListener("load", resetToTop);

window.addEventListener("pageshow", function (e) {
  if (e.persisted) resetToTop();
});
if (location.hash)
  history.replaceState(null, "", location.pathname + location.search);
