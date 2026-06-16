const body = document.body;
const languageToggle = document.querySelector(".language-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const countdown = document.querySelector(".countdown");

function setLanguage(language) {
  body.dataset.language = language;
  document.documentElement.lang = language === "en" ? "en" : "zh-Hant";
  if (!languageToggle) return;

  const labels = languageToggle.querySelectorAll("span");
  labels.forEach((label) => label.classList.remove("active-lang"));
  labels[language === "en" ? 1 : 0].classList.add("active-lang");
  languageToggle.setAttribute(
    "aria-label",
    language === "en" ? "Switch to Traditional Chinese" : "Switch to English"
  );
  localStorage.setItem("chc-language", language);
}

function updateCountdown() {
  if (!countdown) return;
  const deadline = new Date(countdown.dataset.deadline).getTime();
  const distance = Math.max(0, deadline - Date.now());
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);

  countdown.querySelector('[data-count="days"]').textContent = String(days);
  countdown.querySelector('[data-count="hours"]').textContent = String(hours).padStart(2, "0");
  countdown.querySelector('[data-count="minutes"]').textContent = String(minutes).padStart(2, "0");
}

languageToggle?.addEventListener("click", () => {
  const nextLanguage = body.dataset.language === "en" ? "zh" : "en";
  setLanguage(nextLanguage);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.querySelectorAll(".nav-widget").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll('a[aria-disabled="true"]').forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

setLanguage(localStorage.getItem("chc-language") === "en" ? "en" : "zh");
updateCountdown();
setInterval(updateCountdown, 60 * 1000);
