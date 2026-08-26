/* =====================================================
   1. SETUP GSAP & REGISTRO DE PLUGINS
   ===================================================== */
gsap.registerPlugin(ScrollTrigger);

// Navegación segura contra '#'
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* =====================================================
   2. DICCIONARIOS DE DATOS PARA MODALES DE SERVICIOS
   ===================================================== */
const SERVICIOS_DATA = {
  landing: {
    icon: "fa-solid fa-rocket",
    title: "Landing Page de Conversión",
    tagline: "Una página. Un objetivo. Que te escriban.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80&fit=crop",
    imageAlt: "Landing Page de Conversión",
    bullets: [
      "Estructura orientada a ventas: Hero → Oferta → Prueba Social → WhatsApp",
      "Entrega garantizada en 3 a 7 días hábiles",
      "Velocidad de carga menor a 1 segundo",
      "Botón directo con mensaje personalizado pre-cargado",
      "Hosting y dominio .com.ar incluido por 1 año",
    ],
    result: { number: "3–7 días", label: "Tiempo promedio de entrega" },
    cta: {
      text: "Quiero mi landing page",
      wa: "5491125371329",
      msg: "Hola!%20Me%20interesa%20una%20Landing%20Page%20de%20Conversi%C3%B3n.",
    },
  },
  institucional: {
    icon: "fa-solid fa-building",
    title: "Web Institucional Completa",
    tagline: "Tu carta de presentación digital que cierra clientes 24/7.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fit=crop",
    imageAlt: "Web Institucional",
    bullets: [
      "Arquitectura multi-sección: servicios, equipo, galería y testimonios",
      "Adaptabilidad fluida en computadoras, tablets y celulares",
      "Integración de Google Maps y analítica de visitas",
      "Soporte post-lanzamiento para ajustes y consultas",
      "Hosting y dominio .com.ar incluido por 1 año",
    ],
    result: { number: "2–4 sem.", label: "Tiempo estimado de desarrollo" },
    cta: {
      text: "Quiero mi web institucional",
      wa: "5491125371329",
      msg: "Hola!%20Me%20interesa%20una%20Web%20Institucional.",
    },
  },
  catalogo: {
    icon: "fa-solid fa-store",
    title: "Catálogo Digital WhatsApp",
    tagline: "Tus productos visibles las 24 horas. El pedido, directo a tu chat.",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80&fit=crop",
    imageAlt: "Catálogo Digital",
    bullets: [
      "Fichas individuales con fotos, descripción clara y precios",
      "Filtros ágiles por categoría sin recargar la página",
      "Botón de pedido unitario con detalle automático al WhatsApp",
      "Carga instantánea sin bases de datos pesadas ni pasarelas lentas",
      "Hosting y dominio .com.ar incluido por 1 año",
    ],
    result: { number: "3–5 sem.", label: "Entrega según volumen de catálogo" },
    cta: {
      text: "Quiero mi catálogo digital",
      wa: "5491125371329",
      msg: "Hola!%20Me%20interesa%20un%20Cat%C3%A1logo%20Digital.",
    },
  },
};

/* =====================================================
   3. UI FLOTANTES & NAVBAR
   ===================================================== */
