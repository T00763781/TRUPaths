// Alpha 0.6 — modules/storage.js

export const STORAGE_KEY = "trupaths_v0_6_state";

/* --------------------------------------
   Internal helper: safely read from localStorage
---------------------------------------*/
function safeRead() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        return JSON.parse(raw) || {};
    } catch (err) {
        console.warn("[storage] Error reading state:", err);
        return {};
    }
}

/* --------------------------------------
   Internal helper: safely write to localStorage
---------------------------------------*/
function safeWrite(stateObj) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateObj));
    } catch (err) {
        console.warn("[storage] Error writing state:", err);
    }
}

/* --------------------------------------
   Base API
---------------------------------------*/
export function loadState() {
    const state = safeRead();
    return {
        profile: state.profile || {},
        progress: state.progress || {}
    };
}

export function saveState(partial) {
    const current = loadState();
    const next = {
        ...current,
        ...partial
    };
    safeWrite(next);
    return next;
}

export function clearState() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
        console.warn("[storage] Error clearing state:", err);
    }
}

/* --------------------------------------
   Profile accessors
---------------------------------------*/
export function getProfile() {
    return loadState().profile;
}

export function updateProfile(patch = {}) {
    const current = loadState();
    const nextProfile = {
        ...current.profile,
        ...patch
    };
    saveState({ profile: nextProfile });
    return nextProfile;
}

/* --------------------------------------
   Progress accessors
---------------------------------------*/
export function getProgress() {
    return loadState().progress;
}

export function updateProgress(patch = {}) {
    const current = loadState();
    const nextProgress = {
        ...current.progress,
        ...patch
    };
    saveState({ progress: nextProgress });
    return nextProgress;
}
