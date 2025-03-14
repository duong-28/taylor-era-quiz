// Add sparkle button effect
const startButton = document.getElementById('start-button') as HTMLButtonElement;

// types of the quiz
type Era = {
    name: string;
    description: string;
    songs: string[];
    score: number;
    color: string;
};

type Question = {
    text: string;
    options: string[];
    eraPoints: number[];
    eraIndices: number[];  // Add mapping to era indices
};

// Define our eras
const eras: Era[] = [
    {
        name: "Debut (2006) – Taylor Swift 🌾🎸",
        description: "You're authentic, country-loving, and wear your heart on your sleeve!",
        songs: ["A Place In This World", "Teardrops On My Guitar", "Our Song"],
        score: 0,
        color: "#E6B3B3"
    },
    {
        name: "Fearless (2008) ✨💛",
        description: "You're optimistic, romantic, and believe in fairy tales!",
        songs: ["Love Story", "You Belong With Me", "Fearless"],
        score: 0,
        color: "#FFD700"
    },
    {
        name: "Speak Now (2010) 💜🎭",
        description: "You're passionate, dramatic, and speak your truth!",
        songs: ["Sparks Fly", "Back to December", "The Story of Us"],
        score: 0,
        color: "#FF69B4"
    },
    {
        name: "Red (2012) ❤️🧣",
        description: "You're intense, passionate, and feel everything deeply!",
        songs: ["All Too Well", "22", "I Knew You Were Trouble"],
        score: 0,
        color: "#FF0000"
    },
    {
        name: "1989 (2014) 🌆🕶",
        description: "You're confident, adventurous, and love to have fun!",
        songs: ["Shake It Off", "Blank Space", "Out of the Woods"],
        score: 0,
        color: "#87CEEB"
    },
    {
        name: "Reputation (2017) 🖤🐍",
        description: "You're bold, mysterious, and don't care what others think!",
        songs: ["Look What You Made Me Do", "Gorgeous", "Getaway Car"],
        score: 0,
        color: "#4A4A4A"
    },
    {
        name: "Lover (2019) 💕🌈",
        description: "You're romantic, dreamy, and believe in love!",
        songs: ["Lover", "Death By A Thousand Cuts", "Cruel Summer"],
        score: 0,
        color: "#FFB6C1"
    },
    {
        name: "Folklore (2020) 🌲📝",
        description: "You're introspective, creative, and love storytelling!",
        songs: ["Illicit Affairs", "Hoax", "This Is Me Trying"],
        score: 0,
        color: "#8B4513"
    },
    {
        name: "Evermore (2020) 🍂🕰",
        description: "You're poetic, deep, and embrace your emotions!",
        songs: ["Cowboy Like Me", "Champagne Problems", "'tis the damn season'"],
        score: 0,
        color: "#8B4513"
    },
    {
        name: "Midnights (2022) 🌙🪩",
        description: "You're reflective, mysterious, and love late-night thoughts!",
        songs: ["Anti-Hero", "Midnight Rain", "Karma"],
        score: 0,
        color: "#483D8B"
    },
    {
        name: "The Tortured Poets Department (2024) 📚🎶",
        description: "You're poetic, deep, and embrace your emotions!",
        songs: ["Fortnight", "The Tortured Poets Department", "I Can Do It With A Broken Heart"],
        score: 0,
        color: "#800080"
    }
];

