// Shared components
import createHeader from "../../components/header.js";
import createNewsletter from "../../components/newsletter.js";
import createFooter from "../../components/footer.js";

// Homepage sections
import createHero from "./hero.js";
import createFeaturedProducts from "./featuredProducts.js";
import createCategories from "./categories.js";
import createBrandValues from "./brandValues.js";

export default function loadHome() {
  const homePage = document.createElement("div");
  homePage.classList.add("home-page");

  const header = createHeader();
  const hero = createHero();
  const featuredProducts = createFeaturedProducts();
  const categories = createCategories();
  const brandValues = createBrandValues();
  const newsletter = createNewsletter();
  const footer = createFooter();

  homePage.append(
    header,
    hero,
    featuredProducts,
    categories,
    brandValues,
    newsletter,
    footer
  );

  return homePage;
}