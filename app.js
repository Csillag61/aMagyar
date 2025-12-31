// ===========================
// Global State
// ===========================
let vocabularyData = [];
let grammarData = [];
let lessonsData = [];
let currentQuizType = null;
let currentQuizQuestions = [];
let currentQuestionIndex = 0;
let quizScore = 0;
let builderSuffixes = [];
let currentBaseWord = 'ház';
let translationTimeout = null;
let currentTranslateMode = 'text';
let savedTranslations = [];

// ===========================
// Initialization
// ===========================
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    setupNavigation();
    renderLessons();
    renderVocabulary();
    renderColors();
    renderNumbers();
    renderGrammar();
    setupFilters();
    updateBuilder();
    initializeTranslation();
    updateCacheInfo();
});

// ===========================
// Data Loading
// ===========================
async function loadData() {
    try {
        const [vocabResponse, grammarResponse, lessonsResponse] = await Promise.all([
            fetch('data/vocabulary.json'),
            fetch('data/grammar.json'),
            fetch('data/lessons.json')
        ]);
        
        const vocabData = await vocabResponse.json();
        const grammarDataRaw = await grammarResponse.json();
        const lessonsDataRaw = await lessonsResponse.json();
        
        vocabularyData = vocabData.vocabulary;
        grammarData = grammarDataRaw.grammarTopics;
        lessonsData = lessonsDataRaw.lessons;
        
        console.log('Data loaded successfully!');
    } catch (error) {
        console.error('Error loading data:', error);
        alert('Failed to load learning materials. Please check that data files exist.');
    }
}

// ===========================
// Navigation
// ===========================
function setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const screenName = btn.dataset.screen;
            switchScreen(screenName);
            
            // Update active button
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function switchScreen(screenName) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    const targetScreen = document.getElementById(`${screenName}-screen`);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// ===========================
// Lessons Screen
// ===========================
function renderLessons() {
    const container = document.getElementById('lessons-list');
    if (!container) return;
    
    container.innerHTML = lessonsData.map(lesson => `
        <div class="lesson-card" onclick="showLessonDetail(${lesson.id})">
            <div class="lesson-number">${lesson.order}</div>
            <h3>${lesson.title}</h3>
            <p>${lesson.description}</p>
        </div>
    `).join('');
}

function showLessonDetail(lessonId) {
    const lesson = lessonsData.find(l => l.id === lessonId);
    if (!lesson) return;
    
    // Hide lessons list, show detail view
    document.getElementById('lessons-list').style.display = 'none';
    const detailView = document.getElementById('lesson-detail');
    detailView.classList.remove('hidden');
    
    // Populate lesson content
    const content = document.getElementById('lesson-content');
    content.innerHTML = `
        <div class="lesson-header">
            <span class="lesson-badge">Lesson ${lesson.order}</span>
            <h3>${lesson.title}</h3>
        </div>
        <p class="lesson-description">${lesson.description}</p>
        
        <div class="lesson-story">
            <h4>📖 ${lesson.story.title}</h4>
            <div class="story-content">
                <p class="hungarian-text">${lesson.story.content}</p>
            </div>
            <div class="story-translation">
                <p class="translation-label"><strong>Translation:</strong></p>
                <p class="english-text">${lesson.story.translation}</p>
            </div>
        </div>
    `;
}

function closeLessonDetail() {
    document.getElementById('lessons-list').style.display = 'grid';
    document.getElementById('lesson-detail').classList.add('hidden');
}

// ===========================
// Vocabulary Screen
// ===========================

// Color mapping for visual display
const colorMap = {
    'fehér': '#FFFFFF',
    'fekete': '#000000',
    'piros': '#E63946',
    'kék': '#457B9D',
    'zöld': '#2D6A4F',
    'sárga': '#FFD60A',
    'barna': '#8B4513',
    'narancs': '#FF8C00',
    'szürke': '#808080',
    'rózsaszín': '#FFB6C1',
    'lila': '#9B59B6',
    'bordó': '#800020',
    'türkiz': '#40E0D0',
    'arany': '#FFD700',
    'ezüst': '#C0C0C0',
    'bézs': '#F5F5DC',
    'krém': '#FFFDD0',
    'tengerkék': '#000080',
    'világoskék': '#87CEEB',
    'sötétkék': '#00008B',
    'világoszöld': '#90EE90',
    'sötétzöld': '#013220',
    'vörös': '#8B0000',
    'ibolya': '#8F00FF',
    'korall': '#FF7F50',
    'olajzöld': '#808000',
    'citromsárga': '#FFFF66'
};

function renderVocabulary(filterTag = 'all') {
    const container = document.getElementById('vocab-list');
    if (!container) return;
    
    const filteredVocab = filterTag === 'all' 
        ? vocabularyData 
        : vocabularyData.filter(word => word.tags.includes(filterTag));
    
    container.innerHTML = filteredVocab.map(word => {
        const isColor = word.tags.includes('color') && colorMap[word.word];
        const colorSwatch = isColor ? `
            <div class="color-swatch" style="background-color: ${colorMap[word.word]}; ${word.word === 'fehér' || word.word === 'sárga' || word.word === 'citromsárga' ? 'border: 2px solid #ccc;' : ''}"></div>
        ` : '';
        
        return `
        <div class="vocab-card ${isColor ? 'color-card' : ''}">
            ${colorSwatch}
            <div class="vocab-header">
                <div class="vocab-word">${word.word}</div>
                <button class="audio-btn" onclick="speakHungarian('${word.word.replace(/'/g, "\\'")}', event)" title="Listen to pronunciation">🔊</button>
            </div>
            <div class="vocab-pronunciation">/${word.ipa}/</div>
            <div class="vocab-translation">${word.translation}</div>
            <div class="vocab-example">
                <div class="vocab-example-hu">${word.exampleSentence}</div>
                <div class="vocab-example-en">${word.exampleTranslation}</div>
            </div>
            <div class="vocab-tags">
                ${word.tags.map(tag => `<span class="vocab-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    }).join('');
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tag = btn.dataset.tag;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Render filtered vocabulary
            renderVocabulary(tag);
        });
    });
}

