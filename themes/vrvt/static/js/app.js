document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll("li.has-submenu");

    function closeAllSubmenus(except = null) {
        items.forEach((item) => {
            if (item !== except && item.classList.contains("open")) {
                const submenu = item.querySelector("ul.submenu");
                const btn = item.querySelector("button");
                const link = item.querySelector("a");

                item.classList.remove("open");
                submenu.hidden = true;
                btn.setAttribute("aria-expanded", "false");
                link.setAttribute("aria-expanded", "false");
            }
        });
    }

    items.forEach((item) => {
        const btn = item.querySelector("button");
        const submenu = item.querySelector("ul.submenu");
        const link = item.querySelector("a");

        // Alleen via klik openen/sluiten
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const isOpen = item.classList.contains("open");

            if (isOpen) {
                // Sluit submenu
                item.classList.remove("open");
                submenu.hidden = true;
                btn.setAttribute("aria-expanded", "false");
                link.setAttribute("aria-expanded", "false");
            } else {
                // Sluit eerst andere submenu's
                closeAllSubmenus(item);

                // Open submenu
                item.classList.add("open");
                submenu.hidden = false;
                btn.setAttribute("aria-expanded", "true");
                link.setAttribute("aria-expanded", "true");
            }
        });

        // Initieel submenu verbergen
        submenu.hidden = !item.classList.contains("open");
    });
});