// Define our questions
const questions: Question[] = [
    {
        text: "What's your ideal weekend look like?",
        options: [
            "Going to a romantic dinner",
            "Writing poetry in a cozy cafe",
            "Exploring nature and taking photos",
            "Going to a party with friends",
            "Staying home and watching movies"
        ],
        eraPoints: [1, 2, 1, 4, 3],
        eraIndices: [0, 1, 8, 4, 9]  
    },
    {
        text: "How do you handle heartbreak?",
        options: [
            "Write a love song about it",
            "Write deep poetry about your feelings",
            "Take a long walk in nature to reflect",
            "Go out and have fun to forget",
            "Talk to friends about it"
        ],
        eraPoints: [2, 1, 3, 4, 0],
        eraIndices: [0, 1, 8, 4, 5]
    },
    {
        text: "What's your favorite type of story?",
        options: [
            "A fairy tale romance",
            "A complex character study",
            "A story about personal growth",
            "A dramatic revenge story",
            "A mysterious thriller"
        ],
        eraPoints: [1, 2, 3, 4, 5],
        eraIndices: [0, 1, 8, 5, 9]  
    },
    {
        text: "What's your preferred writing style?",
        options: [
            "Simple and heartfelt",
            "Deep and poetic",
            "Storytelling and narrative",
            "Sassy and witty",
            "Dark and mysterious"
        ],
        eraPoints: [2, 1, 3, 4, 5],
        eraIndices: [0, 1, 8, 4, 5] 
    },
    {
        text: "How do you express yourself?",
        options: [
            "Through music and singing",
            "Through poetry and writing",
            "Through art and creativity",
            "Through fashion and style",
            "Through social media"
        ],
        eraPoints: [1, 2, 3, 4, 5],
        eraIndices: [0, 1, 8, 4, 5]  
    }
];

// DOM Elements
const questionContainer = document.getElementById('question-container') as HTMLDivElement;
const resultContainer = document.getElementById('result-container') as HTMLDivElement;
const questionText = document.getElementById('question-text') as HTMLHeadingElement;
const optionsContainer = document.getElementById('options-container') as HTMLDivElement;
const eraName = document.getElementById('era-name') as HTMLSpanElement;
const eraDescription = document.getElementById('era-description') as HTMLParagraphElement;
const eraSongs = document.getElementById('era-songs') as HTMLUListElement;
const restartButton = document.getElementById('restart-button') as HTMLButtonElement;

let currentQuestion = 0;
let selectedOption: number | null = null;

// Function to show question
function showQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.text;
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });

    // Ensure start button is hidden during questions
    startButton.classList.add('hidden');
}

// Function to select an option
function selectOption(index: number) {
    selectedOption = index;
    const buttons = optionsContainer.getElementsByClassName('option-button');
    Array.from(buttons).forEach((button, i) => {
        button.classList.toggle('selected', i === index);
    });
}

// Determine era based on score
function determineEra(): Era {
    console.log("Final scores:", eras.map(era => `${era.name}: ${era.score}`));
    let maxScore = Math.max(...eras.map(era => era.score));
    
    // find all eras with the max score
    const topEras = eras.filter(era => era.score === maxScore);

    // if there's a tie, randomly select one of the top eras
    return topEras.length > 1 ? topEras[Math.floor(Math.random() * topEras.length)] : topEras[0];
}

// Function to show result
function showResult() {
    const userEra = determineEra();
    eraName.textContent = userEra.name;
    eraDescription.textContent = userEra.description;
    eraSongs.innerHTML = '';
    
    userEra.songs.forEach(song => {
        const li = document.createElement('li');
        li.textContent = song;
        eraSongs.appendChild(li);
    });
    
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    // Ensure start button remains hidden in results
    startButton.classList.add('hidden');
}

// Function to reset quiz
function resetQuiz() {
    currentQuestion = 0;
    selectedOption = null;
    eras.forEach(era => era.score = 0);
    resultContainer.classList.add('hidden');
    questionContainer.classList.add('hidden');
    startButton.classList.remove('hidden');
}

// Event Listeners
startButton.addEventListener('click', () => {
    startButton.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    showQuestion();
});

restartButton.addEventListener('click', resetQuiz);

// Handle option selection and next question
function handleNextQuestion() {
    if (selectedOption === null) return;
    
    // Update scores using the era mapping
    const question = questions[currentQuestion];
    const selectedEraIndex = question.eraIndices[selectedOption];
    eras[selectedEraIndex].score += question.eraPoints[selectedOption];
    
    // Move to next question or show result
    currentQuestion++;
    if (currentQuestion < questions.length) {
        selectedOption = null;
        showQuestion();
    } else {
        showResult();
    }
}

// Add event listener for option buttons
optionsContainer.addEventListener('click', (e) => {
    if (e.target instanceof HTMLButtonElement) {
        handleNextQuestion();
    }
});