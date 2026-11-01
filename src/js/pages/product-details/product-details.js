import { getProductById } from "../../utils/productUtils.js";
import "../../../styles/product-details.css";
import {
  addToCart,
  updateHeaderCartCount,
} from "../../utils/cartUtils.js";

export default function loadProductDetails(productId) {
  const product = getProductById(productId);

  const page = document.createElement("section");
  page.classList.add("product-details-page", "container");

  // Handle invalid product IDs
  if (!product) {
    page.innerHTML = `
      <div class="product-not-found">
        <h1>Product not found</h1>
        <p>Sorry, we couldn't find the product you're looking for.</p>
        <a href="#/products">Continue Shopping</a>
      </div>
    `;

    return page;
  }

  // Collect the available product images
  const productImages = [product.image, product.hoverImage].filter(Boolean);

  page.innerHTML = `
  <div class="product-details-layout">

    <div class="product-details-gallery">

      <div class="product-main-image">
        <img
          src="${productImages[0]}"
          alt="${product.name}"
          id="main-product-image"
        >
      </div>

      <div class="product-image-thumbnails">
        ${productImages
          .map(
            (image, index) => `
          <button
            class="product-thumbnail ${index === 0 ? "active" : ""}"
            type="button"
            data-image="${image}"
            aria-label="View product image ${index + 1}"
            aria-pressed="${index === 0}"
          >
            <img src="${image}" alt="">
          </button>
        `,
          )
          .join("")}
      </div>

    </div>

    <div class="product-details-info">

      <p class="product-details-category">
        ${product.category}
      </p>

      <h1>${product.name}</h1>

      <p class="product-details-price">
        ${new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          maximumFractionDigits: 0,
        }).format(product.price)}
      </p>

      <p class="product-details-description">
        ${product.description || ""}
      </p>

      ${
        product.sizes && product.sizes.length > 0
          ? `
            <div class="product-size-section">
              <h3>Select Size</h3>

              <div class="product-size-options">
                ${product.sizes
                  .map(
                    (size) => `
                  <button
                    type="button"
                    class="size-option"
                    data-size="${size}"
                    aria-pressed="false"
                  >
                    ${size}
                  </button>
                `,
                  )
                  .join("")}
              </div>
            </div>
          `
          : ""
      }

      <div class="product-quantity-section">
        <h3>Quantity</h3>

        <div class="quantity-control">

          <button
            type="button"
            class="quantity-decrease"
            aria-label="Decrease quantity"
            disabled
          >
            −
          </button>

          <span class="quantity-value" aria-live="polite">1</span>

          <button
            type="button"
            class="quantity-increase"
            aria-label="Increase quantity"
          >
            +
          </button>

        </div>
      </div>

      <div class="product-add-to-cart">
  <button type="button" class="add-to-cart-button">
    Add to Cart
  </button>
  <p class="cart-feedback" aria-live="polite"></p>
</div>

    </div>

  </div>
`;

  // Get the main image and all thumbnail buttons
  const mainImage = page.querySelector("#main-product-image");
  const thumbnails = page.querySelectorAll(".product-thumbnail");

  // Change the main image when a thumbnail is clicked
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      const selectedImage = thumbnail.dataset.image;

      mainImage.src = selectedImage;

      // Update the active thumbnail
      thumbnails.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      thumbnail.classList.add("active");
      thumbnail.setAttribute("aria-pressed", "true");
    });
  });

  // =========================
  // SIZE SELECTION
  // =========================

  const sizeOptions = page.querySelectorAll(".size-option");
let selectedSize = null;

sizeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // Update the selected size
    selectedSize = option.dataset.size;

    // Update the visual selection
    sizeOptions.forEach((item) => {
      item.classList.remove("selected");
      item.setAttribute("aria-pressed", "false");
    });

    option.classList.add("selected");
    option.setAttribute("aria-pressed", "true");
  });
});

  // =========================
  // QUANTITY CONTROL
  // =========================

  const quantityValue = page.querySelector(".quantity-value");
  const decreaseButton = page.querySelector(".quantity-decrease");
  const increaseButton = page.querySelector(".quantity-increase");

  let quantity = 1;

  function updateQuantity() {
    quantityValue.textContent = quantity;

    // Disable decrease button when quantity reaches 1
    decreaseButton.disabled = quantity === 1;
  }

  decreaseButton.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      updateQuantity();
    }
  });

  increaseButton.addEventListener("click", () => {
    quantity++;
    updateQuantity();
  });

  // =========================
  // ADD TO CART
  // =========================

  const addToCartButton = page.querySelector(".add-to-cart-button");
  const cartFeedback = page.querySelector(".cart-feedback");

  addToCartButton.addEventListener("click", () => {
    const result = addToCart(product.id, selectedSize, quantity);

    cartFeedback.textContent = result.message;

    if (result.success) {
      updateHeaderCartCount();

      cartFeedback.classList.add("success");
      cartFeedback.classList.remove("error");
    } else {
      cartFeedback.classList.add("error");
      cartFeedback.classList.remove("success");
    }
  });

  return page;
}
