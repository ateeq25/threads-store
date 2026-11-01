
import { getOrderById } from "../../utils/orderUtils.js";
import "../../../styles/order-confirmation.css";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

// Escape customer-provided values before inserting them into HTML.
const escapeHTML = (value = "") =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });

export default function loadOrderConfirmation(orderId) {
  const page = document.createElement("section");
  page.classList.add("confirmation-page", "container");

  const order = getOrderById(orderId);

  // Handle missing or invalid order references.
  if (!order) {
    page.innerHTML = `
      <div class="confirmation-empty">
        <h1>Order not found</h1>
        <p>We couldn't find the order you're looking for.</p>
        <a href="#/products" class="checkout-button">
          Continue Shopping
        </a>
      </div>
    `;

    return page;
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString(
    "en-NG",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  page.innerHTML = `
    <div class="confirmation-header">
      <div class="confirmation-icon" aria-hidden="true">✓</div>
      <h1>Thank you for your order!</h1>
      <p>Your order has been placed successfully.</p>
    </div>

    <div class="confirmation-card">
      <div class="confirmation-order-info">
        <div>
          <span>Order Reference</span>
          <strong>${escapeHTML(order.id)}</strong>
        </div>
        <div>
          <span>Order Date</span>
          <strong>${escapeHTML(orderDate)}</strong>
        </div>
        <div>
          <span>Order Status</span>
          <strong>${escapeHTML(order.status)}</strong>
        </div>
      </div>

      <div class="confirmation-section">
        <h2>Order Summary</h2>

        <div class="confirmation-items">
          ${order.items.map((item) => `
            <div class="confirmation-item">
              <img
                src="${escapeHTML(item.image)}"
                alt="${escapeHTML(item.name)}"
              />

              <div class="confirmation-item-details">
                <h3>${escapeHTML(item.name)}</h3>
                ${item.size ? `<p>Size: ${escapeHTML(item.size)}</p>` : ""}
                <p>Quantity: ${item.quantity}</p>
              </div>

              <strong>${formatPrice(item.itemTotal)}</strong>
            </div>
          `).join("")}
        </div>

        <div class="confirmation-totals">
          <div>
            <span>Subtotal</span>
            <span>${formatPrice(order.subtotal)}</span>
          </div>

          <div>
            <span>Delivery</span>
            <span>${formatPrice(order.deliveryFee)}</span>
          </div>

          <div class="confirmation-grand-total">
            <strong>Total</strong>
            <strong>${formatPrice(order.total)}</strong>
          </div>
        </div>
      </div>

      <div class="confirmation-section">
        <h2>Delivery Information</h2>

        <div class="confirmation-customer">
          <p><strong>${escapeHTML(order.customer.fullName)}</strong></p>
          <p>${escapeHTML(order.customer.email)}</p>
          <p>${escapeHTML(order.customer.phone)}</p>
          <p>
            ${escapeHTML(order.customer.address)},
            ${escapeHTML(order.customer.city)},
            ${escapeHTML(order.customer.state)}
          </p>
          ${order.customer.instructions
            ? `<p>Instructions: ${escapeHTML(order.customer.instructions)}</p>`
            : ""}
        </div>
      </div>

      <div class="confirmation-actions">
        <a href="#/products" class="checkout-button">
          Continue Shopping
        </a>
      </div>
    </div>
  `;

  return page;
}
