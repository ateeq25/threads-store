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