// ===========================
// Colors Screen
// ===========================
function renderColors() {
    const container = document.getElementById('colors-showcase');
    if (!container) return;
    
    // Get only color vocabulary items
    const colorWords = vocabularyData.filter(word => word.tags.includes('color'));
    
    container.innerHTML = colorWords.map(word => {
        const hasColorSwatch = colorMap[word.word];
        const colorSwatch = hasColorSwatch ? `
            <div class="color-swatch" style="background-color: ${colorMap[word.word]}; ${word.word === 'fehér' || word.word === 'sárga' || word.word === 'citromsárga' ? 'border: 2px solid #ccc;' : ''}"></div>
        ` : '';
        
        return `
        <div class="vocab-card color-card">
            ${colorSwatch}
            <div class="vocab-header">
                <div class="vocab-word">${word.word}</div>
                <button class="audio-btn" onclick="speakHungarian('${word.word.replace(/'/g, "\\'")}', event)" title="Listen to pronunciation">🔊</button>
            </div>
            <div class="vocab-pronunciation">/${word.ipa}/</div>
            <div class="vocab-translation">${word.translation}</div>
            <div class="vocab-example">
                <div class="vocab-example-hu">${word.exampleSentence}</div>
                <div class="vocab-example-en">${word.exampleTranslation}</div>
            </div>
        </div>
    `;
    }).join('');
}

// ===========================
// Numbers Screen
// ===========================
const hungarianNumbers = {
    basic: [
        { num: 0, hun: 'nulla' }, { num: 1, hun: 'egy' }, { num: 2, hun: 'kettő/két' },
        { num: 3, hun: 'három' }, { num: 4, hun: 'négy' }, { num: 5, hun: 'öt' },
        { num: 6, hun: 'hat' }, { num: 7, hun: 'hét' }, { num: 8, hun: 'nyolc' },
        { num: 9, hun: 'kilenc' }, { num: 10, hun: 'tíz' }, { num: 11, hun: 'tizenegy' },
        { num: 12, hun: 'tizenkettő' }, { num: 13, hun: 'tizenhárom' }, { num: 14, hun: 'tizennégy' },
        { num: 15, hun: 'tizenöt' }, { num: 16, hun: 'tizenhat' }, { num: 17, hun: 'tizenhét' },
        { num: 18, hun: 'tizennyolc' }, { num: 19, hun: 'tizenkilenc' }, { num: 20, hun: 'húsz' }
    ],
    tens: [
        { num: 10, hun: 'tíz' }, { num: 20, hun: 'húsz' }, { num: 30, hun: 'harminc' },
        { num: 40, hun: 'negyven' }, { num: 50, hun: 'ötven' }, { num: 60, hun: 'hatvan' },
        { num: 70, hun: 'hetven' }, { num: 80, hun: 'nyolcvan' }, { num: 90, hun: 'kilencven' }
    ],
    large: [
        { num: 100, hun: 'száz' }, { num: 1000, hun: 'ezer' },
        { num: 1000000, hun: 'millió' }
    ]
};

function renderNumbers() {
    // Basic numbers
    const basicContainer = document.getElementById('basic-numbers');
    if (basicContainer) {
        basicContainer.innerHTML = hungarianNumbers.basic.map(item => `
            <div class="number-card">
                <div class="number-digit">${item.num}</div>
                <div class="number-word">${item.hun}</div>
                <button class="audio-btn-small" onclick="speakHungarian('${item.hun}', event)" title="Listen">🔊</button>
            </div>
        `).join('');
    }

    // Tens
    const tensContainer = document.getElementById('tens-numbers');
    if (tensContainer) {
        tensContainer.innerHTML = hungarianNumbers.tens.map(item => `
            <div class="number-card">
                <div class="number-digit">${item.num}</div>
                <div class="number-word">${item.hun}</div>
                <button class="audio-btn-small" onclick="speakHungarian('${item.hun}', event)" title="Listen">🔊</button>
            </div>
        `).join('');
    }

    // Large numbers
    const largeContainer = document.getElementById('large-numbers');
    if (largeContainer) {
        largeContainer.innerHTML = hungarianNumbers.large.map(item => `
            <div class="number-card">
                <div class="number-digit">${item.num.toLocaleString()}</div>
                <div class="number-word">${item.hun}</div>
                <button class="audio-btn-small" onclick="speakHungarian('${item.hun}', event)" title="Listen">🔊</button>
            </div>
        `).join('');
    }
}

function convertNumber() {
    const input = document.getElementById('number-input');
    const result = document.getElementById('number-result');
    const num = parseInt(input.value);
    
    if (isNaN(num) || num < 0 || num > 999) {
        result.innerHTML = '<p class="error">Please enter a number between 0 and 999</p>';
        return;
    }
    
    const hungarian = numberToHungarian(num);
    result.innerHTML = `
        <div class="number-conversion">
            <div class="conversion-number">${num}</div>
            <div class="conversion-arrow">→</div>
            <div class="conversion-hungarian">${hungarian}</div>
            <button class="audio-btn" onclick="speakHungarian('${hungarian}', event)">🔊</button>
        </div>
    `;
}

