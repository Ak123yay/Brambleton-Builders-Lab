const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");

function scrollToHash(hash, updateHistory = true) {
  if (!hash || hash === "#") {
    return;
  }

  const target = document.querySelector(hash);
  if (!target) {
    return;
  }

  const headerHeight = siteHeader ? siteHeader.getBoundingClientRect().height : 0;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;
  window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });

  if (updateHistory) {
    history.pushState(null, "", hash);
  }
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) {
      return;
    }

    const hash = event.target.getAttribute("href");
    if (hash && hash.startsWith("#")) {
      event.preventDefault();
      scrollToHash(hash);
    }

    siteNav.classList.remove("open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (siteNav && siteNav.contains(link)) {
      return;
    }

    const hash = link.getAttribute("href");
    if (!hash || hash === "#") {
      return;
    }

    event.preventDefault();
    scrollToHash(hash);
  });
});

const projectIdeas = [
  {
    title: "Personal website",
    copy: "About, interests, projects, and contact sections with an optional theme toggle or project filter.",
  },
  {
    title: "Club or nonprofit page",
    copy: "Mission, events, resources, and contact sections with a FAQ accordion or signup interest mockup.",
  },
  {
    title: "Study helper web app",
    copy: "Notes, useful links, tips, and flashcards with a random flashcard or quiz feature.",
  },
  {
    title: "Interactive JavaScript project",
    copy: "A quiz, counter, quote generator, theme toggle, or small tool with clear user interaction.",
  },
  {
    title: "Final showcase-ready project",
    copy: "A polished beginner website or simple web app the student can present and explain.",
  },
];

let projectIndex = 0;
const projectButton = document.querySelector("#project-button");
const projectTitle = document.querySelector("#project-title");
const projectCopy = document.querySelector("#project-copy");

if (projectButton && projectTitle && projectCopy) {
  projectButton.addEventListener("click", () => {
    projectIndex = (projectIndex + 1) % projectIdeas.length;
    projectTitle.textContent = projectIdeas[projectIndex].title;
    projectCopy.textContent = projectIdeas[projectIndex].copy;
  });
}

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    if (!item) {
      return;
    }

    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
    const indicator = button.querySelector("span");
    if (indicator) {
      indicator.textContent = isOpen ? "-" : "+";
    }
  });
});

window.addEventListener("load", () => {
  if (window.location.hash) {
    setTimeout(() => scrollToHash(window.location.hash, false), 120);
  }
});
