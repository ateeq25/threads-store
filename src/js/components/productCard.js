export default function createProductCard(product) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  // Product image container
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("product-image");

  // Primary image
  const primaryImage = document.createElement("img");
  primaryImage.src = product.image;
  primaryImage.alt = product.name;
  primaryImage.classList.add("primary-image");

  // Secondary image
  const secondaryImage = document.createElement("img");
  secondaryImage.src = product.hoverImage;
  secondaryImage.alt = "";
  secondaryImage.classList.add("secondary-image");
  secondaryImage.setAttribute("aria-hidden", "true");

  imageContainer.append(primaryImage, secondaryImage);

  // Product label
  if (product.label) {
    const label = document.createElement("span");
    label.classList.add("product-label");
    label.textContent = product.label;

    imageContainer.appendChild(label);
  }

  // Product information
  const details = document.createElement("div");
  details.classList.add("product-details");

  const name = document.createElement("h3");
  name.textContent = product.name;

  const price = document.createElement("p");
  price.classList.add("product-price");
  price.textContent = product.price;

  details.append(name, price);
  card.append(imageContainer, details);

  return card;
}