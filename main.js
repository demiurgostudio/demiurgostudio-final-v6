/* =====================================================
   1. SETUP GSAP & SCROLL NATIVO SEGURO
   ===================================================== */
gsap.registerPlugin(ScrollTrigger);

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
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fit=crop",
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
    tagline:
      "Tus productos visibles las 24 horas. El pedido, directo a tu chat.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80&fit=crop",
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
   3. UI FLOTANTES, CURSOR & SMART NAVBAR
   ===================================================== */
(function initUI() {
  const cursor = document.getElementById("cursor-glow");
  if (cursor && window.innerWidth > 768) {
    let mouseX = 0,
      mouseY = 0,
      curX = 0,
      curY = 0;
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
      el.addEventListener("mouseenter", () =>
        gsap.to(cursor, { width: 44, height: 44, duration: 0.2 }),
      );
      el.addEventListener("mouseleave", () =>
        gsap.to(cursor, { width: 24, height: 24, duration: 0.2 }),
      );
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
  document
    .querySelectorAll(".mobile-drawer-link")
    .forEach((l) => l.addEventListener("click", () => toggleDrawer(false)));

  const toast = document.getElementById("welcome-toast");
  const toastClose = document.getElementById("toast-close");
  if (toast) {
    let shown = false;
    window.addEventListener(
      "scroll",
      () => {
        if (shown) return;
        if (window.scrollY > 400) {
          shown = true;
          toast.classList.add("is-visible");
        }
      },
      { passive: true },
    );
    if (toastClose)
      toastClose.addEventListener("click", () =>
        toast.classList.remove("is-visible"),
      );
  }
})();

/* =====================================================
<<<<<<< HEAD
   4. SECCIÓN 1: HERO CON ENTRADAS DIRECCIONALES
=======
   4. SECCIÓN 1: ANIMACIÓN HERO CON DELAYS DIRECCIONALES
>>>>>>> bd64947f2a79a24299993e82ae07cc6cbfabfdd5
   ===================================================== */
function initHeroAnimations() {
  const tlHero = gsap.timeline({ defaults: { ease: "power3.out" } });

  tlHero
<<<<<<< HEAD
    .fromTo(
      ".hero-badge",
      { opacity: 0, scale: 0.7, y: -20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.75, delay: 0.2 },
    )
    .fromTo(
      ".hero-title",
      { opacity: 0, x: -60, filter: "blur(6px)" },
      { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.95 },
      "-=0.45",
    )
    .fromTo(
      ".hero-desc",
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5",
    )
    .fromTo(
      ".hero-actions .btn-primary",
      { opacity: 0, scale: 0.8, x: -20 },
      { opacity: 1, scale: 1, x: 0, duration: 0.65, ease: "back.out(1.7)" },
      "-=0.4",
    )
    .fromTo(
      ".hero-actions .btn-outline",
      { opacity: 0, scale: 0.8, x: 20 },
      { opacity: 1, scale: 1, x: 0, duration: 0.65, ease: "back.out(1.7)" },
      "-=0.5",
    )
    .fromTo(
      ".hero-social-proof",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.75 },
      "-=0.35",
    )
    .fromTo(
      ".hero-scroll-hint",
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.2",
    );
}

