import "../styles/main.css";
import "../styles/header.css";
import "../styles/home.css";

import loadHome from "./pages/home/home.js";

const content = document.querySelector("#content");

const homePage = loadHome();

content.appendChild(homePage);