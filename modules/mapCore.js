// Alpha 0.6 — modules/mapCore.js

/* -------------------------------------------------------
   getUserLocation()
   - Wraps navigator.geolocation
   - Returns:
       { ok: true, coords: { lat, lng } }
       { ok: false, reason }
   - Never throws
--------------------------------------------------------*/
export async function getUserLocation() {
    try {
        if (!navigator.geolocation) {
            return { ok: false, reason: "Geolocation not supported" };
        }

        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: false,
                timeout: 6000
            });
        });

        if (!pos || !pos.coords) {
            return { ok: false, reason: "Invalid position data" };
        }

        return {
            ok: true,
            coords: {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            }
        };
    } catch (err) {
        console.warn("[mapCore] Location error:", err);
        return { ok: false, reason: err?.message || "Permission denied" };
    }
}

/* -------------------------------------------------------
   renderSimpleMap(containerEl, options)
   - Clears container
   - Renders a basic stub:
       • Lat / Lng display
       • Nearby markers list
   - All DOM only, no external maps
--------------------------------------------------------*/
export function renderSimpleMap(containerEl, { coords, questMarkers = [] } = {}) {
    if (!containerEl) return;

    // Clear existing contents
    containerEl.innerHTML = "";

    // Wrapper card
    const card = document.createElement("div");
    card.className = "map-panel";
    card.style.padding = "16px";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.gap = "12px";

    // Coordinates section
    if (coords) {
        const coordBlock = document.createElement("div");
        coordBlock.textContent = `Your Location: ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
        coordBlock.style.fontWeight = "600";
        card.appendChild(coordBlock);
    } else {
        const failBlock = document.createElement("div");
        failBlock.textContent = "Location unavailable.";
        card.appendChild(failBlock);
    }

    // Quest markers list
    const header = document.createElement("div");
    header.textContent = "Nearby Points:";
    header.style.marginTop = "4px";
    header.style.fontWeight = "600";
    card.appendChild(header);

    // Render each marker
    questMarkers.forEach(marker => {
        const item = document.createElement("div");
        item.textContent = `• ${marker.title}`;
        item.style.marginLeft = "8px";
        card.appendChild(item);
    });

    // Empty-state case
    if (questMarkers.length === 0) {
        const none = document.createElement("div");
        none.textContent = "No markers found.";
        none.style.marginLeft = "8px";
        none.style.color = "var(--text-muted)";
        card.appendChild(none);
    }

    containerEl.appendChild(card);
}
