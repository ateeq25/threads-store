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

  const navLinks = [
    { text: "Home", href: "#home" },
    { text: "Collections", href: "#collections" },
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

  const searchButton = document.createElement("button");
  searchButton.classList.add("header-icon");
  searchButton.textContent = "Search";
  searchButton.setAttribute("aria-label", "Search products");

  const cartLink = document.createElement("a");
  cartLink.classList.add("header-icon");
  cartLink.href = "#cart";
  cartLink.setAttribute("aria-label", "Shopping bag");

  cartLink.innerHTML = `
    Bag (<span id="cart-count">0</span>)
  `;

  actions.append(searchButton, cartLink);

  header.append(logo, nav, actions);

  return header;
}