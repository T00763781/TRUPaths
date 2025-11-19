// Alpha 0.6 — modules/navigation.js

/* -------------------------------------------------------
   Allowed route keys
--------------------------------------------------------*/
export const ROUTE_KEYS = [
    "splash",
    "welcome",
    "home",
    "scan",
    "map",
    "profile"
];

/* -------------------------------------------------------
   navigateTo(routeKey)
   - Validates route key
   - Falls back to "splash" if invalid
   - Updates location.hash
--------------------------------------------------------*/
export function navigateTo(routeKey) {
    const key = ROUTE_KEYS.includes(routeKey) ? routeKey : "splash";
    window.location.hash = `#/${key}`;
}

/* -------------------------------------------------------
   goBack()
   - Navigates browser history if possible
   - Falls back to home screen
--------------------------------------------------------*/
export function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        navigateTo("home");
    }
}

/* -------------------------------------------------------
   getCurrentRouteKey()
   - Mirrors router logic
   - Returns a clean key string
--------------------------------------------------------*/
export function getCurrentRouteKey() {
    const raw = window.location.hash.replace("#/", "").trim();

    if (!raw || raw === "" || raw === "/") return "splash";

    switch (raw) {
        case "welcome":
        case "home":
        case "scan":
        case "map":
        case "profile":
            return raw;
        default:
            return "splash";
    }
}
