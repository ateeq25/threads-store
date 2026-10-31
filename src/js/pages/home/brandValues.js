export default function createBrandValues() {
  const section = document.createElement("section");
  section.classList.add("brand-values", "section");
  section.id = "about";

  // Main container
  const container = document.createElement("div");
  container.classList.add("brand-values-container", "container");

  // Brand introduction
  const introduction = document.createElement("div");
  introduction.classList.add("brand-introduction");

  const heading = document.createElement("h2");
  heading.textContent = "Made for the way you live.";

  const description = document.createElement("p");
  description.textContent =
    "We believe great style doesn't need to be complicated. THREADS brings together thoughtfully selected pieces that balance everyday comfort, versatility and individual expression.";

  introduction.append(heading, description);

  // Brand principles
  const principles = [
    {
      title: "Thoughtfully Selected",
      description:
        "Pieces chosen with attention to quality, design and everyday wearability.",
    },
    {
      title: "Everyday Versatility",
      description:
        "Styles that work across different moments, occasions and personal tastes.",
    },
    {
      title: "Less, But Better",
      description:
        "A considered approach to building a wardrobe with pieces worth keeping.",
    },
  ];

  const principlesList = document.createElement("div");
  principlesList.classList.add("brand-principles");

  principles.forEach((principle, index) => {
    const item = document.createElement("article");
    item.classList.add("brand-principle");

    const number = document.createElement("span");
    number.classList.add("principle-number");
    number.textContent = `0${index + 1}`;

    const content = document.createElement("div");
    content.classList.add("principle-content");

    const title = document.createElement("h3");
    title.textContent = principle.title;

    const description = document.createElement("p");
    description.textContent = principle.description;

    content.append(title, description);
    item.append(number, content);

    principlesList.appendChild(item);
  });

  container.append(introduction, principlesList);
  section.appendChild(container);

  return section;
}