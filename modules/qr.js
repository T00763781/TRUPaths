/* modules/qr.js — v0.6.1 */
/* AUDIT: module namespace */
const QR = (() => {

    /* AUDIT: basic cleaning & prep */
    function normalize(raw) {
        if (!raw) return "";
        return raw.trim().replace(/\s+/g, "");
    }

    /* AUDIT: validate structural format of a QR key */
    function isValidFormat(key) {
        if (!key) return false;
        // Expected patterns like: QR_WELCOME_001, QR_LIBRARY_001
        return /^QR_[A-Z0-9_]+$/.test(key);
    }

    /* AUDIT: attempt extraction */
    function extract(raw) {
        const cleaned = normalize(raw);
        if (!cleaned) return null;

        if (!isValidFormat(cleaned)) {
            return null;
        }

        return cleaned;
    }

    /* AUDIT: safe formatter for display or logs */
    function toLabel(key) {
        if (!key) return "";
        return key.replace(/^QR_/, "").replace(/_/g, " ").toLowerCase();
    }

    /* REPLACE: additional metadata extraction in v1a */

    /* AUDIT: public API */
    return {
        normalize,
        isValidFormat,
        extract,
        toLabel
    };

})();

export default QR;