/* =====================================================
   5. SECCIÓN 2: PORTFOLIO SLIDER CON SCROLLTRIGGER
=======
    .fromTo(".hero-anim-badge", { autoAlpha: 0, scale: 0.7, y: -20 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.75, delay: 0.2 })
    .fromTo(".hero-anim-title", { autoAlpha: 0, x: -60, filter: "blur(6px)" }, { autoAlpha: 1, x: 0, filter: "blur(0px)", duration: 0.95 }, "-=0.45")
    .fromTo(".hero-anim-desc", { autoAlpha: 0, y: 35 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.5")
    .fromTo(".hero-anim-btn-1", { autoAlpha: 0, scale: 0.8, x: -20 }, { autoAlpha: 1, scale: 1, x: 0, duration: 0.65, ease: "back.out(1.7)" }, "-=0.4")
    .fromTo(".hero-anim-btn-2", { autoAlpha: 0, scale: 0.8, x: 20 }, { autoAlpha: 1, scale: 1, x: 0, duration: 0.65, ease: "back.out(1.7)" }, "-=0.5")
    .fromTo(".hero-anim-proof", { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.75 }, "-=0.35")
    .fromTo(".hero-anim-scroll", { autoAlpha: 0, y: -15 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.2");
}

/* =====================================================
   5. SECCIÓN 2: PORTFOLIO CON SCROLLTRIGGER PINNED
>>>>>>> bd64947f2a79a24299993e82ae07cc6cbfabfdd5
   ===================================================== */
function initPortfolioSlider() {
  const track = document.getElementById("slider-track");
  const prevBtn = document.getElementById("slider-prev-btn");
  const nextBtn = document.getElementById("slider-next-btn");
  const progressBar = document.getElementById("slider-progress-bar");
  const portfolioSection = document.getElementById("portfolio");

  if (!track || !portfolioSection) return;

  const items = document.querySelectorAll(".slider-card-item");
  const totalCards = items.length;
  let currentIndex = 0;

  function updateSlider(index) {
    currentIndex = (index + totalCards) % totalCards;
    gsap.to(track, {
      xPercent: -currentIndex * 100,
<<<<<<< HEAD
      duration: 0.5,
      ease: "power2.out",
    });
    if (progressBar) {
      gsap.to(progressBar, {
        width: `${((currentIndex + 1) / totalCards) * 100}%`,
        duration: 0.3,
      });
    }
  }

  if (prevBtn)
    prevBtn.addEventListener("click", () => updateSlider(currentIndex - 1));
  if (nextBtn)
    nextBtn.addEventListener("click", () => updateSlider(currentIndex + 1));

  // Animación al scrollear en Desktop
  if (window.innerWidth > 768) {
    ScrollTrigger.create({
      trigger: portfolioSection,
      start: "top 80%",
      onEnter: () => updateSlider(0),
=======
      duration: 0.65,
      ease: "power2.out"
    });
    if (progressBar) {
      gsap.to(progressBar, { width: `${((currentIndex + 1) / totalCards) * 100}%`, duration: 0.4 });
    }
  }

  if (prevBtn) prevBtn.addEventListener("click", () => updateSlider(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => updateSlider(currentIndex + 1));

  // Efecto pin al scrollear para pasar los casos
  if (window.innerWidth > 768) {
    ScrollTrigger.create({
      trigger: portfolioSection,
      start: "top top",
      end: "+=1800",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const targetIndex = Math.min(Math.floor(progress * totalCards), totalCards - 1);
        if (targetIndex !== currentIndex) {
          currentIndex = targetIndex;
          gsap.to(track, { xPercent: -currentIndex * 100, duration: 0.4, ease: "power1.out" });
        }
        if (progressBar) {
          gsap.set(progressBar, { width: `${progress * 100}%` });
        }
      }
>>>>>>> bd64947f2a79a24299993e82ae07cc6cbfabfdd5
    });
  }
}

/* =====================================================
   6. SECCIÓN 3: SHOWCASE 3D GESTIONADO POR SCROLLTRIGGER
   ===================================================== */
// Controlador Parallax
const deviceBodyS1 = document.querySelector("#device-body-s1");
const floorShadowS1 = document.querySelector("#floor-shadow-s1");
const deviceBodyS3 = document.querySelector("#device-body-s3");
const floorShadowS3 = document.querySelector("#floor-shadow-s3");
<<<<<<< HEAD
const baseRotX = 6,
  baseRotY = -10,
  baseRotZ = -1;
=======
const baseRotX = 6, baseRotY = -10, baseRotZ = -1;
>>>>>>> bd64947f2a79a24299993e82ae07cc6cbfabfdd5

