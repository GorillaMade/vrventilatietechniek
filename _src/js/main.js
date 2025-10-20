document.addEventListener("DOMContentLoaded", () => {
/* ------------------------------
 * 4. Marquee animatie
 * ------------------------------ */
    (() => {
        const track = document.querySelector(".marquee__track");
        if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let content = track.innerHTML;
        while (track.scrollWidth < window.innerWidth * 2) {
            track.innerHTML += content;
        }

        let x = 0, speed = 80, last = null;
        function animate(ts) {
            if (!last) last = ts;
            const delta = (ts - last) / 1000;
            last = ts;

            x -= speed * delta;
            const width = track.scrollWidth / 2;
            x = ((x % width) + width) % width;

            track.style.transform = `translateX(${x * -1}px)`;
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    })();
});