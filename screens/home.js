/* screens/home.js — v0.6.1 */
/* AUDIT: module namespace */
import UI from "../modules/ui.js";
import Storage from "../modules/storage.js";
import Navigation from "../modules/navigation.js";

const HomeScreen = (() => {

    /* AUDIT: render */
    function render() {
        const root = UI.el("div", { class: "screen safe-top" });

        /* Retrieve user */
        const user = Storage.getUser().profile;

        /* Hero section using your Lwelcome image */
        const hero = UI.el("div", { 
            class: "hero-block",
            style: "background-image: url('./assets/welcome/Lwelcome_v001.png'); background-size: cover; background-position: center;"
        });

        const fg = UI.el("div", { class: "hero-foreground", html: `Hi, ${user.name}` });
        hero.appendChild(fg);
        root.appendChild(hero);

        /* Main scrollable content */
        const scroll = UI.el("div", { class: "screen-scroll" });

        /* Quick actions */
        scroll.appendChild(UI.sectionTitle("Quick Actions"));

        const grid = UI.el("div", { class: "grid-3 mt-md" });

        /* Scan */
        const scan = UI.el("div", { class: "center-block", "data-nav": "scan" }, [
            UI.img("./assets/icons/camera_v001.png", "mb-sm"),
            UI.el("span", { html: "Scan" })
        ]);
        grid.appendChild(scan);

        /* Map */
        const map = UI.el("div", { class: "center-block", "data-nav": "map" }, [
            UI.img("./assets/icons/map_v001.png", "mb-sm"),
            UI.el("span", { html: "Map" })
        ]);
        grid.appendChild(map);

        /* Profile */
        const profile = UI.el("div", { class: "center-block", "data-nav": "profile" }, [
            UI.img("./assets/icons/profile_v001.png", "mb-sm"),
            UI.el("span", { html: "Profile" })
        ]);
        grid.appendChild(profile);

        scroll.appendChild(grid);

        root.appendChild(scroll);

        /* Menu bar */
        const menu = UI.menuBar([
            { icon: "./assets/icons/home_v001.png",   label: "Home",   target: "home" },
            { icon: "./assets/icons/camera_v001.png", label: "Scan",   target: "scan" },
            { icon: "./assets/icons/map_v001.png",    label: "Map",    target: "map" },
            { icon: "./assets/icons/profile_v001.png",label: "Profile",target: "profile" }
        ]);
        root.appendChild(menu);

        return root;
    }

    /* AUDIT: afterRender — none required */
    function afterRender() {}

    /* AUDIT: public API */
    return {
        render,
        afterRender
    };

})();

export default HomeScreen;
