// ===========================
// LibreTranslate API Wrapper
// ===========================

/**
 * LibreTranslate API Integration
 * Supports multiple instances and includes error handling, caching, and rate limiting
 */

class TranslateAPI {
    constructor(config = {}) {
        // Default to public LibreTranslate instance, but allow custom endpoints
        this.endpoints = config.endpoints || [
            'https://libretranslate.com',
            'https://translate.argosopentech.com',
            'https://translate.terraprint.co'
        ];
        
        this.currentEndpointIndex = 0;
        this.apiKey = config.apiKey || null; // Optional API key for rate limit increase
        this.cache = new Map(); // Cache translations to reduce API calls
        this.cacheExpiry = config.cacheExpiry || 3600000; // 1 hour default
        this.maxCacheSize = config.maxCacheSize || 100;
        
        // Rate limiting
        this.requestCount = 0;
        this.requestLimit = config.requestLimit || 20; // requests per minute
        this.rateLimitWindow = 60000; // 1 minute
        this.requestTimestamps = [];
        
        // Supported languages
        this.languages = null;
        this.loadLanguages();
    }
    
    /**
     * Get current API endpoint
     */
    getCurrentEndpoint() {
        return this.endpoints[this.currentEndpointIndex];
    }
    
    /**
     * Rotate to next endpoint on failure
     */
    rotateEndpoint() {
        this.currentEndpointIndex = (this.currentEndpointIndex + 1) % this.endpoints.length;
        console.log(`Switched to endpoint: ${this.getCurrentEndpoint()}`);
    }
    
    /**
     * Check if rate limit is exceeded
     */
    checkRateLimit() {
        const now = Date.now();
        // Remove timestamps older than rate limit window
        this.requestTimestamps = this.requestTimestamps.filter(
            timestamp => now - timestamp < this.rateLimitWindow
        );
        
        if (this.requestTimestamps.length >= this.requestLimit) {
            const oldestRequest = this.requestTimestamps[0];
            const waitTime = this.rateLimitWindow - (now - oldestRequest);
            throw new Error(`Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`);
        }
        
        this.requestTimestamps.push(now);
    }
    
    /**
     * Generate cache key for translation
     */
    getCacheKey(text, sourceLang, targetLang) {
        return `${sourceLang}:${targetLang}:${text}`;
    }
    
    /**
     * Get cached translation if available
     */
    getFromCache(text, sourceLang, targetLang) {
        const key = this.getCacheKey(text, sourceLang, targetLang);
        const cached = this.cache.get(key);
        
        if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
            console.log('Using cached translation');
            return cached.translation;
        }
        
