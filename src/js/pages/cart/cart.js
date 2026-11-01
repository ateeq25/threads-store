import { getProductById } from "../../utils/productUtils.js";
import {
  getCart,
  updateCartItemQuantity,
  removeFromCart,
  updateHeaderCartCount,
} from "../../utils/cartUtils.js";

import "../../../styles/cart.css";

export default function loadCart() {
  const page = document.createElement("section");
  page.classList.add("cart-page", "container");

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);

  function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
      page.innerHTML = `
        <div class="cart-empty">
          <h1>Your cart is empty</h1>
          <p>Looks like you haven't added anything yet.</p>
          <a href="#/products" class="continue-shopping">
            Continue Shopping
          </a>
        </div>
      `;
      return;
    }

    const cartItems = cart
      .map((item) => {
        const product = getProductById(item.productId);

        if (!product) return "";

        return `
        <article class="cart-item">
          <a href="#/product/${product.id}" class="cart-item-image">
            <img src="${product.image}" alt="${product.name}">
          </a>

          <div class="cart-item-info">
            <h2>${product.name}</h2>
            <p class="cart-item-price">${formatPrice(product.price)}</p>

            ${item.size ? `<p class="cart-item-size">Size: ${item.size}</p>` : ""}

            <div class="cart-item-actions">
              <div class="cart-quantity-control">
                <button
                  type="button"
                  class="cart-quantity-decrease"
                  data-product-id="${item.productId}"
                  data-size="${item.size ?? ""}"
                  ${item.quantity <= 1 ? "disabled" : ""}
                  aria-label="Decrease quantity"
                >−</button>

                <span>${item.quantity}</span>

                <button
                  type="button"
                  class="cart-quantity-increase"
                  data-product-id="${item.productId}"
                  data-size="${item.size ?? ""}"
                  aria-label="Increase quantity"
                >+</button>
              </div>

              <button
                type="button"
                class="cart-remove-button"
                data-product-id="${item.productId}"
                data-size="${item.size ?? ""}"
              >
                Remove
              </button>
            </div>
          </div>

          <p class="cart-item-total">
            ${formatPrice(product.price * item.quantity)}
          </p>
        </article>
      `;
      })
      .join("");

    const subtotal = cart.reduce((total, item) => {
      const product = getProductById(item.productId);
      return product ? total + product.price * item.quantity : total;
    }, 0);

    page.innerHTML = `
      <div class="cart-header">
        <h1>Your Shopping Cart</h1>
        <p>${cart.reduce((total, item) => total + item.quantity, 0)} items</p>
      </div>

      <div class="cart-layout">
        <div class="cart-items">
          ${cartItems}
        </div>

        <aside class="cart-summary">
          <h2>Order Summary</h2>

          <div class="cart-subtotal">
            <span>Subtotal</span>
            <strong>${formatPrice(subtotal)}</strong>
          </div>

          <p class="cart-shipping-note">
            Shipping and taxes will be calculated at checkout.
          </p>

          <a href="#/checkout" class="checkout-button">
          Proceed to Checkout
          </a>

          <a href="#/products" class="back-to-shopping">
            Continue Shopping
          </a>
        </aside>
      </div>
    `;
    updateHeaderCartCount();
  }

  renderCart();

  page.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) return;

    const { productId, size } = button.dataset;

    if (button.classList.contains("cart-quantity-increase")) {
      const item = getCart().find(
        (entry) =>
          entry.productId === productId && entry.size === (size || null),
      );

      if (item) {
        updateCartItemQuantity(productId, size || null, item.quantity + 1);
      }
    }

    if (button.classList.contains("cart-quantity-decrease")) {
      const item = getCart().find(
        (entry) =>
          entry.productId === productId && entry.size === (size || null),
      );

      if (item) {
        updateCartItemQuantity(productId, size || null, item.quantity - 1);
      }
    }

    if (button.classList.contains("cart-remove-button")) {
      removeFromCart(productId, size || null);
    }

    renderCart();
  });

  return page;
}
