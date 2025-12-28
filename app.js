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
function renderVocabulary(filterTag = 'all') {
    const container = document.getElementById('vocab-list');
    if (!container) return;
    
    const filteredVocab = filterTag === 'all' 
        ? vocabularyData 
        : vocabularyData.filter(word => word.tags.includes(filterTag));
    
    container.innerHTML = filteredVocab.map(word => `
        <div class="vocab-card">
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
    `).join('');
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

function generateFlashcards() {
    // Use first 10 vocabulary words
    currentQuizQuestions = vocabularyData.slice(0, 10).map(word => ({
        type: 'flashcard',
        front: word.word,
        back: word.translation,
        word: word
    }));
}

function generateMultipleChoice() {
    currentQuizQuestions = vocabularyData.slice(0, 10).map(word => {
        // Generate 3 wrong answers
        const wrongAnswers = vocabularyData
            .filter(w => w.id !== word.id)
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
        .filter(w => w.exampleSentence)
        .slice(0, 10)
        .map(word => ({
            type: 'fill-blank',
            question: word.exampleSentence.replace(word.word, '____'),
            hint: word.translation,
            correct: word.word
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
        questionDiv.innerHTML = `
            <h3>Click the card to reveal the answer</h3>
            <div class="flashcard" id="flashcard" onclick="flipCard()">
                <div>${question.front}</div>
            </div>
        `;
        setTimeout(() => {
            nextBtn.classList.remove('hidden');
        }, 500);
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
            <h3>Fill in the blank:</h3>
            <p style="font-size: 1.2rem; margin: 1rem 0;">${question.question}</p>
            <p style="color: #6c757d; margin-bottom: 1rem;">Hint: ${question.hint}</p>
            <input type="text" class="quiz-input" id="fill-answer" placeholder="Type your answer">
            <button class="btn-primary" onclick="checkFillBlank('${question.correct}')">Submit</button>
        `;
    }
}

let cardFlipped = false;

function flipCard() {
    const card = document.getElementById('flashcard');
    const question = currentQuizQuestions[currentQuestionIndex];
    
    if (!cardFlipped) {
        card.textContent = question.back;
        card.classList.add('flipped');
        cardFlipped = true;
    } else {
        card.textContent = question.front;
        card.classList.remove('flipped');
        cardFlipped = false;
    }
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

function checkFillBlank(correct) {
    const answer = document.getElementById('fill-answer').value.trim().toLowerCase();
    const correctAnswer = correct.toLowerCase();
    const feedbackDiv = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('quiz-next');
    
    if (answer === correctAnswer) {
        feedbackDiv.textContent = '✅ Correct! Well done!';
        feedbackDiv.className = 'quiz-feedback correct';
        quizScore++;
    } else {
        feedbackDiv.textContent = `❌ Incorrect. The correct answer is: ${correct}`;
        feedbackDiv.className = 'quiz-feedback incorrect';
    }
    
    feedbackDiv.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    cardFlipped = false;
    currentQuestionIndex++;
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
        
        updateAPIStatus('active', 'Batch translation complete');
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
