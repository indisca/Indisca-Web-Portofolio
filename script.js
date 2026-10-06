const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Buka menu navigasi" : "Tutup menu navigasi");
  navLinks.classList.toggle("is-open", !isOpen);
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
    navLinks.classList.remove("is-open");
  });
});

const sections = document.querySelectorAll("main section[id]");
const revealItems = document.querySelectorAll(".section-heading, .about-content, .skill-card, .project-card, .design-details, .contact-layout");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => {
    item.classList.add("reveal");
    revealObserver.observe(item);
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((item) => {
        const isActive = item.getAttribute("href") === `#${entry.target.id}`;
        item.classList.toggle("active", isActive);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}
