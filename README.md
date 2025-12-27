# 🇭🇺 aMagyar - Hungarian Language Learning App

A friendly, modular web application for learning Hungarian vocabulary, grammar, and pronunciation.

## 📁 Project Structure

```
aMagyar/
├── index.html          # Main app interface
├── styles.css          # Complete styling with color-coded modules
├── app.js              # All interactivity and quiz logic
├── translate-api.js    # LibreTranslate API wrapper (NEW!)
├── data/
│   ├── vocabulary.json # 20 beginner words with examples
│   ├── grammar.json    # 10 grammar modules
│   └── lessons.json    # 10 complete beginner lessons
├── README.md
├── QUICKSTART.md
└── TRANSLATION.md      # Translation module docs (NEW!)
```

## 🚀 How to Run

1. **Simple method:** Just open `index.html` in your web browser
2. **Local server (recommended):**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   
   # Using VS Code Live Server extension
   Right-click index.html → "Open with Live Server"
   ```
3. Navigate to `http://localhost:8000`

## ✨ Features Implemented

### 📚 **Lessons Screen**
- 10 beginner lessons covering:
  1. Greetings & Introductions
  2. Food & Drink
  3. Numbers 1-10
  4. Basic Verbs
  5. Family Members
  6. Colors
  7. Directions
  8. Time & Days
  9. Weather
  10. Emotions & Feelings
- Each lesson includes vocabulary, grammar, phrases, and a mini-story

### 📖 **Vocabulary Library**
- 20 vocabulary words with:
  - Hungarian word
  - IPA pronunciation
  - English translation
  - Example sentence (Hungarian + English)
  - Tags for filtering
  - Related forms (plurals, conjugations, cases)
- Filter by: All, Beginner, Food, Greetings, Verbs, Family, Colors

### 🔧 **Grammar Modules**
- 10 grammar topics:
  1. Vowel Harmony
  2. Accusative Case
  3. Plural
  4. Possessive Suffixes
  5. Verb Conjugation (Present Indefinite)
  6. Inessive Case (-ban/-ben)
  7. Personal Pronouns
  8. Word Order
  9. Negation
  10. Question Formation
- Each includes:
  - Clear explanation
  - Rules list
  - Pattern examples
  - Mini story
  - Color-coded by category

### 🎯 **Quiz System**
Three practice modes:
1. **Flashcards** - Click to reveal translation
2. **Multiple Choice** - Select correct translation
3. **Fill in the Blank** - Type missing word

Features:
- 10 questions per quiz
- Instant feedback
- Score tracking
- Percentage results

### 🧩 **Interactive Suffix Builder**
- Visual demonstration of Hungarian suffix system
- Color-coded suffixes:
  - **Blue** (Location): -ban/-ben, -ból/-ből
  - **Green** (Possession): -am/-em
  - **Red** (Plural): -ak/-ek
  - **Yellow** (Accusative): -at/-et
- Automatic vowel harmony application
- Real-time word transformation
- Shows cumulative meaning

### 🌐 **Translation Module (NEW!)**
- **Powered by LibreTranslate** - Free, open-source translation
- **Three modes:**
  1. Text Translation - Real-time Hungarian ↔ English (+ more languages)
  2. Vocabulary Helper - Quick lookup from word database
  3. Batch Translation - Translate multiple sentences at once
- **Smart features:**
  - Intelligent caching (reduces API calls)
  - Rate limiting protection
  - Multi-endpoint failover
  - Auto-language detection
  - Copy translations to clipboard
  - Save to vocabulary
- **Fully integrated** with existing lessons and vocabulary
- See [TRANSLATION.md](TRANSLATION.md) for detailed docs

## 🎨 Design Highlights

- **Modular Architecture** - Each component is independent and reusable
- **Color-Coded Learning** - Different grammar categories have distinct colors
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Cards flip, elements fade in, buttons respond
- **Clean UI** - Modern, uncluttered interface

## 📊 Data Structure

### Vocabulary Entry Example:
```json
{
  "word": "alma",
  "translation": "apple",
  "ipa": "ˈɒlmɒ",
  "exampleSentence": "Eszem egy almát.",
  "exampleTranslation": "I eat an apple.",
  "tags": ["food", "noun", "beginner"],
  "relatedForms": {
    "plural": "almák",
    "accusative": "almát"
  }
}
```

### Grammar Module Example:
```json
{
  "topic": "Vowel Harmony",
  "explanation": "Hungarian has vowel harmony...",
  "rules": ["Back vowel words take back suffixes..."],
  "patterns": [
    {
      "base": "ház (house)",
      "examples": ["házban (in the house)"]
    }
  ],
  "exercises": [...],
  "miniStory": "Ez egy ház. A ház nagy..."
}
```

## 🔮 Future Expansion Ideas

### Easy Additions:
- [ ] Add audio files for pronunciation
- [ ] More vocabulary words (expand to 100+)
- [ ] Additional lessons (intermediate/advanced)
- [ ] User progress tracking (localStorage)
- [ ] Spaced repetition algorithm

### Advanced Features:
- [ ] Convert to Progressive Web App (PWA)
- [ ] Add speech recognition for pronunciation practice
- [ ] Create mobile app (React Native/Flutter)
- [ ] Backend for user accounts
- [ ] Community features (share progress)
- [ ] AI chatbot for conversation practice

## 🛠️ Technology Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (ES6+)
- **Translation API:** LibreTranslate (free & open-source)
- **Data:** JSON files
- **No build tools required** - Runs anywhere with internet!

## 🎓 Learning Path Recommendation

1. Start with **Lessons 1-3** (greetings, food, numbers)
2. Review **Vocabulary** filtered by "beginner"
3. Study **Grammar**: Vowel Harmony → Accusative → Plural
4. Practice with **Quiz**: Start with flashcards
5. Experiment with **Suffix Builder**
6. Return to lessons 4-10 as you progress

## 📝 Customization Guide

### Adding New Vocabulary:
Edit `data/vocabulary.json` and add entries following the structure.

### Adding Grammar Topics:
Edit `data/grammar.json` with new topics, ensuring you assign a unique ID and color code.

### Creating Lessons:
Edit `data/lessons.json` - reference vocabulary and grammar IDs.

### Styling:
Modify `styles.css` - CSS variables are defined at the top for easy theming.

## 🤝 Contributing

This is a modular, expandable project! You can:
- Add more vocabulary
- Create new lesson topics
- Design additional quiz types
- Improve the suffix builder
- Add animations
- Create themed color schemes

## 📄 License

Free to use and modify for educational purposes.

## 🙏 Acknowledgments

Built for Hungarian language learners worldwide 🇭🇺

---

**Ready to learn Hungarian? Open `index.html` and start your journey!** 🚀
