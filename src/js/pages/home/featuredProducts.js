
import createProductCard from "../../components/productCard.js";
import products from "../../../data/products.json";

export default function createFeaturedProducts() {
  const section = document.createElement("section");
  section.classList.add("featured-products");
  section.id = "featured-products";

  // Section heading
  const heading = document.createElement("div");
  heading.classList.add("featured-heading", "container");

  const title = document.createElement("h2");
  title.textContent = "Explore our featured pieces.";

  const description = document.createElement("p");
  description.textContent =
    "Explore our latest arrivals and pieces worth making room for.";

  heading.append(title, description);

  // Product grid
  const grid = document.createElement("div");
  grid.classList.add("product-grid", "container");

  products.forEach((product) => {
    const productCard = createProductCard(product);
    grid.appendChild(productCard);
  });

  // View all button
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("featured-button-container");

  const viewAllButton = document.createElement("a");
  viewAllButton.classList.add("view-all-button");
  viewAllButton.href = "#/products";
  viewAllButton.textContent = "View All Products";

  buttonContainer.appendChild(viewAllButton);

  section.append(heading, grid, buttonContainer);

  return section;
}
