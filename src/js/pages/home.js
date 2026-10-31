import createHeader from "../components/header.js";
import createHero from "../components/hero.js";
import createFeaturedProducts from "../components/featuredProducts.js";

export default function loadHome() {
  const homePage = document.createElement("div");
  homePage.classList.add("home-page");

  const header = createHeader();
  const hero = createHero();
  const featuredProducts = createFeaturedProducts();

  homePage.append(
    header,
    hero,
    featuredProducts
  );

  return homePage;
}