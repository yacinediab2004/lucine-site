// Font choices offered in the admin "Design" tab. `google` is the family
// name as used in the Google Fonts URL; `css` is the CSS font-family value.
const FONT_PRESETS = {
  heading: [
    { name: "Poppins", google: "Poppins:wght@400;500;600;700", css: "'Poppins', sans-serif" },
    { name: "Montserrat", google: "Montserrat:wght@400;500;600;700", css: "'Montserrat', sans-serif" },
    { name: "Playfair Display", google: "Playfair+Display:wght@500;600;700", css: "'Playfair Display', serif" },
    { name: "Sora", google: "Sora:wght@400;500;600;700", css: "'Sora', sans-serif" },
    { name: "Space Grotesk", google: "Space+Grotesk:wght@400;500;600;700", css: "'Space Grotesk', sans-serif" }
  ],
  body: [
    { name: "Inter", google: "Inter:wght@400;500;600", css: "'Inter', sans-serif" },
    { name: "Roboto", google: "Roboto:wght@400;500;600", css: "'Roboto', sans-serif" },
    { name: "Work Sans", google: "Work+Sans:wght@400;500;600", css: "'Work Sans', sans-serif" },
    { name: "Nunito Sans", google: "Nunito+Sans:wght@400;600", css: "'Nunito Sans', sans-serif" }
  ],
  arabic: [
    { name: "Cairo", google: "Cairo:wght@400;600;700", css: "'Cairo', sans-serif" },
    { name: "Tajawal", google: "Tajawal:wght@400;500;700", css: "'Tajawal', sans-serif" },
    { name: "Almarai", google: "Almarai:wght@400;700", css: "'Almarai', sans-serif" },
    { name: "IBM Plex Sans Arabic", google: "IBM+Plex+Sans+Arabic:wght@400;600", css: "'IBM Plex Sans Arabic', sans-serif" },
    { name: "Noto Kufi Arabic", google: "Noto+Kufi+Arabic:wght@400;600;700", css: "'Noto Kufi Arabic', sans-serif" }
  ]
};

// Fixed interface strings (navigation, buttons, form labels, footer).
// Editorial content (hero/about/services/audience text) lives in config.js
// and is editable from the admin dashboard.
const UI_STRINGS = {
  ar: {
    dir: "rtl",
    nav_about: "من نحن",
    nav_services: "خدماتنا",
    nav_audience: "لمن نعمل",
    nav_form: "انضم كطبيب شريك",
    hero_cta_primary: "قدّم طلبك الآن",
    hero_cta_secondary: "تعرف على خدماتنا",
    problem_label: "المشكلة",
    solution_label: "الحل",
    services_tag: "خدماتنا",
    audience_tag: "لمن نعمل؟",
    form_tag: "انضم إلينا",
    form_name: "الاسم واللقب",
    form_phone: "رقم الهاتف",
    form_domain: "التخصص / المجال",
    form_domain_placeholder: "اختر المجال",
    form_specialty: "التخصص الدقيق",
    form_specialty_placeholder: "اختر التخصص",
    form_clinic: "اسم العيادة / المؤسسة",
    form_city: "الولاية",
    form_city_placeholder: "اختر الولاية",
    form_message: "معلومات إضافية (اختياري)",
    form_submit: "إرسال الطلب عبر واتساب",
    form_note: "بمجرد الضغط على إرسال، سيتم فتح واتساب برسالة جاهزة تحتوي على معلوماتك — يكفي أن تضغط إرسال لإتمام الطلب.",
    toast_ok: "جاري تحويلك إلى واتساب...",
    toast_err: "الرجاء تعبئة الاسم ورقم الهاتف على الأقل.",
    footer_rights: "جميع الحقوق محفوظة."
  },
  fr: {
    dir: "ltr",
    nav_about: "À propos",
    nav_services: "Services",
    nav_audience: "Nos clients",
    nav_form: "Devenir partenaire",
    hero_cta_primary: "Envoyer ma demande",
    hero_cta_secondary: "Découvrir nos services",
    problem_label: "Le problème",
    solution_label: "La solution",
    services_tag: "Nos services",
    audience_tag: "Pour qui ?",
    form_tag: "Nous rejoindre",
    form_name: "Nom et prénom",
    form_phone: "Numéro de téléphone",
    form_domain: "Spécialité / domaine",
    form_domain_placeholder: "Choisir un domaine",
    form_specialty: "Spécialité précise",
    form_specialty_placeholder: "Choisir une spécialité",
    form_clinic: "Nom de la clinique / structure",
    form_city: "Wilaya",
    form_city_placeholder: "Choisir la wilaya",
    form_message: "Informations complémentaires (optionnel)",
    form_submit: "Envoyer la demande via WhatsApp",
    form_note: "Après l'envoi, WhatsApp s'ouvrira avec un message pré-rempli contenant vos informations — il suffit d'appuyer sur envoyer pour finaliser.",
    toast_ok: "Redirection vers WhatsApp...",
    toast_err: "Merci de renseigner au moins le nom et le téléphone.",
    footer_rights: "Tous droits réservés."
  },
  en: {
    dir: "ltr",
    nav_about: "About",
    nav_services: "Services",
    nav_audience: "Who we work with",
    nav_form: "Join as a partner",
    hero_cta_primary: "Send your request",
    hero_cta_secondary: "See our services",
    problem_label: "The problem",
    solution_label: "The solution",
    services_tag: "Our services",
    audience_tag: "Who we work with",
    form_tag: "Join us",
    form_name: "Full name",
    form_phone: "Phone number",
    form_domain: "Specialty / field",
    form_domain_placeholder: "Select a field",
    form_specialty: "Exact specialty",
    form_specialty_placeholder: "Select a specialty",
    form_clinic: "Clinic / organization name",
    form_city: "Province",
    form_city_placeholder: "Select a province",
    form_message: "Additional information (optional)",
    form_submit: "Send request via WhatsApp",
    form_note: "After you submit, WhatsApp opens with a pre-filled message containing your details — just tap send to complete the request.",
    toast_ok: "Redirecting you to WhatsApp...",
    toast_err: "Please fill in at least your name and phone number.",
    footer_rights: "All rights reserved."
  }
};
