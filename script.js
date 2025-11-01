// === KONFIGURASI NOMOR WHATSAPP ===
const nomorWhatsApp = "6285342771013";

document.addEventListener("DOMContentLoaded", () => {

  // === FORM KONTAK KE WHATSAPP ===
  const form = document.getElementById("whatsappForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Ambil value dari form
      const nama = document.getElementById("nama").value.trim();
      const email = document.getElementById("email").value.trim();
      const keluhan = document.getElementById("keluhan").value.trim();
      const pesan = document.getElementById("pesan").value.trim();

      if (!nama || !email || !keluhan || !pesan) {
        alert("Harap isi semua field terlebih dahulu!");
        return;
      }

      // Format pesan WA terstruktur
      const text = 
`Halo, ILC!
nama : ${nama}
email : ${email}
keluhan : ${keluhan}
pesan lainnya : ${pesan}`;

      // Encode agar aman di URL
      const waURL = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(text)}`;
      window.open(waURL, "_blank");

      // Reset form
      form.reset();
    });
  }

  // === FLOATING BUTTON WHATSAPP DEFAULT ===
  const waButton = document.getElementById("whatsappButton");
  if (waButton) {
    waButton.addEventListener("click", (e) => {
      e.preventDefault();
      const defaultText = encodeURIComponent("Halo, ILC! Saya tertarik dengan layanan Anda.");
      window.open(`https://wa.me/${nomorWhatsApp}?text=${defaultText}`, "_blank");
    });
  }

  // === RENDER TESTIMONI DARI LOCALSTORAGE ===
  const testiContainer = document.querySelector(".testimonial-list");
  function renderTesti() {
    if (!testiContainer) return;

    const testi = JSON.parse(localStorage.getItem("testiUser") || "[]");
    testiContainer.innerHTML = "";

    testi.forEach((t, i) => {
      const el = document.createElement("div");
      el.className = "testimonial-item";
      el.innerHTML = `<b>${t.nama}</b><p>${t.pesan}</p>`;
      testiContainer.appendChild(el);

      // Delay animasi (staggered)
      setTimeout(() => el.classList.add("fade-up"), i * 120);
    });
  }
  renderTesti();

  // === SMOOTH SCROLL UNTUK ANCHOR LINK ===
  document.querySelectorAll(".btn[href^='#']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(btn.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // === INTERSECTION OBSERVER UNTUK ANIMASI SECTION ===
  const observerOptions = { threshold: 0.15 };
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  document.querySelectorAll(".services, .about, .contact").forEach(section => {
    observer.observe(section);
  });

});
