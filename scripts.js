if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generate-btn");
  const userInput = document.getElementById("user-input");
  const outputArea = document.getElementById("gen-ui-output");

  const IMAGE_OUTPUTS = {
    "quote breakdown: shylock": "images/shylock-quotes.png",
    "quotes: macbeth ambition & guilt": "images/macbeth-ambition-quotes.png",
    "quote sheet: eva smith": "images/eva-smith-quotes.png",
    "character mindmap: scrooge": "images/scrooge-mindmap.png",
    "character analysis: the creature": "images/creature-analysis.png",
    "shylock vs antonio comparison": "images/shylock-antonio-comparison.png",
    "character profile: lady macbeth": "images/lady-macbeth-profile.png",
    "plot timeline: hamlet": "images/hamlet-timeline.png",
    "plot breakdown: 7 commandments": "images/animal-farm-7-commandments.png",
    "plot summary: a christmas carol": "images/christmas-carol-plot.png",
    "theme map: frankenstein science vs nature": "images/frankenstein-science-nature.png",
    "theme map: inspector calls responsibility": "images/inspector-calls-responsibility.png",
    "theme map: animal farm power & corruption": "images/animal-farm-power-corruption.png",
    "essay outline: an inspector calls": "images/inspector-calls-essay.png",
    "essay plan: macbeth supernatural": "images/macbeth-supernatural-essay.png",
    "revision timetable: macbeth & christmas carol": "images/macbeth-carol-timetable.png",
  };

  if (generateBtn) {
    generateBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const query = userInput.value.trim().toLowerCase().replace(/[‘’]/g, "'");
      const imageSrc = IMAGE_OUTPUTS[query];

      if (imageSrc) {
        outputArea.innerHTML = `
          <div class="generated-image-container">
            <img src="${imageSrc}" alt="Generated Revision Resource" class="gen-ui-img" />
          </div>
        `;
        outputArea.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        outputArea.innerHTML = `
          <p style="color: var(--crimson-main); font-weight: bold; margin-top: 20px;">
            Please select or type one of the suggested prompts to generate a learning resource!
          </p>
        `;
      }
    });
  }
});

