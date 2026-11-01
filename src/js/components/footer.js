export default function createFooter() {
  const footer = document.createElement("footer");
  footer.classList.add("site-footer");

  const container = document.createElement("div");
  container.classList.add("footer-container", "container");

  // Footer brand
  const brand = document.createElement("div");
  brand.classList.add("footer-brand");

  const logo = document.createElement("a");
  logo.classList.add("footer-logo");
  logo.href = "#/";
  logo.textContent = "THREADS";

  const description = document.createElement("p");
  description.textContent =
    "Thoughtfully selected pieces for everyday living.";

  brand.append(logo, description);

  // Footer navigation
const footerGroups = [
  {
    title: "Shop",
    links: [
      { text: "All Products", href: "#/products" },
      { text: "Clothing", href: "#/products/clothing" },
      { text: "Shoes", href: "#/products/shoes" },
      { text: "Bags", href: "#/products/bags" },
      { text: "Accessories", href: "#/products/accessories" },
    ],
  },
  {
    title: "Information",
    links: [
      { text: "Our Story", href: "#about" },
      { text: "Contact", href: "#contact" },
      { text: "Shipping", href: "#shipping" },
      { text: "Returns", href: "#returns" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", href: "https://instagram.com/" },
      { text: "TikTok", href: "https://tiktok.com/" },
      { text: "Facebook", href: "https://facebook.com/" },
    ],
  },
];

  const navigation = document.createElement("div");
  navigation.classList.add("footer-navigation");

  footerGroups.forEach((group) => {
    const column = document.createElement("div");
    column.classList.add("footer-column");

    const heading = document.createElement("h3");
    heading.textContent = group.title;

    const list = document.createElement("ul");

    group.links.forEach((item) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");

      link.textContent = item.text;
      link.href = item.href;

      if (item.href.startsWith("https://")) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }

      listItem.appendChild(link);
      list.appendChild(listItem);
    });

    column.append(heading, list);
    navigation.appendChild(column);
  });

  // Copyright
  const bottom = document.createElement("div");
  bottom.classList.add("footer-bottom");

  const copyright = document.createElement("p");
  copyright.textContent =
    `© ${new Date().getFullYear()} THREADS. All rights reserved.`;


  bottom.append(copyright,);

  container.append(brand, navigation);
  footer.append(container, bottom);

  return footer;
}