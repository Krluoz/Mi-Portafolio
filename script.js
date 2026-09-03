const themeButton = document.querySelector("#themeButton");
const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");
const navigationLinks = document.querySelectorAll(".navigation a");

const lanyard = document.querySelector("#lanyard");
const lanyardSwing = document.querySelector(".lanyard-swing");

const codeBackground = document.querySelector("#codeBackground");
const revealElements = document.querySelectorAll(".reveal");

/* ========================================
   MODO CLARO / OSCURO
======================================== */

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  themeButton.textContent = "☀";
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  const darkModeIsActive = document.body.classList.contains("dark-theme");

  themeButton.textContent = darkModeIsActive ? "☀" : "◐";

  localStorage.setItem(
    "portfolio-theme",
    darkModeIsActive ? "dark" : "light"
  );
});

/* ========================================
   MENÚ RESPONSIVE
======================================== */

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("active");

  const menuIsOpen = navigation.classList.contains("active");

  menuButton.textContent = menuIsOpen ? "×" : "☰";
  menuButton.setAttribute("aria-expanded", String(menuIsOpen));
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("active");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");
  });
});

/* ========================================
   GAFETE: PÉNDULO AL HACER CLIC
======================================== */

function moveBadge() {
  lanyardSwing.classList.remove("is-swinging");

  /*
    Fuerza un reflow para reiniciar la animación
    incluso cuando se hace clic varias veces seguidas.
  */
  void lanyardSwing.offsetWidth;

  lanyardSwing.classList.add("is-swinging");
}

lanyard.addEventListener("click", moveBadge);

lanyard.addEventListener("keydown", (event) => {
  const isEnter = event.key === "Enter";
  const isSpace = event.key === " ";

  if (!isEnter && !isSpace) {
    return;
  }

  event.preventDefault();
  moveBadge();
});

/* ========================================
   FONDO </> DISTRIBUIDO
======================================== */

function createCodeBackground() {
  const isMobile = window.innerWidth < 600;
  const totalSymbols = isMobile ? 22 : 55;

  codeBackground.innerHTML = "";

  for (let index = 0; index < totalSymbols; index += 1) {
    const symbol = document.createElement("span");

    symbol.className = "code-symbol";
    symbol.textContent = "</>";

    symbol.style.left = `${Math.random() * 96}%`;
    symbol.style.top = `${Math.random() * 98}%`;

    codeBackground.appendChild(symbol);
  }
}

createCodeBackground();

let resizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    createCodeBackground();
  }, 250);
});

/* ========================================
   REVEAL AL HACER SCROLL
======================================== */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});