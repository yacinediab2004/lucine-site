// ============================================================================
// LUCINE STUDIO — default site configuration
// ----------------------------------------------------------------------------
// This is the file the admin dashboard edits. Changes made in /admin.html are
// saved to the visitor's browser (localStorage) immediately, and can also be
// exported from the dashboard as a replacement for THIS file — overwrite
// js/config.js with the export and push to GitHub to make the change
// permanent and visible to every visitor.
// ============================================================================
const DEFAULT_CONFIG = {

  settings: {
    // Digits only, international format, no "+" (example: Algeria = 213...)
    whatsappNumber: "213555000000",
    instagramUrl: "https://instagram.com/lucine.studio",
    facebookUrl: "https://facebook.com/lucine.studio",
    // Plain-text password checked client-side by admin.html.
    // This is convenience protection only — see the note in admin.html.
    adminPassword: "lucine2026",
    // Pre-filled in the doctor request form's phone field (e.g. "+213").
    defaultCountryCode: "+213"
  },

  // Visual identity — all editable from the admin dashboard's "Design" tab.
  design: {
    primaryColor: "#17ABE0",
    inkColor: "#0A1A20",
    // Any of these must match an entry in FONT_PRESETS (see admin.js / main.js).
    headingFont: "Poppins",
    bodyFont: "Inter",
    arabicFont: "Cairo",
    // Base64 data URL. Empty string = use the bundled assets/logo-full.png.
    logoDataUrl: "",
    // Base64 data URL for the small icon mark. Empty = assets/logo-icon.png.
    iconLogoDataUrl: "",
    showHeroGraphic: true
  },

  content: {

    ar: {
      hero_title: "من هي Lucine ولماذا تأسست؟",
      hero_lead: "استوديو إنتاج بصري متخصص حصريًا في القطاع الطبي، يقدّم خدماته للأطباء والعيادات والمؤسسات الصحية.",
      about_title: "هوية المؤسسة",
      about_body: "في زمن أصبحت فيه الصورة الرقمية أول نقطة تواصل بين المريض والمؤسسة الصحية، لا تزال مؤسسات طبية كثيرة تعاني من ضعف في إيصال خبرتها وقيمها إلى المجتمع. لم تُؤسَّس Lucine لصناعة فيديوهات فحسب، بل لتكون الجسر الذي يربط بين المعرفة الطبية والتواصل البصري الاحترافي، بما يحترم أخلاقيات المهنة ويعكس القيمة الحقيقية للمؤسسات الصحية.",
      problem_items: [
        "ضعف التواصل الرقمي للمؤسسات الصحية",
        "صعوبة تبسيط المعلومات الطبية للجمهور",
        "غياب المحتوى الاحترافي المتخصص في المجال الطبي",
        "الحاجة إلى حضور رقمي يحترم أخلاقيات المهنة"
      ],
      solution_intro: "وكالة إبداعية متخصصة في القطاع الطبي تقدّم:",
      solution_items: [
        "صناعة المحتوى الطبي",
        "الهوية البصرية والبراندينغ",
        "التغطية الإعلامية للفعاليات الطبية",
        "الاستراتيجية الرقمية للمؤسسات الصحية"
      ],
      services: [
        { title: "صناعة المحتوى الطبي", desc: "فيديوهات وصور احترافية تشرح الخدمات الطبية بلغة تصل للمريض دون الإخلال بالدقة العلمية." },
        { title: "الهوية البصرية والبراندينغ", desc: "بناء هوية بصرية متكاملة تعكس مصداقية وثقة المؤسسة الصحية." },
        { title: "التغطية الإعلامية للفعاليات", desc: "تغطية احترافية للمؤتمرات وورشات العمل والفعاليات الطبية." },
        { title: "الاستراتيجية الرقمية", desc: "خطط محتوى ونشر مدروسة تناسب طبيعة القطاع الطبي وجمهوره." }
      ],
      audience: [
        { title: "أطباء الأسنان", note: "", subOptions: [] },
        { title: "الأطباء بمختلف التخصصات", note: "", subOptions: [
          "طب عام", "طب باطني", "جراحة عامة", "أمراض نسائية وتوليد", "طب الأطفال",
          "طب العيون", "أنف وأذن وحنجرة", "الأمراض الجلدية", "جراحة العظام",
          "أمراض القلب والشرايين", "طب الأعصاب", "المسالك البولية",
          "الأشعة والتصوير الطبي", "التخدير والإنعاش", "الطب النفسي", "الأورام",
          "الغدد الصماء والسكري", "أمراض الكلى", "أمراض الجهاز التنفسي"
        ] },
        { title: "الصيدليات", note: "", subOptions: [] },
        { title: "العيادات والمصحات", note: "", subOptions: [] },
        { title: "المخابر الطبية", note: "", subOptions: [] },
        { title: "مراكز الأشعة والعلاج الطبيعي", note: "مرحلة لاحقة", subOptions: [] }
      ],
      form_title: "انضم كطبيب شريك",
      form_lead: "املأ معلوماتك وسنتواصل معك مباشرة عبر واتساب لمناقشة تفاصيل التعاون."
    },

    fr: {
      hero_title: "Qui est Lucine et pourquoi a-t-elle été créée ?",
      hero_lead: "Studio de production visuelle dédié exclusivement au secteur médical, au service des médecins, cliniques et établissements de santé.",
      about_title: "Identité de la structure",
      about_body: "À l'heure où l'image numérique est devenue le premier point de contact entre le patient et l'établissement de santé, de nombreuses structures médicales peinent encore à communiquer leur expertise et leurs valeurs. Lucine n'a pas été créée pour produire de simples vidéos, mais pour être le pont entre l'expertise médicale et une communication visuelle professionnelle, respectueuse de l'éthique du métier et fidèle à la vraie valeur des établissements de santé.",
      problem_items: [
        "Faible communication numérique des établissements de santé",
        "Difficulté à vulgariser l'information médicale pour le public",
        "Absence de contenu professionnel spécialisé dans le domaine médical",
        "Besoin d'une présence numérique respectueuse de l'éthique médicale"
      ],
      solution_intro: "Une agence créative spécialisée dans le secteur médical, proposant :",
      solution_items: [
        "Production de contenu médical",
        "Identité visuelle et branding",
        "Couverture médiatique des événements médicaux",
        "Stratégie digitale pour les établissements de santé"
      ],
      services: [
        { title: "Production de contenu médical", desc: "Vidéos et visuels professionnels qui expliquent vos services avec clarté, sans jamais sacrifier la rigueur scientifique." },
        { title: "Identité visuelle & branding", desc: "Une identité visuelle cohérente qui reflète la crédibilité et la confiance de votre établissement." },
        { title: "Couverture d'événements", desc: "Couverture professionnelle des conférences, ateliers et événements médicaux." },
        { title: "Stratégie digitale", desc: "Des plans de contenu et de publication pensés pour le secteur médical et son public." }
      ],
      audience: [
        { title: "Dentistes", note: "", subOptions: [] },
        { title: "Médecins, toutes spécialités", note: "", subOptions: [
          "Médecine générale", "Médecine interne", "Chirurgie générale",
          "Gynécologie-obstétrique", "Pédiatrie", "Ophtalmologie",
          "ORL (Oto-rhino-laryngologie)", "Dermatologie", "Chirurgie orthopédique",
          "Cardiologie", "Neurologie", "Urologie", "Radiologie et imagerie médicale",
          "Anesthésie-réanimation", "Psychiatrie", "Oncologie",
          "Endocrinologie et diabétologie", "Néphrologie", "Pneumologie"
        ] },
        { title: "Pharmacies", note: "", subOptions: [] },
        { title: "Cliniques et polycliniques", note: "", subOptions: [] },
        { title: "Laboratoires médicaux", note: "", subOptions: [] },
        { title: "Centres d'imagerie et de kinésithérapie", note: "prochainement", subOptions: [] }
      ],
      form_title: "Devenir médecin partenaire",
      form_lead: "Remplissez vos informations, nous vous contacterons directement sur WhatsApp pour discuter de la collaboration."
    },

    en: {
      hero_title: "Who is Lucine, and why was it founded?",
      hero_lead: "A visual production studio dedicated exclusively to the medical field, serving doctors, clinics and healthcare organizations.",
      about_title: "About the studio",
      about_body: "At a time when digital imagery has become the first point of contact between a patient and a healthcare provider, many medical institutions still struggle to communicate their expertise and values. Lucine wasn't founded just to produce videos — it exists to bridge medical expertise with professional visual communication, one that respects the ethics of the profession and reflects the real value of healthcare institutions.",
      problem_items: [
        "Weak digital communication from healthcare institutions",
        "Difficulty simplifying medical information for the public",
        "Lack of professional content specialized in the medical field",
        "The need for a digital presence that respects medical ethics"
      ],
      solution_intro: "A creative agency specialized in the medical sector, offering:",
      solution_items: [
        "Medical content production",
        "Visual identity and branding",
        "Media coverage for medical events",
        "Digital strategy for healthcare institutions"
      ],
      services: [
        { title: "Medical content production", desc: "Professional video and photo content that explains your services clearly, without ever compromising scientific accuracy." },
        { title: "Visual identity & branding", desc: "A cohesive visual identity that reflects the credibility and trust of your institution." },
        { title: "Event coverage", desc: "Professional coverage of medical conferences, workshops and events." },
        { title: "Digital strategy", desc: "Content and publishing plans tailored to the medical sector and its audience." }
      ],
      audience: [
        { title: "Dentists", note: "", subOptions: [] },
        { title: "Doctors, all specialties", note: "", subOptions: [
          "General medicine", "Internal medicine", "General surgery",
          "Obstetrics & gynecology", "Pediatrics", "Ophthalmology",
          "ENT (Otolaryngology)", "Dermatology", "Orthopedic surgery",
          "Cardiology", "Neurology", "Urology", "Radiology & medical imaging",
          "Anesthesiology & critical care", "Psychiatry", "Oncology",
          "Endocrinology & diabetes", "Nephrology", "Pulmonology"
        ] },
        { title: "Pharmacies", note: "", subOptions: [] },
        { title: "Clinics & medical centers", note: "", subOptions: [] },
        { title: "Medical laboratories", note: "", subOptions: [] },
        { title: "Imaging & physiotherapy centers", note: "coming soon", subOptions: [] }
      ],
      form_title: "Join as a partner doctor",
      form_lead: "Fill in your details and we'll reach out directly on WhatsApp to discuss the collaboration."
    }
  }
};

// Deep-clone default so runtime edits never mutate this constant.
function getDefaultConfig() {
  return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
}

// Reads the effective config: localStorage override merged over the default.
function getSiteConfig() {
  const base = getDefaultConfig();
  try {
    const stored = localStorage.getItem("lucineConfig");
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        settings: Object.assign({}, base.settings, parsed.settings || {}),
        design: Object.assign({}, base.design, parsed.design || {}),
        content: Object.assign({}, base.content, parsed.content || {})
      };
    }
  } catch (e) {
    console.warn("Could not read saved config, using defaults.", e);
  }
  return base;
}

function saveSiteConfig(config) {
  localStorage.setItem("lucineConfig", JSON.stringify(config));
}
