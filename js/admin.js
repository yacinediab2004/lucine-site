(function () {
  const LANGS = ["ar", "fr", "en"];
  let config = getSiteConfig();

  // ---------------------------------------------------------------- auth --
  function checkLogin() {
    const saved = sessionStorage.getItem("lucineAdminAuthed");
    if (saved === "1") showDashboard();
  }
  document.getElementById("loginBtn").addEventListener("click", attemptLogin);
  document.getElementById("pwInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") attemptLogin();
  });
  function attemptLogin() {
    const val = document.getElementById("pwInput").value;
    if (val === config.settings.adminPassword) {
      sessionStorage.setItem("lucineAdminAuthed", "1");
      showDashboard();
    } else {
      document.getElementById("loginError").classList.add("show");
    }
  }
  function showDashboard() {
    document.getElementById("loginShell").style.display = "none";
    document.getElementById("dashboard").style.display = "flex";
    populateGeneral();
    populateDesign();
    buildContentPanes();
    buildListsPanes();
  }
  document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem("lucineAdminAuthed");
    location.reload();
  });

  // ------------------------------------------------------------- side nav --
  document.getElementById("sideNav").addEventListener("click", (e) => {
    const link = e.target.closest("a[data-panel]");
    if (!link) return;
    document.querySelectorAll("#sideNav a").forEach((a) => a.classList.remove("active"));
    link.classList.add("active");
    document.querySelectorAll(".admin-panel").forEach((p) => p.classList.remove("active"));
    document.getElementById(link.getAttribute("data-panel")).classList.add("active");
  });

  // --------------------------------------------------------- general tab --
  function populateGeneral() {
    document.getElementById("s_whatsapp").value = config.settings.whatsappNumber || "";
    document.getElementById("s_instagram").value = config.settings.instagramUrl || "";
    document.getElementById("s_facebook").value = config.settings.facebookUrl || "";
    document.getElementById("s_password").value = config.settings.adminPassword || "";
    document.getElementById("s_countrycode").value = config.settings.defaultCountryCode || "+213";
  }

  // ----------------------------------------------------------- design tab --
  let pendingLogoDataUrl = "";
  let pendingIconDataUrl = "";

  function populateDesign() {
    pendingLogoDataUrl = config.design.logoDataUrl || "";
    pendingIconDataUrl = config.design.iconLogoDataUrl || "";

    document.getElementById("d_primary").value = config.design.primaryColor || "#17ABE0";
    document.getElementById("d_ink").value = config.design.inkColor || "#0A1A20";
    document.getElementById("d_showHero").checked = config.design.showHeroGraphic !== false;

    fillFontSelect("d_headingFont", FONT_PRESETS.heading, config.design.headingFont);
    fillFontSelect("d_bodyFont", FONT_PRESETS.body, config.design.bodyFont);
    fillFontSelect("d_arabicFont", FONT_PRESETS.arabic, config.design.arabicFont);

    document.getElementById("d_logoPreview").src = pendingLogoDataUrl || "assets/logo-full.png";
    document.getElementById("d_iconPreview").src = pendingIconDataUrl || "assets/logo-icon.png";
  }

  function fillFontSelect(id, presets, current) {
    const select = document.getElementById(id);
    select.innerHTML = "";
    presets.forEach((f) => {
      const opt = document.createElement("option");
      opt.value = f.name;
      opt.textContent = f.name;
      if (f.name === current) opt.selected = true;
      select.appendChild(opt);
    });
  }

  function fileToDataUrl(file, callback) {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
  }

  document.getElementById("d_logoFile").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    fileToDataUrl(file, (dataUrl) => {
      pendingLogoDataUrl = dataUrl;
      document.getElementById("d_logoPreview").src = dataUrl;
    });
  });
  document.getElementById("d_iconFile").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    fileToDataUrl(file, (dataUrl) => {
      pendingIconDataUrl = dataUrl;
      document.getElementById("d_iconPreview").src = dataUrl;
    });
  });
  document.getElementById("d_logoReset").addEventListener("click", () => {
    pendingLogoDataUrl = "";
    document.getElementById("d_logoPreview").src = "assets/logo-full.png";
    document.getElementById("d_logoFile").value = "";
  });
  document.getElementById("d_iconReset").addEventListener("click", () => {
    pendingIconDataUrl = "";
    document.getElementById("d_iconPreview").src = "assets/logo-icon.png";
    document.getElementById("d_iconFile").value = "";
  });

  // --------------------------------------------------------- content tab --
  const CONTENT_FIELDS = [
    { key: "hero_title", label: "العنوان الرئيسي", type: "input" },
    { key: "hero_lead", label: "الوصف تحت العنوان الرئيسي", type: "textarea" },
    { key: "about_title", label: "عنوان قسم \"من نحن\"", type: "input" },
    { key: "about_body", label: "نص \"من نحن\"", type: "textarea" },
    { key: "solution_intro", label: "جملة تقديم الحل", type: "input" },
    { key: "form_title", label: "عنوان نموذج الانضمام", type: "input" },
    { key: "form_lead", label: "وصف نموذج الانضمام", type: "textarea" }
  ];

  function buildContentPanes() {
    const wrap = document.getElementById("contentPanes");
    wrap.innerHTML = "";
    LANGS.forEach((lang) => {
      const pane = document.createElement("div");
      pane.className = "lang-pane" + (lang === "ar" ? " active" : "");
      pane.id = "content-pane-" + lang;
      const card = document.createElement("div");
      card.className = "card";
      CONTENT_FIELDS.forEach((f) => {
        const field = document.createElement("div");
        field.className = "a-field";
        const label = document.createElement("label");
        label.textContent = f.label;
        const input = document.createElement(f.type === "textarea" ? "textarea" : "input");
        input.id = "c_" + lang + "_" + f.key;
        input.value = config.content[lang][f.key] || "";
        field.appendChild(label);
        field.appendChild(input);
        card.appendChild(field);
      });
      pane.appendChild(card);
      wrap.appendChild(pane);
    });
    bindLangTabs("contentLangTabs", "content-pane-");
  }

  // ----------------------------------------------------------- lists tab --
  function buildListsPanes() {
    const wrap = document.getElementById("listsPanes");
    wrap.innerHTML = "";
    LANGS.forEach((lang) => {
      const pane = document.createElement("div");
      pane.className = "lang-pane" + (lang === "ar" ? " active" : "");
      pane.id = "lists-pane-" + lang;

      pane.appendChild(buildSimpleListCard(lang, "problem_items", "نقاط المشكلة"));
      pane.appendChild(buildSimpleListCard(lang, "solution_items", "نقاط الحل"));
      pane.appendChild(buildPairListCard(lang, "services", "الخدمات", "العنوان", "الوصف", "title", "desc"));

      wrap.appendChild(pane);
    });
    bindLangTabs("listsLangTabs", "lists-pane-");
    buildUnifiedAudienceEditor();
  }

  function buildSimpleListCard(lang, key, title) {
    const card = document.createElement("div");
    card.className = "card list-editor";
    card.dataset.lang = lang;
    card.dataset.key = key;
    const h = document.createElement("h3");
    h.textContent = title;
    card.appendChild(h);

    const rows = document.createElement("div");
    rows.className = "rows";
    (config.content[lang][key] || []).forEach((val) => rows.appendChild(makeSimpleRow(val)));
    card.appendChild(rows);

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "add-row-btn";
    addBtn.textContent = "+ إضافة عنصر";
    addBtn.addEventListener("click", () => rows.appendChild(makeSimpleRow("")));
    card.appendChild(addBtn);
    return card;
  }

  function makeSimpleRow(val) {
    const row = document.createElement("div");
    row.className = "row";
    const input = document.createElement("input");
    input.type = "text";
    input.value = val;
    const del = document.createElement("button");
    del.type = "button";
    del.textContent = "×";
    del.addEventListener("click", () => row.remove());
    row.appendChild(input);
    row.appendChild(del);
    return row;
  }

  // ---------------------------------------- unified trilingual audience editor --
  function buildUnifiedAudienceEditor() {
    const wrap = document.getElementById("audienceUnifiedRows");
    wrap.innerHTML = "";

    const arList = config.content.ar.audience || [];
    const frList = config.content.fr.audience || [];
    const enList = config.content.en.audience || [];
    const count = Math.max(arList.length, frList.length, enList.length);

    for (let i = 0; i < count; i++) {
      wrap.appendChild(makeAudienceBlock(
        { title: (arList[i] && arList[i].title) || "", note: (arList[i] && arList[i].note) || "", subOptions: (arList[i] && arList[i].subOptions) || [] },
        { title: (frList[i] && frList[i].title) || "", note: (frList[i] && frList[i].note) || "", subOptions: (frList[i] && frList[i].subOptions) || [] },
        { title: (enList[i] && enList[i].title) || "", note: (enList[i] && enList[i].note) || "", subOptions: (enList[i] && enList[i].subOptions) || [] }
      ));
    }

    document.getElementById("audienceAddCategory").onclick = () => {
      wrap.appendChild(makeAudienceBlock(
        { title: "", note: "", subOptions: [] },
        { title: "", note: "", subOptions: [] },
        { title: "", note: "", subOptions: [] }
      ));
    };
  }

  function makeTrilingualRow(ar, fr, en, placeholders, partName) {
    const grid = document.createElement("div");
    grid.className = "grid3";
    [["ar", ar, placeholders[0]], ["fr", fr, placeholders[1]], ["en", en, placeholders[2]]].forEach(([code, val, ph]) => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = val;
      input.placeholder = ph;
      input.dataset.langCode = code;
      input.dataset.audPart = partName;
      grid.appendChild(input);
    });
    return grid;
  }

  function makeAudienceBlock(ar, fr, en) {
    const block = document.createElement("div");
    block.className = "aud-block";
    block.dataset.audience = "1";

    const caption = document.createElement("div");
    caption.className = "lang-caption";
    caption.innerHTML = "<span>العربية</span><span>Français</span><span>English</span>";
    block.appendChild(caption);

    const head = document.createElement("div");
    head.className = "aud-block-head";
    const titleGrid = makeTrilingualRow(ar.title, fr.title, en.title, ["اسم الفئة", "Nom de la catégorie", "Category name"], "title");
    const del = document.createElement("button");
    del.type = "button";
    del.textContent = "×";
    del.title = "حذف هذه الفئة";
    del.addEventListener("click", () => block.remove());
    head.appendChild(titleGrid);
    head.appendChild(del);
    block.appendChild(head);

    const noteRow = document.createElement("div");
    noteRow.className = "aud-note-row";
    noteRow.appendChild(makeTrilingualRow(ar.note, fr.note, en.note, ["ملاحظة (اختياري)", "Note (optionnel)", "Note (optional)"], "note"));
    block.appendChild(noteRow);

    const subLabel = document.createElement("div");
    subLabel.className = "aud-block-label";
    subLabel.textContent = "تخصصات دقيقة (اختياري) — تظهر تلقائيًا للطبيب بلغة الموقع التي يتصفحها بعد اختيار هذه الفئة:";
    block.appendChild(subLabel);

    const subList = document.createElement("div");
    subList.className = "sub-list";
    const subCount = Math.max(ar.subOptions.length, fr.subOptions.length, en.subOptions.length);
    for (let i = 0; i < subCount; i++) {
      subList.appendChild(makeSubSpecialtyRow(ar.subOptions[i] || "", fr.subOptions[i] || "", en.subOptions[i] || ""));
    }
    block.appendChild(subList);

    const addSub = document.createElement("button");
    addSub.type = "button";
    addSub.className = "sub-add-btn";
    addSub.textContent = "+ إضافة تخصص دقيق";
    addSub.addEventListener("click", () => subList.appendChild(makeSubSpecialtyRow("", "", "")));
    block.appendChild(addSub);

    return block;
  }

  function makeSubSpecialtyRow(ar, fr, en) {
    const row = document.createElement("div");
    row.className = "sub-row";
    row.appendChild(makeTrilingualRow(ar, fr, en, ["التخصص بالعربية", "Spécialité en français", "Specialty in English"], "suboption"));
    const del = document.createElement("button");
    del.type = "button";
    del.textContent = "×";
    del.addEventListener("click", () => row.remove());
    row.appendChild(del);
    return row;
  }

  function buildPairListCard(lang, key, title, label1, label2, k1, k2) {
    const card = document.createElement("div");
    card.className = "card list-editor";
    card.dataset.lang = lang;
    card.dataset.key = key;
    card.dataset.pair = k1 + "," + k2;
    const h = document.createElement("h3");
    h.textContent = title;
    card.appendChild(h);

    const rows = document.createElement("div");
    rows.className = "rows";
    (config.content[lang][key] || []).forEach((item) => rows.appendChild(makePairRow(item[k1] || "", item[k2] || "", label1, label2)));
    card.appendChild(rows);

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "add-row-btn";
    addBtn.textContent = "+ إضافة عنصر";
    addBtn.addEventListener("click", () => rows.appendChild(makePairRow("", "", label1, label2)));
    card.appendChild(addBtn);
    return card;
  }

  function makePairRow(v1, v2, ph1, ph2) {
    const row = document.createElement("div");
    row.className = "row";
    const i1 = document.createElement("input");
    i1.type = "text";
    i1.value = v1;
    i1.placeholder = ph1;
    i1.dataset.pairPart = "1";
    const i2 = document.createElement("input");
    i2.type = "text";
    i2.value = v2;
    i2.placeholder = ph2;
    i2.dataset.pairPart = "2";
    const del = document.createElement("button");
    del.type = "button";
    del.textContent = "×";
    del.addEventListener("click", () => row.remove());
    row.appendChild(i1);
    row.appendChild(i2);
    row.appendChild(del);
    return row;
  }

  function bindLangTabs(tabsId, panePrefix) {
    const tabs = document.getElementById(tabsId);
    tabs.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-lang]");
      if (!btn) return;
      tabs.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      tabs.parentElement.querySelectorAll(".lang-pane").forEach((p) => p.classList.remove("active"));
      document.getElementById(panePrefix + btn.getAttribute("data-lang")).classList.add("active");
    });
  }

  // ------------------------------------------------------------- collect --
  function collectConfig() {
    const next = getDefaultConfig();
    next.settings.whatsappNumber = document.getElementById("s_whatsapp").value.trim();
    next.settings.instagramUrl = document.getElementById("s_instagram").value.trim();
    next.settings.facebookUrl = document.getElementById("s_facebook").value.trim();
    next.settings.adminPassword = document.getElementById("s_password").value.trim() || config.settings.adminPassword;
    next.settings.defaultCountryCode = document.getElementById("s_countrycode").value.trim() || "+213";

    next.design.primaryColor = document.getElementById("d_primary").value;
    next.design.inkColor = document.getElementById("d_ink").value;
    next.design.headingFont = document.getElementById("d_headingFont").value;
    next.design.bodyFont = document.getElementById("d_bodyFont").value;
    next.design.arabicFont = document.getElementById("d_arabicFont").value;
    next.design.showHeroGraphic = document.getElementById("d_showHero").checked;
    next.design.logoDataUrl = pendingLogoDataUrl;
    next.design.iconLogoDataUrl = pendingIconDataUrl;

    LANGS.forEach((lang) => {
      CONTENT_FIELDS.forEach((f) => {
        const node = document.getElementById("c_" + lang + "_" + f.key);
        if (node) next.content[lang][f.key] = node.value;
      });

      document.querySelectorAll('#lists-pane-' + lang + ' .list-editor').forEach((card) => {
        const key = card.dataset.key;
        const rows = card.querySelectorAll(".rows .row");
        if (card.dataset.pair) {
          const parts = card.dataset.pair.split(",");
          const k1 = parts[0], k2 = parts[1];
          const arr = [];
          rows.forEach((row) => {
            const i1 = row.querySelector('[data-pair-part="1"]').value.trim();
            const i2 = row.querySelector('[data-pair-part="2"]').value.trim();
            if (i1) {
              const obj = {};
              obj[k1] = i1;
              obj[k2] = i2;
              arr.push(obj);
            }
          });
          next.content[lang][key] = arr;
        } else {
          const arr = [];
          rows.forEach((row) => {
            const val = row.querySelector("input").value.trim();
            if (val) arr.push(val);
          });
          next.content[lang][key] = arr;
        }
      });
    });

    const audienceByLang = { ar: [], fr: [], en: [] };
    document.querySelectorAll('#audienceUnifiedRows .aud-block').forEach((block) => {
      const titles = {}, notes = {};
      block.querySelectorAll(':scope > .aud-block-head [data-aud-part="title"]').forEach((inp) => {
        titles[inp.dataset.langCode] = inp.value.trim();
      });
      block.querySelectorAll(':scope > .aud-note-row [data-aud-part="note"]').forEach((inp) => {
        notes[inp.dataset.langCode] = inp.value.trim();
      });
      const subOptions = { ar: [], fr: [], en: [] };
      block.querySelectorAll('.sub-row').forEach((row) => {
        row.querySelectorAll('[data-aud-part="suboption"]').forEach((inp) => {
          const val = inp.value.trim();
          if (val) subOptions[inp.dataset.langCode].push(val);
        });
      });
      if (!titles.ar && !titles.fr && !titles.en) return; // skip fully empty block
      LANGS.forEach((lang) => {
        audienceByLang[lang].push({
          title: titles[lang] || "",
          note: notes[lang] || "",
          subOptions: subOptions[lang]
        });
      });
    });
    LANGS.forEach((lang) => { next.content[lang].audience = audienceByLang[lang]; });

    return next;
  }

  // --------------------------------------------------------------- save --
  document.getElementById("saveBtn").addEventListener("click", () => {
    config = collectConfig();
    saveSiteConfig(config);
    const note = document.getElementById("saveNote");
    note.textContent = "تم الحفظ في هذا المتصفح ✓ — لتطبيق التعديل على الموقع لكل الزوار، افتح تبويب \"النشر على GitHub\".";
    note.classList.add("ok");
    setTimeout(() => { note.textContent = ""; note.classList.remove("ok"); }, 6000);
  });

  // ------------------------------------------------------------- export --
  function buildConfigFileText(cfg) {
    return "// ============================================================================\n" +
      "// LUCINE STUDIO — site configuration (exported from the admin dashboard)\n" +
      "// Generated " + new Date().toISOString() + "\n" +
      "// Replace js/config.js with this file and push to GitHub to publish these\n" +
      "// changes for every visitor.\n" +
      "// ============================================================================\n" +
      "const DEFAULT_CONFIG = " + JSON.stringify(cfg, null, 2) + ";\n\n" +
      "function getDefaultConfig() {\n" +
      "  return JSON.parse(JSON.stringify(DEFAULT_CONFIG));\n" +
      "}\n\n" +
      "function getSiteConfig() {\n" +
      "  const base = getDefaultConfig();\n" +
      "  try {\n" +
      "    const stored = localStorage.getItem(\"lucineConfig\");\n" +
      "    if (stored) {\n" +
      "      const parsed = JSON.parse(stored);\n" +
      "      return {\n" +
      "        settings: Object.assign({}, base.settings, parsed.settings || {}),\n" +
      "        content: Object.assign({}, base.content, parsed.content || {})\n" +
      "      };\n" +
      "    }\n" +
      "  } catch (e) {\n" +
      "    console.warn(\"Could not read saved config, using defaults.\", e);\n" +
      "  }\n" +
      "  return base;\n" +
      "}\n\n" +
      "function saveSiteConfig(config) {\n" +
      "  localStorage.setItem(\"lucineConfig\", JSON.stringify(config));\n" +
      "}\n";
  }

  document.getElementById("exportBtn").addEventListener("click", () => {
    const current = collectConfig();
    const text = buildConfigFileText(current);
    const box = document.getElementById("exportBox");
    box.textContent = text;
    box.style.display = "block";
    const dl = document.getElementById("downloadBtn");
    dl.style.display = "inline-flex";
    dl.onclick = () => {
      const blob = new Blob([text], { type: "text/javascript" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "config.js";
      a.click();
    };
  });

  checkLogin();
})();
