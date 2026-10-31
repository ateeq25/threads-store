export default function createCategories() {
  const section = document.createElement("section");
  section.classList.add("categories-section", "section");
  section.id = "categories";

  // Section heading
  const heading = document.createElement("div");
  heading.classList.add("categories-heading", "container");

  const title = document.createElement("h2");
  title.textContent = "Explore Categories";

  const description = document.createElement("p");
  description.textContent =
    "Find the pieces that complete your everyday style.";

  heading.append(title, description);

  // Category data
  const categories = [
    {
      name: "Clothing",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80",
      link: "#clothing",
    },
    {
      name: "Shoes",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
      link: "#shoes",
    },
    {
      name: "Bags",
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=80",
      link: "#bags",
    },
    {
      name: "Accessories",
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80",
      link: "#accessories",
    },
  ];

  // Category grid
  const grid = document.createElement("div");
  grid.classList.add("categories-grid", "container");

  categories.forEach((category) => {
    const card = document.createElement("a");
    card.classList.add("category-card");
    card.href = category.link;

    const image = document.createElement("img");
    image.src = category.image;
    image.alt = category.name;
    image.loading = "lazy";

    const overlay = document.createElement("div");
    overlay.classList.add("category-overlay");

    const name = document.createElement("h3");
    name.textContent = category.name;

    const explore = document.createElement("span");
    explore.textContent = "Explore →";

    overlay.append(name, explore);
    card.append(image, overlay);
    grid.appendChild(card);
  });

  section.append(heading, grid);

  return section;
}