[deviceBodyS1, deviceBodyS3].forEach((el) => {
  if (el)
    gsap.set(el, {
      rotateY: baseRotY,
      rotateX: baseRotX,
      rotateZ: baseRotZ,
      transformStyle: "preserve-3d",
    });
});

window.addEventListener("mousemove", (e) => {
  const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
  const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;

  [deviceBodyS1, deviceBodyS3].forEach((el) => {
    if (el)
      gsap.to(el, {
        rotateY: baseRotY + xNorm * 10,
        rotateX: baseRotX - yNorm * 8,
        duration: 0.8,
        ease: "power2.out",
      });
  });
  [floorShadowS1, floorShadowS3].forEach((el) => {
    if (el)
      gsap.to(el, {
        x: xNorm * 15,
        y: yNorm * 5,
        duration: 0.8,
        ease: "power2.out",
      });
  });
});

<<<<<<< HEAD
// Timelines de subsecciones
=======
// Timelines de las subsecciones
>>>>>>> bd64947f2a79a24299993e82ae07cc6cbfabfdd5
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

const queryText = "estudio de diseño web buenos aires";
const typingObj = { count: 0 };
<<<<<<< HEAD
let tlS1 = null;

function setupS1Timeline() {
  if (!googleScene) return;
  tlS1 = gsap.timeline({ repeat: -1, repeatDelay: 2 });

  tlS1
    .to(
      typingObj,
      {
        count: queryText.length,
        duration: 1.8,
        ease: "none",
        onUpdate: () => {
          if (searchText)
            searchText.textContent = queryText.substring(
              0,
              Math.floor(typingObj.count),
            );
        },
      },
      "+=0.3",
    )
    .to(
      googleLogoWrap,
      { height: 0, opacity: 0, margin: 0, duration: 0.4 },
      "+=0.2",
    )
    .to([googleTabs, resultsFake], { opacity: 1, duration: 0.35 })
    .to(
      jarvisCard,
      { opacity: 1, scale: 0.72, duration: 0.5, ease: "back.out(1.4)" },
      "-=0.2",
    )
    .to(
      googleInnerContent,
      { filter: "blur(6px)", scale: 0.94, duration: 0.8 },
      "+=0.2",
    )
    .to(
      jarvisCard,
      {
        scale: 1.0,
        y: -15,
        z: 140,
        duration: 1.0,
        ease: "power3.out",
        onStart: () => jarvisCard.classList.add("jarvis-floating-glow"),
      },
      "<",
    )
=======
const tlS1 = gsap.timeline({ repeat: -1, repeatDelay: 2.5, paused: true });

function setupS1Timeline() {
  if (!googleScene) return;
  tlS1
    .to(typingObj, {
      count: queryText.length, duration: 1.8, ease: "none",
      onUpdate: () => { if (searchText) searchText.textContent = queryText.substring(0, Math.floor(typingObj.count)); },
    }, "+=0.3")
    .to(googleLogoWrap, { height: 0, opacity: 0, margin: 0, duration: 0.4 }, "+=0.2")
    .to([googleTabs, resultsFake], { opacity: 1, duration: 0.35 })
    .to(jarvisCard, { opacity: 1, scale: 0.72, duration: 0.5, ease: "back.out(1.4)" }, "-=0.2")
    .to(googleInnerContent, { filter: "blur(6px)", scale: 0.94, duration: 0.8 }, "+=0.2")
    .to(jarvisCard, {
      scale: 1.0, y: -15, z: 140, duration: 1.0, ease: "power3.out",
      onStart: () => jarvisCard.classList.add("jarvis-floating-glow"),
    }, "<")
>>>>>>> bd64947f2a79a24299993e82ae07cc6cbfabfdd5
    .to({}, { duration: 1.8 })
    .to(googleInnerContent, { filter: "blur(0px)", scale: 1, duration: 0.7 })
    .to(
      jarvisCard,
      {
        scale: 0.72,
        y: 0,
        z: 0,
        duration: 0.7,
        onComplete: () => jarvisCard.classList.remove("jarvis-floating-glow"),
      },
      "<",
    )
    .to(fakeCursorS1, {
      opacity: 1,
      x: 155,
      y: 195,
      duration: 0.8,
      ease: "power3.out",
    })
    .set(clickRippleS1, { x: 155, y: 195, scale: 0.2, opacity: 0.9 })
    .to(clickRippleS1, { scale: 2.2, opacity: 0, duration: 0.45 })
    .to(fakeCursorS1, { opacity: 0, duration: 0.2 })
    .to(googleScene, { opacity: 0, filter: "blur(8px)", duration: 0.6 })
    .to(jarvisCard, { opacity: 0, duration: 0.3 }, "<")
    .to(websiteSceneS1, { opacity: 1, duration: 0.4 }, "-=0.4")
    .to({}, { duration: 3.5 })
    .to(websiteSceneS1, { opacity: 0, duration: 0.6 })
    .to(
      googleScene,
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        onStart: () => {
          typingObj.count = 0;
          if (searchText) searchText.textContent = "";
          gsap.set(googleLogoWrap, {
            height: "auto",
            opacity: 1,
            margin: "1.5rem 0",
          });
          gsap.set([googleTabs, resultsFake], { opacity: 0 });
        },
      },
      "-=0.3",
    );
}

