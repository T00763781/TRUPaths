// Alpha 0.6 — modules/apiStub.js

import { getProfile, updateProfile } from "./storage.js";

/* -------------------------------------------------------
   fetchQuestMarkers()
--------------------------------------------------------*/
export async function fetchQuestMarkers() {
    try {
        const res = await fetch("./data/questMarkers.json");
        if (!res.ok) {
            console.warn("[apiStub] Failed to load quest markers:", res.status);
            return [];
        }
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.warn("[apiStub] Error fetching quest markers:", err);
        return [];
    }
}

/* -------------------------------------------------------
   fetchInitialUser()
--------------------------------------------------------*/
export async function fetchInitialUser() {
    try {
        const existing = getProfile();
        const hasExisting =
            existing &&
            typeof existing === "object" &&
            Object.keys(existing).length > 0;

        if (hasExisting) {
            return existing;
        }

        const res = await fetch("./data/user.json");
        if (!res.ok) {
            console.warn("[apiStub] Failed to load user.json:", res.status);
            return {};
        }

        const seed = await res.json();
        return seed || {};
    } catch (err) {
        console.warn("[apiStub] Error fetching initial user:", err);
        return {};
    }
}

/* -------------------------------------------------------
   persistUserProfile(profile)
--------------------------------------------------------*/
export async function persistUserProfile(profile = {}) {
    try {
        updateProfile(profile);
        return { ok: true };
    } catch (err) {
        console.warn("[apiStub] Error persisting profile:", err);
        return { ok: false };
    }
}
