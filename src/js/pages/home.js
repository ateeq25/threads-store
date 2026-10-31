import createHeader from "../components/header.js";
import createHero from "../components/hero.js";

export default function loadHome() {
  const homePage = document.createElement("div");
  homePage.classList.add("home-page");

  const header = createHeader();
  const hero = createHero();

  homePage.append(header, hero);

  return homePage;
}