// Updated openTab function to handle section/heading scrolling
function openTab(event, tabName, targetId = null) {
  // 1. Hide all tab content sections
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach((content) => content.classList.remove("active"));

  // 2. Remove active state from all buttons
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach((button) => button.classList.remove("active"));

  // 3. Display target tab
  const activeTab = document.getElementById(tabName);
  if (activeTab) {
    activeTab.classList.add("active");
  }

  // 4. Highlight target tab button if applicable
  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active");
  }

  // 5. Scroll directly to heading if targetId is provided
  if (targetId) {
    setTimeout(() => {
      const headingTarget = document.getElementById(targetId);
      if (headingTarget) {
        headingTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 10);
  }
}


const AVATAR_IMAGES = {
  neutral: "images/scrooge-neutral.svg",
  happy: "images/scrooge-happy.svg",
  angry: "images/scrooge-angry.svg"
};

let currentQuestions = []; 
let currentQuestionIndex = 0;
let score = 0;
let timer = null;
let timeLeft = 20;

const QUESTION_BANK = [
  {
    mode: "who-said-it",
    question: "Who said: 'Vaulting ambition, which o'erleaps itself / And falls on the other'?",
    options: ["Lady Macbeth", "Macbeth", "Banquo", "Macduff"],
    correct: "Macbeth"
  },
  {
    mode: "who-said-it",
    question: "Who said: 'Are there no prisons? ... And the Union workhouses?'",
    options: ["Jacob Marley", "Ebenezer Scrooge", "Bob Cratchit", "Fred"],
    correct: "Ebenezer Scrooge"
  },
  {
    mode: "who-said-it",
    question: "Who said: 'If you prick us, do we not bleed? If you tickle us, do we not laugh?'",
    options: ["Antonio", "Bassanio", "Shylock", "Portia"],
    correct: "Shylock"
  },
  {
    mode: "who-said-it",
    question: "Who said: 'We are members of one body. We are responsible for each other.'?",
    options: ["Mr. Birling", "Inspector Goole", "Sheila Birling", "Eric Birling"],
    correct: "Inspector Goole"
  },
  {
    mode: "who-said-it",
    question: "Who said: 'Beware; for I am fearless, and therefore powerful.'?",
    options: ["Victor Frankenstein", "The Creature", "Robert Walton", "Henry Clerval"],
    correct: "The Creature"
  },
  {
    mode: "who-said-it",
    question: "Who said: 'Four legs good, two legs bad'?",
    options: ["Napoleon", "Boxer", "Snowball", "The Sheep"],
    correct: "The Sheep"
  },
  {
    mode: "theme-fit",
    question: "Which theme fits: 'Will all great Neptune's ocean wash this blood clean from my hand?'",
    options: ["Ambition & Power", "Guilt & Conscience", "Fate vs Free Will", "Kingship"],
    correct: "Guilt & Conscience"
  },
  {
    mode: "theme-fit",
    question: "Which theme fits: 'I wear the chain I forged in life... I made it link by link.'",
    options: ["Social Responsibility", "Isolation", "Family & Joy", "Time & Youth"],
    correct: "Social Responsibility"
  },
  {
    mode: "theme-fit",
    question: "Which theme fits: 'I am a Jew. Hath not a Jew eyes? hath not a Jew hands...'",
    options: ["Prejudice & Discrimination", "Justice & Mercy", "Love & Friendship", "Wealth"],
    correct: "Prejudice & Discrimination"
  },
  {
    mode: "theme-fit",
    question: "Which theme fits: 'Burnt her inside out, of course... She was in great agony.'",
    options: ["Class & Inequality", "Gender Roles", "Generational Divide", "Pride"],
    correct: "Class & Inequality"
  },
  {
    mode: "theme-fit",
    question: "Which theme fits: 'Learn from me... how dangerous is the acquirement of knowledge.'",
    options: ["Nature vs Science", "Dangerous Ambition", "Monstrosity", "Rejection"],
    correct: "Dangerous Ambition"
  },
  {
    mode: "theme-fit",
    question: "Which theme fits: 'All animals are equal, but some animals are more equal than others.'",
    options: ["Totalitarianism & Corruption", "Loyalty & Hard Work", "Religion", "Education"],
    correct: "Totalitarianism & Corruption"
  },
  {
    mode: "chapter-check",
    question: "In which Act does Lady Macbeth sleepwalk and try to wash imaginary blood from her hands?",
    options: ["Act 1", "Act 3", "Act 4", "Act 5"],
    correct: "Act 5"
  },
  {
    mode: "chapter-check",
    question: "In which Stave does the Ghost of Christmas Present show Scrooge the Cratchit family?",
    options: ["Stave 1", "Stave 2", "Stave 3", "Stave 4"],
    correct: "Stave 3"
  },
  {
    mode: "chapter-check",
    question: "In which Act does Sheila Birling confess to getting Eva Smith fired from Milwards?",
    options: ["Act 1", "Act 2", "Act 3", "Epilogue"],
    correct: "Act 1"
  },
  {
    mode: "chapter-check",
    question: "In which Act does the famous Courtroom Trial scene take place in The Merchant of Venice?",
    options: ["Act 2", "Act 3", "Act 4", "Act 5"],
    correct: "Act 4"
  },
  {
    mode: "chapter-check",
    question: "In which Volume/Chapter does Victor Frankenstein bring the Creature to life?",
    options: ["Volume 1, Ch 5", "Volume 2, Ch 2", "Volume 3, Ch 1", "Preface"],
    correct: "Volume 1, Ch 5"
  },
  {
    mode: "chapter-check",
    question: "In which Chapter of Animal Farm is Boxer sold to the knacker (horse slaughterer)?",
    options: ["Chapter 5", "Chapter 7", "Chapter 9", "Chapter 10"],
    correct: "Chapter 9"
  }
];
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  if (startBtn) {
    startBtn.addEventListener("click", startGame);
  }
});

function startGame() {
  const modeSelect = document.getElementById("mode-select");
  const selectedMode = modeSelect.value;

  currentQuestions = QUESTION_BANK.filter(q => q.mode === selectedMode);

  if (currentQuestions.length === 0) {
    alert("No questions found for this mode!");
    return;
  }

  score = 0;
  currentQuestionIndex = 0;
  document.getElementById("score").textContent = score;

  const quizCard = document.getElementById("quiz-card");
  quizCard.classList.remove("hidden");

  loadQuestion();
}

function loadQuestion() {
  updateAvatar("neutral");

  const currentQ = currentQuestions[currentQuestionIndex];
  
  document.getElementById("question-text").textContent = currentQ.question;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  currentQ.options.forEach(optionText => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = optionText;
    btn.addEventListener("click", () => handleAnswer(optionText, currentQ.correct));
    optionsContainer.appendChild(btn);
  });

  startTimer();
}

function handleAnswer(selectedOption, correctAnswer) {
  clearInterval(timer);

  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(btn => btn.disabled = true);

  if (selectedOption === correctAnswer) {
    score += 10;
    document.getElementById("score").textContent = score;
    updateAvatar("happy");
  } else {
    updateAvatar("angry");
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
      loadQuestion();
    } else {
      endGame();
    }
  }, 1500);
} 

function startTimer() {
  clearInterval(timer);
  timeLeft = 20;
  document.getElementById("time-left").textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time-left").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      updateAvatar("angry");
      
      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
          loadQuestion();
        } else {
          endGame();
        }
      }, 1500);
    }
  }, 1000);
}

function updateAvatar(state) {
  const avatarContainer = document.getElementById("character-avatar");
  if (AVATAR_IMAGES[state]) {
    avatarContainer.style.backgroundImage = `url('${AVATAR_IMAGES[state]}')`;
  }
}

function endGame() {
  clearInterval(timer);
  document.getElementById("question-text").textContent = `Game Over! Final Score: ${score} points!`;
  document.getElementById("options-container").innerHTML = "";
  updateAvatar("happy");
}
