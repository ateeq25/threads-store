export default function createHero() {
  const hero = document.createElement("section");
  hero.classList.add("hero-section");
  hero.id = "home";

  // Hero content container
  const content = document.createElement("div");
  content.classList.add("hero-content");

  // Eyebrow text
  const eyebrow = document.createElement("p");
  eyebrow.classList.add("hero-eyebrow");
  eyebrow.textContent = "THE NEW SEASON COLLECTION";

  // Main heading
  const heading = document.createElement("h1");
  heading.textContent = "Style that speaks without saying a word.";

  // Description
  const description = document.createElement("p");
  description.textContent =
    "Discover thoughtfully selected pieces designed to become part of your everyday wardrobe.";

  // CTA button
  const button = document.createElement("a");
  button.classList.add("hero-button");
  button.href = "#/products";
  button.textContent = "Explore Collection";

  content.append(eyebrow, heading, description, button);

  hero.appendChild(content);

  return hero;
}