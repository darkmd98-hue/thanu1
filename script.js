// Enter Site Function
function enterSite() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('navbar').style.display = 'block';
    document.getElementById('timeline').style.display = 'block';
    document.getElementById('timeline').classList.add('active');
    
    // Auto-play music
    const music = document.getElementById('bg-music');
    music.play().catch(e => console.log('Autoplay prevented'));
    document.getElementById('music-toggle').classList.add('playing');
}

// Smooth Scrolling Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('#navbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.style.display = 'none';
                section.classList.remove('active');
            });
            
            // Show target section
            const targetSection = document.getElementById(targetId);
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Start countdown
    startCountdown();
    
    // Create floating hearts
    createFloatingHearts();

    const bgMusic = document.getElementById('bg-music');
    const surpriseSong = document.getElementById('surprise-song');

    if (bgMusic && surpriseSong) {
        surpriseSong.addEventListener('play', function() {
            if (!bgMusic.paused) {
                bgMusic.pause();
                document.getElementById('music-toggle').classList.remove('playing');
            }
        });
    }
});

// Music Toggle
function toggleMusic() {
    const music = document.getElementById('bg-music');
    const toggle = document.getElementById('music-toggle');
    
    if (music.paused) {
        music.play();
        toggle.classList.add('playing');
    } else {
        music.pause();
        toggle.classList.remove('playing');
    }
}

