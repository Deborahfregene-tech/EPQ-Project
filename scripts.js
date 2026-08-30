document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generate-btn");
  const userInput = document.getElementById("user-input");
  const outputArea = document.getElementById("gen-ui-output");

  const IMAGE_OUTPUTS = {
    "plot timeline: hamlet": "images/hamlet-timeline.png",
    "character mindmap: scrooge": "images/scrooge-mindmap.png",
    "essay outline: an inspector calls": "images/inspector-calls-essay.png",
    "revision timetable: macbeth & christmas carol":
      "images/macbeth-christmas-timetable.png",
  };

  generateBtn.addEventListener("click", (event) => {
    event.preventDefault();

    // Clean up input: convert to lowercase and normalize quotes/spaces
    const query = userInput.value.trim().toLowerCase().replace(/[‘’]/g, "'");

    let imageSrc = "";

    if (query === "create me a plot timeline for 'hamlet'") {
      imageSrc = IMAGE_OUTPUTS["hamlet"];
    } else if (
      query === "create me a mindmap for scrooge from 'a christmas carol'"
    ) {
      imageSrc = IMAGE_OUTPUTS["scrooge"];
    } else if (
      query === "create me an example essay outline for 'an inspector calls'"
    ) {
      imageSrc = IMAGE_OUTPUTS["inspector"];
    } else if (
      query ===
      "create me a weekly revision timetable. i'm studying 'macbeth' and 'a christmas carol'."
    ) {
      imageSrc = IMAGE_OUTPUTS["timetable"];
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
