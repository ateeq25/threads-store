export default function createNewsletter() {
  const section = document.createElement("section");
  section.classList.add("newsletter-section", "section");
  section.id = "contact";

  const container = document.createElement("div");
  container.classList.add("newsletter-container", "container");

  const heading = document.createElement("h2");
  heading.textContent = "A little more THREADS.";

  const description = document.createElement("p");
  description.textContent =
    "Get updates on new arrivals, selected pieces and what's happening at THREADS.";

  // Newsletter form
  const form = document.createElement("form");
  form.classList.add("newsletter-form");

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.placeholder = "Enter your email address";
  emailInput.setAttribute("aria-label", "Email address");
  emailInput.required = true;

  const subscribeButton = document.createElement("button");
  subscribeButton.type = "submit";
  subscribeButton.textContent = "Subscribe";

  const message = document.createElement("p");
  message.classList.add("newsletter-message");
  message.setAttribute("aria-live", "polite");

  form.append(emailInput, subscribeButton);

  // Form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    message.textContent = "Thanks for subscribing!";
    emailInput.value = "";
  });

  container.append(heading, description, form, message);
  section.appendChild(container);

  return section;
}