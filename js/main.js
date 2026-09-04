(function () {
  const config = getSiteConfig();
  let lang = localStorage.getItem("lucineLang") || "ar";

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  // ------------------------------------------------------------- design --
  function applyDesign() {
    const d = config.design || {};
    const root = document.documentElement.style;
    if (d.primaryColor) root.setProperty("--cyan", d.primaryColor);
    if (d.inkColor) root.setProperty("--ink", d.inkColor);

    const headingPreset = (FONT_PRESETS.heading || []).find((f) => f.name === d.headingFont);
    const bodyPreset = (FONT_PRESETS.body || []).find((f) => f.name === d.bodyFont);
    const arabicPreset = (FONT_PRESETS.arabic || []).find((f) => f.name === d.arabicFont);
    if (headingPreset) root.setProperty("--font-head", headingPreset.css);
    if (bodyPreset) root.setProperty("--font-body", bodyPreset.css);
    if (arabicPreset) root.setProperty("--font-ar", arabicPreset.css);

    const families = [headingPreset, bodyPreset, arabicPreset]
      .filter(Boolean)
      .map((f) => f.google);
    if (families.length) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?" + families.map((f) => "family=" + f).join("&") + "&display=swap";
      document.head.appendChild(link);
    }

    document.querySelectorAll(".brand-logo").forEach((img) => {
      img.src = d.logoDataUrl || "assets/logo-full.png";
    });

    const heroImg = document.getElementById("heroGraphicImg");
    if (heroImg) {
      heroImg.src = d.iconLogoDataUrl || "assets/logo-icon.png";
      heroImg.style.display = d.showHeroGraphic === false ? "none" : "block";
    }
  }

  // --------------------------------------------------------------- lists --
  function renderList(containerId, items) {
    const c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = "";
    items.forEach((item) => c.appendChild(el("li", null, item)));
  }

  function renderServices(list) {
    const grid = document.getElementById("serviceGrid");
    grid.innerHTML = "";
    list.forEach((svc, i) => {
      const card = el("div", "svc-card");
      const num = el("span", "svc-num", String(i + 1).padStart(2, "0"));
      const h = el("h3", null, svc.title);
      const p = el("p", null, svc.desc);
      card.appendChild(num);
      card.appendChild(h);
      card.appendChild(p);
      grid.appendChild(card);
    });
  }

  function renderAudience(list) {
    const grid = document.getElementById("audienceGrid");
    grid.innerHTML = "";
    list.forEach((a) => {
      const card = el("div", "aud-card");
      card.appendChild(document.createTextNode(a.title));
      if (a.note) card.appendChild(el("small", null, a.note));
      grid.appendChild(card);
    });
  }

  function fillSelectWithPlaceholder(select, placeholder, options, valueFn, labelFn) {
    select.innerHTML = "";
    const ph = document.createElement("option");
    ph.value = "";
    ph.textContent = placeholder;
    ph.disabled = true;
    ph.selected = true;
    select.appendChild(ph);
    options.forEach((item) => {
      const opt = document.createElement("option");
      opt.value = valueFn(item);
      opt.textContent = labelFn(item);
      select.appendChild(opt);
    });
  }

  function renderDomainOptions(list, placeholder) {
    const select = document.getElementById("f_domain");
    fillSelectWithPlaceholder(select, placeholder, list, (a) => a.title, (a) => a.title);
  }

  function renderCityOptions(placeholder) {
    const select = document.getElementById("f_city");
    fillSelectWithPlaceholder(select, placeholder, ALGERIA_WILAYAS, (w) => w[lang] || w.fr, (w) => w.code + " — " + (w[lang] || w.fr));
  }

  function updateSpecialtyField(audienceList) {
    const domainSelect = document.getElementById("f_domain");
    const specialtyField = document.getElementById("specialtyField");
    const specialtySelect = document.getElementById("f_specialty");
    const ui = UI_STRINGS[lang];

    const selected = audienceList.find((a) => a.title === domainSelect.value);
    const subOptions = (selected && selected.subOptions) || [];

    if (subOptions.length) {
      fillSelectWithPlaceholder(specialtySelect, ui.form_specialty_placeholder, subOptions, (s) => s, (s) => s);
      specialtyField.style.display = "";
    } else {
      specialtySelect.innerHTML = "";
      specialtyField.style.display = "none";
    }
  }

  // ------------------------------------------------------------ language --
  function applyLanguage(newLang) {
    lang = newLang;
    localStorage.setItem("lucineLang", lang);

    const ui = UI_STRINGS[lang];
    const content = config.content[lang];

    document.documentElement.lang = lang;
    document.documentElement.dir = ui.dir;

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (ui[key] !== undefined) node.textContent = ui[key];
    });

    document.querySelectorAll("[data-content]").forEach((node) => {
      const key = node.getAttribute("data-content");
      if (content[key] !== undefined) node.textContent = content[key];
    });

    renderList("problemList", content.problem_items);
    renderList("solutionList", content.solution_items);
    renderServices(content.services);
    renderAudience(content.audience);
    renderDomainOptions(content.audience, ui.form_domain_placeholder);
    renderCityOptions(ui.form_city_placeholder);
    updateSpecialtyField(content.audience);

    const codeInput = document.getElementById("f_phone_code");
    if (codeInput && !codeInput.value) codeInput.value = config.settings.defaultCountryCode || "+213";

    document.querySelectorAll("#langSwitch button").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
  }

  function applySocialLinks() {
    const s = config.settings;
    const wa = document.getElementById("socialWhatsapp");
    const ig = document.getElementById("socialInstagram");
    const fb = document.getElementById("socialFacebook");
    if (wa) wa.href = "https://wa.me/" + (s.whatsappNumber || "").replace(/\D/g, "");
    if (ig) ig.href = s.instagramUrl || "#";
    if (fb) fb.href = s.facebookUrl || "#";
  }

  function showToast(text) {
    const t = document.getElementById("toast");
    t.textContent = text;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 3500);
  }

  // ----------------------------------------------------------------- form --
  function bindForm() {
    const form = document.getElementById("doctorForm");
    const domainSelect = document.getElementById("f_domain");

    domainSelect.addEventListener("change", () => {
      updateSpecialtyField(config.content[lang].audience);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const ui = UI_STRINGS[lang];
      const name = document.getElementById("f_name").value.trim();
      const phoneCode = document.getElementById("f_phone_code").value.trim();
      const phoneNumber = document.getElementById("f_phone").value.trim();
      const domain = document.getElementById("f_domain").value;
      const specialtyField = document.getElementById("specialtyField");
      const specialty = specialtyField.style.display !== "none" ? document.getElementById("f_specialty").value : "";
      const clinic = document.getElementById("f_clinic").value.trim();
      const cityOpt = document.getElementById("f_city");
      const city = cityOpt.options[cityOpt.selectedIndex] ? cityOpt.options[cityOpt.selectedIndex].text : "";
      const message = document.getElementById("f_message").value.trim();

      if (!name || !phoneNumber) {
        showToast(ui.toast_err);
        return;
      }

      const fullPhone = (phoneCode + " " + phoneNumber).trim();

      const lines = [
        `Lucine Studio — ${ui.form_title}`,
        `${ui.form_name}: ${name}`,
        `${ui.form_phone}: ${fullPhone}`,
        domain ? `${ui.form_domain}: ${domain}` : null,
        specialty ? `${ui.form_specialty}: ${specialty}` : null,
        clinic ? `${ui.form_clinic}: ${clinic}` : null,
        cityOpt.value ? `${ui.form_city}: ${city}` : null,
        message ? `${ui.form_message}: ${message}` : null
      ].filter(Boolean);

      const target = (config.settings.whatsappNumber || "").replace(/\D/g, "");
      const url = "https://wa.me/" + target + "?text=" + encodeURIComponent(lines.join("\n"));
      showToast(ui.toast_ok);
      setTimeout(() => window.open(url, "_blank"), 500);
      form.reset();
      document.getElementById("f_phone_code").value = config.settings.defaultCountryCode || "+213";
      specialtyField.style.display = "none";
    });
  }

  function bindLangSwitch() {
    document.getElementById("langSwitch").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-lang]");
      if (btn) applyLanguage(btn.getAttribute("data-lang"));
    });
  }

  function bindMobileNav() {
    const toggle = document.getElementById("navToggle");
    const nav = document.querySelector(".main-nav");
    toggle.addEventListener("click", () => {
      const open = nav.style.display === "flex";
      nav.style.display = open ? "none" : "flex";
      nav.style.cssText += open ? "" : "position:absolute;top:76px;inset-inline-start:0;inset-inline-end:0;background:var(--paper);flex-direction:column;padding:18px 28px;border-bottom:1px solid var(--line);gap:16px;";
    });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
  applyDesign();
  applySocialLinks();
  applyLanguage(lang);
  bindForm();
  bindLangSwitch();
  bindMobileNav();
})();
