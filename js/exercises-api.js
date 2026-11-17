(function () {
  "use strict";
  const container = document.getElementById("exerciseResults");
  if (!container) return;

  const API_URL = "https://wger.de/api/v2/exerciseinfo/?format=json&limit=70";
  const status = document.getElementById("exerciseStatus");
  const search = document.getElementById("exerciseSearch");
  const category = document.getElementById("exerciseCategory");
  const refresh = document.getElementById("refreshExercises");
  let exercises = [];
  let loading = false;

  const categoryNames = {
    8: "Arms", 9: "Legs", 10: "Abs", 11: "Chest",
    12: "Back", 13: "Shoulders", 14: "Calves", 15: "Cardio"
  };

  function plainText(html) {
    return String(html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }

  function normalizeExercise(item) {
    const translations = Array.isArray(item.translations) ? item.translations : [];
    const english = translations.find(function (t) {
      return Number(t.language) === 2 && t.name;
    });
    const fallback = translations.find(function (t) { return t && t.name; });
    const chosen = english || fallback;
    const title = (chosen && chosen.name) || item.name || "";
    if (!title) return null;

    const categoryValue = item.category;
    const categoryLabel = categoryValue && typeof categoryValue === "object"
      ? (categoryValue.name || "Workout")
      : (categoryNames[Number(categoryValue)] || "Workout");

    return {
      name: String(title),
      category: String(categoryLabel),
      description: plainText(chosen && chosen.description) || "Detailed instructions are not available for this exercise."
    };
  }

  function render() {
    const query = search.value.toLowerCase().trim();
    const currentCategory = category.value;
    const visible = exercises.filter(function (exercise) {
      const text = (exercise.name + " " + exercise.description).toLowerCase();
      return text.includes(query) &&
        (currentCategory === "all" || exercise.category === currentCategory);
    });

    container.replaceChildren();
    if (!visible.length) {
      const message = document.createElement("p");
      message.className = "empty-state";
      message.textContent = exercises.length ? "No matching exercises. Try another search or category." : "No exercise data available.";
      container.appendChild(message);
    } else {
      visible.slice(0, 24).forEach(function (exercise) {
        const card = document.createElement("article");
        card.className = "exercise-card";
        const tag = document.createElement("span");
        tag.className = "category-label";
        tag.textContent = exercise.category;
        const title = document.createElement("h3");
        title.textContent = exercise.name;
        const details = document.createElement("p");
        details.textContent = exercise.description.length > 210
          ? exercise.description.slice(0, 210) + "…"
          : exercise.description;
        card.append(tag, title, details);
        container.appendChild(card);
      });
    }
    status.textContent = "Showing " + Math.min(visible.length, 24) +
      " of " + exercises.length + " loaded exercises." +
      (visible.length > 24 ? " Narrow your search to find more." : "");
  }

  function populateCategories() {
    const previous = category.value;
    category.replaceChildren();
    const all = new Option("All categories", "all");
    category.add(all);
    [...new Set(exercises.map(function (exercise) { return exercise.category; }))]
      .sort().forEach(function (name) { category.add(new Option(name, name)); });
    if ([...category.options].some(function (option) { return option.value === previous; })) {
      category.value = previous;
    }
  }

  async function loadExercises() {
    if (loading) return;
    loading = true;
    refresh.disabled = true;
    status.textContent = "Loading exercises from wger API...";
    container.replaceChildren();
    try {
      const response = await fetch(API_URL, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();
      if (!data || !Array.isArray(data.results)) throw new Error("Unexpected API response format");
      exercises = data.results.map(normalizeExercise).filter(Boolean);
      if (!exercises.length) throw new Error("No exercises returned by the API");
      populateCategories();
      render();
    } catch (error) {
      exercises = [];
      category.replaceChildren(new Option("All categories", "all"));
      status.textContent = "Could not load exercises: " + error.message + ". Check your connection or click Refresh from API.";
      const notice = document.createElement("p");
      notice.className = "empty-state";
      notice.textContent = "The external API is temporarily unavailable. Your regular IRONFIT programs above still work.";
      container.appendChild(notice);
    } finally {
      loading = false;
      refresh.disabled = false;
    }
  }

  search.addEventListener("input", render);
  category.addEventListener("change", render);
  refresh.addEventListener("click", loadExercises);
  loadExercises();
})();
