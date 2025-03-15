// Add sparkle button effect
const startButton = document.getElementById('start-button') as HTMLButtonElement;

// types of the quiz
type Era = {
    name: string;
    description: string;
    songs: string[];
    score: number;
    color: string;
    gif: string;
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
        color: "#E6B3B3",
        gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmRibG5iNHlpejhjeTkzNWJubTd6Z2hiZDd2djc0NG83anR2Nml2NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GlYeU30GX4rnO/giphy.gif"
    },
    {
        name: "Fearless (2008) ✨💛",
        description: "You're optimistic, romantic, and believe in fairy tales!",
        songs: ["Love Story", "You Belong With Me", "Fearless"],
        score: 0,
        color: "#FFD700",
        gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXdmaXM1empieTRlY3Zwd3RvNzRnb2ZtaDVmaG82NnlrcDVmZjRoaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0CygO05nait1nDSo/giphy.gif"
    },
    {
        name: "Speak Now (2010) 💜🎭",
        description: "You're passionate, dramatic, and speak your truth!",
        songs: ["Sparks Fly", "Back to December", "The Story of Us"],
        score: 0,
        color: "#FF69B4",
        gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTBpYjgxM2M0MHlwcTkzandjeG10ZTJsbGoxZjFoMGhmczJrcXhheCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6gfZlVcWJiuWSen6/giphy.gif"
    },
    {
        name: "Red (2012) ❤️🧣",
        description: "You're intense, passionate, and feel everything deeply!",
        songs: ["All Too Well", "22", "I Knew You Were Trouble"],
        score: 0,
        color: "#FF0000",
        gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2V3dnozYzdjYjZyZW5xemtxdHFtaDZpenE0bzM3NHpkeXhqODNydCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPN3oiLhjl7M4FXVe/giphy.gif"
    },
    {
        name: "1989 (2014) 🌃💫",
        description: "You're confident, independent, and ready to shake it off!",
        songs: ["Shake It Off", "Blank Space", "Style"],
        score: 0,
        color: "#87CEEB",
        gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGdsbmZxdmExcG8wNWl0Y3NyaHFwcWJuMGN6dzZzejUyOG40Y3ltdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FOeoCHlcHfeejfzCE8/giphy.gif"
    },
    {
        name: "Reputation (2017) 🐍⚫",
        description: "You're bold, resilient, and don't care about what others think!",
        songs: ["Look What You Made Me Do", "Delicate", "Getaway Car"],
        score: 0,
        color: "#000000",
        gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWxoeWs4cmV1aGc5emhmeHMwODR2dzEzMmZnbGkzYjhvYmMzMmc5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4Ep3BVfl1IZ8WLfi/giphy.gif"
    },
    {
        name: "Lover (2019) 💗🦋",
        description: "You're romantic, colorful, and embrace all forms of love!",
        songs: ["Lover", "Cruel Summer", "Paper Rings"],
        score: 0,
        color: "#FFB6C1",
        gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2FjMTgwdDl3MGk5ZThkOGw1dXY2bWV2NjlvZ2E1bzNnZ2FodGJkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fuEcvP1ztzRlWZYauZ/giphy.gif"
    },
    {
        name: "folklore (2020) 🌲🤍",
        description: "You're introspective, creative, and love storytelling!",
        songs: ["cardigan", "august", "hoax"],
        score: 0,
        color: "#808080",
        gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZndtaXhrM3FmdWJveTJuOHZkMnBrdnp5NmkxbTFvZWRjMW11emU5diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ROyP6SWlAv2Za/giphy.gif"
    },
    {
        name: "evermore (2020) 🍂🤎",
        description: "You're mysterious, poetic, and deeply emotional!",
        songs: ["willow", "champagne problems", "no body, no crime"],
        score: 0,
        color: "#8B4513",
        gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXp5YjRoeGxyNGx3ZnA2eHF4aGozZ280c21kaHlzYXZ3eXUxYTNoNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/flLxd9ynwrfRIuUsT2/giphy.gif"
    },
    {
        name: "Midnights (2022) ✨🌙",
        description: "You're reflective, dreamy, and embrace the late-night thoughts!",
        songs: ["Anti-Hero", "Lavender Haze", "Snow On The Beach"],
        score: 0,
        color: "#483D8B",
        gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmVrNnl5MGtrc3JoOG91cHhmZzlrOWJ5cDZ4czdsMmxkd2l3c2t5ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8nyug9FhGXHhClCfDC/giphy.gif"
    },
    {
        name: "The Tortured Poets Department (2024) 📚🎶",
        description: "You're poetic, deep, and embrace your emotions!",
        songs: ["Fortnight", "The Tortured Poets Department", "I Can Do It With A Broken Heart"],
        score: 0,
        color: "#800080",
        gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzZ3ZHBrc2l1aTVnN2dpMXc5ZWF0eDJvejhvaGF2MTVwcW4yMWQzbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/58JLRI4XvINnuw3ZHQ/giphy.gif"
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
const welcomeContainer = document.getElementById('welcome-container') as HTMLDivElement;

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

    // Hide welcome container and start button
    welcomeContainer.classList.add('hidden');
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
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    welcomeContainer.classList.add('hidden');

    const winningEra = determineEra();
    
    // Set the gif
    const eraGif = document.getElementById('era-gif') as HTMLImageElement;
    eraGif.src = winningEra.gif;
    eraGif.alt = `${winningEra.name} gif`;
    
    // Set other result elements
    eraName.textContent = winningEra.name;
    eraDescription.textContent = winningEra.description;
    
    // Clear and populate songs list
    const eraSongsList = document.getElementById('era-songs')!;
    eraSongsList.innerHTML = '';
    winningEra.songs.forEach(song => {
        const li = document.createElement('li');
        li.textContent = song;
        eraSongsList.appendChild(li);
    });
}

// Function to reset quiz
function resetQuiz() {
    currentQuestion = 0;
    selectedOption = null;
    eras.forEach(era => era.score = 0);
    resultContainer.classList.add('hidden');
    questionContainer.classList.add('hidden');
    welcomeContainer.classList.remove('hidden');
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