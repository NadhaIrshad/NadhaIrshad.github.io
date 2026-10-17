// Mobile menu
const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
}

// Light / dark toggle (initial theme is set inline in <head> to avoid a flash)
const themeBtn = document.querySelector(".theme-toggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const root = document.documentElement;
    const current = root.dataset.theme ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

// Lightbox for any image inside .gallery or .project-media
const box = document.createElement("div");
box.className = "lightbox";
box.setAttribute("role", "dialog");
box.setAttribute("aria-modal", "true");
box.innerHTML = '<button type="button" aria-label="Close">&times;</button><img alt=""><p></p>';
document.body.appendChild(box);
const boxImg = box.querySelector("img");
const boxCap = box.querySelector("p");

function closeBox() {
  box.classList.remove("open");
  document.body.style.overflow = "";
}

document.querySelectorAll(".gallery img, .project-media img").forEach((img) => {
  img.addEventListener("click", () => {
    boxImg.src = img.src;
    boxImg.alt = img.alt;
    const fig = img.closest("figure");
    boxCap.textContent = (fig && fig.querySelector("figcaption")?.textContent) || img.alt;
    box.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

box.addEventListener("click", (e) => { if (e.target !== boxImg) closeBox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeBox(); });

// Footer year
const yr = document.getElementById("year");
if (yr) yr.textContent = new Date().getFullYear();
