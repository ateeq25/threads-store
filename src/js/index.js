
import "../styles/main.css";
import "../styles/header.css";
import "../styles/home.css";

import loadHome from "./pages/home/home.js";
import loadProducts from "./pages/products/products.js";

const content = document.querySelector("#content");

// Let the application manage scroll restoration
window.history.scrollRestoration = "manual";

// Store scroll positions against individual history entries
const scrollPositions = new Map();

let isHistoryNavigation = false;

// Determine which page to display
function renderPage() {
  const currentRoute = window.location.hash.slice(1) || "/";
  const routeParts = currentRoute.split("/").filter(Boolean);

  let page;

  if (routeParts[0] === "products") {
    const selectedCategory = routeParts[1] || "all";
    page = loadProducts(selectedCategory);
  } else {
    page = loadHome();
  }

  content.replaceChildren(page);

  if (isHistoryNavigation) {
    // Restore the position saved for this history entry
    const savedPosition =
      scrollPositions.get(history.state?.entryId) ?? 0;

    window.scrollTo(0, savedPosition);
  } else {
    // New navigation starts at the top
    window.scrollTo(0, 0);
  }

  isHistoryNavigation = false;
}

// Save the current scroll position before leaving a page
window.addEventListener("click", (event) => {
  const link = event.target.closest("a");

  if (!link) return;

  const destination = new URL(link.href, window.location.href);

  // Only handle internal hash-based navigation
  if (
    destination.origin !== window.location.origin ||
    !destination.hash.startsWith("#/")
  ) {
    return;
  }

  // Ignore links that point to the current route
  if (destination.hash === window.location.hash) return;

  // Save the current history entry's scroll position
  scrollPositions.set(history.state?.entryId, window.scrollY);
});

// Restore the correct page when navigating through browser history
window.addEventListener("popstate", () => {
  isHistoryNavigation = true;
  renderPage();
});

// Initialise the first history entry
const initialEntryId = crypto.randomUUID();

history.replaceState(
  { entryId: initialEntryId },
  "",
  window.location.href
);

// Render the initial page
renderPage();
