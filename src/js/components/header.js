export default function createHeader() {
  const header = document.createElement("header");
  header.classList.add("site-header");

  // Brand logo
  const logo = document.createElement("a");
  logo.classList.add("logo");
  logo.href = "#home";
  logo.textContent = "THREADS";

  // Navigation
  const nav = document.createElement("nav");
  nav.classList.add("main-nav");
  nav.id = "main-navigation";

  const navLinks = [
    { text: "Home", href: "#/" },
    { text: "Collections", href: "#/products" },
    { text: "Categories", href: "#categories" },
    { text: "Our Story", href: "#about" },
    { text: "Contact", href: "#contact" },
  ];

  navLinks.forEach((item) => {
    const link = document.createElement("a");

    link.textContent = item.text;
    link.href = item.href;

    nav.appendChild(link);
  });

  // Header actions
const actions = document.createElement("div");
actions.classList.add("header-actions");

// Search button
const searchButton = document.createElement("button");
searchButton.classList.add("header-icon");
searchButton.setAttribute("aria-label", "Search products");

searchButton.innerHTML = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7"></circle>
    <path d="m20 20-4-4"></path>
  </svg>
`;

// Shopping bag link
const cartLink = document.createElement("a");
cartLink.classList.add("header-icon", "cart-link");
cartLink.href = "#cart";
cartLink.setAttribute("aria-label", "Shopping cart");

cartLink.innerHTML = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M5 8h14l1 13H4L5 8Z"></path>
    <path d="M9 8a3 3 0 0 1 6 0"></path>
  </svg>

  <span id="cart-count">0</span>
`;

actions.append(searchButton, cartLink);

  // Hamburger menu button
  const menuButton = document.createElement("button");
  menuButton.classList.add("menu-toggle");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-controls", "main-navigation");
  menuButton.textContent = "☰";

  // Toggle navigation menu
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  // Close menu after clicking a navigation link
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      menuButton.textContent = "☰";
    });
  });

  header.append(logo, nav, actions, menuButton);

  return header;
}