// Alpha 0.6 — screens/mapScreen.js

import {
    screenShell,
    primaryButton,
    el,
    iconButton
} from "../modules/ui.js";

import {
    navigateTo,
    getCurrentRouteKey
} from "../modules/navigation.js";

export function renderMapScreen({ deps }) {
    const { mapCore, api } = deps;

    // Build shell
    const { root, header, body, actions } = screenShell({
        id: "map-screen",
        title: "Campus Map",
        subtitle: "Your location & nearby points"
    });

    /* ----------------------------------------------------
       Map Panel Container
    -----------------------------------------------------*/
    const panel = el("div", { className: "map-panel" });
    body.appendChild(panel);

    /* ----------------------------------------------------
       Load Location + Markers (async but non-blocking)
    -----------------------------------------------------*/
    (async () => {
        const [loc, markers] = await Promise.all([
            mapCore.getUserLocation(),
            api.fetchQuestMarkers()
        ]);

        if (!loc.ok) {
            // Fallback for denied or failed location
            panel.innerHTML = "";
            const msg = el("div");
            msg.textContent =
                "Location unavailable. Please enable permissions to view your position.";
            msg.style.padding = "16px";
            msg.style.color = "red";
            panel.appendChild(msg);
            return;
        }

        // Render simple map stub
        mapCore.renderSimpleMap(panel, {
            coords: loc.coords,
            questMarkers: markers
        });
    })();

    /* ----------------------------------------------------
       Actions
    -----------------------------------------------------*/
    const homeBtn = primaryButton("Back to home", () => {
        navigateTo("home");
    });

    actions.appendChild(homeBtn);

    /* ----------------------------------------------------
       Bottom Nav Bar
    -----------------------------------------------------*/
    const nav = el("div", { className: "nav-bar" });
    const current = getCurrentRouteKey();

    const makeItem = (label, routeKey, icon) => {
        const item = iconButton({
            label,
            iconAltText: label,
            dataRoute: routeKey,
            onClick: () => navigateTo(routeKey)
        });
        item.querySelector("img").src = icon;
        if (routeKey === current) {
            item.style.color = "var(--tru-blue)";
            item.style.fontWeight = "600";
        }
        return item;
    };

    nav.appendChild(
        makeItem("Home", "home", "./assets/home_v001.png")
    );
    nav.appendChild(
        makeItem("Map", "map", "./assets/map_v001.png")
    );
    nav.appendChild(
        makeItem("Scan", "scan", "./assets/camera_v001.png")
    );
    nav.appendChild(
        makeItem("Profile", "profile", "./assets/profile_v001.png")
    );

    root.appendChild(nav);

    return root;
}