        return null;
    }
    
    /**
     * Store translation in cache
     */
    addToCache(text, sourceLang, targetLang, translation) {
        const key = this.getCacheKey(text, sourceLang, targetLang);
        
        // Implement simple LRU cache
        if (this.cache.size >= this.maxCacheSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, {
            translation,
            timestamp: Date.now()
        });
    }
    
    /**
     * Load available languages from API
     */
    async loadLanguages() {
        try {
            const response = await fetch(`${this.getCurrentEndpoint()}/languages`);
            if (response.ok) {
                this.languages = await response.json();
                console.log('Languages loaded:', this.languages);
            }
        } catch (error) {
            console.warn('Failed to load languages:', error);
            // Fallback to known languages
            this.languages = [
                { code: 'en', name: 'English' },
                { code: 'hu', name: 'Hungarian' },
                { code: 'de', name: 'German' },
                { code: 'fr', name: 'French' },
                { code: 'es', name: 'Spanish' }
            ];
        }
    }
    
    /**
     * Detect language of text
     */
    async detectLanguage(text) {
        if (!text || text.trim().length === 0) {
            throw new Error('Text is required for language detection');
        }
        
        try {
            const response = await fetch(`${this.getCurrentEndpoint()}/detect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ q: text })
            });
            
            if (!response.ok) {
                throw new Error(`Detection failed: ${response.statusText}`);
            }
            
            const result = await response.json();
            return result[0]; // Returns array of detections with confidence
        } catch (error) {
            console.error('Language detection error:', error);
            throw error;
        }
    }
    
    /**
     * Main translation function
     * @param {string} text - Text to translate
     * @param {string} sourceLang - Source language code (e.g., 'en', 'hu')
     * @param {string} targetLang - Target language code
     * @param {object} options - Additional options
     */
    async translate(text, sourceLang = 'auto', targetLang = 'hu', options = {}) {
        // Validation
        if (!text || text.trim().length === 0) {
            throw new Error('Text is required for translation');
        }
        
        if (!targetLang) {
            throw new Error('Target language is required');
        }
        
        // Check cache first
        if (sourceLang !== 'auto') {
            const cached = this.getFromCache(text, sourceLang, targetLang);
            if (cached) {
                return {
                    translatedText: cached,
                    sourceLang,
                    targetLang,
                    cached: true
                };
            }
        }
        
        // Check rate limit
        try {
            this.checkRateLimit();
        } catch (error) {
            throw error;
        }
        
        // Prepare request
        const requestBody = {
            q: text,
            source: sourceLang,
            target: targetLang,
            format: options.format || 'text'
        };
        
        if (this.apiKey) {
            requestBody.api_key = this.apiKey;
        }
        
        // Try translation with endpoint rotation on failure
        let lastError;
        for (let i = 0; i < this.endpoints.length; i++) {
            try {
                const response = await fetch(`${this.getCurrentEndpoint()}/translate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
                
                if (!response.ok) {
                    if (response.status === 429) {
                        throw new Error('Rate limit exceeded. Please try again later.');
                    }
                    if (response.status === 403) {
                        throw new Error('API key required or invalid.');
                    }
                    throw new Error(`Translation failed: ${response.statusText}`);
                }
                
                const result = await response.json();
                
                // Detect source language if auto was used
                let detectedLang = sourceLang;
                if (sourceLang === 'auto' && result.detectedLanguage) {
                    detectedLang = result.detectedLanguage.language;
                }
                
                // Cache the result
                if (detectedLang !== 'auto') {
                    this.addToCache(text, detectedLang, targetLang, result.translatedText);
                }
                
                return {
                    translatedText: result.translatedText,
                    sourceLang: detectedLang,
                    targetLang,
                    cached: false
                };
                
            } catch (error) {
                console.warn(`Endpoint ${this.getCurrentEndpoint()} failed:`, error.message);
                lastError = error;
                this.rotateEndpoint();
            }
        }
        
        // All endpoints failed
        throw new Error(`All translation endpoints failed. Last error: ${lastError.message}`);
    }
    
    /**
     * Batch translation for multiple texts
     */
    async translateBatch(texts, sourceLang = 'auto', targetLang = 'hu') {
        const results = [];
        
        for (const text of texts) {
            try {
                const result = await this.translate(text, sourceLang, targetLang);
                results.push({
                    original: text,
                    ...result,
                    success: true
                });
                
                // Small delay to avoid overwhelming the API
                await new Promise(resolve => setTimeout(resolve, 200));
            } catch (error) {
                results.push({
                    original: text,
                    error: error.message,
                    success: false
                });
            }
        }
        
        return results;
    }
    
    /**
     * Get supported languages
     */
    async getLanguages() {
        if (!this.languages) {
            await this.loadLanguages();
        }
        return this.languages;
    }
    
    /**
     * Clear translation cache
     */
    clearCache() {
        this.cache.clear();
        console.log('Translation cache cleared');
    }
    
    /**
     * Get cache statistics
     */
    getCacheStats() {
        return {
            size: this.cache.size,
            maxSize: this.maxCacheSize,
            hitRate: this.cache.size > 0 ? 'Cache active' : 'No cached items'
        };
    }
    
    /**
     * Test API connection
     */
    async testConnection() {
        try {
            const result = await this.translate('Hello', 'en', 'hu');
            return {
                success: true,
                endpoint: this.getCurrentEndpoint(),
                testTranslation: result.translatedText
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// ===========================
// Translation Utilities
// ===========================

/**
 * Utility functions for working with translations
 */
const TranslateUtils = {
    /**
     * Clean and prepare text for translation
     */
    cleanText(text) {
        return text
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/\n+/g, '\n');
    },
    
    /**
     * Split long text into chunks for translation
     */
    chunkText(text, maxLength = 500) {
        const chunks = [];
        const sentences = text.split(/[.!?]+/);
        let currentChunk = '';
        
        for (const sentence of sentences) {
            if ((currentChunk + sentence).length > maxLength) {
                if (currentChunk) chunks.push(currentChunk.trim());
                currentChunk = sentence;
            } else {
                currentChunk += sentence + '. ';
            }
        }
        
        if (currentChunk) chunks.push(currentChunk.trim());
        return chunks;
    },
    
    /**
     * Format translation result for display
     */
    formatResult(result) {
        return {
            text: result.translatedText,
            source: this.getLanguageName(result.sourceLang),
            target: this.getLanguageName(result.targetLang),
            cached: result.cached ? '⚡ Cached' : '🌐 Live'
        };
    },
    
    /**
     * Get language name from code
     */
    getLanguageName(code) {
        const languages = {
            'en': 'English',
            'hu': 'Hungarian',
            'de': 'German',
            'fr': 'French',
            'es': 'Spanish',
            'it': 'Italian',
            'pt': 'Portuguese',
            'ru': 'Russian',
            'ja': 'Japanese',
            'zh': 'Chinese',
            'ar': 'Arabic',
            'auto': 'Auto-detect'
        };
        return languages[code] || code.toUpperCase();
    },
    
    /**
     * Validate language code
     */
    isValidLanguageCode(code) {
        const validCodes = ['auto', 'en', 'hu', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'ja', 'zh', 'ar'];
        return validCodes.includes(code);
    }
};

// ===========================
// Export for use in main app
// ===========================

// Initialize global translator instance
const translator = new TranslateAPI({
    cacheExpiry: 3600000, // 1 hour
    maxCacheSize: 100,
    requestLimit: 20 // 20 requests per minute
});

console.log('📡 LibreTranslate API wrapper loaded');
