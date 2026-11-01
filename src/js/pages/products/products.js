import createHeader from "../../components/header.js";
import createFooter from "../../components/footer.js";
import createProductCard from "../../components/productCard.js";
import products from "../../../data/products.json";

import "../../../styles/products.css";

export default function loadProducts(initialCategory = "all") {
  const page = document.createElement("div");
  page.classList.add("products-page");

  // Shared header
  const header = createHeader();

  // Main content
  const main = document.createElement("main");
  main.classList.add("products-main", "container");

  // Page introduction
  const introduction = document.createElement("div");
  introduction.classList.add("products-introduction");

  const title = document.createElement("h1");
  title.textContent = "Explore Every Piece";

  const description = document.createElement("p");
  description.textContent =
    "Explore our collection of thoughtfully selected pieces.";

  introduction.append(title, description);

  // Product controls
  const controls = document.createElement("div");
  controls.classList.add("products-controls");

  // Category filters
  const filters = document.createElement("div");
  filters.classList.add("category-filters");

  const categories = [
    { label: "All", value: "all" },
    { label: "Clothing", value: "clothing" },
    { label: "Shoes", value: "shoes" },
    { label: "Bags", value: "bags" },
    { label: "Accessories", value: "accessories" },
  ];

  const validCategories = ["all", "clothing", "shoes", "bags", "accessories"];

  let activeCategory = validCategories.includes(initialCategory)
    ? initialCategory
    : "all";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("filter-button");
    button.textContent = category.label;
    button.dataset.category = category.value;

    if (category.value === activeCategory) {
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
    } else {
      button.setAttribute("aria-pressed", "false");
    }

    button.addEventListener("click", () => {
      activeCategory = category.value;

      filters.querySelectorAll(".filter-button").forEach((filter) => {
        const isActive = filter.dataset.category === activeCategory;

        filter.classList.toggle("active", isActive);
        filter.setAttribute("aria-pressed", String(isActive));
      });

      renderProducts();
    });

    filters.appendChild(button);
  });

  // Sorting control
  const sorting = document.createElement("div");
  sorting.classList.add("products-sorting");

  const sortLabel = document.createElement("label");
  sortLabel.htmlFor = "product-sort";
  sortLabel.textContent = "Sort by:";

  const sortSelect = document.createElement("select");
  sortSelect.id = "product-sort";

  const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "low-to-high" },
    { label: "Price: High to Low", value: "high-to-low" },
  ];

  sortOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.label;

    sortSelect.appendChild(optionElement);
  });

  sorting.append(sortLabel, sortSelect);
  controls.append(filters, sorting);

  // Product count
  const productCount = document.createElement("p");
  productCount.classList.add("product-count");

  // Product grid
  const grid = document.createElement("div");
  grid.classList.add("product-grid");

  // Render products based on selected filters and sorting
  function renderProducts() {
    let displayedProducts = [...products];

    // Filter by category
    if (activeCategory !== "all") {
      displayedProducts = displayedProducts.filter(
        (product) => product.category === activeCategory,
      );
    }

    // Sort products by price
    if (sortSelect.value === "low-to-high") {
      displayedProducts.sort((a, b) => a.price - b.price);
    } else if (sortSelect.value === "high-to-low") {
      displayedProducts.sort((a, b) => b.price - a.price);
    }

    // Update product count
    productCount.textContent = `${displayedProducts.length} ${displayedProducts.length === 1 ? "product" : "products"}`;

    // Clear previous products
    grid.replaceChildren();

    // Display empty state if no products match
    if (displayedProducts.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.classList.add("empty-products");
      emptyMessage.textContent = "No products found in this category.";

      grid.appendChild(emptyMessage);
      return;
    }

    // Create product cards
    displayedProducts.forEach((product) => {
      const productCard = createProductCard(product);
      grid.appendChild(productCard);
    });
  }

  sortSelect.addEventListener("change", renderProducts);

  // Initial product rendering
  renderProducts();

  // Assemble page
  main.append(introduction, controls, productCount, grid);

  const footer = createFooter();

  page.append(header, main, footer);

  return page;
}
