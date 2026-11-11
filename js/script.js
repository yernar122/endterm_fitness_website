(function () {
  "use strict";


  function getElement(id) {
    return document.getElementById(id);
  }

  function escapeHTML(value) {
    const characters = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return String(value).replace(/[&<>"']/g, function (character) {
      return characters[character];
    });
  }

  function readStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;

    const button = getElement("themeToggle");
    if (!button) return;

    const isLight = theme === "light";
    button.textContent = isLight ? "☾ Dark" : "☀ Light";
    button.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );
  }

  const savedTheme = readStorage("ironfit-theme");
  applyTheme(savedTheme === "light" ? "light" : "dark");

  const themeButton = getElement("themeToggle");
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      const currentTheme = document.documentElement.dataset.theme;
      const nextTheme = currentTheme === "light" ? "dark" : "light";

      applyTheme(nextTheme);
      writeStorage("ironfit-theme", nextTheme);
    });
  }


  const searchInput = getElement("programSearch");

  if (searchInput) {
    let selectedCategory = "all";
    const programCards = document.querySelectorAll(".program-item");
    const filterButtons = document.querySelectorAll(".filter-btn");

    function filterPrograms() {
      const searchText = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;

      programCards.forEach(function (card) {
        const cardCategory = card.dataset.category;
        const cardText = card.textContent.toLowerCase();

        const categoryMatches =
          selectedCategory === "all" || cardCategory === selectedCategory;
        const textMatches = cardText.includes(searchText);

        card.hidden = !(categoryMatches && textMatches);

        if (!card.hidden) visibleCount++;
      });

      getElement("noPrograms").hidden = visibleCount !== 0;
      getElement("programCount").textContent =
        `Showing ${visibleCount} program${visibleCount === 1 ? "" : "s"}`;
    }

    searchInput.addEventListener("input", filterPrograms);

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        selectedCategory = button.dataset.filter;

        filterButtons.forEach(function (otherButton) {
          const isSelected = otherButton === button;
          otherButton.classList.toggle("selected", isSelected);
          otherButton.setAttribute("aria-pressed", String(isSelected));
        });

        filterPrograms();
      });
    });

    filterPrograms();
  }


  const registrationForm = getElement("registrationForm");

  if (registrationForm) {
    const fieldIds = ["name", "email", "password", "confirmPassword", "message"];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function passwordStrength(password) {
      if (!password) return 0;

      let score = 0;
      if (password.length >= 8) score++;
      if (password.length >= 12) score++;
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
      if (/\d/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;

      if (score <= 2) return 1; 
      if (score <= 3) return 2; 
      return 3;                
    }

    function validateField(fieldId) {
      const input = getElement(fieldId);
      const value = input.value.trim();
      let errorMessage = "";
      let successMessage = "Looks good ✓";

      if (fieldId === "name" && value.length < 2) {
        errorMessage = "Please enter your full name (at least 2 characters).";
      }

      if (fieldId === "email" && !emailPattern.test(value)) {
        errorMessage = "Please enter a valid email address.";
      }

      if (fieldId === "message" && !value) {
        errorMessage = "Please write a message.";
      }

      if (fieldId === "password") {
        const strength = passwordStrength(input.value);
        const bar = getElement("passwordBar");
        const colors = ["", "#e24c4c", "#ffb442", "#32bc7b"];

        bar.style.width = strength === 0 ? "0%" : `${strength * 33.34}%`;
        bar.style.background = colors[strength];

        if (!input.value) {
          errorMessage = "Password is required.";
        } else if (input.value.length < 8) {
          errorMessage = "Use at least 8 characters.";
        } else if (strength === 1) {
          errorMessage = "Weak password — add uppercase, numbers and symbols.";
        } else {
          successMessage = `${strength === 2 ? "Medium" : "Strong"} password ✓`;
        }
      }

      if (fieldId === "confirmPassword") {
        if (!input.value) {
          errorMessage = "Please confirm your password.";
        } else if (input.value !== getElement("password").value) {
          errorMessage = "Passwords do not match.";
        }
      }

      const hasError = Boolean(errorMessage);
      input.classList.toggle("is-invalid", hasError);
      input.classList.toggle("is-valid", !hasError && Boolean(value));

      const feedback = getElement(`${fieldId}Feedback`);
      feedback.textContent = errorMessage || (value ? successMessage : "");
      feedback.className =
        "field-feedback " + (hasError ? "error" : value ? "success" : "");

      return !hasError;
    }

    fieldIds.forEach(function (fieldId) {
      getElement(fieldId).addEventListener("input", function () {
        validateField(fieldId);

        if (fieldId === "password" && getElement("confirmPassword").value) {
          validateField("confirmPassword");
        }
      });
    });

    const requestedPlan = new URLSearchParams(location.search).get("plan");
    const validPlans = ["basic", "standard", "premium"];

    if (requestedPlan && validPlans.includes(requestedPlan.toLowerCase())) {
      getElement("plan").value =
        requestedPlan.charAt(0).toUpperCase() + requestedPlan.slice(1).toLowerCase();
    }

    registrationForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let allValid = true;
      fieldIds.forEach(function (fieldId) {
        if (!validateField(fieldId)) allValid = false;
      });

      const status = getElement("registrationStatus");

      if (!allValid) {
        status.className = "alert-inline error mt-3";
        status.textContent = "Please correct the highlighted fields before submitting.";

        const firstInvalid = fieldIds.find(function (fieldId) {
          return getElement(fieldId).classList.contains("is-invalid");
        });
        if (firstInvalid) getElement(firstInvalid).focus();
        return;
      }

      status.className = "alert-inline success mt-3";
      status.textContent =
        "Validation successful! This is a demonstration form; " +
        "no registration was sent to a server.";

      registrationForm.reset();
      fieldIds.forEach(function (fieldId) {
        getElement(fieldId).classList.remove("is-valid", "is-invalid");
        getElement(`${fieldId}Feedback`).textContent = "";
      });
      getElement("passwordBar").style.width = "0%";
    });
  }


  const memberForm = getElement("memberForm");

  if (memberForm) {
    const storageKey = "ironfit-demo-members-v1";
    const defaultMembers = [
      { id: "sample-1", name: "Alex Morgan", email: "alex@example.com", plan: "Basic" },
      { id: "sample-2", name: "Sam Taylor", email: "sam@example.com", plan: "Standard" },
      { id: "sample-3", name: "Jordan Lee", email: "jordan@example.com", plan: "Premium" }
    ];

    let members = defaultMembers;

    try {
      const stored = readStorage(storageKey);
      const parsed = stored === null ? defaultMembers : JSON.parse(stored);
      members = Array.isArray(parsed) ? parsed : defaultMembers;
    } catch (error) {
      members = defaultMembers;
    }

    function showMemberMessage(message) {
      getElement("memberFeedback").textContent = message;
    }

    function saveMembers() {
      if (!writeStorage(storageKey, JSON.stringify(members))) {
        showMemberMessage("Browser storage unavailable. Changes last only until you refresh.");
      }
    }

  
    function renderMembers() {
      const tbody = getElement("memberRows");

      if (members.length === 0) {
        tbody.innerHTML =
          '<tr><td colspan="4">No members yet. Add one using the form above.</td></tr>';
        return;
      }

      tbody.innerHTML = members.map(function (member) {
        return `
          <tr>
            <td>${escapeHTML(member.name)}</td>
            <td>${escapeHTML(member.email)}</td>
            <td>${escapeHTML(member.plan)}</td>
            <td>
              <button type="button" class="table-action"
                      data-action="edit" data-id="${escapeHTML(member.id)}">
                Edit
              </button>
              <button type="button" class="table-action danger"
                      data-action="delete" data-id="${escapeHTML(member.id)}">
                Delete
              </button>
            </td>
          </tr>
        `;
      }).join("");
    }

    function resetMemberForm() {
      memberForm.reset();
      getElement("memberId").value = "";
      getElement("memberSubmit").textContent = "Add member";
      getElement("memberCancel").hidden = true;
    }

    memberForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = getElement("memberName").value.trim();
      const email = getElement("memberEmail").value.trim();
      const plan = getElement("memberPlan").value;
      const editId = getElement("memberId").value;

      if (name.length < 2) {
        showMemberMessage("Enter a name of at least 2 characters.");
        getElement("memberName").focus();
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMemberMessage("Enter a valid email address.");
        getElement("memberEmail").focus();
        return;
      }

      if (editId) {
        const member = members.find(function (item) {
          return item.id === editId;
        });

        if (!member) {
          showMemberMessage("Record not found.");
          return;
        }

        Object.assign(member, { name: name, email: email, plan: plan });
        showMemberMessage("Member updated.");
      } else {
        const newId =
          (globalThis.crypto && globalThis.crypto.randomUUID && globalThis.crypto.randomUUID()) ||
          `${Date.now()}-${Math.random().toString(36).slice(2)}`;

        members.push({ id: newId, name: name, email: email, plan: plan });
        showMemberMessage("Member added.");
      }

      saveMembers();
      renderMembers();
      resetMemberForm();
    });

    // UPDATE / DELETE buttons use event delegation on the table.
    getElement("memberRows").addEventListener("click", function (event) {
      const button = event.target.closest("button[data-action]");
      if (!button) return;

      const member = members.find(function (item) {
        return item.id === button.dataset.id;
      });
      if (!member) return;

      if (button.dataset.action === "delete") {
        const confirmed = confirm(`Delete ${member.name}? This action cannot be undone.`);
        if (!confirmed) return;

        members = members.filter(function (item) {
          return item.id !== member.id;
        });

        saveMembers();
        renderMembers();
        showMemberMessage("Member deleted.");

        if (getElement("memberId").value === member.id) resetMemberForm();
      } else {
        getElement("memberId").value = member.id;
        getElement("memberName").value = member.name;
        getElement("memberEmail").value = member.email;
        getElement("memberPlan").value = member.plan;
        getElement("memberSubmit").textContent = "Save changes";
        getElement("memberCancel").hidden = false;

        showMemberMessage(`Editing ${member.name}`);
        getElement("memberName").focus();
        memberForm.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    getElement("memberCancel").addEventListener("click", function () {
      resetMemberForm();
      showMemberMessage("Edit cancelled.");
    });

    renderMembers();
  }


  const galleryItems = document.querySelectorAll(".gallery-item");

  if (galleryItems.length > 0) {
    const lightbox = getElement("lightbox");
    const image = getElement("lightboxImage");
    const caption = getElement("lightboxCaption");

    let currentIndex = 0;
    let previousFocus = null;

    function changeGalleryImage(index) {
      currentIndex = (index + galleryItems.length) % galleryItems.length;

      const item = galleryItems[currentIndex];
      const sourceImage = item.querySelector("img");
      const label = item.querySelector("span");

      function showImage() {
        image.src = sourceImage.currentSrc || sourceImage.src;
        image.alt = sourceImage.alt;
        caption.textContent = label.textContent.replace("↗", "").trim();
      }

      if (window.jQuery) {
        window.jQuery(image).stop(true, true).fadeOut(130, function () {
          showImage();
          window.jQuery(image).fadeIn(210);
        });
      } else {
        showImage();
      }
    }

    function openLightbox(index) {
      previousFocus = document.activeElement;
      changeGalleryImage(index);
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      if (window.jQuery) {
        window.jQuery(lightbox).css("display", "flex").hide().fadeIn(250);
      } else {
        lightbox.style.display = "flex";
      }

      getElement("lightboxClose").focus();
    }

    function closeLightbox() {
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";

      if (window.jQuery) {
        window.jQuery(lightbox).stop(true, true).fadeOut(220);
      } else {
        lightbox.style.display = "none";
      }

      if (previousFocus) previousFocus.focus();
    }

    galleryItems.forEach(function (item, index) {
      item.addEventListener("click", function () {
        openLightbox(index);
      });
    });

    getElement("lightboxClose").addEventListener("click", closeLightbox);
    getElement("lightboxPrev").addEventListener("click", function () {
      changeGalleryImage(currentIndex - 1);
    });
    getElement("lightboxNext").addEventListener("click", function () {
      changeGalleryImage(currentIndex + 1);
    });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (event) {
      if (lightbox.getAttribute("aria-hidden") === "true") return;

      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowRight") {
        changeGalleryImage(currentIndex + 1);
      } else if (event.key === "ArrowLeft") {
        changeGalleryImage(currentIndex - 1);
      } else if (event.key === "Tab") {
        const controls = [
          getElement("lightboxClose"),
          getElement("lightboxPrev"),
          getElement("lightboxNext")
        ];
        const focusedIndex = controls.indexOf(document.activeElement);

        if (event.shiftKey && focusedIndex === 0) {
          event.preventDefault();
          controls[2].focus();
        } else if (!event.shiftKey && focusedIndex === 2) {
          event.preventDefault();
          controls[0].focus();
        }
      }
    });
  }
})();