// Countdown Timer
function startCountdown() {
    // Set your relationship start date here (YYYY, MM-1, DD, HH, MM)
    const startDate = new Date(2025, 1, 10, 17, 40); // February 10, 2025, 5:40 PM
    
    function updateCountdown() {
        const now = new Date();
        const diff = now - startDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('time-together').innerHTML = 
            `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Surprise Reveal
function revealSurprise() {
    const surpriseContent = document.getElementById('surprise-content');
    const surpriseBtn = document.querySelector('.surprise-btn');
    
    surpriseBtn.style.display = 'none';
    surpriseContent.style.display = 'block';
    surpriseContent.classList.remove('surprise-hidden');
    
    // Create confetti
    createConfetti();
}

// Confetti Animation
function createConfetti() {
    const colors = ['#ff6b6b', '#ee5a6f', '#ffd700', '#ff69b4', '#87ceeb'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

// Floating Hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    if (!heartsContainer) return;
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = Math.random() * 2 + 1 + 'em';
        heart.style.animation = `float ${Math.random() * 3 + 4}s linear`;
        heart.style.opacity = '0.6';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 7000);
    }, 2000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        observer.observe(item);
    });
});


// Love Quiz Game
const quizQuestions = [
    {
        question: "What do I like the most in you? ❤️",
        options: ["Simplicity", "Childishness", "Maturity", "Everything"],
        correct: 3,
        correctMsg: "Yes, it's everything. That's why you are so special to me. 💕",
        wrongMsg: "Not this one. Think from my heart. 😊"
    },
    {
        question: "What do I value the most? 💌",
        options: ["Your money", "Your efforts", "Expensive gifts", "Your attention"],
        correct: 1,
        correctMsg: "Always your efforts. They mean the most to me. 🤍",
        wrongMsg: "No, not that. The answer is something much more real. 💭"
    },
    {
        question: "What do I crave for? 🫶",
        options: ["Cuddles", "Late night video calls", "Hugs and kisses", "Everything"],
        correct: 3,
        correctMsg: "Yes, everything. I crave all of it with you. 💖",
        wrongMsg: "Not exactly. You know I can never choose just one. 🥹"
    },
    {
        question: "What gesture of yours makes me angry and upset when you are around me? 🌙",
        options: ["No paying attention", "Watching mobile", "Annoying me", "Everything"],
        correct: 1,
        correctMsg: "Yes, that one really upsets me when you are with me. 💔",
        wrongMsg: "Nope, that's not the one that bothers me most. 🙈"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function startQuiz() {
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-game').style.display = 'block';
    currentQuestion = 0;
    score = 0;
    answered = false;
    showQuestion();
}

function showQuestion() {
    answered = false;
    const question = quizQuestions[currentQuestion];
    
    document.getElementById('question-number').textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('feedback').textContent = '';
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });
}

function selectAnswer(selectedIndex) {
    if (answered) return;
    answered = true;
    
    const question = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('feedback');
    
    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        feedback.textContent = question.correctMsg;
        feedback.style.color = '#4caf50';
        score++;
    } else {
        options[selectedIndex].classList.add('wrong');
        options[question.correct].classList.add('correct');
        feedback.textContent = question.wrongMsg;
        feedback.style.color = '#ff6b6b';
    }
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

function showResults() {
    document.getElementById('quiz-game').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    const finalScore = document.getElementById('final-score');
    
    finalScore.textContent = `${score} / ${quizQuestions.length}`;
    
    if (score === quizQuestions.length) {
        resultTitle.textContent = '🎉 PERFECT SCORE! 🎉';
        resultMessage.textContent = 'You know my heart so beautifully. Every answer felt like a reminder of how closely you hold me. 💕';
    } else if (score >= quizQuestions.length * 0.6) {
        resultTitle.textContent = '💖 Great Job, Kuchu Puchu! 💖';
        resultMessage.textContent = 'You know me so well, and that makes my heart feel so full every single time. ❤️';
    } else {
        resultTitle.textContent = '😊 Not Bad! 😊';
        resultMessage.textContent = 'A few answers slipped away, but even then, being known by you still feels special to me. 💌';
    }
}

function restartQuiz() {
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-start').style.display = 'block';
}


// Memory Card Game
const cardImages = [
    'memory1.jpeg',
    'memory2.jpeg', 
    'memory3.jpeg',
    'memory4.jpeg',
    'memory5.jpeg',
    'memory6.jpeg',
    'memory7.jpeg',
    'memory8.jpeg'
];
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let canFlip = true;

function initMemoryGame() {
    const gameCards = [...cardImages, ...cardImages];
    gameCards.sort(() => Math.random() - 0.5);
    
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';
    memoryCards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    canFlip = true;
    
    document.getElementById('moves').textContent = '0';
    document.getElementById('matches').textContent = '0/8';
    document.getElementById('game-win').style.display = 'none';
    
    gameCards.forEach((image, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.image = image;
        card.dataset.index = index;
        card.innerHTML = `
            <div class="card-front">💝</div>
            <div class="card-back"><img src="${image}" alt="Memory"></div>
        `;
        card.onclick = () => flipCard(card);
        grid.appendChild(card);
        memoryCards.push(card);
    });
}

function flipCard(card) {
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        document.getElementById('moves').textContent = moves;
        
        setTimeout(checkMatch, 800);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.image === card2.dataset.image) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        document.getElementById('matches').textContent = `${matchedPairs}/8`;
        
        if (matchedPairs === 8) {
            setTimeout(showWin, 500);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    
    flippedCards = [];
    canFlip = true;
}

function showWin() {
    document.getElementById('final-moves').textContent = moves;
    document.getElementById('game-win').style.display = 'block';
    document.querySelector('.memory-grid').style.display = 'none';
    document.querySelector('.game-info').style.display = 'none';
}

function resetMemoryGame() {
    document.querySelector('.memory-grid').style.display = 'grid';
    document.querySelector('.game-info').style.display = 'flex';
    initMemoryGame();
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    initMemoryGame();
});


// Catch Hearts Game
let catchScore = 0;
let catchTimer = 20;
let catchInterval;
let spawnInterval;
let catchGameActive = false;

function startCatchGame() {
    document.getElementById('catch-start').style.display = 'none';
    document.getElementById('catch-playing').style.display = 'block';
    
    catchScore = 0;
    catchTimer = 20;
    catchGameActive = true;
    
    document.getElementById('catch-score').textContent = '0';
    document.getElementById('catch-timer').textContent = '20';
    document.getElementById('catch-area').innerHTML = '';
    
    // Start timer
    catchInterval = setInterval(() => {
        catchTimer--;
        document.getElementById('catch-timer').textContent = catchTimer;
        
        if (catchTimer <= 0) {
            endCatchGame();
        }
    }, 1000);
    
    // Spawn hearts
    spawnInterval = setInterval(spawnHeart, 800);
    spawnHeart();
}

function spawnHeart() {
    if (!catchGameActive) return;
    
    const area = document.getElementById('catch-area');
    const heart = document.createElement('div');
    heart.className = 'catch-heart';
    
    const hearts = ['❤️', '💕', '💖', '💗', '💝'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    
    const maxX = area.offsetWidth - 60;
    const maxY = area.offsetHeight - 60;
    
    heart.style.left = Math.random() * maxX + 'px';
    heart.style.top = Math.random() * maxY + 'px';
    
    heart.onclick = () => catchHeart(heart);
    
    area.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 2000);
}

function catchHeart(heart) {
    if (!catchGameActive) return;
    
    catchScore++;
    document.getElementById('catch-score').textContent = catchScore;
    
    heart.style.animation = 'none';
    heart.style.transform = 'scale(1.5)';
    heart.style.opacity = '0';
    
    setTimeout(() => heart.remove(), 200);
}

function endCatchGame() {
    catchGameActive = false;
    clearInterval(catchInterval);
    clearInterval(spawnInterval);
    
    document.getElementById('catch-playing').style.display = 'none';
    document.getElementById('catch-result').style.display = 'block';
    
    const resultTitle = document.getElementById('catch-result-title');
    const resultMessage = document.getElementById('catch-result-message');
    const finalScore = document.getElementById('catch-final');
    
    finalScore.textContent = `${catchScore} Hearts!`;
    
    if (catchScore >= 30) {
        resultTitle.textContent = '🎉 Amazing! 🎉';
        resultMessage.textContent = 'You caught my heart perfectly! Just like you do every day! 💖';
    } else if (catchScore >= 20) {
        resultTitle.textContent = '💕 Great Job! 💕';
        resultMessage.textContent = 'You\'re so good at catching hearts! Especially mine! ❤️';
    } else if (catchScore >= 10) {
        resultTitle.textContent = '😊 Not Bad! 😊';
        resultMessage.textContent = 'You caught some hearts! But you already have mine forever! 💝';
    } else {
        resultTitle.textContent = '💖 You Tried! 💖';
        resultMessage.textContent = 'That\'s okay! You already caught the most important heart - mine! 💕';
    }
}

function restartCatchGame() {
    document.getElementById('catch-result').style.display = 'none';
    document.getElementById('catch-start').style.display = 'block';
}


// Unlock My Heart Game
const unlockAnswers = [
    '10 february 2025',
    '10/02/2025',
    '10/2/2025',
    '10 feb 2025'
];

function checkUnlock() {
    const input = document.getElementById('unlock-password').value.toLowerCase().trim();
    const feedback = document.getElementById('unlock-feedback');
    
    // Check if input matches any of the answers
    const isCorrect = unlockAnswers.some(answer => input === answer.toLowerCase());
    
    if (isCorrect) {
        // Success!
        document.querySelector('.unlock-heart').style.display = 'none';
        document.querySelector('.unlock-clues').style.display = 'none';
        document.querySelector('.unlock-input-area').style.display = 'none';
        document.getElementById('unlock-success').style.display = 'block';
        
        // Animate heart unlock
        const heartIcon = document.querySelector('.heart-icon');
        heartIcon.style.opacity = '1';
        heartIcon.style.filter = 'grayscale(0%)';
        
    } else {
        // Wrong answer
        feedback.textContent = '❌ Not quite! Try again! 💭';
        feedback.style.color = '#ff6b6b';
        
        // Shake animation
        const input_elem = document.getElementById('unlock-password');
        input_elem.style.animation = 'wrongAnswer 0.5s';
        setTimeout(() => {
            input_elem.style.animation = '';
        }, 500);
    }
}

function resetUnlock() {
    document.querySelector('.unlock-heart').style.display = 'flex';
    document.querySelector('.unlock-clues').style.display = 'block';
    document.querySelector('.unlock-input-area').style.display = 'block';
    document.getElementById('unlock-success').style.display = 'none';
    document.getElementById('unlock-password').value = '';
    document.getElementById('unlock-feedback').textContent = '';
    
    const heartIcon = document.querySelector('.heart-icon');
    heartIcon.style.opacity = '0.3';
    heartIcon.style.filter = 'grayscale(100%)';
}

// Allow Enter key to submit
document.addEventListener('DOMContentLoaded', function() {
    const unlockInput = document.getElementById('unlock-password');
    if (unlockInput) {
        unlockInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkUnlock();
            }
        });
    }
});
