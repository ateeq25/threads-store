import { getCart } from "../../utils/cartUtils.js";
import { getProductById } from "../../utils/productUtils.js";
import "../../../styles/checkout.css";

import { createOrder, DELIVERY_FEE } from "../../utils/orderUtils.js";

import { clearCart } from "../../utils/cartUtils.js";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

export default function loadCheckout() {
  const page = document.createElement("section");
  page.classList.add("checkout-page", "container");

  const cart = getCart();

  // Prevent checkout when the cart is empty.
  if (cart.length === 0) {
    page.innerHTML = `
      <div class="checkout-empty">
        <h1>Your cart is empty</h1>
        <p>Add some pieces to your cart before checking out.</p>
        <a href="#/products" class="checkout-button">
          Explore Collection
        </a>
      </div>
    `;

    return page;
  }

  // Get product details and calculate the subtotal.
  const orderItems = cart
    .map((item) => {
      const product = getProductById(item.productId);

      if (!product) return null;

      return {
        ...product,
        size: item.size,
        quantity: item.quantity,
        itemTotal: product.price * item.quantity,
      };
    })
    .filter(Boolean);

  const subtotal = orderItems.reduce(
    (total, item) => total + item.itemTotal,
    0,
  );

  page.innerHTML = `
    <div class="checkout-header">
      <h1>Checkout</h1>
      <p>Complete your details to place your order.</p>
    </div>

    <div class="checkout-layout">
      <form class="checkout-form" id="checkout-form">
        <section class="checkout-section">
          <h2>Contact Information</h2>

          <div class="form-field">
            <label for="full-name">Full Name</label>
            <input
              type="text"
              id="full-name"
              name="fullName"
              placeholder="Enter your full name"
              autocomplete="name"
              required
            />
          </div>

          <div class="form-field">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              autocomplete="email"
              required
            />
          </div>

          <div class="form-field">
            <label for="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              autocomplete="tel"
              required
            />
          </div>
        </section>

        <section class="checkout-section">
          <h2>Delivery Information</h2>

          <div class="form-field">
            <label for="address">Delivery Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Street address"
              autocomplete="street-address"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-field">
              <label for="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                autocomplete="address-level2"
                required
              />
            </div>

            <div class="form-field">
  <label for="state">State</label>
  <select
    id="state"
    name="state"
    autocomplete="address-level1"
    required>
    <option value="" disabled selected>Select your state</option>
    <option value="Abia">Abia</option>
    <option value="Adamawa">Adamawa</option>
    <option value="Akwa Ibom">Akwa Ibom</option>
    <option value="Anambra">Anambra</option>
    <option value="Bauchi">Bauchi</option>
    <option value="Bayelsa">Bayelsa</option>
    <option value="Benue">Benue</option>
    <option value="Borno">Borno</option>
    <option value="Cross River">Cross River</option>
    <option value="Delta">Delta</option>
    <option value="Ebonyi">Ebonyi</option>
    <option value="Edo">Edo</option>
    <option value="Ekiti">Ekiti</option>
    <option value="Enugu">Enugu</option>
    <option value="Gombe">Gombe</option>
    <option value="Imo">Imo</option>
    <option value="Jigawa">Jigawa</option>
    <option value="Kaduna">Kaduna</option>
    <option value="Kano">Kano</option>
    <option value="Katsina">Katsina</option>
    <option value="Kebbi">Kebbi</option>
    <option value="Kogi">Kogi</option>
    <option value="Kwara">Kwara</option>
    <option value="Lagos">Lagos</option>
    <option value="Nasarawa">Nasarawa</option>
    <option value="Niger">Niger</option>
    <option value="Ogun">Ogun</option>
    <option value="Ondo">Ondo</option>
    <option value="Osun">Osun</option>
    <option value="Oyo">Oyo</option>
    <option value="Plateau">Plateau</option>
    <option value="Rivers">Rivers</option>
    <option value="Sokoto">Sokoto</option>
    <option value="Taraba">Taraba</option>
    <option value="Yobe">Yobe</option>
    <option value="Zamfara">Zamfara</option>
    <option value="Federal Capital Territory">Federal Capital Territory (FCT)</option>
  </select>
</div>
          </div>

          <div class="form-field">
            <label for="instructions">
              Delivery Instructions
              <span>(Optional)</span>
            </label>
            <textarea
              id="instructions"
              name="instructions"
              rows="3"
              placeholder="Any additional delivery information?"
            ></textarea>
          </div>
        </section>

        <button type="submit" class="checkout-button">
          Place Order
        </button>
      </form>

      <aside class="checkout-summary">
        <h2>Your Order</h2>

        <div class="checkout-items">
          ${orderItems
            .map(
              (item) => `
                <div class="checkout-item">
                  <img src="${item.image}" alt="${item.name}" />

                  <div class="checkout-item-details">
                    <h3>${item.name}</h3>
                    ${item.size ? `<p>Size: ${item.size}</p>` : ""}
                    <p>Qty: ${item.quantity}</p>
                  </div>

                  <span class="checkout-item-price">
                    ${formatPrice(item.itemTotal)}
                  </span>
                </div>
              `,
            )
            .join("")}
        </div>

        <div class="checkout-total">
          <div>
            <span>Subtotal</span>
            <span>${formatPrice(subtotal)}</span>
          </div>

          <div>
  <span>Delivery</span>
  <span>${formatPrice(DELIVERY_FEE)}</span>
</div>

<div class="checkout-grand-total">
  <strong>Total</strong>
  <strong>${formatPrice(subtotal + DELIVERY_FEE)}</strong>
</div>
        </div>
      </aside>
    </div>
  `;

  
 const checkoutForm = page.querySelector("#checkout-form");

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Collect the submitted form values.
  const formData = new FormData(checkoutForm);

  const customerDetails = {
    fullName: formData.get("fullName").trim(),
    email: formData.get("email").trim(),
    phone: formData.get("phone").trim(),
    address: formData.get("address").trim(),
    city: formData.get("city").trim(),
    state: formData.get("state"),
    instructions: formData.get("instructions").trim(),
  };

  // Create and save the order.
  const result = createOrder(customerDetails);

  if (!result.success) {
    alert(result.message);
    return;
  }

  // Clear the cart only after the order has been saved.
  clearCart();

  // Store the order reference for the confirmation page.
  window.location.hash = `/order-confirmation/${result.order.id}`;
});

  return page;
}
