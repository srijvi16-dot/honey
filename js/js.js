(() => {
  const body = document.body;
  const languageButton = document.querySelector(".language-switch");
  let currentLanguage = "bn";
  let basketCount = 0;
  let toastTimer;

  const showToast = (message) => {
    const toast = document.querySelector(".toast");
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
  };

  const setLanguage = (language) => {
    currentLanguage = language;
    body.classList.toggle("lang-en", language === "en");
    document.documentElement.lang = language;
    document.querySelectorAll(".i18n").forEach((element) => {
      const translation = element.dataset[language];
      if (translation) element.innerHTML = translation;
    });
    document.querySelector(".lang-bn").classList.toggle("active", language === "bn");
    document.querySelector(".lang-en").classList.toggle("active", language === "en");
    document.querySelector("#email").placeholder = language === "bn" ? "আপনার ইমেইল ঠিকানা" : "Your email address";
    document.title = language === "bn" ? "মৌবন — প্রকৃতির সোনালি উপহার" : "Moubon — A Golden Gift from Nature";
    document.querySelector('meta[name="description"]').content = language === "bn"
      ? "মৌবন — বাংলাদেশের প্রকৃতি থেকে সংগ্রহ করা খাঁটি, অপরিশোধিত মধু।"
      : "Moubon — pure, unprocessed honey gathered from the landscapes of Bangladesh.";
    languageButton.setAttribute("aria-label", language === "bn" ? "Switch to English" : "বাংলায় পরিবর্তন করুন");
  };

  languageButton.addEventListener("click", () => setLanguage(currentLanguage === "bn" ? "en" : "bn"));

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    navigation.classList.toggle("open", !isOpen);
  });
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
      navigation.classList.remove("open");
    });
  });

  document.querySelectorAll(".quick-add").forEach((button) => {
    button.addEventListener("click", () => {
      basketCount += 1;
      document.querySelector(".cart-count").textContent = basketCount;
      const productName = currentLanguage === "bn"
        ? button.closest(".product-card").querySelector("h3").textContent
        : button.dataset.product;
      showToast(currentLanguage === "bn" ? `${productName} ঝুড়িতে যোগ হয়েছে` : `${productName} added to your basket`);
    });
  });

  const newsletter = document.querySelector(".newsletter-form");
  newsletter.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.querySelector("#email");
    if (!email.checkValidity()) {
      email.reportValidity();
      return;
    }
    document.querySelector(".newsletter-status").textContent = currentLanguage === "bn"
      ? "এটি ডেমো ফর্ম—ইমেইল সাবস্ক্রিপশন সার্ভিস এখনো যুক্ত করা হয়নি।"
      : "Demo form only — an email subscription service is not connected yet.";
  });

  const progressBar = document.querySelector(".scroll-progress");
  const updateScrollProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  };
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    body.classList.add("has-js");
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
  }
})();