function numberToHungarian(num) {
    if (num === 0) return 'nulla';
    
    const ones = ['', 'egy', 'kettő', 'három', 'négy', 'öt', 'hat', 'hét', 'nyolc', 'kilenc'];
    const tens = ['', 'tíz', 'húsz', 'harminc', 'negyven', 'ötven', 'hatvan', 'hetven', 'nyolcvan', 'kilencven'];
    
    if (num < 10) return ones[num];
    if (num === 10) return 'tíz';
    if (num < 20) return 'tizen' + ones[num - 10];
    if (num < 100) {
        const ten = Math.floor(num / 10);
        const one = num % 10;
        return tens[ten] + (one > 0 ? ones[one] : '');
    }
    
    // 100-999
    const hundred = Math.floor(num / 100);
    const remainder = num % 100;
    let result = (hundred === 1 ? '' : ones[hundred]) + 'száz';
    
    if (remainder > 0) {
        if (remainder < 10) {
            result += ones[remainder];
        } else if (remainder < 20) {
            result += 'tizen' + ones[remainder - 10];
        } else {
            const ten = Math.floor(remainder / 10);
            const one = remainder % 10;
            result += tens[ten] + (one > 0 ? ones[one] : '');
        }
    }
    
    return result;
}

// ===========================
// Grammar Screen
// ===========================
function renderGrammar() {
    const container = document.getElementById('grammar-list');
    if (!container) return;
    
    container.innerHTML = grammarData.map(topic => `
        <div class="grammar-card" onclick="showGrammarDetail(${topic.id})" 
             style="border-left-color: ${topic.colorCode}">
            <div class="grammar-category">${topic.category}</div>
            <h3>${topic.topic}</h3>
            <p>${topic.explanation.substring(0, 120)}...</p>
        </div>
    `).join('');
}

function showGrammarDetail(topicId) {
    const topic = grammarData.find(t => t.id === topicId);
    if (!topic) return;
    
    // Hide grammar list, show detail view
    document.getElementById('grammar-list').style.display = 'none';
    document.getElementById('grammar-detail').classList.remove('hidden');
    
    // Build detail content
    const content = document.getElementById('grammar-content');
    content.innerHTML = `
        <h2 style="color: ${topic.colorCode}">${topic.topic}</h2>
        <p style="font-size: 1.1rem; margin-bottom: 2rem;">${topic.explanation}</p>
        
        <h3>📋 Rules</h3>
        ${topic.rules.map(rule => `<div class="grammar-rule">• ${rule}</div>`).join('')}
        
        <h3>📝 Patterns & Examples</h3>
        ${topic.patterns.map(pattern => `
            <div class="grammar-pattern">
                <strong>${pattern.base}</strong>
                <div class="grammar-examples">
                    ${pattern.examples.map(ex => `<div>→ ${ex}</div>`).join('')}
                </div>
            </div>
        `).join('')}
        
        ${topic.miniStory ? `
            <h3>📖 Mini Story</h3>
            <div class="grammar-pattern">
                <p style="font-style: italic;">${topic.miniStory}</p>
            </div>
        ` : ''}
    `;
}

function closeGrammarDetail() {
    document.getElementById('grammar-list').style.display = 'grid';
    document.getElementById('grammar-detail').classList.add('hidden');
}

// ===========================
// Quiz System
// ===========================
function startQuiz(type) {
    currentQuizType = type;
    currentQuestionIndex = 0;
    quizScore = 0;
    
    // Generate questions based on type
    if (type === 'flashcard') {
        generateFlashcards();
    } else if (type === 'multiple-choice') {
        generateMultipleChoice();
    } else if (type === 'fill-blank') {
        generateFillBlanks();
    }
    
    // Show quiz container
    document.querySelector('.quiz-options').style.display = 'none';
    document.getElementById('quiz-container').classList.remove('hidden');
    
    showQuestion();
}

function backToQuizOptions() {
    document.querySelector('.quiz-options').style.display = 'flex';
    document.getElementById('quiz-container').classList.add('hidden');
    currentQuestionIndex = 0;
    quizScore = 0;
}

function generateFlashcards() {
    // Use vocabulary data plus local dictionary for 1000+ words
    const vocabCards = vocabularyData.map(word => ({
        type: 'flashcard',
        front: word.word,
        back: word.translation,
        word: word,
        originalTranslation: word.translation
    }));
    
    // Add words from localDictionary if available
    if (typeof localDictionary !== 'undefined' && localDictionary['hu-en']) {
        const dictEntries = Object.entries(localDictionary['hu-en']);
        const dictCards = dictEntries.map(([hungarian, english], index) => ({
            type: 'flashcard',
            front: hungarian,
            back: english,
            word: { id: 200 + index + 1, word: hungarian, translation: english },
            originalTranslation: english
        }));
        currentQuizQuestions = [...vocabCards, ...dictCards];
    } else {
        currentQuizQuestions = vocabCards;
    }
}

function generateMultipleChoice() {
    // Combine vocabulary and dictionary words
    let allWords = [...vocabularyData];
    if (typeof localDictionary !== 'undefined' && localDictionary['hu-en']) {
        const dictEntries = Object.entries(localDictionary['hu-en']);
        const dictWords = dictEntries.map(([hungarian, english], index) => ({
            id: 200 + index + 1,
            word: hungarian,
            translation: english
        }));
        allWords = [...allWords, ...dictWords];
    }
    
    // Shuffle and take 50 random words
    const shuffled = allWords.sort(() => Math.random() - 0.5);
    currentQuizQuestions = shuffled.slice(0, 50).map(word => {
        // Generate 3 wrong answers
        const wrongAnswers = allWords
            .filter(w => w.id !== word.id && w.translation !== word.translation)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(w => w.translation);
        
        const options = [word.translation, ...wrongAnswers].sort(() => Math.random() - 0.5);
        
        return {
            type: 'multiple-choice',
            question: `What does "${word.word}" mean?`,
            options: options,
            correct: word.translation
        };
    });
}

