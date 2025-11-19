// Alpha 0.6 — modules/ui.js

/* -------------------------------------------------------
   Core DOM helper
--------------------------------------------------------*/
export function el(tag, { className, text, attrs } = {}) {
    const node = document.createElement(tag);

    if (className) node.className = className;
    if (text) node.textContent = text;

    if (attrs && typeof attrs === "object") {
        for (const [key, value] of Object.entries(attrs)) {
            node.setAttribute(key, value);
        }
    }

    return node;
}

/* -------------------------------------------------------
   Screen Shell
   Produces structure:

   <div class="screen">
       <div class="screen__header"> ... </div>
       <div class="screen__body"> ... </div>
       <div class="screen__actions"> ... </div>
   </div>
--------------------------------------------------------*/
export function screenShell({ id, title, subtitle } = {}) {
    const root = el("div", { className: "screen fade-in" });
    if (id) root.id = id;

    const header = el("div", { className: "screen__header" });
    const body = el("div", { className: "screen__body" });
    const actions = el("div", { className: "screen__actions" });

    if (title) {
        const t = el("div", { className: "screen__title", text: title });
        header.appendChild(t);
    }

    if (subtitle) {
        const st = el("div", { className: "screen__subtitle", text: subtitle });
        header.appendChild(st);
    }

    root.appendChild(header);
    root.appendChild(body);
    root.appendChild(actions);

    return { root, header, body, actions };
}

/* -------------------------------------------------------
   Buttons
--------------------------------------------------------*/
export function primaryButton(label, onClick) {
    const btn = el("button", {
        className: "button button--primary",
        text: label
    });
    if (onClick) btn.addEventListener("click", onClick);
    return btn;
}

export function secondaryButton(label, onClick) {
    const btn = el("button", {
        className: "button button--secondary",
        text: label
    });
    if (onClick) btn.addEventListener("click", onClick);
    return btn;
}

/* -------------------------------------------------------
   Icon Button (for nav bar or inline controls)
--------------------------------------------------------*/
export function iconButton({ label, iconAltText, onClick, dataRoute }) {
    const wrapper = el("div", {
        className: "nav-bar__item",
        attrs: dataRoute ? { "data-route": dataRoute } : {}
    });

    const icon = el("img", {
        attrs: { alt: iconAltText || label }
    });

    const text = el("div", { text: label });

    wrapper.appendChild(icon);
    wrapper.appendChild(text);

    if (onClick) wrapper.addEventListener("click", onClick);

    return wrapper;
}

/* -------------------------------------------------------
   Toast (not attached automatically)
--------------------------------------------------------*/
export function toast(message, variant = "info") {
    const cls =
        variant === "error"
            ? "toast toast--error"
            : "toast toast--info";

    const node = el("div", {
        className: cls,
        text: message
    });

    return node;
}
