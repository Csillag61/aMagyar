// ===========================
// LibreTranslate API Wrapper
// ===========================

/**
 * Simple translator using LibreTranslate API with offline fallback
 * Dictionary loaded from dictionary-1000.js (referenced as global variable)
 */

// Note: localDictionary is loaded from dictionary-1000.js
// It contains ~1000 Hungarian-English word pairs for offline translation

// API Configuration
const API_URL = 'http://localhost:5000/translate'; // LibreTranslate local server
const API_KEY = ''; // No API key needed for local server
const USE_API = true; // Enable API when local server is running

// Simple local translation fallback
function translateLocal(text, sourceLang, targetLang) {
    const dictKey = `${sourceLang}-${targetLang}`;
    const dict = localDictionary[dictKey];
    
    if (!dict) {
        return null;
    }
    
    const lowerText = text.toLowerCase().trim();
    
    // Try exact match first
    if (dict[lowerText]) {
        return dict[lowerText];
    }
    
    // Try word-by-word translation, preserving punctuation
    const words = text.trim().split(/\s+/);
    let translatedCount = 0;
    
    const translated = words.map(word => {
        // Extract punctuation
        const matches = word.match(/^([.,!?;:"']*)(.*?)([.,!?;:"']*)$/);
        if (!matches) return word;
        
        const [, prefix, core, suffix] = matches;
        const cleanWord = core.toLowerCase();
        
        if (dict[cleanWord]) {
            translatedCount++;
            // Preserve capitalization pattern
            let result = dict[cleanWord];
            if (core[0] === core[0].toUpperCase() && core.length > 1) {
                result = result.charAt(0).toUpperCase() + result.slice(1);
            } else if (core === core.toUpperCase() && core.length > 1) {
                result = result.toUpperCase();
            }
            return prefix + result + suffix;
        }
        return word;
    });
    
    // Require at least 70% of words to be translated to avoid mixed-language output
    const translationRatio = translatedCount / words.length;
    if (translationRatio < 0.7) {
        return null; // Not enough coverage, let API handle it or show original
    }
    
    return translated.join(' ');
}

// Main translator object
const translator = (function() {
    // Translation cache to avoid repeat API calls
    const cache = new Map();
    const MAX_CACHE_SIZE = 200;
    
    /**
     * Translate text from source to target language
     */
    async function translate(text, sourceLang = 'auto', targetLang = 'en') {
        const trimmed = text.trim();
        if (!trimmed) return { translatedText: '', offline: false };
        
        // Check cache first
        const cacheKey = `${sourceLang}::${targetLang}::${trimmed}`;
        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
        }
        
        // Try API translation if enabled (local server doesn't need API key)
        if (USE_API) {
            try {
                // Try API translation
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        q: trimmed,
                        source: sourceLang,
                        target: targetLang,
                        format: 'text',
                        api_key: API_KEY
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const result = {
                        translatedText: data.translatedText,
                        detectedLanguage: data.detectedLanguage,
                        sourceLang: sourceLang,
                        targetLang: targetLang,
                        offline: false
                    };
                    
                    // Cache successful result
                    if (cache.size >= MAX_CACHE_SIZE) {
                        const firstKey = cache.keys().next().value;
                        cache.delete(firstKey);
                    }
                    cache.set(cacheKey, result);
                    
                    return result;
                } else {
                    const errorData = await response.text();
                    console.warn('Translation API error:', response.status, errorData);
                }
            } catch (error) {
                console.warn('Translation API failed, using offline dictionary:', error);
            }
        }
        
        // Fall back to local dictionary
        const localTranslation = translateLocal(trimmed, sourceLang, targetLang);
        
        if (localTranslation && localTranslation !== trimmed) {
            const result = {
                translatedText: localTranslation,
                detectedLanguage: sourceLang,
                sourceLang: sourceLang,
                targetLang: targetLang,
                offline: true
            };
            
            // Cache offline result too
            if (cache.size >= MAX_CACHE_SIZE) {
                const firstKey = cache.keys().next().value;
                cache.delete(firstKey);
            }
            cache.set(cacheKey, result);
            
            return result;
        }
        
        // No translation available - throw error instead of returning original text
        const errorMsg = USE_API && !API_KEY 
            ? 'Translation unavailable. Please add an API key from https://portal.libretranslate.com or use the offline dictionary for individual words.'
            : 'Translation failed. This sentence is not in the offline dictionary. Try translating individual words or add an API key.';
        throw new Error(errorMsg);
    }
    
    /**
     * Translate multiple texts in batch
     */
    /**
     * Translate multiple texts in batch
     */
    async function translateBatch(texts, sourceLang = 'auto', targetLang = 'en') {
        const results = [];
        
        for (const text of texts) {
            try {
                const result = await translate(text, sourceLang, targetLang);
                results.push({
                    success: true,
                    original: text,
                    translatedText: result.translatedText,
                    offline: result.offline || false
                });
            } catch (error) {
                results.push({
                    success: false,
                    original: text,
                    error: error.message || 'Translation failed'
                });
            }
        }
        
        return results;
    }
    
    /**
     * Test connection to translation API
     */
    async function testConnection() {
        try {
            const result = await translate('hello', 'en', 'hu');
            return !result.offline;
        } catch {
            return false;
        }
    }
    
    /**
     * Get cache statistics
     */
    function getCacheStats() {
        return {
            size: cache.size,
            maxSize: MAX_CACHE_SIZE,
            entries: Array.from(cache.keys())
        };
    }
    
    /**
     * Clear translation cache
     */
    function clearCache() {
        cache.clear();
    }
    
    // Public API
    return {
        translate,
        translateBatch,
        testConnection,
        getCacheStats,
        clearCache
    };
})();

// Translation utilities
const TranslateUtils = {
    /**
     * Get language name from language code
     */
    getLanguageName(code) {
        if (!code) return 'Unknown';
        
        const languages = {
            'en': 'English',
            'hu': 'Hungarian',
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese',
            'ru': 'Russian',
            'zh': 'Chinese',
            'ja': 'Japanese',
            'auto': 'Auto-detect'
        };
        return languages[code] || code.toUpperCase();
    }
};

