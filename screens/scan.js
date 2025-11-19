// Alpha 0.6 — screens/scan.js

import {
    screenShell,
    primaryButton,
    secondaryButton,
    el,
    iconButton
} from "../modules/ui.js";

import {
    navigateTo,
    getCurrentRouteKey
} from "../modules/navigation.js";

export function renderScan({ deps }) {
    const { camera, storage, api } = deps;

    // Build shell
    const { root, header, body, actions } = screenShell({
        id: "scan-screen",
        title: "Scan QR Code",
        subtitle: "Camera-based detection coming soon"
    });

    /* ----------------------------------------------------
       Camera Frame
    -----------------------------------------------------*/
    const frame = el("div", { className: "camera-frame" });
    const videoEl = document.createElement("video");
    videoEl.setAttribute("autoplay", "");
    videoEl.setAttribute("playsinline", "true");

    frame.appendChild(videoEl);
    body.appendChild(frame);

    /* ----------------------------------------------------
       Status Text
    -----------------------------------------------------*/
    const status = el("div");
    status.style.textAlign = "center";
    status.style.fontSize = "0.9rem";
    status.style.color = "var(--text-muted)";
    status.style.marginTop = "8px";
    status.textContent =
        "In Alpha 0.6, scanning is simulated. Full QR detection arrives in v0.7+.";
    body.appendChild(status);

    /* ----------------------------------------------------
       Camera Startup (safe, non-blocking)
    -----------------------------------------------------*/
    let stream = null;

    // Attempt to start camera after DOM is ready
    requestAnimationFrame(async () => {
        stream = await camera.startCamera(videoEl);

        if (!stream) {
            const fail = el("div");
            fail.textContent =
                "Unable to access camera. Please check permissions.";
            fail.style.color = "red";
            fail.style.marginTop = "12px";
            body.appendChild(fail);
        }
    });

    /* ----------------------------------------------------
       Simulated QR Scan Action
    -----------------------------------------------------*/
    const simulateBtn = primaryButton("Simulate QR scan", async () => {
        try {
            const markers = await api.fetchQuestMarkers();

            // Mark first quest as visited
            if (markers.length > 0) {
                storage.updateProgress({
                    welcomeQuestVisited: true
                });
            }

            status.textContent =
                "Simulated scan complete. Welcome quest updated.";
            status.style.color = "var(--tru-blue)";
        } catch (err) {
            console.warn("[scan] Simulation error:", err);
            status.textContent = "Simulation failed.";
            status.style.color = "red";
        }
    });

    /* ----------------------------------------------------
       Stop Camera Action
    -----------------------------------------------------*/
    const stopBtn = secondaryButton("Stop camera", () => {
        camera.stopCamera(stream);
        status.textContent = "Camera stopped.";
        status.style.color = "var(--text-muted)";
    });

    actions.appendChild(simulateBtn);
    actions.appendChild(stopBtn);

    /* ----------------------------------------------------
       Bottom Nav Bar
    -----------------------------------------------------*/
    const nav = el("div", { className: "nav-bar" });
    const current = getCurrentRouteKey();

    const makeNavItem = (label, routeKey, icon) => {
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
        makeNavItem("Home", "home", "./assets/home_v001.png")
    );
    nav.appendChild(
        makeNavItem("Map", "map", "./assets/map_v001.png")
    );
    nav.appendChild(
        makeNavItem("Scan", "scan", "./assets/camera_v001.png")
    );
    nav.appendChild(
        makeNavItem("Profile", "profile", "./assets/profile_v001.png")
    );

    root.appendChild(nav);

    return root;
}