function generateFillBlanks() {
    currentQuizQuestions = vocabularyData
        .filter(w => w.exampleSentence && w.exampleTranslation)
        .sort(() => Math.random() - 0.5)
        .map(word => ({
            type: 'fill-blank',
            question: word.exampleTranslation,
            hint: `Key word: "${word.translation}" = "${word.word}"`,
            correct: word.exampleSentence.toLowerCase().trim(),
            displayCorrect: word.exampleSentence
        }));
}

function showQuestion() {
    if (currentQuestionIndex >= currentQuizQuestions.length) {
        showQuizResults();
        return;
    }
    
    const question = currentQuizQuestions[currentQuestionIndex];
    const questionDiv = document.getElementById('quiz-question');
    const feedbackDiv = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('quiz-next');
    
    // Update progress
    document.getElementById('quiz-current').textContent = currentQuestionIndex + 1;
    document.getElementById('quiz-total').textContent = currentQuizQuestions.length;
    
    // Hide feedback and next button
    feedbackDiv.classList.add('hidden');
    nextBtn.classList.add('hidden');
    
    // Render question based on type
    if (question.type === 'flashcard') {
        // Show 12 cards per page
        const startIdx = Math.floor(currentQuestionIndex / 12) * 12;
        const endIdx = Math.min(startIdx + 12, currentQuizQuestions.length);
        const cardsToShow = currentQuizQuestions.slice(startIdx, endIdx);
        const totalPages = Math.ceil(currentQuizQuestions.length / 12);
        
        questionDiv.innerHTML = `
            <h3>Click each card to reveal the answer (${startIdx + 1}-${endIdx} of ${currentQuizQuestions.length})</h3>
            <div class="flashcards-grid">
                ${cardsToShow.map((card, idx) => {
                    const globalIdx = startIdx + idx;
                    const ipa = card.word && card.word.ipa ? card.word.ipa : '';
                    return `
                    <div class="flashcard-wrapper">
                        <div class="flashcard" id="flashcard-${globalIdx}" onclick="flipSingleCard(${globalIdx})">
                            <div class="flashcard-front">
                                <button class="flashcard-speaker" onclick="event.stopPropagation(); speakHungarian('${card.front.replace(/'/g, "\\'")}', event)" title="Listen to pronunciation">🔊</button>
                                <div class="flashcard-word">${card.front}</div>
                                ${ipa ? `<div class="flashcard-ipa">/${ipa}/</div>` : ''}
                            </div>
                            <div class="flashcard-back">
                                <div class="translation-loading" id="flashcard-translation-${globalIdx}">⏳ Translating...</div>
                            </div>
                        </div>
                    </div>
                `;
                }).join('')}
            </div>
            <div class="flashcard-pagination">
                ${Array.from({length: totalPages}, (_, i) => {
                    const pageNum = (i + 1) * 12;
                    const isActive = Math.floor(currentQuestionIndex / 12) === i;
                    return `<button class="page-btn ${isActive ? 'active' : ''}" onclick="goToPage(${i})">${pageNum}</button>`;
                }).join('')}
            </div>
        `;
        
        // Load translations for all cards
        cardsToShow.forEach((card, idx) => {
            const globalIdx = startIdx + idx;
            loadFlashcardTranslation(card, globalIdx);
        });
        
        nextBtn.classList.add('hidden');
    } else if (question.type === 'multiple-choice') {
        questionDiv.innerHTML = `
            <h3>${question.question}</h3>
            <div class="quiz-options-list">
                ${question.options.map((opt, idx) => `
                    <button class="quiz-option-btn" onclick="checkAnswer('${opt}', '${question.correct}', ${idx})">
                        ${opt}
                    </button>
                `).join('')}
            </div>
        `;
    } else if (question.type === 'fill-blank') {
        questionDiv.innerHTML = `
            <h3>Translate this sentence to Hungarian:</h3>
            <p style="font-size: 1.3rem; margin: 1.5rem 0; font-weight: 600; color: #495057;">
                ${question.question}
            </p>
            <p style="color: #6c757d; margin-bottom: 1rem; font-size: 0.95rem;">
                💡 ${question.hint}
            </p>
            <input type="text" class="quiz-input" id="fill-answer" placeholder="Type the full Hungarian sentence..." autocomplete="off">
            <button class="btn-primary" onclick="checkFillBlank('${question.correct.replace(/'/g, "\\'")}', '${question.displayCorrect.replace(/'/g, "\\'")}')">Submit</button>
        `;
    }
}

let cardFlipped = false;

function flipCard() {
    const card = document.getElementById('flashcard');
    if (card) card.classList.toggle('flipped');
}

function flipSingleCard(index) {
    const card = document.getElementById(`flashcard-${index}`);
    if (card) card.classList.toggle('flipped');
}

/**
 * Try to translate Hungarian to English using LibreTranslate
 */