// Subsección Responsive
const frame = document.getElementById("device-frame");
const labelRes = document.getElementById("label-res");
const modeButtons = document.querySelectorAll(".mode-btn");
let currentMode = 0;
let responsiveTimer = null;

function changeMode(index) {
  currentMode = index;
  const isSmall = window.innerWidth < 680;
  let targetWidth = 640,
    targetHeight = 340,
    radius = "16px",
    label = "Monitor PC";

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
    gsap.to(frame, {
      width: targetWidth,
      height: targetHeight,
      borderRadius: radius,
      duration: 1.0,
      ease: "power2.inOut",
    });
  }
  if (labelRes) labelRes.textContent = label;

  modeButtons.forEach(
    (b) =>
      (b.className =
        "mode-btn px-4 py-1.5 rounded-full text-xs font-semibold text-slate-400 hover:text-white"),
  );
  const activeBtn = document.getElementById(`btn-${index}`);
  if (activeBtn)
    activeBtn.className =
      "mode-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-[#1ac1d0] text-[#001c25]";
}

function startResponsiveLoop() {
  if (responsiveTimer) clearInterval(responsiveTimer);
  responsiveTimer = setInterval(() => changeMode((currentMode + 1) % 3), 3800);
}
function stopResponsiveLoop() {
  if (responsiveTimer) clearInterval(responsiveTimer);
}

// Subsección WhatsApp
const floatingBtnS3 = document.querySelector("#floating-btn-s3");
const fakeCursorS3 = document.querySelector("#fake-cursor-s3");
const clickRippleS3 = document.querySelector("#click-ripple-s3");
const websiteSceneS3 = document.querySelector("#website-scene-s3");
const whatsappScreen = document.querySelector("#whatsapp-screen");
const msgs = document.querySelectorAll(".chat-msg");
const typing = document.querySelector("#typing-indicator");
let tlS3 = null;

<<<<<<< HEAD
=======
const tlS3 = gsap.timeline({ repeat: -1, repeatDelay: 2.5, paused: true });

