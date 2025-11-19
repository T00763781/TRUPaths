// Alpha 0.6 — modules/permissions.js

/* -------------------------------------------------------
   ensureCameraPermission()
   - Checks for camera support
   - Attempts a minimal getUserMedia call
   - Immediately stops the stream
   - Never throws
--------------------------------------------------------*/
export async function ensureCameraPermission() {
    try {
        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {
            return { granted: false, reason: "Camera not supported" };
        }

        // Probe request
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        // Immediately stop all tracks
        if (stream) {
            stream.getTracks().forEach(t => t.stop());
        }

        return { granted: true };
    } catch (err) {
        console.warn("[permissions] Camera permission error:", err);
        return { granted: false, reason: err?.message || "Denied" };
    }
}

/* -------------------------------------------------------
   ensureLocationPermission()
   - Checks for geolocation support
   - Attempts a minimal getCurrentPosition call
   - Wrapped in a Promise to avoid throw
--------------------------------------------------------*/
export async function ensureLocationPermission() {
    try {
        if (!navigator.geolocation) {
            return { granted: false, reason: "Geolocation not supported" };
        }

        // Probe accuracy via Promise
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: false,
                timeout: 5000
            });
        });

        // If we made it here — permission granted
        if (position && position.coords) {
            return { granted: true };
        }

        return { granted: false, reason: "Unknown location error" };
    } catch (err) {
        console.warn("[permissions] Location permission error:", err);
        return { granted: false, reason: err?.message || "Denied" };
    }
}