async function tryTranslateHuToEn(text) {
    const LT_URL = "http://localhost:5000";
    
    try {
        const payload = {
            q: text,
            source: "hu",
            target: "en",
            format: "text"
        };

        const response = await fetch(`${LT_URL}/translate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.translatedText || null;

    } catch (err) {
        return null;
    }
}

/**
 * Get flashcard back translation with random LT usage
 */
async function getFlashcardBackRandom(card, probability = 0.3) {
    if (Math.random() < probability) {
        const lt = await tryTranslateHuToEn(card.front);
        if (lt) return { translation: lt, source: 'libretranslate' };
    }
    return { translation: card.originalTranslation, source: 'curated' };
}

/**
 * Load flashcard translation (random: sometimes LibreTranslate, sometimes original)
 */
async function loadFlashcardTranslation(card, index) {
    const translationDiv = document.getElementById(`flashcard-translation-${index}`);
    if (!translationDiv) return;
    
    // Randomly decide whether to use LibreTranslate (70% chance for testing)
    const result = await getFlashcardBackRandom(card, 0.7);
    
    console.log(`Card: ${card.front} -> Source: ${result.source}, Translation: ${result.translation}`);
    
    if (result.source === 'libretranslate') {
        // LibreTranslate was used
        translationDiv.innerHTML = `
            <div class="translation-primary">${result.translation}</div>
            <div class="translation-source">🌐 LibreTranslate</div>
        `;
    } else {
        // Curated translation was used
        translationDiv.innerHTML = `
            <div class="translation-primary">${result.translation}</div>
            <div class="translation-source">📚 Curated</div>
        `;
    }
}

/**
 * Load alternative translation from LibreTranslate
 */
async function loadAlternativeTranslation(card, index) {
    const altDiv = document.getElementById(`alt-translation-${index}`);
    if (!altDiv) return;
    
    try {
        const result = await translator.translate(card.front, 'hu', 'en');
        const altTranslation = result.translatedText;
        
        // Check if translations are significantly different
        const original = card.originalTranslation.toLowerCase().trim();
        const alternative = altTranslation.toLowerCase().trim();
        
        if (original === alternative) {
            // Same translation, show confirmation
            altDiv.innerHTML = `<div class="translation-alternative">✓ Confirmed: ${altTranslation}</div>`;
        } else {
            // Different translation, show both
            altDiv.innerHTML = `<div class="translation-alternative">🤖 AI suggests: ${altTranslation}</div>`;
        }
    } catch (error) {
        // LibreTranslate failed, show original only
        altDiv.innerHTML = `<div class="translation-fallback">📚 Curated translation</div>`;
    }
}

function goToPage(pageIndex) {
    currentQuestionIndex = pageIndex * 12;
    showQuestion();
}

function checkAnswer(selected, correct, btnIndex) {
    const buttons = document.querySelectorAll('.quiz-option-btn');
    const feedbackDiv = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('quiz-next');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    if (selected === correct) {
        buttons[btnIndex].classList.add('correct');
        feedbackDiv.textContent = '✅ Correct! Well done!';
        feedbackDiv.className = 'quiz-feedback correct';
        quizScore++;
    } else {
        buttons[btnIndex].classList.add('incorrect');
        // Highlight correct answer
        buttons.forEach(btn => {
            if (btn.textContent.trim() === correct) {
                btn.classList.add('correct');
            }
        });
        feedbackDiv.textContent = `❌ Incorrect. The correct answer is: ${correct}`;
        feedbackDiv.className = 'quiz-feedback incorrect';
    }
    
    feedbackDiv.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
}

function checkFillBlank(correct, displayCorrect) {
    const answer = document.getElementById('fill-answer').value.trim().toLowerCase();
    const correctAnswer = correct.toLowerCase();
    const feedbackDiv = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('quiz-next');
    
    if (answer === correctAnswer) {
        feedbackDiv.innerHTML = `
            ✅ Correct! Well done!
            <button class="speaker-btn" onclick="speakHungarian('${displayCorrect.replace(/'/g, "\\'")}', event)" style="margin-left: 10px;">🔊 Hear it</button>
        `;
        feedbackDiv.className = 'quiz-feedback correct';
        quizScore++;
    } else {
        feedbackDiv.innerHTML = `
            ❌ Incorrect. The correct answer is: <strong>${displayCorrect}</strong>
            <button class="speaker-btn" onclick="speakHungarian('${displayCorrect.replace(/'/g, "\\'")}', event)" style="margin-left: 10px;">🔊 Hear correct answer</button>
        `;
        feedbackDiv.className = 'quiz-feedback incorrect';
    }
    
    feedbackDiv.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    cardFlipped = false;
    // Jump to next set of 12 cards
    const currentPage = Math.floor(currentQuestionIndex / 12);
    currentQuestionIndex = (currentPage + 1) * 12;
    showQuestion();
}

function showQuizResults() {
    const questionDiv = document.getElementById('quiz-question');
    const resultsDiv = document.getElementById('quiz-results');
    const nextBtn = document.getElementById('quiz-next');
    const feedbackDiv = document.getElementById('quiz-feedback');
    
    questionDiv.innerHTML = '';
    nextBtn.classList.add('hidden');
    feedbackDiv.classList.add('hidden');
    
    const percentage = Math.round((quizScore / currentQuizQuestions.length) * 100);
    
    resultsDiv.innerHTML = `
        <h2>🎉 Quiz Complete!</h2>
        <div class="quiz-score">${quizScore} / ${currentQuizQuestions.length}</div>
        <p style="font-size: 1.5rem; color: #6c757d;">${percentage}%</p>
        <p style="margin-top: 2rem;">
            ${percentage >= 80 ? '🌟 Excellent work!' : 
              percentage >= 60 ? '👍 Good job! Keep practicing!' : 
              '💪 Keep studying! You\'ll get there!'}
        </p>
        <button class="btn-primary" style="margin-top: 2rem;" onclick="resetQuiz()">Take Another Quiz</button>
    `;
    
    resultsDiv.classList.remove('hidden');
}

function resetQuiz() {
    document.querySelector('.quiz-options').style.display = 'grid';
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('quiz-results').classList.add('hidden');
}

// ===========================
// Suffix Builder
// ===========================
function updateBuilder() {
    const select = document.getElementById('base-word-select');
    currentBaseWord = select.value;
    builderSuffixes = [];
    
    document.getElementById('builder-base').textContent = currentBaseWord;
    document.getElementById('suffix-chain').innerHTML = '';
    document.getElementById('current-word-display').textContent = currentBaseWord;
    
    // Find word meaning
    const wordData = vocabularyData.find(w => w.word === currentBaseWord);
    const meaning = wordData ? wordData.translation : 'house/apple/book/water/hand';
    document.getElementById('current-meaning').textContent = meaning;
}

function addSuffix(suffixType, meaning) {
    let suffix = '';
    let cssClass = '';
    
    // Apply vowel harmony rules (simplified)
    const hasBackVowels = /[aáoóuú]/.test(currentBaseWord);
    
    switch(suffixType) {
        case 'ban':
            suffix = hasBackVowels ? 'ban' : 'ben';
            cssClass = 'location';
            meaning = 'in';
            break;
        case 'ból':
            suffix = hasBackVowels ? 'ból' : 'ből';
            cssClass = 'location';
            meaning = 'from';
            break;
        case 'am':
            suffix = hasBackVowels ? 'am' : 'em';
            cssClass = 'possession';
            meaning = 'my';
            break;
        case 'ak':
            suffix = hasBackVowels ? 'ak' : 'ek';
            cssClass = 'plural';
            meaning = 'PL';
            break;
        case 'at':
            suffix = hasBackVowels ? 'at' : 'et';
            cssClass = 'accusative';
            meaning = 'ACC';
            break;
    }
    
    builderSuffixes.push({ suffix, cssClass, meaning });
    renderSuffixChain();
}

function renderSuffixChain() {
    const chain = document.getElementById('suffix-chain');
    chain.innerHTML = builderSuffixes.map(s => 
        `<span class="suffix-item ${s.cssClass}">${s.suffix}</span>`
    ).join('');
    
    // Update current word display
    const fullWord = currentBaseWord + builderSuffixes.map(s => s.suffix).join('');
    document.getElementById('current-word-display').textContent = fullWord;
    
    // Update meaning
    const wordData = vocabularyData.find(w => w.word === currentBaseWord);
    const baseMeaning = wordData ? wordData.translation : currentBaseWord;
    const suffixMeanings = builderSuffixes.map(s => s.meaning).join(' + ');
    document.getElementById('current-meaning').textContent = 
        suffixMeanings ? `${baseMeaning} + ${suffixMeanings}` : baseMeaning;
}

function clearSuffixes() {
    builderSuffixes = [];
    renderSuffixChain();
    updateBuilder();
}

// ===========================
// Translation Module
// ===========================

/**
 * Initialize translation module
 */
function initializeTranslation() {
    console.log('🌐 Translation module initialized');
    updateAPIStatus('ready', 'Ready');
    
    // Pre-populate vocabulary helper
    renderVocabTranslateList();
}

/**
 * Switch between translation modes
 */
function switchTranslateMode(mode) {
    currentTranslateMode = mode;
    
    // Update mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide mode panels
    document.querySelectorAll('.translate-mode').forEach(panel => {
        panel.classList.remove('active');
    });
    
    document.getElementById(`${mode}-translate-mode`).classList.add('active');
}

/**
 * Handle text input with debouncing
 */
function handleTextInput() {
    const sourceText = document.getElementById('source-text').value;
    const charCount = document.getElementById('source-char-count');
    charCount.textContent = sourceText.length;
    
    // Auto-translate if enabled (debounced)
    clearTimeout(translationTimeout);
    // Disabled auto-translate to save API calls
}

/**
 * Handle file upload for translation
 */
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('File is too large. Please upload a file smaller than 10MB.');
        return;
    }
    
    const fileName = file.name;
    const fileExt = fileName.split('.').pop().toLowerCase();
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    
    try {
        let content = '';
        
        if (fileExt === 'pdf') {
            // Handle PDF files
            content = await extractTextFromPDF(file);
            if (!content.trim()) {
                // PDF has no text, try OCR
                alert('📷 No text found in PDF. Attempting OCR (this may take a moment)...');
                content = await extractTextFromPDFWithOCR(file);
            }
        } else if (imageExtensions.includes(fileExt)) {
            // Handle image files with OCR
            showOCRProgress(true);
            content = await extractTextFromImage(file);
            showOCRProgress(false);
        } else {
            // Handle text files (.txt, .md, etc.)
            content = await readTextFile(file);
        }
        
        if (!content.trim()) {
            alert('❌ No text could be extracted from the file.');
            return;
        }
        
        document.getElementById('source-text').value = content;
        handleTextInput(); // Update character count
        
        // Show notification
        alert(`✅ File "${fileName}" loaded successfully (${content.length} characters)! Click "Translate" to translate the content.`);
    } catch (error) {
        console.error('Error reading file:', error);
        alert('❌ Error reading file: ' + error.message);
        showOCRProgress(false);
    }
    
    // Reset file input so the same file can be uploaded again
    event.target.value = '';
}

/**
 * Show/hide OCR progress indicator
 */
function showOCRProgress(show, progress = 0, status = 'Processing image...') {
    const progressDiv = document.getElementById('ocr-progress');
    const progressFill = document.getElementById('ocr-progress-fill');
    const progressText = document.getElementById('ocr-progress-text');
    
    if (progressDiv) {
        progressDiv.style.display = show ? 'block' : 'none';
        if (show && progressFill && progressText) {
            progressFill.style.width = `${progress}%`;
            progressText.textContent = status;
        }
    }
}

/**
 * Read text file
 */
function readTextFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}

/**
 * Extract text from PDF file
 */
async function extractTextFromPDF(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async function(e) {
            try {
                const typedarray = new Uint8Array(e.target.result);
                
                // Configure PDF.js worker
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                
                // Load the PDF
                const pdf = await pdfjsLib.getDocument(typedarray).promise;
                let fullText = '';
                
                // Extract text from each page
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    fullText += pageText + '\n\n';
                }
                
                resolve(fullText.trim());
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = () => reject(new Error('Failed to read PDF file'));
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Extract text from scanned PDF using OCR
 */
async function extractTextFromPDFWithOCR(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async function(e) {
            try {
                const typedarray = new Uint8Array(e.target.result);
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                
                const pdf = await pdfjsLib.getDocument(typedarray).promise;
                let fullText = '';
                
                showOCRProgress(true, 0, 'Processing PDF pages...');
                
                // Process each page
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const viewport = page.getViewport({ scale: 2.0 });
                    
                    // Create canvas to render page
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    
                    await page.render({ canvasContext: context, viewport: viewport }).promise;
                    
                    // OCR the rendered page
                    const progress = Math.round((pageNum / pdf.numPages) * 100);
                    showOCRProgress(true, progress, `OCR Page ${pageNum}/${pdf.numPages}...`);
                    
                    const result = await Tesseract.recognize(canvas, 'eng+hun', {
                        logger: m => console.log(m)
                    });
                    
                    fullText += result.data.text + '\n\n';
                }
                
                resolve(fullText.trim());
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = () => reject(new Error('Failed to read PDF file'));
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Extract text from image using OCR
 */
async function extractTextFromImage(file) {
    try {
        showOCRProgress(true, 10, 'Loading image...');
        
        const result = await Tesseract.recognize(file, 'eng+hun', {
            logger: m => {
                if (m.status === 'recognizing text') {
                    const progress = Math.round(m.progress * 100);
                    showOCRProgress(true, progress, `Recognizing text: ${progress}%`);
                }
            }
        });
        
        return result.data.text;
    } catch (error) {
        throw new Error('OCR failed: ' + error.message);
    }
}

/**
 * Perform translation
 */
async function performTranslation() {
    const sourceText = document.getElementById('source-text').value.trim();
    const sourceLang = document.getElementById('source-lang').value;
    const targetLang = document.getElementById('target-lang').value;
    const targetDiv = document.getElementById('target-text');
    const infoDiv = document.getElementById('translation-info');
    
    if (!sourceText) {
        alert('Please enter text to translate');
        return;
    }
    
    // Show loading state
    targetDiv.classList.add('loading');
    targetDiv.textContent = '';
    infoDiv.innerHTML = '';
    updateAPIStatus('loading', 'Translating...');
    
    try {
        const result = await translator.translate(sourceText, sourceLang, targetLang);
        
        // Display result
        targetDiv.classList.remove('loading');
        targetDiv.textContent = result.translatedText;
        
        // Show translation info with offline note if applicable
        let statusText = result.cached ? '⚡ From Cache' : '🌐 Live Translation';
        if (result.offline) {
            statusText = '📚 Offline Dictionary';
        }
        
        infoDiv.innerHTML = `
            <span>📍 ${TranslateUtils.getLanguageName(result.sourceLang)} → ${TranslateUtils.getLanguageName(result.targetLang)}</span>
            <span>${statusText}</span>
            ${result.note ? `<span style="color: #ff9800; font-size: 0.85rem;">${result.note}</span>` : ''}
        `;
        
        updateAPIStatus('active', result.offline ? 'Using offline dictionary' : 'Translation complete');
        updateCacheInfo();
        
    } catch (error) {
        targetDiv.classList.remove('loading');
        targetDiv.textContent = `❌ ${error.message}`;
        updateAPIStatus('error', 'Translation failed');
        console.error('Translation error:', error);
    }
}

/**
 * Swap source and target languages
 */
function swapLanguages() {
    const sourceSelect = document.getElementById('source-lang');
    const targetSelect = document.getElementById('target-lang');
    const sourceText = document.getElementById('source-text');
    const targetText = document.getElementById('target-text');
    
    // Swap language selections
    const tempLang = sourceSelect.value;
    sourceSelect.value = targetSelect.value;
    targetSelect.value = tempLang;
    
    // Swap text content
    const tempText = sourceText.value;
    sourceText.value = targetText.textContent;
    targetText.textContent = tempText;
    
    // Update char count
    document.getElementById('source-char-count').textContent = sourceText.value.length;
}

/**
 * Copy translation to clipboard
 */
function copyTranslation() {
    const targetText = document.getElementById('target-text').textContent;
    
    if (!targetText || targetText.includes('Translation will appear here')) {
        alert('No translation to copy');
        return;
    }
    
    navigator.clipboard.writeText(targetText).then(() => {
        // Visual feedback
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✅';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 1500);
    }).catch(err => {
        alert('Failed to copy: ' + err.message);
    });
}

/**
 * Clear translation
 */
function clearTranslation() {
    document.getElementById('source-text').value = '';
    document.getElementById('target-text').textContent = 'Translation will appear here...';
    document.getElementById('translation-info').innerHTML = '';
    document.getElementById('source-char-count').textContent = '0';
    updateAPIStatus('ready', 'Ready');
}

/**
 * Save translation to vocabulary (placeholder)
 */
function saveToVocabulary() {
    const sourceText = document.getElementById('source-text').value.trim();
    const targetText = document.getElementById('target-text').textContent;
    
    if (!sourceText || !targetText || targetText.includes('Translation will appear here')) {
        alert('Please translate something first');
        return;
    }
    
    // Save to local storage or vocabulary list
    savedTranslations.push({
        original: sourceText,
        translation: targetText,
        timestamp: new Date().toISOString()
    });
    
    alert('✅ Saved to your vocabulary!\n\n' + sourceText + ' → ' + targetText);
    console.log('Saved translations:', savedTranslations);
}

/**
 * Update API status indicator
 */
function updateAPIStatus(status, message) {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.getElementById('status-text');
    
    statusIndicator.className = 'status-indicator ' + status;
    statusText.textContent = message;
}

/**
 * Update cache information
 */
function updateCacheInfo() {
    const stats = translator.getCacheStats();
    document.getElementById('cache-info').textContent = 
        `Cache: ${stats.size}/${stats.maxSize} items`;
}

/**
 * Test API connection
 */
async function testAPIConnection() {
    updateAPIStatus('loading', 'Testing connection...');
    
    try {
        const result = await translator.testConnection();
        
        if (result.success) {
            alert(`✅ Connection successful!\n\nEndpoint: ${result.endpoint}\nTest: "Hello" → "${result.testTranslation}"`);
            updateAPIStatus('active', 'Connected');
        } else {
            alert(`❌ Connection failed\n\n${result.error}`);
            updateAPIStatus('error', 'Connection failed');
        }
    } catch (error) {
        alert(`❌ Connection test failed\n\n${error.message}`);
        updateAPIStatus('error', 'Test failed');
    }
}

/**
 * Clear translation cache
 */
function clearTranslationCache() {
    translator.clearCache();
    updateCacheInfo();
    alert('✅ Translation cache cleared');
}

// ===========================
// Vocabulary Helper Mode
// ===========================

/**
 * Render vocabulary list for translation
 */
function renderVocabTranslateList() {
    const container = document.getElementById('vocab-translate-results');
    
    if (!vocabularyData || vocabularyData.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #6c757d;">Loading vocabulary...</p>';
        return;
    }
    
    container.innerHTML = vocabularyData.slice(0, 10).map(word => `
        <div class="vocab-translate-item">
            <div class="vocab-translate-word">${word.word}</div>
            <div class="vocab-translate-translation">${word.translation}</div>
            <div class="vocab-translate-example">${word.exampleSentence}</div>
            <button class="translate-btn-small" onclick="translateVocabExample('${word.exampleSentence.replace(/'/g, "\\'")}')">
                Translate Example
            </button>
        </div>
    `).join('');
}

/**
 * Search vocabulary
 */
function searchVocabulary() {
    const searchTerm = document.getElementById('vocab-search-input').value.toLowerCase();
    const container = document.getElementById('vocab-translate-results');
    
    if (!searchTerm) {
        renderVocabTranslateList();
        return;
    }
    
    const filtered = vocabularyData.filter(word => 
        word.word.toLowerCase().includes(searchTerm) ||
        word.translation.toLowerCase().includes(searchTerm) ||
        word.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #6c757d;">No vocabulary found</p>';
        return;
    }
    
    container.innerHTML = filtered.map(word => `
        <div class="vocab-translate-item">
            <div class="vocab-translate-word">${word.word}</div>
            <div class="vocab-translate-translation">${word.translation}</div>
            <div class="vocab-translate-example">${word.exampleSentence}</div>
            <button class="translate-btn-small" onclick="translateVocabExample('${word.exampleSentence.replace(/'/g, "\\'")}')">
                Translate Example
            </button>
        </div>
    `).join('');
}

/**
 * Translate vocabulary example
 */
async function translateVocabExample(sentence) {
    // Switch to text translation mode
    switchTranslateMode('text');
    
    // Fill in the sentence
    document.getElementById('source-text').value = sentence;
    document.getElementById('source-lang').value = 'hu';
    document.getElementById('target-lang').value = 'en';
    
    // Perform translation
    await performTranslation();
}

// ===========================
// Batch Translation Mode
// ===========================

/**
 * Perform batch translation
 */
async function performBatchTranslation() {
    const input = document.getElementById('batch-input').value.trim();
    const sourceLang = document.getElementById('batch-source-lang').value;
    const targetLang = document.getElementById('batch-target-lang').value;
    const resultsDiv = document.getElementById('batch-results');
    
    if (!input) {
        alert('Please enter text to translate (one sentence per line)');
        return;
    }
    
    // Split by newlines
    const lines = input.split('\n').filter(line => line.trim().length > 0);
    
    if (lines.length === 0) {
        alert('No valid lines to translate');
        return;
    }
    
    // Limit to 50 lines to prevent server overload
    const MAX_BATCH_LINES = 50;
    if (lines.length > MAX_BATCH_LINES) {
        alert(`⚠️ Batch translation is limited to ${MAX_BATCH_LINES} lines at a time.\nYou have ${lines.length} lines.\n\nPlease split your text into smaller batches.`);
        return;
    }
    
    // Show loading
    resultsDiv.innerHTML = '<p style="text-align: center;">⏳ Translating ' + lines.length + ' lines...</p>';
    updateAPIStatus('loading', 'Batch translating...');
    
    try {
        const results = await translator.translateBatch(lines, sourceLang, targetLang);
        
        // Display results
        resultsDiv.innerHTML = results.map((result, idx) => {
            if (result.success) {
                return `
                    <div class="batch-result-item">
                        <div class="batch-result-original">${idx + 1}. ${result.original}</div>
                        <div class="batch-result-translation">→ ${result.translatedText}</div>
                    </div>
                `;
            } else {
                return `
                    <div class="batch-result-item error">
                        <div class="batch-result-original">${idx + 1}. ${result.original}</div>
                        <div class="batch-result-error">❌ ${result.error}</div>
                    </div>
                `;
            }
        }).join('');
        
        updateAPIStatus('active', `Batch translation complete (${lines.length} lines)`);
        updateCacheInfo();
        
    } catch (error) {
        resultsDiv.innerHTML = `<p style="color: red; text-align: center;">❌ Error: ${error.message}</p>`;
        updateAPIStatus('error', error.message);
    }
}

// ===========================
// Utility Functions
// ===========================
function playAudio(filename) {
    const audio = new Audio(filename);
    audio.play().catch(err => console.log('Audio not available:', err));
}

// Text-to-Speech for Hungarian words
function speakHungarian(text, event) {
    if (event) {
        event.stopPropagation();
    }
    
    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'hu-HU'; // Hungarian language
        utterance.rate = 0.8; // Slightly slower for learning
        utterance.pitch = 1;
        
        window.speechSynthesis.speak(utterance);
    } else {
        console.log('Text-to-speech not supported in this browser');
    }
}

console.log('🇭🇺 aMagyar app loaded successfully!');
