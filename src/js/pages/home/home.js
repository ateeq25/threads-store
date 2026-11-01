// Homepage sections
import createHero from "./hero.js";
import createFeaturedProducts from "./featuredProducts.js";
import createCategories from "./categories.js";
import createBrandValues from "./brandValues.js";
import createNewsletter from "../../components/newsletter.js";

export default function loadHome() {
  const homePage = document.createElement("div");
  homePage.classList.add("home-page");

  const hero = createHero();
  const featuredProducts = createFeaturedProducts();
  const categories = createCategories();
  const brandValues = createBrandValues();
  const newsletter = createNewsletter();

  homePage.append(
    hero,
    featuredProducts,
    categories,
    brandValues, 
    newsletter
  );

  return homePage;
}