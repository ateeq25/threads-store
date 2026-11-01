
export default function createProductCard(product) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  card.innerHTML = `
    <a href="#/product/${product.id}" class="product-card-link">
      <div class="product-card-image">
        <img
          class="product-image-primary"
          src="${product.image}"
          alt="${product.name}"
        >

        <img
          class="product-image-secondary"
          src="${product.hoverImage}"
          alt="${product.name}"
        >
      </div>

      ${product.label ? `<span class="product-label">${product.label}</span>` : ""}

      <div class="product-card-info">
        <h3>${product.name}</h3>
        <p>
          ${new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
          }).format(product.price)}
        </p>
      </div>
    </a>
  `;

  return card;
}