>>>>>>> bd64947f2a79a24299993e82ae07cc6cbfabfdd5
function setupS3Timeline() {
  if (!floatingBtnS3) return;
  tlS3 = gsap.timeline({ repeat: -1, repeatDelay: 2 });

  tlS3
    .to(fakeCursorS3, {
      opacity: 1,
      x: 235,
      y: 480,
      duration: 1.3,
      ease: "power3.inOut",
    })
    .set(clickRippleS3, { opacity: 0.85, scale: 0.2 })
    .to(clickRippleS3, { scale: 2, opacity: 0, duration: 0.4 })
    .to(fakeCursorS3, { opacity: 0, duration: 0.2 }, "-=0.2")
    .to(websiteSceneS3, { opacity: 0, duration: 0.5 })
    .to(whatsappScreen, { opacity: 1, duration: 0.5 }, "-=0.3")
    .to(msgs[0], {
      scale: 1,
      opacity: 1,
      duration: 0.35,
      ease: "back.out(1.5)",
    })
    .to(typing, { scale: 1, opacity: 1, duration: 0.2, delay: 0.2 })
    .to(typing, { scale: 0, opacity: 0, duration: 0.2, delay: 0.6 })
    .to(msgs[1], {
      scale: 1,
      opacity: 1,
      duration: 0.35,
      ease: "back.out(1.5)",
    })
    .to(msgs[2], {
      scale: 1,
      opacity: 1,
      duration: 0.35,
      ease: "back.out(1.5)",
      delay: 0.4,
    })
    .to(typing, { scale: 1, opacity: 1, duration: 0.2, delay: 0.2 })
    .to(typing, { scale: 0, opacity: 0, duration: 0.2, delay: 0.6 })
    .to(msgs[3], {
      scale: 1,
      opacity: 1,
      duration: 0.35,
      ease: "back.out(1.5)",
    })
    .to({}, { duration: 3.5 })
    .to(whatsappScreen, { opacity: 0, duration: 0.6 })
    .to(
      websiteSceneS3,
      {
        opacity: 1,
        duration: 0.6,
        onStart: () => {
          gsap.set(msgs, { scale: 0, opacity: 0 });
          gsap.set(typing, { scale: 0, opacity: 0 });
          gsap.set(fakeCursorS3, { x: 30, y: 140, opacity: 0 });
        },
      },
      "-=0.4",
    );
}

<<<<<<< HEAD
function initShowcaseObservers() {
  setupS1Timeline();
  setupS3Timeline();

  // Subsección 1 (Google)
  ScrollTrigger.create({
    trigger: "#section-google",
    start: "top 85%",
    end: "bottom 15%",
    onEnter: () => {
      if (tlS1) tlS1.play();
    },
    onLeave: () => {
      if (tlS1) tlS1.pause();
    },
    onEnterBack: () => {
      if (tlS1) tlS1.play();
    },
    onLeaveBack: () => {
      if (tlS1) tlS1.pause();
    },
  });

  // Subsección 2 (Responsive)
  ScrollTrigger.create({
    trigger: "#section-responsive",
    start: "top 85%",
    end: "bottom 15%",
    onEnter: () => startResponsiveLoop(),
    onLeave: () => stopResponsiveLoop(),
    onEnterBack: () => startResponsiveLoop(),
    onLeaveBack: () => stopResponsiveLoop(),
  });

  // Subsección 3 (WhatsApp)
  ScrollTrigger.create({
    trigger: "#section-whatsapp",
    start: "top 85%",
    end: "bottom 15%",
    onEnter: () => {
      if (tlS3) tlS3.play();
    },
    onLeave: () => {
      if (tlS3) tlS3.pause();
    },
    onEnterBack: () => {
      if (tlS3) tlS3.play();
    },
    onLeaveBack: () => {
      if (tlS3) tlS3.pause();
    },
  });
}

/* =====================================================
   7. SECCIÓN 5: METODOLOGÍA (LUCES PERSISTENTES GSAP)
   ===================================================== */
