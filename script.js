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
