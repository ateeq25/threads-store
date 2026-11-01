import products from "../../data/products.json";

const CART_STORAGE_KEY = "threads-cart";

// Get the cart from localStorage
export function getCart() {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);

  return savedCart ? JSON.parse(savedCart) : [];
}

// Save the cart to localStorage
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// Add a product to the cart
export function addToCart(productId, size, quantity) {
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return { success: false, message: "Product not found." };
  }

  // Products with available sizes require a size selection
  if (product.sizes?.length > 0 && !size) {
    return { success: false, message: "Please select a size." };
  }

  const cart = getCart();

  // Check whether this product and size already exist in the cart
  const existingItem = cart.find(
    (item) => item.productId === productId && item.size === size
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      size: size || null,
      quantity,
    });
  }

  saveCart(cart);

  return { success: true, message: "Added to cart." };
}

// Get the total number of items in the cart
export function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

// Update the quantity of a cart item
export function updateCartItemQuantity(productId, size, quantity) {
  const cart = getCart();

  const item = cart.find(
    (item) => item.productId === productId && item.size === size
  );

  if (!item) return;

  if (quantity <= 0) {
    removeFromCart(productId, size);
    return;
  }

  item.quantity = quantity;
  saveCart(cart);
}

// Remove an item from the cart
export function removeFromCart(productId, size) {
  const cart = getCart();

  const updatedCart = cart.filter(
    (item) => !(item.productId === productId && item.size === size)
  );

  saveCart(updatedCart);
}

// Update the cart count displayed in the header
export function updateHeaderCartCount(container = document) {
  const cartCount = container.querySelector("#cart-count");

  if (cartCount) {
    cartCount.textContent = getCartCount();
  }
}