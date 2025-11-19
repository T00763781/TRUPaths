// Alpha 0.6 — screens/profileScreen.js

import {
    screenShell,
    primaryButton,
    secondaryButton,
    el,
    toast,
    iconButton
} from "../modules/ui.js";

import {
    navigateTo,
    getCurrentRouteKey
} from "../modules/navigation.js";

export function renderProfileScreen({ deps }) {
    const { profile, storage } = deps;

    // Build shell
    const { root, header, body, actions } = screenShell({
        id: "profile-screen",
        title: "Your Profile",
        subtitle: "Manage your TRU Path identity"
    });

    /* ----------------------------------------------------
       Load Profile (sync for Alpha 0.6)
    -----------------------------------------------------*/
    const stored = storage.getProfile() || {};

    const displayName = stored.displayName || "";
    const program = stored.program || "";
    const saveLocal = stored.saveLocal === true;

    /* ----------------------------------------------------
       Profile Form
    -----------------------------------------------------*/
    const form = el("form", { className: "profile-form" });

    // Display name
    const nameLabel = el("label", { text: "Display Name" });
    const nameInput = el("input", {
        attrs: { type: "text", value: displayName, placeholder: "Your name" }
    });

    // Program
    const programLabel = el("label", { text: "Program" });
    const programInput = el("input", {
        attrs: {
            type: "text",
            value: program,
            placeholder: "e.g., Tourism Management"
        }
    });

    // Save local checkbox
    const saveLabel = el("label", { text: "Save progress on this device" });
    const saveCheckbox = el("input", {
        attrs: { type: "checkbox" }
    });
    saveCheckbox.checked = saveLocal;

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(programLabel);
    form.appendChild(programInput);
    form.appendChild(saveLabel);
    form.appendChild(saveCheckbox);

    body.appendChild(form);

    /* ----------------------------------------------------
       Save Action (& toast)
    -----------------------------------------------------*/
    const saveBtn = primaryButton("Save Profile", async () => {
        // Extract form values
        const formValues = {
            displayName: nameInput.value.trim(),
            program: programInput.value.trim(),
            saveLocal: saveCheckbox.checked
        };

        // Persist to profile subsystem
        const merged = await profile.saveProfile(formValues);

        // Create toast but DO NOT attach automatically
        const t = toast("Profile saved.", "info");

        // Attach then auto-remove
        root.appendChild(t);
        setTimeout(() => t.remove(), 2000);
    });

    // Back button
    const backBtn = secondaryButton("Back", () => {
        navigateTo("home");
    });

    actions.appendChild(saveBtn);
    actions.appendChild(backBtn);

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
