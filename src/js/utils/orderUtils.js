
import { getCart } from "./cartUtils.js";
import { getProductById } from "./productUtils.js";

const ORDERS_STORAGE_KEY = "threads-orders";

export const DELIVERY_FEE = 3000;

export function getOrders() {
  const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
  return savedOrders ? JSON.parse(savedOrders) : [];
}

export function getOrderById(orderId) {
  return getOrders().find((order) => order.id === orderId);
}

export function createOrder(customerDetails) {
  try {
    const cart = getCart();

    if (cart.length === 0) {
      return {
        success: false,
        message: "Your cart is empty.",
      };
    }

    // Create a snapshot of the cart items.
    const orderItems = cart.map((item) => {
      const product = getProductById(item.productId);

      if (!product) {
        throw new Error("A product in your cart could not be found.");
      }

      return {
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        size: item.size,
        quantity: item.quantity,
        itemTotal: product.price * item.quantity,
      };
    });

    const subtotal = orderItems.reduce(
      (total, item) => total + item.itemTotal,
      0
    );

    const order = {
      id: `THR-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      customer: customerDetails,
      items: orderItems,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total: subtotal + DELIVERY_FEE,
      status: "Confirmed",
    };

    // Save the order before clearing the cart.
    const orders = getOrders();
    orders.push(order);

    localStorage.setItem(
      ORDERS_STORAGE_KEY,
      JSON.stringify(orders)
    );

    return {
      success: true,
      order,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Unable to place your order.",
    };
  }
}
