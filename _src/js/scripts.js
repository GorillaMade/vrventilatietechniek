document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------
   * 1. Hamburger toggle
   * ------------------------------ */
  (() => {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".site-nav");
    if (!hamburger || !nav) return;

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      nav.classList.toggle("open");
    });
  })();


  /* ------------------------------
   * 3. Dialog openen
   * ------------------------------ */
  (() => {
    document.querySelectorAll('.button--link[data-dialog]').forEach(btn => {
      btn.addEventListener('click', () => {
        const dialog = document.getElementById(btn.dataset.dialog);
        if (dialog?.showModal) dialog.showModal();
        else alert("Uw browser ondersteunt geen dialog-element");
      });
    });
  })();


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


  /* ------------------------------
   * 5. Before/After slider
   * ------------------------------ */
  (() => {
    document.querySelectorAll(".ba-slider").forEach(slider => {
      const handle = slider.querySelector(".handle");
      const before = slider.querySelector(".before");
      if (!handle || !before) return;

      function moveSlider(x) {
        const rect = slider.getBoundingClientRect();
        let pos = Math.max(0, Math.min(x - rect.left, rect.width));
        const pct = (pos / rect.width) * 100;
        before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
        handle.style.left = pos + "px";
      }

      const startDrag = (clientXGetter) => (e) => {
        e.preventDefault();
        const move = (ev) => moveSlider(clientXGetter(ev));
        const stop = () => {
          window.removeEventListener("mousemove", move);
          window.removeEventListener("mouseup", stop);
          window.removeEventListener("touchmove", move);
          window.removeEventListener("touchend", stop);
        };
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", stop);
        window.addEventListener("touchmove", move, { passive: false });
        window.addEventListener("touchend", stop);
      };

      handle.addEventListener("mousedown", startDrag(ev => ev.pageX));
      handle.addEventListener("touchstart", startDrag(ev => ev.touches[0].pageX));
    });
  })();

});