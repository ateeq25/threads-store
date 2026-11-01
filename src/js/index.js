import "../styles/main.css";
import "../styles/header.css";
import "../styles/home.css";

import createHeader from "./components/header.js";
import createFooter from "./components/footer.js";

import loadHome from "./pages/home/home.js";
import loadProducts from "./pages/products/products.js";
import loadProductDetails from "./pages/product-details/product-details.js";
import loadCart from "./pages/cart/cart.js";
import loadCheckout from "./pages/checkout/checkout.js";
import loadOrderConfirmation from "./pages/order-confirmation/order-confirmation.js";

const content = document.querySelector("#content");

// Let the application manage scroll restoration
window.history.scrollRestoration = "manual";

// Store scroll positions for individual history entries
const scrollPositions = new Map();

// Generate an ID for each history entry
function createEntryId() {
  return crypto.randomUUID();
}

// Initialise the current history entry
if (!history.state?.entryId) {
  history.replaceState({ entryId: createEntryId() }, "", window.location.href);
}

// Render the page based on the current URL
function renderPage(restoreScroll = false) {
  const currentRoute = window.location.hash.slice(1) || "/";
  const routeParts = currentRoute.split("/").filter(Boolean);

  let page;

  if (routeParts[0] === "products") {
    const selectedCategory = routeParts[1] || "all";
    page = loadProducts(selectedCategory);
  } else if (routeParts[0] === "product") {
    const productId = routeParts[1];
    page = loadProductDetails(productId);
  } else if (routeParts[0] === "cart") {
    page = loadCart();
  } else if (routeParts[0] === "checkout") {
    page = loadCheckout();
  } else if (routeParts[0] === "order-confirmation") {
    const orderId = routeParts[1];
    page = loadOrderConfirmation(orderId);
  } else {
    page = loadHome();
  }

  // Create the shared page layout
  const appLayout = document.createElement("div");
  appLayout.classList.add("app-layout");

  const header = createHeader();
  const footer = createFooter();

  // Assemble the page
  appLayout.append(header, page, footer);

  content.replaceChildren(appLayout);

  if (restoreScroll) {
    const savedPosition = scrollPositions.get(history.state?.entryId) ?? 0;

    window.scrollTo(0, savedPosition);
  } else {
    window.scrollTo(0, 0);
  }
}

// Keep the current entry's scroll position updated
window.addEventListener(
  "scroll",
  () => {
    const entryId = history.state?.entryId;

    if (entryId) {
      scrollPositions.set(entryId, window.scrollY);
    }
  },
  { passive: true },
);

// Handle internal navigation links
document.addEventListener("click", (event) => {
  const link = event.target.closest("a");

  if (!link) return;

  const destination = new URL(link.href, window.location.href);

  // Only intercept internal application routes
  if (
    destination.origin !== window.location.origin ||
    !destination.hash.startsWith("#/")
  ) {
    return;
  }

  // Don't navigate if the route hasn't changed
  if (destination.hash === window.location.hash) {
    event.preventDefault();
    return;
  }

  // Allow the router to manage navigation
  event.preventDefault();

  // Create a new browser history entry
  history.pushState({ entryId: createEntryId() }, "", destination.hash);

  // Render the new page at the top
  renderPage();
});

// Handle browser Back and Forward
window.addEventListener("popstate", () => {
  renderPage(true);
});

// Render the initial page
renderPage();
