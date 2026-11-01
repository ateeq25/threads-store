
export default function createHero() {
  const hero = document.createElement("section");
  hero.classList.add("hero-section");
  hero.id = "home";

  const content = document.createElement("div");
  content.classList.add("hero-content");

  const heading = document.createElement("h1");
  heading.textContent = "Style that speaks without saying a word.";

  const description = document.createElement("p");
  description.textContent =
    "Discover thoughtfully selected pieces designed to become part of your everyday wardrobe.";

  const button = document.createElement("a");
  button.classList.add("hero-button");
  button.href = "#/products";
  button.textContent = "Explore Collection";

  content.append(heading, description, button);
  hero.appendChild(content);

  return hero;
}
