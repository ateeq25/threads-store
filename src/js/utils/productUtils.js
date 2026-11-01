import products from "../../data/products.json";

export function getProductById(productId) {
  return products.find((product) => product.id === productId);
}