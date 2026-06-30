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
    if (event.target instanceof HTMLAnchorElement) {
      const hash = event.target.getAttribute("href");
      if (hash && hash.startsWith("#")) {
        event.preventDefault();
        scrollToHash(hash);
      }

      siteNav.classList.remove("open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
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

window.addEventListener("load", () => {
  if (window.location.hash) {
    setTimeout(() => scrollToHash(window.location.hash, false), 120);
    setTimeout(() => scrollToHash(window.location.hash, false), 650);
  }
});

const projectIdeas = [
  {
    title: "Personal portfolio",
    copy:
      "About, interests, projects, and contact sections with an optional theme toggle or project filter.",
  },
  {
    title: "Club or nonprofit website",
    copy: "Mission, events, resources, and contact sections with a FAQ accordion or signup interest mockup.",
  },
  {
    title: "Event landing page",
    copy: "Title, date, schedule, and registration button with a countdown or interactive schedule.",
  },
  {
    title: "Quiz app",
    copy: "Three to five questions with answer feedback, a score counter, and an optional restart button.",
  },
  {
    title: "Study helper",
    copy: "Notes, useful links, tips, and flashcards with a random flashcard or quiz feature.",
  },
  {
    title: "Local business mock site",
    copy: "Hero, services, testimonials, and contact sections with an interactive service selector.",
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

const interestForm = document.querySelector("#interest-form");
const formStatus = document.querySelector("#form-status");

if (interestForm && formStatus) {
  interestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(interestForm);
    const student = String(formData.get("student") || "").trim();
    const grade = String(formData.get("grade") || "").trim();
    const interest = String(formData.get("interest") || "").trim();

    if (!student || !grade || !interest) {
      formStatus.textContent = "Please complete the required fields before preparing the note.";
      return;
    }

    formStatus.textContent = `Draft note ready: ${student}, ${grade}, interested in ${interest.toLowerCase()}. This local preview has not submitted or stored anything.`;
    interestForm.reset();
  });
}
