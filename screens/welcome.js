// Alpha 0.6 — screens/welcome.js

import { screenShell, primaryButton, secondaryButton } from "../modules/ui.js";
import { navigateTo } from "../modules/navigation.js";

export function renderWelcome({ deps }) {
    // Build base shell
    const { root, header, body, actions } = screenShell({
        id: "welcome-screen",
        title: "Welcome to Find Your TRU Path",
        subtitle: "A quick guide on how this works"
    });

    /* --------------------------------------
       Hero Image (Wolfie Welcome Artwork)
    ---------------------------------------*/
    const hero = document.createElement("img");
    hero.src = "./assets/welcome_wolfie_base_upa-rough_v001.png";
    hero.alt = "Wolfie welcomes you";
    hero.style.width = "100%";
    hero.style.maxWidth = "320px";
    hero.style.borderRadius = "12px";
    hero.style.marginBottom = "16px";

    body.appendChild(hero);

    /* --------------------------------------
       How This Works Text
    ---------------------------------------*/
    const textBlock = document.createElement("p");
    textBlock.textContent =
        "Explore campus through interactive stops, scan QR codes, check your progress, and discover the Wolf Pack way of navigating TRU. You can explore freely or follow the recommended route.";
    textBlock.style.textAlign = "center";
    body.appendChild(textBlock);

    /* --------------------------------------
       Actions
    ---------------------------------------*/
    const startBtn = primaryButton("Start exploring", () => {
        navigateTo("home");
    });

    const mapBtn = secondaryButton("View map first", () => {
        navigateTo("map");
    });

    actions.appendChild(startBtn);
    actions.appendChild(mapBtn);

    return root;
}
