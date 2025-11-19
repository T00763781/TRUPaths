// Alpha 0.6 — modules/camera.js

/* -------------------------------------------------------
   startCamera(videoElement)
   - Attempts getUserMedia({ video: true })
   - Assigns the stream to videoElement.srcObject
   - Returns the MediaStream or null
   - Never throws
--------------------------------------------------------*/
export async function startCamera(videoElement) {
    try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.warn("[camera] getUserMedia not supported.");
            return null;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        if (videoElement) {
            videoElement.srcObject = stream;
            // Ensure autoplay begins
            videoElement.playsInline = true;

            // Some mobile browsers require an explicit play()
            try {
                await videoElement.play();
            } catch (playErr) {
                console.warn("[camera] Autoplay prevented:", playErr);
            }
        }

        return stream;
    } catch (err) {
        console.warn("[camera] Failed to start camera:", err);
        return null;
    }
}

/* -------------------------------------------------------
   stopCamera(stream)
   - Stops all video tracks
   - Safe no-op if stream is null
--------------------------------------------------------*/
export function stopCamera(stream) {
    try {
        if (!stream) return;

        const tracks = stream.getTracks?.() || [];
        tracks.forEach(track => track.stop());
    } catch (err) {
        console.warn("[camera] Error stopping camera:", err);
    }
}
