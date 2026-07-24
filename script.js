// =========================================================
// IMPORTANT: Replace this with your WhatsApp number.
// Use country code without +, spaces or dashes.
// Example UAE: 971501234567 | India: 919876543210
// =========================================================
const WHATSAPP_NUMBER = "917357212668";

const loader = document.getElementById("pageLoader");
const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const backToTop = document.getElementById("backToTop");
const toast = document.getElementById("toast");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hidden"), 450);
});

function openWhatsApp(message) {
  const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, "");
  const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1400);
  setTimeout(() => window.open(url, "_blank", "noopener,noreferrer"), 250);
}

document.querySelectorAll(".whatsapp-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    const message = button.dataset.message || "Hello Cakes Blend! I would like to place an order.";
    openWhatsApp(message);
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
  backToTop.classList.toggle("show", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");

const activeSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add("active");
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => activeSectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.13 }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
  revealObserver.observe(element);
});

document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.closest(".faq-item");
    document.querySelectorAll(".faq-item").forEach((faq) => {
      if (faq !== item) faq.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});

const reviewTrack = document.getElementById("reviewTrack");
const reviewCards = document.querySelectorAll(".review-card");
let reviewIndex = 0;
let autoSlide;

function showReview(index) {
  reviewIndex = (index + reviewCards.length) % reviewCards.length;
  reviewTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
}

function startAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => showReview(reviewIndex + 1), 5000);
}

document.getElementById("nextReview").addEventListener("click", () => {
  showReview(reviewIndex + 1);
  startAutoSlide();
});

document.getElementById("prevReview").addEventListener("click", () => {
  showReview(reviewIndex - 1);
  startAutoSlide();
});

startAutoSlide();

document.getElementById("customCakeForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("customName").value.trim();
  const occasion = document.getElementById("occasion").value;
  const cakeSize = document.getElementById("cakeSize").value;
  const flavour = document.getElementById("flavour").value;
  const details = document.getElementById("designDetails").value.trim();

  const message =
`Hello Cakes Blend! I want a customized cake.

Name: ${name}
Occasion: ${occasion}
Cake Size: ${cakeSize}
Flavour: ${flavour}
Design Details: ${details}

Please share design options, price and availability.`;

  openWhatsApp(message);
});

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("contactName").value.trim();
  const phone = document.getElementById("contactPhone").value.trim();
  const messageText = document.getElementById("contactMessage").value.trim();

  const message =
`Hello Cakes Blend!

Name: ${name}
Phone: ${phone}
Enquiry: ${messageText}`;

  openWhatsApp(message);
});

const counters = document.querySelectorAll("[data-count]");
const statsSection = document.querySelector(".stats");

function animateCounter(counter) {
  const target = Number(counter.dataset.count);
  const decimal = String(target).includes(".");
  const duration = 1500;
  const startTime = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentValue = target * eased;

    counter.textContent = decimal
      ? currentValue.toFixed(1)
      : Math.floor(currentValue).toLocaleString();

    if (progress < 1) requestAnimationFrame(update);
    else counter.textContent = decimal ? target.toFixed(1) : `${target.toLocaleString()}+`;
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      counters.forEach(animateCounter);
      counterObserver.disconnect();
    }
  },
  { threshold: 0.5 }
);

if (statsSection) counterObserver.observe(statsSection);

document.getElementById("currentYear").textContent = new Date().getFullYear();
