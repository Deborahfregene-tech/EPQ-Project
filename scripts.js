document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generate-btn");
  const userInput = document.getElementById("user-input");
  const outputArea = document.getElementById("gen-ui-output");

  const IMAGE_OUTPUTS = {
    // Quote Analysis
    "quote breakdown: shylock": "images/shylock-quotes.png",
    "quotes: macbeth ambition & guilt": "images/macbeth-ambition-quotes.png",
    "quote sheet: eva smith": "images/eva-smith-quotes.png",

    // Character Analysis
    "character mindmap: scrooge": "images/scrooge-mindmap.png",
    "character analysis: the creature": "images/creature-analysis.png",
    "shylock vs antonio comparison": "images/shylock-antonio-comparison.png",
    "character profile: lady macbeth": "images/lady-macbeth-profile.png",

    // Plot Breakdowns
    "plot breakdown: 7 commandments": "images/animal-farm-7-commandments.png",
    "plot summary: a christmas carol": "images/christmas-carol-plot.png",

    // Theme Maps
    "theme map: frankenstein science vs nature":
      "images/frankenstein-science-nature.png",
    "theme map: inspector calls responsibility":
      "images/inspector-calls-responsibility.png",
    "theme map: animal farm power & corruption":
      "images/animal-farm-power-corruption.png",

    // Revision Resources: Essays & Timetables
    "essay outline: an inspector calls": "images/inspector-calls-essay.png",
    "essay plan: macbeth supernatural": "images/macbeth-supernatural-essay.png",
    "essay plan: merchant of venice prejudice":
      "images/merchant-of-venice-prejudice-essay.png",
    "revision timetable: macbeth & christmas carol":
      "images/macbeth-christmas-timetable.png",
  };

  generateBtn.addEventListener("click", (event) => {
    event.preventDefault();

    // Clean up input: convert to lowercase and normalize quotes/spaces
    const query = userInput.value.trim().toLowerCase().replace(/[‘’]/g, "'");

    let imageSrc = "";

    if (query === "quote breakdown: shylock") {
      imageSrc = "images/shylock-quotes.png";
    } else if (query === "quotes: macbeth ambition & guilt") {
      imageSrc = "images/macbeth-ambition-quotes.png";
    } else if (query === "quote sheet: eva smith") {
      imageSrc = "images/eva-smith-quotes.png";

      // --- Character Analysis ---
    } else if (query === "character mindmap: scrooge") {
      imageSrc = "images/scrooge-mindmap.png";
    } else if (query === "character analysis: the creature") {
      imageSrc = "images/creature-analysis.png";
    } else if (query === "shylock vs antonio comparison") {
      imageSrc = "images/shylock-antonio-comparison.png";
    } else if (query === "character profile: lady macbeth") {
      imageSrc = "images/lady-macbeth-profile.png";

      // --- Plot Breakdowns ---
    } else if (query === "plot timeline: hamlet") {
      imageSrc = "images/hamlet-timeline.png";
    } else if (query === "plot breakdown: 7 commandments") {
      imageSrc = "images/animal-farm-7-commandments.png";
    } else if (query === "plot summary: a christmas carol") {
      imageSrc = "images/christmas-carol-plot.png";

      // --- Theme Maps ---
    } else if (query === "theme map: frankenstein science vs nature") {
      imageSrc = "images/frankenstein-science-nature.png";
    } else if (query === "theme map: inspector calls responsibility") {
      imageSrc = "images/inspector-calls-responsibility.png";
    } else if (query === "theme map: animal farm power & corruption") {
      imageSrc = "images/animal-farm-power-corruption.png";

      // --- Revision Resources: Essays & Timetables ---
    } else if (query === "essay outline: an inspector calls") {
      imageSrc = "images/inspector-calls-essay.png";
    } else if (query === "essay plan: macbeth supernatural") {
      imageSrc = "images/macbeth-supernatural-essay.png";
    } else if (query === "essay plan: merchant of venice prejudice") {
      imageSrc = "images/merchant-of-venice-prejudice-essay.png";
    } else if (query === "revision timetable: macbeth & christmas carol") {
      imageSrc = "images/macbeth-carol-timetable.png";
    } else if (query === "1-month literature revision schedule") {
      imageSrc = "images/1-month-revision-schedule.png";
    }

    if (imageSrc) {
      outputArea.innerHTML = `
          <div class="generated-image-container">
            <img src="${imageSrc}" alt="Generated Revision Resource" class="gen-ui-img" />
          </div>
        `;
      outputArea.scrollIntoView({ behavior: "smooth" });
    } else {
      outputArea.innerHTML = `
          <p style="color: var(--crimson-main); font-weight: bold; margin-top: 20px;">
            Please select or type one of the suggested prompts to generate a learning resource!
          </p>
        `;
    }
  });
});
