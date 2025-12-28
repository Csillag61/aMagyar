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
const API_URL = 'https://libretranslate.com/translate';
const API_KEY = ''; // Add your LibreTranslate API key here if you have one

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
    
    // Try word-by-word translation
    const words = lowerText.split(/\s+/);
    const translated = words.map(word => {
        // Remove punctuation for lookup
        const cleanWord = word.replace(/[.,!?;:]/g, '');
        return dict[cleanWord] || word;
    });
    
    const result = translated.join(' ');
    
    // Only return if we actually translated something
    return result !== lowerText ? result : null;
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
                    offline: false
                };
                
                // Cache successful result
                if (cache.size >= MAX_CACHE_SIZE) {
                    const firstKey = cache.keys().next().value;
                    cache.delete(firstKey);
                }
                cache.set(cacheKey, result);
                
                return result;
            }
        } catch (error) {
            console.warn('Translation API failed, using offline dictionary:', error);
        }
        
        // Fall back to local dictionary
        const localTranslation = translateLocal(trimmed, sourceLang, targetLang);
        
        if (localTranslation && localTranslation !== trimmed) {
            const result = {
                translatedText: localTranslation,
                detectedLanguage: sourceLang,
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
        
        // No translation available
        return {
            translatedText: trimmed,
            detectedLanguage: sourceLang,
            offline: true,
            error: 'Translation unavailable. Word not in offline dictionary.'
        };
    }
    
    /**
     * Translate multiple texts in batch
     */
    async function translateBatch(texts, sourceLang = 'auto', targetLang = 'en') {
        const promises = texts.map(text => translate(text, sourceLang, targetLang));
        return Promise.all(promises);
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

