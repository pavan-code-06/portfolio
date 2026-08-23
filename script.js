/**
 * PAVAN | DEVELOPER PORTFOLIO
 * Interactivity & UI Enhancements
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll("section[id]");
  const yearEl = document.getElementById("year");
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const copyEmailLabel = document.getElementById("copyEmailLabel");
  const emailText = document.getElementById("emailText");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");
  const toast = document.getElementById("toast");

  // 1. Set Copyright Year
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle & Click Outside Handling
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when a link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 3. ScrollSpy / Active Navigation on Scroll
  if ("IntersectionObserver" in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${currentId}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // 4. Toast Notification Utility
  let toastTimeout;
  const showToast = (message, duration = 3000) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, duration);
  };

  // 5. Copy Email to Clipboard
  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener("click", async () => {
      const email = emailText.textContent.trim();
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for non-https or unsupported contexts
          const textarea = document.createElement("textarea");
          textarea.value = email;
          textarea.style.position = "fixed";
          textarea.style.left = "-999999px";
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }

        if (copyEmailLabel) copyEmailLabel.textContent = "Copied!";
        copyEmailBtn.classList.add("btn--primary");
        copyEmailBtn.classList.remove("btn--ghost");
        showToast("Email address copied to clipboard!");

        setTimeout(() => {
          if (copyEmailLabel) copyEmailLabel.textContent = "Copy";
          copyEmailBtn.classList.remove("btn--primary");
          copyEmailBtn.classList.add("btn--ghost");
        }, 2500);
      } catch (err) {
        showToast("Unable to copy automatically. Email: " + email);
      }
    });
  }

  // 6. Interactive Contact Form Submission Handling
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("formName");
      const emailInput = document.getElementById("formEmail");
      const subjectInput = document.getElementById("formSubject");
      const messageInput = document.getElementById("formMessage");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const subject = subjectInput ? subjectInput.value.trim() : "Portfolio Inquiry";
      const message = messageInput ? messageInput.value.trim() : "";

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.textContent = "Please fill in all required fields.";
          formStatus.className = "form-status is-error";
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Opening Email Client...";
      }

      // Construct mailto link as direct mail client trigger
      const mailtoUrl = `mailto:1nt24cs090.pavan@nmit.ac.in?subject=${encodeURIComponent(
        `[Portfolio] ${subject} - from ${name}`
      )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      window.location.href = mailtoUrl;

      if (formStatus) {
        formStatus.textContent = "Message prepared in your email client! Thank you.";
        formStatus.className = "form-status is-success";
      }

      showToast("Email client opened! Feel free to send your message.");

      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            <span>Send Message</span>
          `;
        }
      }, 3000);
    });
  }
});

