// Alpha 0.6 — screens/splash.js

import { screenShell, primaryButton } from "../modules/ui.js";
import { navigateTo } from "../modules/navigation.js";

export function renderSplash({ deps }) {
    // Build shell
    const { root, header, body, actions } = screenShell({
        id: "splash-screen",
        title: "",
        subtitle: ""
    });

    /* --------------------------------------
       Splash Loader GIF
    ---------------------------------------*/
    const img = document.createElement("img");
    img.src = "./assets/splash_loader_placeholder_v001.gif";
    img.alt = "Loading…";
    img.style.width = "160px";
    img.style.height = "160px";
    img.style.display = "block";
    img.style.margin = "40px auto";

    body.appendChild(img);

    /* --------------------------------------
       Version Text (non-blocking)
    ---------------------------------------*/
    const versionEl = document.createElement("div");
    versionEl.style.fontSize = "0.85rem";
    versionEl.style.color = "var(--text-muted)";
    versionEl.style.marginTop = "12px";
    versionEl.style.textAlign = "center";

    // Fetch asynchronously but do not block UI
    fetch("./VERSION")
        .then(res => res.text())
        .then(txt => {
            if (txt && txt.trim().length > 0) {
                versionEl.textContent = `Version: ${txt.trim()}`;
            }
        })
        .catch(() => {
            /* silent fail; no version text */
        });

    body.appendChild(versionEl);

    /* --------------------------------------
       Primary Action: Tap to continue
    ---------------------------------------*/
    const continueBtn = primaryButton("Tap to continue", () => {
        navigateTo("welcome");
    });

    actions.appendChild(continueBtn);

    /* --------------------------------------
       Auto-navigate after ~2 seconds
    ---------------------------------------*/
    setTimeout(() => {
        // Only auto-navigate if still on splash
        const stillHere = location.hash === "#/splash" || !location.hash;
        if (stillHere) navigateTo("welcome");
    }, 2000);

    return root;
}
