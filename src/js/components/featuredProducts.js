import createProductCard from "./productCard.js";

export default function createFeaturedProducts() {
  const section = document.createElement("section");
  section.classList.add("featured-products", "section");
  section.id = "featured-products";

  // Section heading
  const heading = document.createElement("div");
  heading.classList.add("featured-heading", "container");

  const title = document.createElement("h2");
  title.textContent = "Featured Pieces";

  const description = document.createElement("p");
  description.textContent =
    "Explore our latest arrivals and pieces worth making room for.";

  heading.append(title, description);

  // Product data
  const products = [
    {
      name: "Relaxed Cotton Shirt",
      price: "₦35,000",
      label: "NEW",
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&q=80",
      hoverImage:
        "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=700&q=80",
    },
    {
      name: "Classic Everyday Jacket",
      price: "₦65,000",
      label: "TRENDING",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700&q=80",
      hoverImage:
        "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=700&q=80",
    },
    {
      name: "Essential Knit Sweater",
      price: "₦42,000",
      label: "NEW",
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=700&q=80",
      hoverImage:
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=700&q=80",
    },
    {
      name: "Tailored Casual Trousers",
      price: "₦48,000",
      label: "",
      image:
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=700&q=80",
      hoverImage:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80",
    },
    {
      name: "Minimal Leather Bag",
      price: "₦55,000",
      label: "TRENDING",
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&q=80",
      hoverImage:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&q=80",
    },
    {
      name: "Everyday Sneakers",
      price: "₦60,000",
      label: "",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=80",
      hoverImage:
        "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=700&q=80",
    },
    {
      name: "Modern Oversized Tee",
      price: "₦25,000",
      label: "NEW",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&q=80",
      hoverImage:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&q=80",
    },
    {
      name: "Structured Denim Jacket",
      price: "₦58,000",
      label: "",
      image:
        "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=700&q=80",
      hoverImage:
        "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=700&q=80",
    },
  ];

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
  viewAllButton.href = "#products";
  viewAllButton.textContent = "View All Products";

  buttonContainer.appendChild(viewAllButton);

  section.append(heading, grid, buttonContainer);

  return section;
}