function initMetodologiaScroll() {
  const procesoSection = document.querySelector("#proceso");
  const fill = document.querySelector(".proceso-line-fill");
  const steps = document.querySelectorAll(".gs-step");
  if (!procesoSection || !fill || !steps.length) return;

=======
// Vincular activación y apagado para optimizar rendimiento y batería
function initShowcaseObservers() {
  setupS1Timeline();
  setupS3Timeline();

  // Subsección 1 (Google)
  ScrollTrigger.create({
    trigger: "#section-google",
    start: "top 70%",
    end: "bottom 20%",
    onEnter: () => {
      document.querySelector("#section-google").classList.remove("is-inactive");
      tlS1.play();
    },
    onLeave: () => {
      document.querySelector("#section-google").classList.add("is-inactive");
      tlS1.pause();
    },
    onEnterBack: () => {
      document.querySelector("#section-google").classList.remove("is-inactive");
      tlS1.play();
    },
    onLeaveBack: () => {
      document.querySelector("#section-google").classList.add("is-inactive");
      tlS1.pause();
    }
  });

  // Subsección 2 (Responsive)
  ScrollTrigger.create({
    trigger: "#section-responsive",
    start: "top 70%",
    end: "bottom 20%",
    onEnter: () => {
      document.querySelector("#section-responsive").classList.remove("is-inactive");
      startResponsiveLoop();
    },
    onLeave: () => {
      document.querySelector("#section-responsive").classList.add("is-inactive");
      stopResponsiveLoop();
    },
    onEnterBack: () => {
      document.querySelector("#section-responsive").classList.remove("is-inactive");
      startResponsiveLoop();
    },
    onLeaveBack: () => {
      document.querySelector("#section-responsive").classList.add("is-inactive");
      stopResponsiveLoop();
    }
  });

  // Subsección 3 (WhatsApp)
  ScrollTrigger.create({
    trigger: "#section-whatsapp",
    start: "top 70%",
    end: "bottom 20%",
    onEnter: () => {
      document.querySelector("#section-whatsapp").classList.remove("is-inactive");
      tlS3.play();
    },
    onLeave: () => {
      document.querySelector("#section-whatsapp").classList.add("is-inactive");
      tlS3.pause();
    },
    onEnterBack: () => {
      document.querySelector("#section-whatsapp").classList.remove("is-inactive");
      tlS3.play();
    },
    onLeaveBack: () => {
      document.querySelector("#section-whatsapp").classList.add("is-inactive");
      tlS3.pause();
    }
  });
}

/* =====================================================
   7. SECCIÓN 5: METODOLOGÍA (LUCES PERSISTENTES GSAP)
   ===================================================== */
function initMetodologiaScroll() {
  const procesoSection = document.querySelector("#proceso");
  const fill = document.querySelector(".proceso-line-fill");
  const steps = document.querySelectorAll(".gs-step");
  if (!procesoSection || !fill || !steps.length) return;

  // Llenado continuo de línea
>>>>>>> bd64947f2a79a24299993e82ae07cc6cbfabfdd5
  gsap.to(fill, {
    height: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: procesoSection,
      start: "top 60%",
      end: "bottom 70%",
      scrub: 0.4,
    },
  });

<<<<<<< HEAD
=======
  // Encendido progresivo y permanente de los círculos
>>>>>>> bd64947f2a79a24299993e82ae07cc6cbfabfdd5
  steps.forEach((step) => {
    ScrollTrigger.create({
      trigger: step,
      start: "top 65%",
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

    const bulletsHTML = data.bullets
      .map((b) => `<li><i class="fa-solid fa-circle-check"></i> ${b}</li>`)
      .join("");
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
<<<<<<< HEAD
  document
    .querySelectorAll('[data-close="modal-services"]')
    .forEach((b) => b.addEventListener("click", closeModal));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

/* =====================================================
   9. REVEALS POR GRAVEDAD Y DELAYS ESCALONADOS
=======
  document.querySelectorAll('[data-close="modal-services"]').forEach((b) => b.addEventListener("click", closeModal));
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}

/* =====================================================
   9. REVEALS POR GRAVEDAD Y DELAY ESCALONADO
>>>>>>> bd64947f2a79a24299993e82ae07cc6cbfabfdd5
   ===================================================== */
function initGlobalReveals() {
  // Badges
  gsap.utils.toArray(".gs-reveal-badge").forEach((el) => {
<<<<<<< HEAD
    gsap.from(el, {
      opacity: 0,
      scale: 0.8,
      y: -15,
      duration: 0.6,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
=======
    gsap.fromTo(el, { autoAlpha: 0, scale: 0.8, y: -15 }, {
      autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.5)",
      scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" }
>>>>>>> bd64947f2a79a24299993e82ae07cc6cbfabfdd5
    });
  });

  // Títulos
  gsap.utils.toArray(".gs-reveal-title").forEach((el) => {
<<<<<<< HEAD
    gsap.from(el, {
      opacity: 0,
      y: 35,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
=======
    gsap.fromTo(el, { autoAlpha: 0, y: 35 }, {
      autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none reverse" }
>>>>>>> bd64947f2a79a24299993e82ae07cc6cbfabfdd5
    });
  });

  // Párrafos / Subtítulos
  gsap.utils.toArray(".gs-reveal-desc").forEach((el) => {
<<<<<<< HEAD
    gsap.from(el, {
      opacity: 0,
      y: 25,
      duration: 0.7,
      delay: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Tarjetas de Servicios
  gsap.from(".card-service", {
    opacity: 0,
    y: 45,
    scale: 0.95,
    duration: 0.75,
    stagger: 0.18,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".servicios-grid",
      start: "top 82%",
      toggleActions: "play none none reverse",
    },
  });

  // Tarjetas de Precios
  gsap.from(".gs-pricing-card", {
    opacity: 0,
    y: 50,
    scale: 0.94,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".pricing-cards-grid",
      start: "top 82%",
      toggleActions: "play none none reverse",
    },
  });

  // Preguntas Frecuentes
  gsap.from(".gs-faq-item", {
    opacity: 0,
    x: -30,
    duration: 0.6,
    stagger: 0.12,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".faq-list",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
=======
    gsap.fromTo(el, { autoAlpha: 0, y: 25 }, {
      autoAlpha: 1, y: 0, duration: 0.7, delay: 0.15, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none reverse" }
    });
  });

  // Tarjetas de Soluciones / Servicios
  gsap.fromTo(".card-service", { autoAlpha: 0, y: 45, scale: 0.95 }, {
    autoAlpha: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.18, ease: "power3.out",
    scrollTrigger: { trigger: ".servicios-grid", start: "top 80%", toggleActions: "play none none reverse" }
  });

  // Tarjetas de Precios
  gsap.fromTo(".gs-pricing-card", { autoAlpha: 0, y: 50, scale: 0.94 }, {
    autoAlpha: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
    scrollTrigger: { trigger: ".pricing-cards-grid", start: "top 80%", toggleActions: "play none none reverse" }
  });

  // Preguntas Frecuentes
  gsap.fromTo(".gs-faq-item", { autoAlpha: 0, x: -30 }, {
    autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
    scrollTrigger: { trigger: ".faq-list", start: "top 85%", toggleActions: "play none none reverse" }
>>>>>>> bd64947f2a79a24299993e82ae07cc6cbfabfdd5
  });

  // Acordeón FAQ
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      document
        .querySelectorAll(".faq-question")
        .forEach((b) => b.setAttribute("aria-expanded", "false"));
      if (!isOpen) btn.setAttribute("aria-expanded", "true");
    });
  });
}

/* =====================================================
<<<<<<< HEAD
   10. INICIALIZACIÓN GLOBAL CON REFRESH DE SCROLLTRIGGER
=======
   10. INICIALIZACIÓN GLOBAL
>>>>>>> bd64947f2a79a24299993e82ae07cc6cbfabfdd5
   ===================================================== */
window.addEventListener("load", () => {
  initHeroAnimations();
  initPortfolioSlider();
  initShowcaseObservers();
  initMetodologiaScroll();
  initServicesModals();
  initGlobalReveals();
<<<<<<< HEAD

  // Asegura el cálculo correcto de alturas y offsets
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
});
=======
});
>>>>>>> bd64947f2a79a24299993e82ae07cc6cbfabfdd5