(function initUI() {
  const cursor = document.getElementById("cursor-glow");
  if (cursor && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    gsap.ticker.add(() => {
      curX += (mouseX - curX) * 0.15;
      curY += (mouseY - curY) * 0.15;
      gsap.set(cursor, { x: curX - 12, y: curY - 12 });
    });

    document.querySelectorAll(".magnet-target").forEach((el) => {
      el.addEventListener("mouseenter", () => gsap.to(cursor, { width: 44, height: 44, duration: 0.2 }));
      el.addEventListener("mouseleave", () => gsap.to(cursor, { width: 24, height: 24, duration: 0.2 }));
    });
  }

  const nav = document.getElementById("smart-nav");
  if (nav) {
    let lastScroll = 0;
    ScrollTrigger.create({
      start: "top -80",
      onUpdate: () => {
        const curr = window.scrollY;
        if (curr > lastScroll && curr > 80) {
          gsap.to(nav, { yPercent: -110, duration: 0.3 });
        } else {
          gsap.to(nav, { yPercent: 0, duration: 0.4 });
        }
        lastScroll = curr;
      },
    });
  }

  const hamburger = document.getElementById("nav-hamburger");
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("mobile-overlay");
  const closeBtn = document.getElementById("mobile-drawer-close");

  function toggleDrawer(open) {
    if (!drawer || !overlay) return;
    drawer.classList.toggle("is-open", open);
    overlay.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (hamburger) hamburger.addEventListener("click", () => toggleDrawer(true));
  if (closeBtn) closeBtn.addEventListener("click", () => toggleDrawer(false));
  if (overlay) overlay.addEventListener("click", () => toggleDrawer(false));
  document.querySelectorAll(".mobile-drawer-link").forEach((l) => l.addEventListener("click", () => toggleDrawer(false)));

  const toast = document.getElementById("welcome-toast");
  const toastClose = document.getElementById("toast-close");
  if (toast) {
    let shown = false;
    window.addEventListener("scroll", () => {
      if (shown) return;
      if (window.scrollY > 400) {
        shown = true;
        toast.classList.add("is-visible");
      }
    }, { passive: true });
    if (toastClose) toastClose.addEventListener("click", () => toast.classList.remove("is-visible"));
  }
})();

/* =====================================================
   4. SECCIÓN 1: HERO (PALABRA POR PALABRA DERECHA A IZQ)
   ===================================================== */
function initHeroAnimations() {
  const titleEl = document.getElementById("hero-split-title");

  if (titleEl) {
    const nodes = Array.from(titleEl.childNodes);
    titleEl.innerHTML = "";

    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.trim().split(/\s+/);
        words.forEach((word) => {
          if (word.length > 0) {
            const span = document.createElement("span");
            span.className = "hero-word";
            span.textContent = word;
            titleEl.appendChild(span);
            titleEl.appendChild(document.createTextNode(" "));
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const emWords = node.textContent.trim().split(/\s+/);
        const em = document.createElement("em");
        em.className = "text-cyan";
        emWords.forEach((word) => {
          if (word.length > 0) {
            const span = document.createElement("span");
            span.className = "hero-word text-cyan";
            span.textContent = word;
            em.appendChild(span);
            em.appendChild(document.createTextNode(" "));
          }
        });
        titleEl.appendChild(em);
        titleEl.appendChild(document.createTextNode(" "));
      }
    });
  }

  const tlHero = gsap.timeline({ defaults: { ease: "power3.out" } });

  tlHero
    .fromTo(".hero-badge", { opacity: 0, y: -25, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.1 })
    .fromTo(".hero-word", 
      { opacity: 0, x: 50, filter: "blur(4px)" }, 
      { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.55, stagger: 0.08, ease: "power2.out" }, 
      "-=0.3"
    )
    .fromTo(".hero-desc", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.2")
    .fromTo(".hero-actions .btn-primary", { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" }, "-=0.3")
    .fromTo(".hero-actions .btn-outline", { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" }, "-=0.4")
    .fromTo(".hero-social-proof", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
    .fromTo(".hero-scroll-hint", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
}

/* =====================================================
   5. SECCIÓN 2: PORTFOLIO PINNED (SCROLLTRIGGER)
   ===================================================== */
function initPortfolioSlider() {
  const section = document.getElementById("portfolio");
  const track = document.getElementById("slider-track");
  const progressBar = document.getElementById("slider-progress-bar");
  const cards = document.querySelectorAll(".slider-card-item");

  if (!section || !track || cards.length === 0) return;

  const totalCards = cards.length;

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => `+=${window.innerHeight * (totalCards - 0.5)}`,
    pin: true,
    scrub: 0.8,
    anticipatePin: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      if (progressBar) {
        progressBar.style.width = `${Math.max(10, progress * 100)}%`;
      }
      const maxTranslatePercent = (totalCards - 1) * 100;
      gsap.to(track, {
        xPercent: -(progress * maxTranslatePercent),
        duration: 0.1,
        ease: "none",
        overwrite: "auto"
      });
    }
  });

  const prevBtn = document.getElementById("slider-prev-btn");
  const nextBtn = document.getElementById("slider-next-btn");
  let manualIndex = 0;

  function moveManual(direction) {
    manualIndex = Math.max(0, Math.min(totalCards - 1, manualIndex + direction));
    gsap.to(track, {
      xPercent: -(manualIndex * 100),
      duration: 0.5,
      ease: "power2.out"
    });
    if (progressBar) {
      progressBar.style.width = `${((manualIndex + 1) / totalCards) * 100}%`;
    }
  }

  if (prevBtn) prevBtn.addEventListener("click", () => moveManual(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => moveManual(1));
}

/* =====================================================
   6. SECCIÓN 3: SHOWCASE 3D
   ===================================================== */
// Parallax 3D
const deviceBodyS1 = document.querySelector("#device-body-s1");
const floorShadowS1 = document.querySelector("#floor-shadow-s1");
const deviceBodyS3 = document.querySelector("#device-body-s3");
const floorShadowS3 = document.querySelector("#floor-shadow-s3");
const baseRotX = 6, baseRotY = -10, baseRotZ = -1;

[deviceBodyS1, deviceBodyS3].forEach((el) => {
  if (el) gsap.set(el, { rotateY: baseRotY, rotateX: baseRotX, rotateZ: baseRotZ, transformStyle: "preserve-3d" });
});

window.addEventListener("mousemove", (e) => {
  const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
  const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;

  [deviceBodyS1, deviceBodyS3].forEach((el) => {
    if (el) gsap.to(el, { rotateY: baseRotY + xNorm * 8, rotateX: baseRotX - yNorm * 6, duration: 0.6, ease: "power2.out" });
  });
  [floorShadowS1, floorShadowS3].forEach((el) => {
    if (el) gsap.to(el, { x: xNorm * 12, y: yNorm * 4, duration: 0.6, ease: "power2.out" });
  });
});

// SUBSECCIÓN 1: GOOGLE
const googleScene = document.querySelector("#google-scene");
const googleInnerContent = document.querySelector("#google-inner-content");
const websiteSceneS1 = document.querySelector("#website-scene-s1");
const searchText = document.querySelector("#search-text");
const googleTabs = document.querySelector("#google-tabs");
const resultsFake = document.querySelector("#results-fake");
const jarvisCard = document.querySelector("#jarvis-card");
const fakeCursorS1 = document.querySelector("#fake-cursor-s1");
const clickRippleS1 = document.querySelector("#click-ripple-s1");
const googleLogoWrap = document.querySelector("#google-logo-wrap");

let tlS1 = null;

function createS1Timeline() {
  if (!googleScene) return;

  const queryText = "estudio de diseño web buenos aires";
  const typingObj = { count: 0 };

  tlS1 = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

  tlS1
    .set(typingObj, { count: 0 })
    .set(searchText, { textContent: "" })
    .set(googleLogoWrap, { height: "auto", opacity: 1, margin: "1.5rem 0" })
    .set([googleTabs, resultsFake], { opacity: 0 })
    .set(googleInnerContent, { filter: "blur(0px)", scale: 1 })
    .set(jarvisCard, { opacity: 0, scale: 0.72, y: 0, z: 0 })
    .set(fakeCursorS1, { x: 260, y: 480, opacity: 0 })
    .set(clickRippleS1, { x: 155, y: 195, scale: 0, opacity: 0 })
    .set(googleScene, { opacity: 1, filter: "blur(0px)" })
    .set(websiteSceneS1, { opacity: 0 })
    .to(typingObj, {
      count: queryText.length, duration: 1.6, ease: "none",
      onUpdate: () => { if (searchText) searchText.textContent = queryText.substring(0, Math.floor(typingObj.count)); },
    }, "+=0.2")
    .to(googleLogoWrap, { height: 0, opacity: 0, margin: 0, duration: 0.35 }, "+=0.1")
    .to([googleTabs, resultsFake], { opacity: 1, duration: 0.3 })
    .to(jarvisCard, { opacity: 1, scale: 0.72, duration: 0.45, ease: "back.out(1.4)" }, "-=0.1")
    .to(googleInnerContent, { filter: "blur(5px)", scale: 0.95, duration: 0.6 }, "+=0.1")
    .to(jarvisCard, {
      scale: 1.0, y: -15, z: 120, duration: 0.8, ease: "power3.out",
      onStart: () => jarvisCard.classList.add("jarvis-floating-glow"),
    }, "<")
    .to({}, { duration: 1.5 })
    .to(googleInnerContent, { filter: "blur(0px)", scale: 1, duration: 0.5 })
    .to(jarvisCard, {
      scale: 0.72, y: 0, z: 0, duration: 0.5,
      onComplete: () => jarvisCard.classList.remove("jarvis-floating-glow"),
    }, "<")
    .to(fakeCursorS1, { opacity: 1, x: 155, y: 195, duration: 0.7, ease: "power3.out" })
    .set(clickRippleS1, { x: 155, y: 195, scale: 0.2, opacity: 0.9 })
    .to(clickRippleS1, { scale: 2, opacity: 0, duration: 0.35 })
    .to(fakeCursorS1, { opacity: 0, duration: 0.15 })
    .to(googleScene, { opacity: 0, filter: "blur(6px)", duration: 0.5 })
    .to(jarvisCard, { opacity: 0, duration: 0.25 }, "<")
    .to(websiteSceneS1, { opacity: 1, duration: 0.4 }, "-=0.3")
    .to({}, { duration: 3.0 })
    .to(websiteSceneS1, { opacity: 0, duration: 0.5 })
    .to(googleScene, { opacity: 1, filter: "blur(0px)", duration: 0.5 }, "-=0.2");
}

// SUBSECCIÓN 2: RESPONSIVE
const frame = document.getElementById("device-frame");
const labelRes = document.getElementById("label-res");
const modeButtons = document.querySelectorAll(".mode-btn");
let currentMode = 0;
let responsiveTimer = null;

function changeMode(index) {
  currentMode = index;
  const isSmall = window.innerWidth < 680;
  let targetWidth = 640, targetHeight = 340, radius = "16px", label = "Monitor PC";

  if (index === 1) {
    targetWidth = isSmall ? 260 : 380;
    targetHeight = isSmall ? 280 : 340;
    radius = "22px";
    label = "Tablet (1024x768)";
  } else if (index === 2) {
    targetWidth = isSmall ? 180 : 200;
    targetHeight = isSmall ? 320 : 360;
    radius = "30px";
    label = "Móvil (375x667)";
  } else {
    targetWidth = isSmall ? Math.min(window.innerWidth - 40, 420) : 640;
    targetHeight = isSmall ? 240 : 340;
  }

  if (frame) {
    gsap.to(frame, { width: targetWidth, height: targetHeight, borderRadius: radius, duration: 0.8, ease: "power2.inOut" });
  }
  if (labelRes) labelRes.textContent = label;

  modeButtons.forEach((b) => (b.className = "mode-btn px-4 py-1.5 rounded-full text-xs font-semibold text-slate-400 hover:text-white"));
  const activeBtn = document.getElementById(`btn-${index}`);
  if (activeBtn) activeBtn.className = "mode-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-[#1ac1d0] text-[#001c25]";
}

function startResponsiveLoop() {
  if (responsiveTimer) clearInterval(responsiveTimer);
  responsiveTimer = setInterval(() => changeMode((currentMode + 1) % 3), 3500);
}
function stopResponsiveLoop() {
  if (responsiveTimer) clearInterval(responsiveTimer);
}

// SUBSECCIÓN 3: WHATSAPP
const floatingBtnS3 = document.querySelector("#floating-btn-s3");
const fakeCursorS3 = document.querySelector("#fake-cursor-s3");
const clickRippleS3 = document.querySelector("#click-ripple-s3");
const websiteSceneS3 = document.querySelector("#website-scene-s3");
const whatsappScreen = document.querySelector("#whatsapp-screen");
const msgs = document.querySelectorAll(".chat-msg");
const typing = document.querySelector("#typing-indicator");
let tlS3 = null;

function createS3Timeline() {
  if (!floatingBtnS3) return;

  tlS3 = gsap.timeline({ repeat: -1, repeatDelay: 2 });

  tlS3
    .set(fakeCursorS3, { x: 30, y: 140, opacity: 0 })
    .set(websiteSceneS3, { opacity: 1 })
    .set(whatsappScreen, { opacity: 0 })
    .set(msgs, { scale: 0, opacity: 0 })
    .set(typing, { scale: 0, opacity: 0 })
    .to(fakeCursorS3, { opacity: 1, x: 235, y: 480, duration: 1.1, ease: "power3.inOut" })
    .set(clickRippleS3, { opacity: 0.85, scale: 0.2 })
    .to(clickRippleS3, { scale: 2, opacity: 0, duration: 0.35 })
    .to(fakeCursorS3, { opacity: 0, duration: 0.15 }, "-=0.15")
    .to(websiteSceneS3, { opacity: 0, duration: 0.4 })
    .to(whatsappScreen, { opacity: 1, duration: 0.4 }, "-=0.2")
    .to(msgs[0], { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.4)" })
    .to(typing, { scale: 1, opacity: 1, duration: 0.15, delay: 0.15 })
    .to(typing, { scale: 0, opacity: 0, duration: 0.15, delay: 0.5 })
    .to(msgs[1], { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.4)" })
    .to(msgs[2], { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.4)", delay: 0.3 })
    .to(typing, { scale: 1, opacity: 1, duration: 0.15, delay: 0.15 })
    .to(typing, { scale: 0, opacity: 0, duration: 0.15, delay: 0.5 })
    .to(msgs[3], { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.4)" })
    .to({}, { duration: 3.0 })
    .to(whatsappScreen, { opacity: 0, duration: 0.5 })
    .to(websiteSceneS3, { opacity: 1, duration: 0.5 }, "-=0.3");
}

function initShowcaseObservers() {
  createS1Timeline();
  createS3Timeline();
  startResponsiveLoop();

  ScrollTrigger.create({
    trigger: "#section-google",
    start: "top bottom",
    end: "bottom top",
    onEnter: () => tlS1 && tlS1.play(),
    onLeave: () => tlS1 && tlS1.pause(),
    onEnterBack: () => tlS1 && tlS1.play(),
    onLeaveBack: () => tlS1 && tlS1.pause(),
  });

  ScrollTrigger.create({
    trigger: "#section-responsive",
    start: "top bottom",
    end: "bottom top",
    onEnter: () => startResponsiveLoop(),
    onLeave: () => stopResponsiveLoop(),
    onEnterBack: () => startResponsiveLoop(),
    onLeaveBack: () => stopResponsiveLoop(),
  });

  ScrollTrigger.create({
    trigger: "#section-whatsapp",
    start: "top bottom",
    end: "bottom top",
    onEnter: () => tlS3 && tlS3.play(),
    onLeave: () => tlS3 && tlS3.pause(),
    onEnterBack: () => tlS3 && tlS3.play(),
    onLeaveBack: () => tlS3 && tlS3.pause(),
  });
}

/* =====================================================
   7. SECCIÓN 5: METODOLOGÍA (LUCES PERSISTENTES)
   ===================================================== */
function initMetodologiaScroll() {
  const procesoSection = document.querySelector("#proceso");
  const fill = document.querySelector(".proceso-line-fill");
  const steps = document.querySelectorAll(".gs-step");
  if (!procesoSection || !fill || !steps.length) return;

  gsap.to(fill, {
    height: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: procesoSection,
      start: "top 65%",
      end: "bottom 75%",
      scrub: 0.3,
    },
  });

  steps.forEach((step) => {
    ScrollTrigger.create({
      trigger: step,
      start: "top 70%",
      onEnter: () => step.classList.add("active"),
      onLeaveBack: () => step.classList.remove("active"),
    });
  });
}

/* =====================================================
   8. MODAL DE SERVICIOS DINÁMICO
   ===================================================== */
function initServicesModals() {
  const modal = document.getElementById("modal-services");
  if (!modal) return;

  function openModal(key) {
    const data = SERVICIOS_DATA[key];
    if (!data) return;

    document.getElementById("modal-serv-icon").className = data.icon;
    document.getElementById("modal-serv-title").textContent = data.title;
    document.getElementById("modal-serv-tagline").textContent = data.tagline;

    const bulletsHTML = data.bullets.map((b) => `<li><i class="fa-solid fa-circle-check"></i> ${b}</li>`).join("");
    document.getElementById("modal-serv-body").innerHTML = `
      <img src="${data.image}" alt="${data.imageAlt}" loading="lazy" />
      <ul>${bulletsHTML}</ul>
      <div class="modal-result">
        <div class="modal-result-number">${data.result.number}</div>
        <div class="modal-result-label">${data.result.label}</div>
      </div>
    `;

    const cta = document.getElementById("modal-serv-cta");
    cta.href = `https://wa.me/${data.cta.wa}?text=${data.cta.msg}`;
    cta.querySelector(".modal-cta-text").textContent = data.cta.text;

    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-modal]").forEach((el) => {
    el.addEventListener("click", () => openModal(el.dataset.modal));
  });
  document.querySelectorAll('[data-close="modal-services"]').forEach((b) => b.addEventListener("click", closeModal));
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}

/* =====================================================
   9. REVEALS GENERALES
   ===================================================== */
function initGlobalReveals() {
  gsap.utils.toArray(".section-tag").forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: -15, duration: 0.6,
      scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" }
    });
  });

  gsap.utils.toArray(".section-title").forEach((el) => {
    if (el.closest(".hero")) return;
    gsap.from(el, {
      opacity: 0, y: 30, duration: 0.7,
      scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" }
    });
  });

  gsap.from(".card-service", {
    opacity: 0, y: 40, duration: 0.7, stagger: 0.15, ease: "power2.out",
    scrollTrigger: { trigger: ".servicios-grid", start: "top 85%", toggleActions: "play none none reverse" }
  });

  gsap.from(".pricing-card", {
    opacity: 0, y: 45, duration: 0.75, stagger: 0.18, ease: "power2.out",
    scrollTrigger: { trigger: ".pricing-cards-grid", start: "top 85%", toggleActions: "play none none reverse" }
  });

  gsap.from(".faq-item", {
    opacity: 0, x: -25, duration: 0.55, stagger: 0.1, ease: "power2.out",
    scrollTrigger: { trigger: ".faq-list", start: "top 88%", toggleActions: "play none none reverse" }
  });

  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".faq-question").forEach((b) => b.setAttribute("aria-expanded", "false"));
      if (!isOpen) btn.setAttribute("aria-expanded", "true");
    });
  });
}

/* =====================================================
   10. INICIALIZACIÓN
   ===================================================== */
window.addEventListener("load", () => {
  initHeroAnimations();
  initPortfolioSlider();
  initShowcaseObservers();
  initMetodologiaScroll();
  initServicesModals();
  initGlobalReveals();

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 150);
});