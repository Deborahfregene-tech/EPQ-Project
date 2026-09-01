document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generate-btn");
  const userInput = document.getElementById("user-input");
  const outputArea = document.getElementById("gen-ui-output");

  // Dictionary mapping normalized prompt strings to image file paths
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
    "plot timeline: hamlet": "images/hamlet-timeline.png",
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
    "revision timetable: macbeth & christmas carol":
      "images/macbeth-carol-timetable.png",
  };

  generateBtn.addEventListener("click", (event) => {
    event.preventDefault();

    // Clean up input: convert to lowercase and normalize quotes/spaces
    const query = userInput.value.trim().toLowerCase().replace(/[‘’]/g, "'");

    // Look up the image directly from the dictionary
    const imageSrc = IMAGE_OUTPUTS[query];

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
