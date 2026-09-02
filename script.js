const themeButton = document.querySelector("#themeButton");
const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");
const navigationLinks = document.querySelectorAll(".navigation a");
const revealElements = document.querySelectorAll(".reveal");
const lanyard = document.querySelector("#lanyard");
const lanyardSwing = document.querySelector(".lanyard-swing");
const codeBackground = document.querySelector("#codeBackground");
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


menuButton.addEventListener("click", () => {
  navigation.classList.toggle("active");

  const menuIsOpen = navigation.classList.contains("active");

  menuButton.textContent = menuIsOpen ? "×" : "☰";
  menuButton.setAttribute("aria-expanded", menuIsOpen);
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("active");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");
  });
});


function moveLanyard() {

  lanyardSwing.classList.remove("is-swinging");


  void lanyardSwing.offsetWidth;

  lanyardSwing.classList.add("is-swinging");
}

lanyard.addEventListener("click", moveLanyard);

lanyard.addEventListener("keydown", (event) => {
  const isEnterKey = event.key === "Enter";
  const isSpaceKey = event.key === " ";

  if (!isEnterKey && !isSpaceKey) {
    return;
  }

  event.preventDefault();
  moveLanyard();
});



function createCodeBackground() {
  const isMobile = window.innerWidth < 600;
  const numberOfSymbols = isMobile ? 25 : 62;

  codeBackground.innerHTML = "";

  for (let index = 0; index < numberOfSymbols; index += 1) {
    const symbol = document.createElement("span");

    symbol.classList.add("code-symbol");
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
  }, 200);
});



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