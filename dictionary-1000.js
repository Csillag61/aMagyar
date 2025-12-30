// Extended 1000-word Hungarian-English Dictionary
// Copy this content into translate-api.js to replace the localDictionary object

const localDictionary = {
    'hu-en': {
        // === GREETINGS & POLITENESS ===
        'szia': 'hi', 'hello': 'hello', 'jó napot': 'good day', 'jó reggelt': 'good morning',
        'jó estét': 'good evening', 'jó éjszakát': 'good night', 'köszönöm': 'thank you',
        'köszönöm szépen': 'thank you very much', 'kérem': 'please', 'viszlát': 'goodbye',
        'viszontlátásra': 'goodbye', 'igen': 'yes', 'nem': 'no', 'talán': 'maybe',
        'bocsánat': 'sorry', 'elnézést': 'excuse me', 'segítség': 'help',
        
        // === PRONOUNS ===
        'én': 'I', 'te': 'you', 'ő': 'he/she', 'mi': 'we', 'ti': 'you (plural)',
        'ők': 'they', 'engem': 'me', 'téged': 'you', 'őt': 'him/her',
        'minket': 'us', 'titeket': 'you', 'őket': 'them',
        
        // === COMMON NOUNS - People ===
        'ember': 'person', 'nő': 'woman', 'férfi': 'man', 'gyerek': 'child',
        'fiú': 'boy', 'lány': 'girl', 'baba': 'baby', 'felnőtt': 'adult',
        
        // === FAMILY ===
        'anya': 'mother', 'apa': 'father', 'szülők': 'parents', 'testvér': 'sibling',
        'fivér': 'brother', 'nővér': 'sister', 'nagymama': 'grandmother',
        'nagypapa': 'grandfather', 'nagyszülők': 'grandparents', 'unoka': 'grandchild',
        'barát': 'friend', 'barátnő': 'girlfriend', 'férj': 'husband', 'feleség': 'wife',
        'nagybácsi': 'uncle', 'nagynéni': 'aunt', 'unokaöcs': 'nephew', 'unokahúg': 'niece',
        
        // === BODY PARTS ===
        'fej': 'head', 'haj': 'hair', 'arc': 'face', 'szem': 'eye', 'szemek': 'eyes',
        'orr': 'nose', 'száj': 'mouth', 'fog': 'tooth', 'fogak': 'teeth', 'nyelv': 'tongue',
        'fül': 'ear', 'nyak': 'neck', 'váll': 'shoulder', 'kar': 'arm', 'kéz': 'hand',
        'ujj': 'finger', 'láb': 'leg/foot', 'térd': 'knee', 'lábujj': 'toe',
        'has': 'stomach', 'hát': 'back', 'szív': 'heart',
        
        // === COLORS ===
        'piros': 'red', 'kék': 'blue', 'zöld': 'green', 'sárga': 'yellow',
        'fekete': 'black', 'fehér': 'white', 'barna': 'brown', 'rózsaszín': 'pink',
        'narancssárga': 'orange', 'lila': 'purple', 'szürke': 'gray',
        
        // === NUMBERS ===
        'nulla': 'zero', 'egy': 'one', 'kettő': 'two', 'két': 'two', 'három': 'three',
        'négy': 'four', 'öt': 'five', 'hat': 'six', 'hét': 'seven', 'nyolc': 'eight',
        'kilenc': 'nine', 'tíz': 'ten', 'tizenegy': 'eleven', 'tizenkettő': 'twelve',
        'tizenhárom': 'thirteen', 'tizennégy': 'fourteen', 'tizenöt': 'fifteen',
        'húsz': 'twenty', 'harminc': 'thirty', 'negyven': 'forty', 'ötven': 'fifty',
        'hatvan': 'sixty', 'hetven': 'seventy', 'nyolcvan': 'eighty', 'kilencven': 'ninety',
        'száz': 'hundred', 'ezer': 'thousand', 'millió': 'million',
        
        // === TIME ===
        'idő': 'time', 'óra': 'hour/clock', 'perc': 'minute', 'másodperc': 'second',
        'reggel': 'morning', 'délelőtt': 'before noon', 'dél': 'noon', 'délután': 'afternoon',
        'este': 'evening', 'éjszaka': 'night', 'éjfél': 'midnight',
        'ma': 'today', 'tegnap': 'yesterday', 'holnap': 'tomorrow',
        'most': 'now', 'később': 'later', 'hamar': 'soon', 'korán': 'early', 'későn': 'late',
        'mindig': 'always', 'soha': 'never', 'néha': 'sometimes', 'gyakran': 'often',
        'ritkán': 'rarely',
        
        // === DAYS OF WEEK ===
        'hétfő': 'monday', 'kedd': 'tuesday', 'szerda': 'wednesday', 'csütörtök': 'thursday',
        'péntek': 'friday', 'szombat': 'saturday', 'vasárnap': 'sunday', 'hét': 'week',
        'hétvége': 'weekend',
        
        // === MONTHS ===
        'január': 'january', 'február': 'february', 'március': 'march', 'április': 'april',
        'május': 'may', 'június': 'june', 'július': 'july', 'augusztus': 'august',
        'szeptember': 'september', 'október': 'october', 'november': 'november',
        'december': 'december', 'hónap': 'month', 'év': 'year',
        
        // === SEASONS ===
        'tavasz': 'spring', 'nyár': 'summer', 'ősz': 'autumn/fall', 'tél': 'winter',
        'évszak': 'season',
        
        // === WEATHER ===
        'időjárás': 'weather', 'nap': 'sun/day', 'hold': 'moon', 'csillag': 'star',
        'eső': 'rain', 'hó': 'snow', 'szél': 'wind', 'felhő': 'cloud', 'villám': 'lightning',
        'mennydörgés': 'thunder', 'köd': 'fog', 'meleg': 'warm/hot', 'hideg': 'cold',
        'forró': 'hot', 'hűvös': 'cool',
        
        // === FOOD & DRINK ===
        'étel': 'food', 'ital': 'drink', 'reggeli': 'breakfast', 'ebéd': 'lunch',
        'vacsora': 'dinner', 'kenyér': 'bread', 'vaj': 'butter', 'sajt': 'cheese',
        'tej': 'milk', 'tojás': 'egg', 'hús': 'meat', 'csirke': 'chicken', 'hal': 'fish',
        'rizs': 'rice', 'tészta': 'pasta', 'leves': 'soup', 'saláta': 'salad',
        'zöldség': 'vegetable', 'gyümölcs': 'fruit', 'alma': 'apple', 'banán': 'banana',
        'narancs': 'orange', 'citrom': 'lemon', 'eper': 'strawberry', 'szőlő': 'grape',
        'körte': 'pear', 'barack': 'peach', 'répa': 'carrot', 'krumpli': 'potato',
        'burgonya': 'potato', 'paradicsom': 'tomato', 'uborka': 'cucumber',
        'tea': 'tea', 'kávé': 'coffee', 'víz': 'water', 'tej': 'milk', 'sör': 'beer',
        'bor': 'wine', 'lé': 'juice', 'cukor': 'sugar', 'só': 'salt', 'bors': 'pepper',
        'tortacsoki': 'chocolate', 'torta': 'cake', 'sütemény': 'cookie',
        
        // === ANIMALS ===
        'állat': 'animal', 'kutya': 'dog', 'macska': 'cat', 'ló': 'horse', 'tehén': 'cow',
        'disznó': 'pig', 'csirke': 'chicken', 'madár': 'bird', 'hal': 'fish',
        'egér': 'mouse', 'oroszlán': 'lion', 'elefánt': 'elephant', 'majom': 'monkey',
        'medve': 'bear', 'farkas': 'wolf', 'róka': 'fox', 'nyúl': 'rabbit',
        
        // === CLOTHING ===
        'ruha': 'clothes/dress', 'ing': 'shirt', 'nadrág': 'pants', 'szoknya': 'skirt',
        'kabát': 'coat', 'cipő': 'shoe', 'zokni': 'sock', 'kalap': 'hat', 'kesztyű': 'glove',
        'sál': 'scarf', 'öv': 'belt', 'zseb': 'pocket',
        
        // === HOUSE & FURNITURE ===
        'ház': 'house', 'lakás': 'apartment', 'szoba': 'room', 'konyha': 'kitchen',
        'fürdőszoba': 'bathroom', 'hálószoba': 'bedroom', 'nappali': 'living room',
        'ajtó': 'door', 'ablak': 'window', 'fal': 'wall', 'tető': 'roof', 'padló': 'floor',
        'lépcső': 'stairs', 'asztal': 'table', 'szék': 'chair', 'ágy': 'bed',
        'kanapé': 'sofa', 'lámpa': 'lamp', 'szekrény': 'closet/cupboard',
        'tükör': 'mirror', 'kép': 'picture',
        
        // === PLACES ===
        'hely': 'place', 'város': 'city', 'falu': 'village', 'ország': 'country',
        'utca': 'street', 'út': 'road', 'tér': 'square', 'park': 'park', 'híd': 'bridge',
        'bolt': 'shop', 'piac': 'market', 'étterem': 'restaurant', 'kávézó': 'cafe',
        'szálloda': 'hotel', 'iskola': 'school', 'egyetem': 'university',
        'könyvtár': 'library', 'múzeum': 'museum', 'mozi': 'cinema', 'színház': 'theater',
        'kórház': 'hospital', 'gyógyszertár': 'pharmacy', 'bank': 'bank',
        'posta': 'post office', 'rendőrség': 'police station', 'tűzoltóság': 'fire station',
        'pályaudvar': 'train station', 'repülőtér': 'airport', 'tengerpart': 'beach',
        'hegy': 'mountain', 'erdő': 'forest', 'folyó': 'river', 'tó': 'lake', 'tenger': 'sea',
        
        // === TRANSPORTATION ===
        'közlekedés': 'transportation', 'autó': 'car', 'busz': 'bus', 'vonat': 'train',
        'repülő': 'airplane', 'hajó': 'ship', 'bicikli': 'bicycle', 'motor': 'motorcycle',
        'taxi': 'taxi', 'metró': 'metro/subway', 'villamos': 'tram',
        
        // === TECHNOLOGY ===
        'számítógép': 'computer', 'telefon': 'telephone/phone', 'mobiltelefon': 'mobile phone',
        'internet': 'internet', 'email': 'email', 'weboldal': 'website',
        'televízió': 'television', 'rádió': 'radio',
        
        // === SCHOOL & WORK ===
        'iskola': 'school', 'tanár': 'teacher', 'diák': 'student', 'osztály': 'class',
        'lecke': 'lesson', 'házi feladat': 'homework', 'vizsga': 'exam', 'könyv': 'book',
        'füzet': 'notebook', 'toll': 'pen', 'ceruza': 'pencil', 'papír': 'paper',
        'munka': 'work/job', 'munkás': 'worker', 'üzlet': 'business', 'iroda': 'office',
        'pénz': 'money', 'fizetés': 'salary/payment',
        
        // === COMMON VERBS (infinitive & conjugations) ===
        'lenni': 'to be', 'vagyok': 'I am', 'vagy': 'you are', 'van': 'is/there is',
        'enni': 'to eat', 'eszem': 'I eat', 'eszel': 'you eat', 'eszik': 'he/she eats',
        'inni': 'to drink', 'iszom': 'I drink', 'iszol': 'you drink', 'iszik': 'he/she drinks',
        'dolgozni': 'to work', 'dolgozom': 'I work', 'dolgozol': 'you work', 'dolgozik': 'works',
        'tanulni': 'to study', 'tanulok': 'I study', 'tanulsz': 'you study', 'tanul': 'studies',
        'aludni': 'to sleep', 'alszom': 'I sleep', 'alszol': 'you sleep', 'alszik': 'sleeps',
        'menni': 'to go', 'megyek': 'I go', 'mész': 'you go', 'megy': 'goes',
        'jönni': 'to come', 'jövök': 'I come', 'jössz': 'you come', 'jön': 'comes',
        'látni': 'to see', 'látok': 'I see', 'látsz': 'you see', 'lát': 'sees',
        'hallani': 'to hear', 'hallok': 'I hear', 'hallasz': 'you hear', 'hall': 'hears',
        'beszélni': 'to speak', 'beszélek': 'I speak', 'beszélsz': 'you speak', 'beszél': 'speaks',
        'érteni': 'to understand', 'értek': 'I understand', 'értesz': 'you understand', 'ért': 'understands',
        'szeretni': 'to love/like', 'szeretek': 'I love', 'szeretsz': 'you love', 'szeret': 'loves',
        'akarni': 'to want', 'akarok': 'I want', 'akarsz': 'you want', 'akar': 'wants',
        'tudni': 'to know', 'tudok': 'I know', 'tudsz': 'you know', 'tud': 'knows',
        'gondolni': 'to think', 'gondolok': 'I think', 'gondolsz': 'you think', 'gondol': 'thinks',
        'csinálni': 'to do/make', 'csinálok': 'I do', 'csinálsz': 'you do', 'csinál': 'does',
        'élni': 'to live', 'élek': 'I live', 'élsz': 'you live', 'él': 'lives',
        'lakni': 'to live (reside)', 'lakok': 'I live', 'laksz': 'you live', 'lakik': 'lives',
        'olvasni': 'to read', 'olvasok': 'I read', 'olvasol': 'you read', 'olvas': 'reads',
        'írni': 'to write', 'írok': 'I write', 'írsz': 'you write', 'ír': 'writes',
        'adni': 'to give', 'adok': 'I give', 'adsz': 'you give', 'ad': 'gives',
        'venni': 'to buy/take', 'veszek': 'I buy', 'veszel': 'you buy', 'vesz': 'buys',
        'kapni': 'to get/receive', 'kapok': 'I get', 'kapsz': 'you get', 'kap': 'gets',
        'találni': 'to find', 'találok': 'I find', 'találsz': 'you find', 'talál': 'finds',
        'keresni': 'to search/look for', 'keresek': 'I search', 'keresel': 'you search', 'keres': 'searches',
        'nézni': 'to look/watch', 'nézek': 'I watch', 'nézel': 'you watch', 'néz': 'watches',
        'várni': 'to wait', 'várok': 'I wait', 'vársz': 'you wait', 'vár': 'waits',
        'játszani': 'to play', 'játszom': 'I play', 'játszol': 'you play', 'játszik': 'plays',
        'futni': 'to run', 'futok': 'I run', 'futsz': 'you run', 'fut': 'runs',
        'járni': 'to walk', 'járok': 'I walk', 'jársz': 'you walk', 'jár': 'walks',
        'ülni': 'to sit', 'ülök': 'I sit', 'ülsz': 'you sit', 'ül': 'sits',
        'állni': 'to stand', 'állok': 'I stand', 'állsz': 'you stand', 'áll': 'stands',
        'feküdni': 'to lie down', 'fekszem': 'I lie', 'fekszel': 'you lie', 'fekszik': 'lies',
        'nyitni': 'to open', 'nyitok': 'I open', 'nyitsz': 'you open', 'nyit': 'opens',
        'zárni': 'to close', 'zárok': 'I close', 'zársz': 'you close', 'zár': 'closes',
        'kezdeni': 'to begin', 'kezdek': 'I begin', 'kezdesz': 'you begin', 'kezd': 'begins',
        'befejezni': 'to finish', 'befejezek': 'I finish', 'befejezel': 'you finish', 'befejez': 'finishes',
        
        // === ADJECTIVES ===
        'nagy': 'big', 'kicsi': 'small', 'jó': 'good', 'rossz': 'bad', 'új': 'new',
        'régi': 'old', 'fiatal': 'young', 'öreg': 'old (person)', 'hosszú': 'long',
        'rövid': 'short', 'magas': 'tall/high', 'alacsony': 'short/low', 'széles': 'wide',
        'keskeny': 'narrow', 'vastag': 'thick', 'vékony': 'thin', 'nehéz': 'heavy/difficult',
        'könnyű': 'light/easy', 'erős': 'strong', 'gyenge': 'weak', 'gyors': 'fast',
        'lassú': 'slow', 'szép': 'beautiful', 'csúnya': 'ugly', 'drága': 'expensive',
        'olcsó': 'cheap', 'gazdag': 'rich', 'szegény': 'poor', 'boldog': 'happy',
        'szomorú': 'sad', 'fáradt': 'tired', 'beteg': 'sick', 'egészséges': 'healthy',
        'izgalmas': 'exciting', 'unalmas': 'boring', 'érdekes': 'interesting',
        'fontos': 'important', 'híres': 'famous', 'szabad': 'free', 'tele': 'full',
        'üres': 'empty', 'tiszta': 'clean', 'piszkos': 'dirty',
        
        // === QUESTION WORDS ===
        'ki': 'who', 'mi': 'what', 'hol': 'where', 'hova': 'where to', 'honnan': 'where from',
        'mikor': 'when', 'miért': 'why', 'hogyan': 'how', 'hogy': 'how/that',
        'mennyi': 'how much', 'hány': 'how many', 'melyik': 'which',
        
        // === PREPOSITIONS & CONJUNCTIONS ===
        'és': 'and', 'vagy': 'or', 'de': 'but', 'mert': 'because', 'ha': 'if',
        'amikor': 'when', 'míg': 'while', 'után': 'after', 'előtt': 'before',
        'mellett': 'next to', 'között': 'between', 'alatt': 'under', 'felett': 'above',
        'ban/ben': 'in', 'on/en/ön': 'on', 'nál/nél': 'at',
        
        // === COMMON PHRASES ===
        'Hogy vagy?': 'How are you?', 'Jól vagyok': 'I am fine',
        'Mi a neved?': 'What is your name?', 'Nem értem': 'I don\'t understand',
        'Beszélsz angolul?': 'Do you speak English?', 'Beszélek magyarul': 'I speak Hungarian',
        'Hol van?': 'Where is?', 'Mennyibe kerül?': 'How much does it cost?',
        'Szeretnék': 'I would like', 'Szükségem van': 'I need',
        
        // === COUNTRIES & LANGUAGES ===
        'Magyarország': 'Hungary', 'magyar': 'Hungarian', 'Amerika': 'America',
        'Anglia': 'England', 'Németország': 'Germany', 'Franciaország': 'France',
        'Spanyolország': 'Spain', 'Olaszország': 'Italy', 'Oroszország': 'Russia',
        
        // === MISC ===
        'dolog': 'thing', 'név': 'name', 'cím': 'address', 'szám': 'number',
        'levél': 'letter', 'üzenet': 'message', 'kérdés': 'question', 'válasz': 'answer',
        'probléma': 'problem', 'megoldás': 'solution', 'ok': 'reason', 'út': 'way/road',
        'rész': 'part', 'egész': 'whole', 'fél': 'half', 'darab': 'piece',
        'oldal': 'page/side', 'sorozat': 'series', 'történet': 'story',
        'zene': 'music', 'dal': 'song', 'film': 'movie', 'játék': 'game',
        'sport': 'sport', 'foci': 'football/soccer', 'kosárlabda': 'basketball',
        
        // === MORE VERBS & CONJUGATIONS ===
        'tanítani': 'to teach', 'tanítok': 'I teach', 'tanítasz': 'you teach', 'tanít': 'teaches',
        'használni': 'to use', 'használok': 'I use', 'használsz': 'you use', 'használ': 'uses',
        'segíteni': 'to help', 'segítek': 'I help', 'segítesz': 'you help', 'segít': 'helps',
        'érezni': 'to feel', 'érzek': 'I feel', 'érzel': 'you feel', 'érez': 'feels',
        'viselni': 'to wear', 'viselek': 'I wear', 'viselsz': 'you wear', 'visel': 'wears',
        'hívni': 'to call', 'hívok': 'I call', 'hívsz': 'you call', 'hív': 'calls',
        'építeni': 'to build', 'építek': 'I build', 'építesz': 'you build', 'épít': 'builds',
        'törni': 'to break', 'török': 'I break', 'törsz': 'you break', 'tör': 'breaks',
        'hozni': 'to bring', 'hozok': 'I bring', 'hozol': 'you bring', 'hoz': 'brings',
        'vinni': 'to take/carry', 'viszek': 'I take', 'viszel': 'you take', 'visz': 'takes',
        'mutatni': 'to show', 'mutatok': 'I show', 'mutatsz': 'you show', 'mutat': 'shows',
        'mondani': 'to say/tell', 'mondok': 'I say', 'mondasz': 'you say', 'mond': 'says',
        'kérdezni': 'to ask', 'kérdezek': 'I ask', 'kérdezel': 'you ask', 'kérdez': 'asks',
        'felelni': 'to answer', 'felelek': 'I answer', 'felelsz': 'you answer', 'felel': 'answers',
        'emlékezni': 'to remember', 'emlékezek': 'I remember', 'emlékezel': 'you remember', 'emlékszik': 'remembers',
        'felejteni': 'to forget', 'felejtek': 'I forget', 'felejtesz': 'you forget', 'felejt': 'forgets',
        'tanulni': 'to learn', 'próbálni': 'to try', 'próbálok': 'I try', 'próbálsz': 'you try', 'próbál': 'tries',
        'változni': 'to change', 'változok': 'I change', 'változol': 'you change', 'változik': 'changes',
        'maradni': 'to stay', 'maradok': 'I stay', 'maradsz': 'you stay', 'marad': 'stays',
        'költözni': 'to move', 'költözöm': 'I move', 'költözöl': 'you move', 'költözik': 'moves',
        'utazni': 'to travel', 'utazom': 'I travel', 'utazol': 'you travel', 'utazik': 'travels',
        'vezetni': 'to drive/lead', 'vezetek': 'I drive', 'vezetsz': 'you drive', 'vezet': 'drives',
        'repülni': 'to fly', 'repülök': 'I fly', 'repülsz': 'you fly', 'repül': 'flies',
        'úszni': 'to swim', 'úszom': 'I swim', 'úszol': 'you swim', 'úszik': 'swims',
        'táncolni': 'to dance', 'táncolok': 'I dance', 'táncolsz': 'you dance', 'táncol': 'dances',
        'énekelni': 'to sing', 'énekelek': 'I sing', 'énekelsz': 'you sing', 'énekel': 'sings',
        'rajzolni': 'to draw', 'rajzolok': 'I draw', 'rajzolsz': 'you draw', 'rajzol': 'draws',
        'festeni': 'to paint', 'festek': 'I paint', 'festesz': 'you paint', 'fest': 'paints',
        'főzni': 'to cook', 'főzök': 'I cook', 'főzöl': 'you cook', 'főz': 'cooks',
        'sütni': 'to bake', 'sütök': 'I bake', 'sütsz': 'you bake', 'süt': 'bakes',
        'mosni': 'to wash', 'mosok': 'I wash', 'mosol': 'you wash', 'mos': 'washes',
        'takarítani': 'to clean', 'takarítok': 'I clean', 'takarítasz': 'you clean', 'takarít': 'cleans',
        'rendezni': 'to organize', 'rendezek': 'I organize', 'rendezel': 'you organize', 'rendez': 'organizes',
        'küldeni': 'to send', 'küldök': 'I send', 'küldesz': 'you send', 'küld': 'sends',
        'kérni': 'to ask for', 'kérek': 'I ask for', 'kérsz': 'you ask for', 'kér': 'asks for',
        'fizetni': 'to pay', 'fizetek': 'I pay', 'fizetsz': 'you pay', 'fizet': 'pays',
        'eladni': 'to sell', 'eladok': 'I sell', 'eladasz': 'you sell', 'elad': 'sells',
        'bérelni': 'to rent', 'bérelek': 'I rent', 'bérelsz': 'you rent', 'bérel': 'rents',
        'kölcsönözni': 'to borrow', 'kölcsönzök': 'I borrow', 'kölcsönzöl': 'you borrow', 'kölcsönöz': 'borrows',
        'spórolni': 'to save', 'spórolok': 'I save', 'spórolsz': 'you save', 'spórol': 'saves',
        'költeni': 'to spend', 'költök': 'I spend', 'költesz': 'you spend', 'költ': 'spends',
        
        // === MORE ADJECTIVES ===
        'okos': 'smart', 'buta': 'stupid', 'vicces': 'funny', 'komoly': 'serious',
        'kedves': 'kind', 'gonosz': 'evil', 'bátor': 'brave', 'gyáva': 'coward',
        'őszinte': 'honest', 'hazug': 'liar', 'türelmes': 'patient', 'türelmetlen': 'impatient',
        'csöndes': 'quiet', 'hangos': 'loud', 'nyugodt': 'calm', 'ideges': 'nervous',
        'vidám': 'cheerful', 'komor': 'gloomy', 'optimista': 'optimistic', 'pesszimista': 'pessimistic',
        'biztos': 'sure/certain', 'bizonytalan': 'uncertain', 'lehetséges': 'possible', 'lehetetlen': 'impossible',
        'veszélyes': 'dangerous', 'biztonságos': 'safe', 'helyes': 'correct', 'helytelen': 'incorrect',
        'igaz': 'true', 'hamis': 'false', 'valódi': 'real', 'hamis': 'fake',
        'természetes': 'natural', 'mesterséges': 'artificial', 'egyszerű': 'simple', 'bonyolult': 'complicated',
        'modern': 'modern', 'régi': 'ancient', 'friss': 'fresh', 'régi': 'stale',
        'nedves': 'wet', 'száraz': 'dry', 'sima': 'smooth', 'durva': 'rough',
        'puha': 'soft', 'kemény': 'hard', 'éles': 'sharp', 'tompa': 'dull',
        'világos': 'light/bright', 'sötét': 'dark', 'fényes': 'shiny', 'matt': 'matte',
        'nyitott': 'open', 'zárt': 'closed', 'teli': 'full', 'üres': 'empty',
        
        // === EMOTIONS & FEELINGS ===
        'érzés': 'feeling', 'szeretet': 'love', 'gyűlölet': 'hate', 'düh': 'anger',
        'öröm': 'joy', 'szomorúság': 'sadness', 'félelem': 'fear', 'remény': 'hope',
        'kétség': 'doubt', 'bizalom': 'trust', 'meglepetés': 'surprise', 'unalom': 'boredom',
        'kíváncsiság': 'curiosity', 'irigység': 'envy', 'büszkeség': 'pride', 'szégyen': 'shame',
        'bűntudat': 'guilt', 'megbánás': 'regret', 'hála': 'gratitude', 'sajnálat': 'pity',
        
        // === MORE HOUSEHOLD ITEMS ===
        'bútor': 'furniture', 'fotel': 'armchair', 'polc': 'shelf', 'szőnyeg': 'carpet',
        'függöny': 'curtain', 'párna': 'pillow', 'takaró': 'blanket', 'lepedő': 'sheet',
        'matrac': 'mattress', 'edény': 'pot/dish', 'tányér': 'plate', 'pohár': 'glass',
        'csésze': 'cup', 'kanál': 'spoon', 'villa': 'fork', 'kés': 'knife',
        'tál': 'bowl', 'serpenyő': 'pan', 'fazék': 'pot', 'hűtőszekrény': 'refrigerator',
        'tűzhely': 'stove', 'sütő': 'oven', 'mikró': 'microwave', 'mosógép': 'washing machine',
        'mosogatógép': 'dishwasher', 'porszívó': 'vacuum cleaner', 'vasaló': 'iron',
        'kapcsoló': 'switch', 'konnektor': 'outlet', 'csap': 'faucet', 'mosogató': 'sink',
        'vécé': 'toilet', 'zuhanyzó': 'shower', 'kád': 'bathtub', 'törölköző': 'towel',
        'szappan': 'soap', 'sampon': 'shampoo', 'fogkefe': 'toothbrush', 'fogkrém': 'toothpaste',
        
        // === MORE FOOD ===
        'hagyma': 'onion', 'fokhagyma': 'garlic', 'paprika': 'pepper', 'gomba': 'mushroom',
        'saláta': 'lettuce', 'káposzta': 'cabbage', 'borsó': 'peas', 'bab': 'beans',
        'kukorica': 'corn', 'dinnye': 'melon', 'görögdinnye': 'watermelon', 'cseresznye': 'cherry',
        'meggy': 'sour cherry', 'szilva': 'plum', 'barack': 'apricot', 'málna': 'raspberry',
        'áfonya': 'blueberry', 'mogyoró': 'hazelnut', 'dió': 'walnut', 'mandula': 'almond',
        'keksz': 'biscuit', 'mogyoróvaj': 'peanut butter', 'dzsem': 'jam', 'méz': 'honey',
        'joghurt': 'yogurt', 'tejszín': 'cream', 'fagylalt': 'ice cream', 'pizza': 'pizza',
        'hamburger': 'hamburger', 'szendvics': 'sandwich', 'hot dog': 'hot dog',
        
        // === NATURE & ENVIRONMENT ===
        'természet': 'nature', 'világ': 'world', 'föld': 'earth/ground', 'égbolt': 'sky',
        'óceán': 'ocean', 'sziget': 'island', 'part': 'shore/coast', 'sivatag': 'desert',
        'dzsungel': 'jungle', 'mező': 'field', 'kert': 'garden', 'virág': 'flower',
        'fa': 'tree', 'bokor': 'bush', 'fű': 'grass', 'levél': 'leaf',
        'gyökér': 'root', 'ág': 'branch', 'törzs': 'trunk', 'mag': 'seed',
        'kő': 'stone', 'szikla': 'rock', 'homok': 'sand', 'sár': 'mud',
        'jég': 'ice', 'hullám': 'wave', 'áradat': 'flood', 'tűz': 'fire',
        
        // === MORE ANIMALS ===
        'tigris': 'tiger', 'leopárd': 'leopard', 'gepárd': 'cheetah', 'zsiráf': 'giraffe',
        'zebra': 'zebra', 'orrszarvú': 'rhinoceros', 'víziló': 'hippopotamus', 'krokodil': 'crocodile',
        'kígyó': 'snake', 'gyík': 'lizard', 'teknős': 'turtle', 'béka': 'frog',
        'pillangó': 'butterfly', 'méh': 'bee', 'hangya': 'ant', 'pók': 'spider',
        'légy': 'fly', 'szúnyog': 'mosquito', 'bogár': 'beetle', 'féreg': 'worm',
        'galamb': 'pigeon', 'veréb': 'sparrow', 'holló': 'crow', 'sas': 'eagle',
        'bagoly': 'owl', 'papagáj': 'parrot', 'pingvin': 'penguin', 'hattyú': 'swan',
        'kacsa': 'duck', 'liba': 'goose', 'pulyka': 'turkey', 'strucc': 'ostrich',
        'delfin': 'dolphin', 'bálna': 'whale', 'cápa': 'shark', 'polip': 'octopus',
        'rák': 'crab', 'homár': 'lobster', 'kagyló': 'shell/clam',
        
        // === TECHNOLOGY & MODERN LIFE ===
        'gép': 'machine', 'motor': 'engine', 'kerék': 'wheel', 'elem': 'battery',
        'elektromosság': 'electricity', 'energia': 'energy', 'áram': 'current/electricity',
        'billentyűzet': 'keyboard', 'egér': 'mouse', 'monitor': 'monitor', 'képernyő': 'screen',
        'hangszóró': 'speaker', 'mikrofon': 'microphone', 'kamera': 'camera', 'videó': 'video',
        'fénykép': 'photograph', 'kép': 'image', 'hang': 'sound', 'zaj': 'noise',
        'alkalmazás': 'application', 'program': 'program', 'szoftver': 'software', 'hardver': 'hardware',
        'adat': 'data', 'információ': 'information', 'fájl': 'file', 'mappa': 'folder',
        'jelszó': 'password', 'felhasználó': 'user', 'számla': 'account', 'bejelentkezés': 'login',
        
        // === HEALTH & MEDICAL ===
        'egészség': 'health', 'betegség': 'illness', 'fájdalom': 'pain', 'sérülés': 'injury',
        'láz': 'fever', 'köhögés': 'cough', 'nátha': 'cold', 'influenza': 'flu',
        'allergia': 'allergy', 'gyógyszer': 'medicine', 'tabletta': 'pill', 'injekció': 'injection',
        'orvos': 'doctor', 'nővér': 'nurse', 'beteg': 'patient', 'kezelés': 'treatment',
        'műtét': 'operation/surgery', 'vizsgálat': 'examination', 'diagnózis': 'diagnosis',
        'gyógyulás': 'recovery', 'megelőzés': 'prevention', 'vér': 'blood', 'csont': 'bone',
        
        // === ABSTRACT CONCEPTS ===
        'élet': 'life', 'halál': 'death', 'születés': 'birth', 'jövő': 'future',
        'múlt': 'past', 'jelen': 'present', 'álom': 'dream', 'valóság': 'reality',
        'igazság': 'truth', 'hazugság': 'lie', 'titok': 'secret', 'tudás': 'knowledge',
        'bölcsesség': 'wisdom', 'tapasztalat': 'experience', 'emlék': 'memory', 'gondolat': 'thought',
        'ötlet': 'idea', 'terv': 'plan', 'cél': 'goal', 'siker': 'success',
        'kudarc': 'failure', 'lehetőség': 'opportunity', 'választás': 'choice', 'döntés': 'decision',
        'szabadság': 'freedom', 'jog': 'right', 'kötelezettség': 'duty', 'felelősség': 'responsibility',
        'hatalom': 'power', 'erő': 'force/strength', 'gyengeség': 'weakness',
    },
    'en-hu': {
        // === GREETINGS & POLITENESS ===
        'hi': 'szia', 'hello': 'helló', 'good day': 'jó napot', 'good morning': 'jó reggelt',
        'good evening': 'jó estét', 'good night': 'jó éjszakát', 'thank you': 'köszönöm',
        'thank you very much': 'köszönöm szépen', 'please': 'kérem', 'goodbye': 'viszlát',
        'yes': 'igen', 'no': 'nem', 'maybe': 'talán',
        'sorry': 'bocsánat', 'excuse me': 'elnézést', 'help': 'segítség',
        
        // === PRONOUNS ===
        'I': 'én', 'you': 'te', 'he': 'ő', 'she': 'ő', 'we': 'mi', 'they': 'ők',
        'me': 'engem', 'him': 'őt', 'her': 'őt', 'us': 'minket', 'them': 'őket',
        
        // === PEOPLE ===
        'person': 'ember', 'woman': 'nő', 'man': 'férfi', 'child': 'gyerek',
        'boy': 'fiú', 'girl': 'lány', 'baby': 'baba', 'adult': 'felnőtt',
        
        // === FAMILY ===
        'mother': 'anya', 'father': 'apa', 'parents': 'szülők', 'sibling': 'testvér',
        'brother': 'fivér', 'sister': 'nővér', 'grandmother': 'nagymama',
        'grandfather': 'nagypapa', 'grandparents': 'nagyszülők', 'grandchild': 'unoka',
        'friend': 'barát', 'girlfriend': 'barátnő', 'husband': 'férj', 'wife': 'feleség',
        'uncle': 'nagybácsi', 'aunt': 'nagynéni', 'nephew': 'unokaöcs', 'niece': 'unokahúg',
        
        // === BODY PARTS ===
        'head': 'fej', 'hair': 'haj', 'face': 'arc', 'eye': 'szem', 'eyes': 'szemek',
        'nose': 'orr', 'mouth': 'száj', 'tooth': 'fog', 'teeth': 'fogak', 'tongue': 'nyelv',
        'ear': 'fül', 'neck': 'nyak', 'shoulder': 'váll', 'arm': 'kar', 'hand': 'kéz',
        'finger': 'ujj', 'leg': 'láb', 'foot': 'láb', 'knee': 'térd', 'toe': 'lábujj',
        'stomach': 'has', 'back': 'hát', 'heart': 'szív',
        
        // === COLORS ===
        'red': 'piros', 'blue': 'kék', 'green': 'zöld', 'yellow': 'sárga',
        'black': 'fekete', 'white': 'fehér', 'brown': 'barna', 'pink': 'rózsaszín',
        'orange': 'narancssárga', 'purple': 'lila', 'gray': 'szürke',
        
        // === NUMBERS ===
        'zero': 'nulla', 'one': 'egy', 'two': 'kettő', 'three': 'három', 'four': 'négy',
        'five': 'öt', 'six': 'hat', 'seven': 'hét', 'eight': 'nyolc', 'nine': 'kilenc',
        'ten': 'tíz', 'eleven': 'tizenegy', 'twelve': 'tizenkettő', 'thirteen': 'tizenhárom',
        'fourteen': 'tizennégy', 'fifteen': 'tizenöt', 'twenty': 'húsz', 'thirty': 'harminc',
        'forty': 'negyven', 'fifty': 'ötven', 'sixty': 'hatvan', 'seventy': 'hetven',
        'eighty': 'nyolcvan', 'ninety': 'kilencven', 'hundred': 'száz', 'thousand': 'ezer',
        'million': 'millió',
        
        // === TIME ===
        'time': 'idő', 'hour': 'óra', 'clock': 'óra', 'minute': 'perc', 'second': 'másodperc',
        'morning': 'reggel', 'before noon': 'délelőtt', 'noon': 'dél', 'afternoon': 'délután',
        'evening': 'este', 'night': 'éjszaka', 'midnight': 'éjfél',
        'today': 'ma', 'yesterday': 'tegnap', 'tomorrow': 'holnap',
        'now': 'most', 'later': 'később', 'soon': 'hamar', 'early': 'korán', 'late': 'későn',
        'always': 'mindig', 'never': 'soha', 'sometimes': 'néha', 'often': 'gyakran',
        'rarely': 'ritkán',
        
        // === DAYS ===
        'monday': 'hétfő', 'tuesday': 'kedd', 'wednesday': 'szerda', 'thursday': 'csütörtök',
        'friday': 'péntek', 'saturday': 'szombat', 'sunday': 'vasárnap', 'week': 'hét',
        'weekend': 'hétvége',
        
        // === MONTHS ===
        'january': 'január', 'february': 'február', 'march': 'március', 'april': 'április',
        'may': 'május', 'june': 'június', 'july': 'július', 'august': 'augusztus',
        'september': 'szeptember', 'october': 'október', 'november': 'november',
        'december': 'december', 'month': 'hónap', 'year': 'év',
        
        // === SEASONS ===
        'spring': 'tavasz', 'summer': 'nyár', 'autumn': 'ősz', 'fall': 'ősz',
        'winter': 'tél', 'season': 'évszak',
        
        // === WEATHER ===
        'weather': 'időjárás', 'sun': 'nap', 'day': 'nap', 'moon': 'hold', 'star': 'csillag',
        'rain': 'eső', 'snow': 'hó', 'wind': 'szél', 'cloud': 'felhő', 'lightning': 'villám',
        'thunder': 'mennydörgés', 'fog': 'köd', 'warm': 'meleg', 'cold': 'hideg',
        'hot': 'forró', 'cool': 'hűvös',
        
        // === FOOD & DRINK ===
        'food': 'étel', 'drink': 'ital', 'breakfast': 'reggeli', 'lunch': 'ebéd',
        'dinner': 'vacsora', 'bread': 'kenyér', 'butter': 'vaj', 'cheese': 'sajt',
        'milk': 'tej', 'egg': 'tojás', 'meat': 'hús', 'chicken': 'csirke', 'fish': 'hal',
        'rice': 'rizs', 'pasta': 'tészta', 'soup': 'leves', 'salad': 'saláta',
        'vegetable': 'zöldség', 'fruit': 'gyümölcs', 'apple': 'alma', 'banana': 'banán',
        'orange': 'narancs', 'lemon': 'citrom', 'strawberry': 'eper', 'grape': 'szőlő',
        'pear': 'körte', 'peach': 'barack', 'carrot': 'répa', 'potato': 'krumpli',
        'tomato': 'paradicsom', 'cucumber': 'uborka',
        'tea': 'tea', 'coffee': 'kávé', 'water': 'víz', 'beer': 'sör',
        'wine': 'bor', 'juice': 'lé', 'sugar': 'cukor', 'salt': 'só', 'pepper': 'bors',
        'chocolate': 'csokoládé', 'cake': 'torta', 'cookie': 'sütemény',
        
        // === ANIMALS ===
        'animal': 'állat', 'dog': 'kutya', 'cat': 'macska', 'horse': 'ló', 'cow': 'tehén',
        'pig': 'disznó', 'bird': 'madár', 'mouse': 'egér', 'lion': 'oroszlán',
        'elephant': 'elefánt', 'monkey': 'majom', 'bear': 'medve', 'wolf': 'farkas',
        'fox': 'róka', 'rabbit': 'nyúl',
        
        // === CLOTHING ===
        'clothes': 'ruha', 'dress': 'ruha', 'shirt': 'ing', 'pants': 'nadrág',
        'skirt': 'szoknya', 'coat': 'kabát', 'shoe': 'cipő', 'sock': 'zokni',
        'hat': 'kalap', 'glove': 'kesztyű', 'scarf': 'sál', 'belt': 'öv', 'pocket': 'zseb',
        
        // === HOUSE ===
        'house': 'ház', 'apartment': 'lakás', 'room': 'szoba', 'kitchen': 'konyha',
        'bathroom': 'fürdőszoba', 'bedroom': 'hálószoba', 'living room': 'nappali',
        'door': 'ajtó', 'window': 'ablak', 'wall': 'fal', 'roof': 'tető', 'floor': 'padló',
        'stairs': 'lépcső', 'table': 'asztal', 'chair': 'szék', 'bed': 'ágy',
        'sofa': 'kanapé', 'lamp': 'lámpa', 'closet': 'szekrény', 'cupboard': 'szekrény',
        'mirror': 'tükör', 'picture': 'kép',
        
        // === PLACES ===
        'place': 'hely', 'city': 'város', 'village': 'falu', 'country': 'ország',
        'street': 'utca', 'road': 'út', 'square': 'tér', 'park': 'park', 'bridge': 'híd',
        'shop': 'bolt', 'market': 'piac', 'restaurant': 'étterem', 'cafe': 'kávézó',
        'hotel': 'szálloda', 'school': 'iskola', 'university': 'egyetem',
        'library': 'könyvtár', 'museum': 'múzeum', 'cinema': 'mozi', 'theater': 'színház',
        'hospital': 'kórház', 'pharmacy': 'gyógyszertár', 'bank': 'bank',
        'post office': 'posta', 'police station': 'rendőrség', 'fire station': 'tűzoltóság',
        'train station': 'pályaudvar', 'airport': 'repülőtér', 'beach': 'tengerpart',
        'mountain': 'hegy', 'forest': 'erdő', 'river': 'folyó', 'lake': 'tó', 'sea': 'tenger',
        
        // === TRANSPORTATION ===
        'transportation': 'közlekedés', 'car': 'autó', 'bus': 'busz', 'train': 'vonat',
        'airplane': 'repülő', 'ship': 'hajó', 'bicycle': 'bicikli', 'motorcycle': 'motor',
        'taxi': 'taxi', 'metro': 'metró', 'subway': 'metró', 'tram': 'villamos',
        
        // === TECHNOLOGY ===
        'computer': 'számítógép', 'telephone': 'telefon', 'phone': 'telefon',
        'mobile phone': 'mobiltelefon', 'internet': 'internet', 'email': 'email',
        'website': 'weboldal', 'television': 'televízió', 'radio': 'rádió',
        
        // === SCHOOL & WORK ===
        'teacher': 'tanár', 'student': 'diák', 'class': 'osztály',
        'lesson': 'lecke', 'homework': 'házi feladat', 'exam': 'vizsga', 'book': 'könyv',
        'notebook': 'füzet', 'pen': 'toll', 'pencil': 'ceruza', 'paper': 'papír',
        'work': 'munka', 'job': 'munka', 'worker': 'munkás', 'business': 'üzlet',
        'office': 'iroda', 'money': 'pénz', 'salary': 'fizetés', 'payment': 'fizetés',
        
        // === VERBS ===
        'to be': 'lenni', 'I am': 'vagyok', 'you are': 'vagy', 'is': 'van', 'there is': 'van',
        'to eat': 'enni', 'I eat': 'eszem', 'you eat': 'eszel', 'he eats': 'eszik', 'she eats': 'eszik',
        'to drink': 'inni', 'I drink': 'iszom', 'you drink': 'iszol', 'he drinks': 'iszik', 'she drinks': 'iszik',
        'to work': 'dolgozni', 'I work': 'dolgozom', 'you work': 'dolgozol', 'works': 'dolgozik',
        'to study': 'tanulni', 'I study': 'tanulok', 'you study': 'tanulsz', 'studies': 'tanul',
        'to sleep': 'aludni', 'I sleep': 'alszom', 'you sleep': 'alszol', 'sleeps': 'alszik',
        'to go': 'menni', 'I go': 'megyek', 'you go': 'mész', 'goes': 'megy',
        'to come': 'jönni', 'I come': 'jövök', 'you come': 'jössz', 'comes': 'jön',
        'to see': 'látni', 'I see': 'látok', 'you see': 'látsz', 'sees': 'lát',
        'to hear': 'hallani', 'I hear': 'hallok', 'you hear': 'hallasz', 'hears': 'hall',
        'to speak': 'beszélni', 'I speak': 'beszélek', 'you speak': 'beszélsz', 'speaks': 'beszél',
        'to understand': 'érteni', 'I understand': 'értek', 'you understand': 'értesz', 'understands': 'ért',
        'to love': 'szeretni', 'I love': 'szeretek', 'you love': 'szeretsz', 'loves': 'szeret',
        'to like': 'szeretni', 'I like': 'szeretek', 'you like': 'szeretsz', 'likes': 'szeret',
        'to want': 'akarni', 'I want': 'akarok', 'you want': 'akarsz', 'wants': 'akar',
        'to know': 'tudni', 'I know': 'tudok', 'you know': 'tudsz', 'knows': 'tud',
        'to think': 'gondolni', 'I think': 'gondolok', 'you think': 'gondolsz', 'thinks': 'gondol',
        'to do': 'csinálni', 'I do': 'csinálok', 'you do': 'csinálsz', 'does': 'csinál',
        'to make': 'csinálni', 'I make': 'csinálok', 'you make': 'csinálsz', 'makes': 'csinál',
        'to live': 'élni', 'I live': 'élek', 'you live': 'élsz', 'lives': 'él',
        'to read': 'olvasni', 'I read': 'olvasok', 'you read': 'olvasol', 'reads': 'olvas',
        'to write': 'írni', 'I write': 'írok', 'you write': 'írsz', 'writes': 'ír',
        'to give': 'adni', 'I give': 'adok', 'you give': 'adsz', 'gives': 'ad',
        'to buy': 'venni', 'I buy': 'veszek', 'you buy': 'veszel', 'buys': 'vesz',
        'to take': 'venni', 'I take': 'veszek', 'you take': 'veszel', 'takes': 'vesz',
        'to get': 'kapni', 'I get': 'kapok', 'you get': 'kapsz', 'gets': 'kap',
        'to receive': 'kapni',
        'to find': 'találni', 'I find': 'találok', 'you find': 'találsz', 'finds': 'talál',
        'to search': 'keresni', 'I search': 'keresek', 'you search': 'keresel', 'searches': 'keres',
        'to look': 'nézni', 'I look': 'nézek', 'you look': 'nézel', 'looks': 'néz',
        'to watch': 'nézni', 'I watch': 'nézek', 'you watch': 'nézel', 'watches': 'néz',
        'to wait': 'várni', 'I wait': 'várok', 'you wait': 'vársz', 'waits': 'vár',
        'to play': 'játszani', 'I play': 'játszom', 'you play': 'játszol', 'plays': 'játszik',
        'to run': 'futni', 'I run': 'futok', 'you run': 'futsz', 'runs': 'fut',
        'to walk': 'járni', 'I walk': 'járok', 'you walk': 'jársz', 'walks': 'jár',
        'to sit': 'ülni', 'I sit': 'ülök', 'you sit': 'ülsz', 'sits': 'ül',
        'to stand': 'állni', 'I stand': 'állok', 'you stand': 'állsz', 'stands': 'áll',
        'to lie': 'feküdni', 'to lie down': 'feküdni',
        'to open': 'nyitni', 'I open': 'nyitok', 'you open': 'nyitsz', 'opens': 'nyit',
        'to close': 'zárni', 'I close': 'zárok', 'you close': 'zársz', 'closes': 'zár',
        'to begin': 'kezdeni', 'I begin': 'kezdek', 'you begin': 'kezdesz', 'begins': 'kezd',
        'to finish': 'befejezni', 'I finish': 'befejezek', 'you finish': 'befejezel', 'finishes': 'befejez',
        
        // === ADJECTIVES ===
        'big': 'nagy', 'small': 'kicsi', 'good': 'jó', 'bad': 'rossz', 'new': 'új',
        'old': 'régi', 'young': 'fiatal', 'long': 'hosszú', 'short': 'rövid',
        'tall': 'magas', 'high': 'magas', 'low': 'alacsony', 'wide': 'széles',
        'narrow': 'keskeny', 'thick': 'vastag', 'thin': 'vékony', 'heavy': 'nehéz',
        'light': 'könnyű', 'easy': 'könnyű', 'difficult': 'nehéz', 'strong': 'erős',
        'weak': 'gyenge', 'fast': 'gyors', 'slow': 'lassú', 'beautiful': 'szép',
        'ugly': 'csúnya', 'expensive': 'drága', 'cheap': 'olcsó', 'rich': 'gazdag',
        'poor': 'szegény', 'happy': 'boldog', 'sad': 'szomorú', 'tired': 'fáradt',
        'sick': 'beteg', 'healthy': 'egészséges', 'exciting': 'izgalmas',
        'boring': 'unalmas', 'interesting': 'érdekes', 'important': 'fontos',
        'famous': 'híres', 'free': 'szabad', 'full': 'tele', 'empty': 'üres',
        'clean': 'tiszta', 'dirty': 'piszkos',
        
        // === QUESTIONS ===
        'who': 'ki', 'what': 'mi', 'where': 'hol', 'where to': 'hova', 'where from': 'honnan',
        'when': 'mikor', 'why': 'miért', 'how': 'hogyan', 'how much': 'mennyi',
        'how many': 'hány', 'which': 'melyik',
        
        // === CONJUNCTIONS ===
        'and': 'és', 'or': 'vagy', 'but': 'de', 'because': 'mert', 'if': 'ha',
        'while': 'míg', 'after': 'után', 'before': 'előtt', 'next to': 'mellett',
        'between': 'között', 'under': 'alatt', 'above': 'felett', 'in': 'ban/ben',
        'on': 'on/en/ön', 'at': 'nál/nél',
        
        // === PHRASES ===
        'how are you': 'hogy vagy', 'I am fine': 'jól vagyok',
        'what is your name': 'mi a neved', 'I don\'t understand': 'nem értem',
        'do you speak english': 'beszélsz angolul', 'I speak hungarian': 'beszélek magyarul',
        'where is': 'hol van', 'how much does it cost': 'mennyibe kerül',
        'I would like': 'szeretnék', 'I need': 'szükségem van',
        
        // === COUNTRIES ===
        'Hungary': 'Magyarország', 'hungarian': 'magyar', 'America': 'Amerika',
        'England': 'Anglia', 'Germany': 'Németország', 'France': 'Franciaország',
        'Spain': 'Spanyolország', 'Italy': 'Olaszország', 'Russia': 'Oroszország',
        
        // === MISC ===
        'thing': 'dolog', 'name': 'név', 'address': 'cím', 'number': 'szám',
        'letter': 'levél', 'message': 'üzenet', 'question': 'kérdés', 'answer': 'válasz',
        'problem': 'probléma', 'solution': 'megoldás', 'reason': 'ok', 'way': 'út',
        'part': 'rész', 'whole': 'egész', 'half': 'fél', 'piece': 'darab',
        'page': 'oldal', 'side': 'oldal', 'series': 'sorozat', 'story': 'történet',
        'music': 'zene', 'song': 'dal', 'movie': 'film', 'game': 'játék',
        'sport': 'sport', 'football': 'foci', 'soccer': 'foci', 'basketball': 'kosárlabda',
        
        // === MORE VERBS & CONJUGATIONS ===
        'to teach': 'tanítani', 'I teach': 'tanítok', 'you teach': 'tanítasz', 'teaches': 'tanít',
        'to use': 'használni', 'I use': 'használok', 'you use': 'használsz', 'uses': 'használ',
        'to help': 'segíteni', 'I help': 'segítek', 'you help': 'segítesz', 'helps': 'segít',
        'to feel': 'érezni', 'I feel': 'érzek', 'you feel': 'érzel', 'feels': 'érez',
        'to wear': 'viselni', 'I wear': 'viselek', 'you wear': 'viselsz', 'wears': 'visel',
        'to call': 'hívni', 'I call': 'hívok', 'you call': 'hívsz', 'calls': 'hív',
        'to build': 'építeni', 'I build': 'építek', 'you build': 'építesz', 'builds': 'épít',
        'to break': 'törni', 'I break': 'török', 'you break': 'törsz', 'breaks': 'tör',
        'to bring': 'hozni', 'I bring': 'hozok', 'you bring': 'hozol', 'brings': 'hoz',
        'to take': 'vinni', 'I take': 'viszek', 'you take': 'viszel', 'takes': 'visz',
        'to carry': 'vinni', 'I carry': 'viszek', 'you carry': 'viszel', 'carries': 'visz',
        'to show': 'mutatni', 'I show': 'mutatok', 'you show': 'mutatsz', 'shows': 'mutat',
        'to say': 'mondani', 'I say': 'mondok', 'you say': 'mondasz', 'says': 'mond',
        'to tell': 'mondani', 'I tell': 'mondok', 'you tell': 'mondasz', 'tells': 'mond',
        'to ask': 'kérdezni', 'I ask': 'kérdezek', 'you ask': 'kérdezel', 'asks': 'kérdez',
        'to answer': 'felejelni', 'I answer': 'felelek', 'you answer': 'felelsz', 'answers': 'felel',
        'to remember': 'emlékezni', 'I remember': 'emlékezek', 'you remember': 'emlékezel', 'remembers': 'emlékszik',
        'to forget': 'felejteni', 'I forget': 'felejtek', 'you forget': 'felejtesz', 'forgets': 'felejt',
        'to learn': 'tanulni', 'to try': 'próbálni', 'I try': 'próbálok', 'you try': 'próbálsz', 'tries': 'próbál',
        'to change': 'változni', 'I change': 'változok', 'you change': 'változol', 'changes': 'változik',
        'to stay': 'maradni', 'I stay': 'maradok', 'you stay': 'maradsz', 'stays': 'marad',
        'to move': 'költözni', 'I move': 'költözöm', 'you move': 'költözöl', 'moves': 'költözik',
        'to travel': 'utazni', 'I travel': 'utazom', 'you travel': 'utazol', 'travels': 'utazik',
        'to drive': 'vezetni', 'I drive': 'vezetek', 'you drive': 'vezetsz', 'drives': 'vezet',
        'to lead': 'vezetni', 'I lead': 'vezetek', 'you lead': 'vezetsz', 'leads': 'vezet',
        'to fly': 'repülni', 'I fly': 'repülök', 'you fly': 'repülsz', 'flies': 'repül',
        'to swim': 'úszni', 'I swim': 'úszom', 'you swim': 'úszol', 'swims': 'úszik',
        'to dance': 'táncolni', 'I dance': 'táncolok', 'you dance': 'táncolsz', 'dances': 'táncol',
        'to sing': 'énekelni', 'I sing': 'énekelek', 'you sing': 'énekelsz', 'sings': 'énekel',
        'to draw': 'rajzolni', 'I draw': 'rajzolok', 'you draw': 'rajzolsz', 'draws': 'rajzol',
        'to paint': 'festeni', 'I paint': 'festek', 'you paint': 'festesz', 'paints': 'fest',
        'to cook': 'főzni', 'I cook': 'főzök', 'you cook': 'főzöl', 'cooks': 'főz',
        'to bake': 'sütni', 'I bake': 'sütök', 'you bake': 'sütsz', 'bakes': 'süt',
        'to wash': 'mosni', 'I wash': 'mosok', 'you wash': 'mosol', 'washes': 'mos',
        'to clean': 'takarítani', 'I clean': 'takarítok', 'you clean': 'takarítasz', 'cleans': 'takarít',
        'to organize': 'rendezni', 'I organize': 'rendezek', 'you organize': 'rendezel', 'organizes': 'rendez',
        'to send': 'küldeni', 'I send': 'küldök', 'you send': 'küldesz', 'sends': 'küld',
        'to ask for': 'kérni', 'I ask for': 'kérek', 'you ask for': 'kérsz', 'asks for': 'kér',
        'to pay': 'fizetni', 'I pay': 'fizetek', 'you pay': 'fizetsz', 'pays': 'fizet',
        'to sell': 'eladni', 'I sell': 'eladok', 'you sell': 'eladasz', 'sells': 'elad',
        'to rent': 'bérelni', 'I rent': 'bérelek', 'you rent': 'bérelsz', 'rents': 'bérel',
        'to borrow': 'kölcsönözni', 'I borrow': 'kölcsönzök', 'you borrow': 'kölcsönzöl', 'borrows': 'kölcsönöz',
        'to save': 'spórolni', 'I save': 'spórolok', 'you save': 'spórolsz', 'saves': 'spórol',
        'to spend': 'költeni', 'I spend': 'költök', 'you spend': 'költesz', 'spends': 'költ',
        
        // === MORE ADJECTIVES ===
        'smart': 'okos', 'stupid': 'buta', 'funny': 'vicces', 'serious': 'komoly',
        'kind': 'kedves', 'evil': 'gonosz', 'brave': 'bátor', 'coward': 'gyáva',
        'honest': 'őszinte', 'liar': 'hazug', 'patient': 'türelmes', 'impatient': 'türelmetlen',
        'quiet': 'csöndes', 'loud': 'hangos', 'calm': 'nyugodt', 'nervous': 'ideges',
        'cheerful': 'vidám', 'gloomy': 'komor', 'optimistic': 'optimista', 'pessimistic': 'pesszimista',
        'sure': 'biztos', 'certain': 'biztos', 'uncertain': 'bizonytalan', 'possible': 'lehetséges', 'impossible': 'lehetetlen',
        'dangerous': 'veszélyes', 'safe': 'biztonságos', 'correct': 'helyes', 'incorrect': 'helytelen',
        'true': 'igaz', 'false': 'hamis', 'real': 'valódi', 'fake': 'hamis',
        'natural': 'természetes', 'artificial': 'mesterséges', 'simple': 'egyszerű', 'complicated': 'bonyolult',
        'modern': 'modern', 'ancient': 'régi', 'fresh': 'friss', 'stale': 'régi',
        'wet': 'nedves', 'dry': 'száraz', 'smooth': 'sima', 'rough': 'durva',
        'soft': 'puha', 'hard': 'kemény', 'sharp': 'éles', 'dull': 'tompa',
        'light': 'világos', 'bright': 'világos', 'dark': 'sötét', 'shiny': 'fényes', 'matte': 'matt',
        'open': 'nyitott', 'closed': 'zárt', 'full': 'teli',
        
        // === EMOTIONS & FEELINGS ===
        'feeling': 'érzés', 'love': 'szeretet', 'hate': 'gyűlölet', 'anger': 'düh',
        'joy': 'öröm', 'sadness': 'szomorúság', 'fear': 'félelem', 'hope': 'remény',
        'doubt': 'kétség', 'trust': 'bizalom', 'surprise': 'meglepetés', 'boredom': 'unalom',
        'curiosity': 'kíváncsiság', 'envy': 'irigység', 'pride': 'büszkeség', 'shame': 'szégyen',
        'guilt': 'bűntudat', 'regret': 'megbánás', 'gratitude': 'hála', 'pity': 'sajnálat',
        
        // === MORE HOUSEHOLD ITEMS ===
        'furniture': 'bútor', 'armchair': 'fotel', 'shelf': 'polc', 'carpet': 'szőnyeg',
        'curtain': 'függöny', 'pillow': 'párna', 'blanket': 'takaró', 'sheet': 'lepedő',
        'mattress': 'matrac', 'pot': 'edény', 'dish': 'edény', 'plate': 'tányér', 'glass': 'pohár',
        'cup': 'csésze', 'spoon': 'kanál', 'fork': 'villa', 'knife': 'kés',
        'bowl': 'tál', 'pan': 'serpenyő', 'pot': 'fazék', 'refrigerator': 'hűtőszekrény',
        'stove': 'tűzhely', 'oven': 'sütő', 'microwave': 'mikró', 'washing machine': 'mosógép',
        'dishwasher': 'mosogatógép', 'vacuum cleaner': 'porszívó', 'iron': 'vasaló',
        'switch': 'kapcsoló', 'outlet': 'konnektor', 'faucet': 'csap', 'sink': 'mosogató',
        'toilet': 'vécé', 'shower': 'zuhanyzó', 'bathtub': 'kád', 'towel': 'törölköző',
        'soap': 'szappan', 'shampoo': 'sampon', 'toothbrush': 'fogkefe', 'toothpaste': 'fogkrém',
        
        // === MORE FOOD ===
        'onion': 'hagyma', 'garlic': 'fokhagyma', 'pepper': 'paprika', 'mushroom': 'gomba',
        'lettuce': 'saláta', 'cabbage': 'káposzta', 'peas': 'borsó', 'beans': 'bab',
        'corn': 'kukorica', 'melon': 'dinnye', 'watermelon': 'görögdinnye', 'cherry': 'cseresznye',
        'sour cherry': 'meggy', 'plum': 'szilva', 'apricot': 'barack', 'raspberry': 'málna',
        'blueberry': 'áfonya', 'hazelnut': 'mogyoró', 'walnut': 'dió', 'almond': 'mandula',
        'biscuit': 'keksz', 'peanut butter': 'mogyoróvaj', 'jam': 'dzsem', 'honey': 'méz',
        'yogurt': 'joghurt', 'cream': 'tejszín', 'ice cream': 'fagylalt', 'pizza': 'pizza',
        'hamburger': 'hamburger', 'sandwich': 'szendvics', 'hot dog': 'hot dog',
        
        // === NATURE & ENVIRONMENT ===
        'nature': 'természet', 'world': 'világ', 'earth': 'föld', 'ground': 'föld', 'sky': 'égbolt',
        'ocean': 'óceán', 'island': 'sziget', 'shore': 'part', 'coast': 'part', 'desert': 'sivatag',
        'jungle': 'dzsungel', 'field': 'mező', 'garden': 'kert', 'flower': 'virág',
        'tree': 'fa', 'bush': 'bokor', 'grass': 'fű', 'leaf': 'levél',
        'root': 'gyökér', 'branch': 'ág', 'trunk': 'törzs', 'seed': 'mag',
        'stone': 'kő', 'rock': 'szikla', 'sand': 'homok', 'mud': 'sár',
        'ice': 'jég', 'wave': 'hullám', 'flood': 'áradat', 'fire': 'tűz',
        
        // === MORE ANIMALS ===
        'tiger': 'tigris', 'leopard': 'leopárd', 'cheetah': 'gepárd', 'giraffe': 'zsiráf',
        'zebra': 'zebra', 'rhinoceros': 'orrszarvú', 'hippopotamus': 'víziló', 'crocodile': 'krokodil',
        'snake': 'kígyó', 'lizard': 'gyík', 'turtle': 'teknős', 'frog': 'béka',
        'butterfly': 'pillangó', 'bee': 'méh', 'ant': 'hangya', 'spider': 'pók',
        'fly': 'légy', 'mosquito': 'szúnyog', 'beetle': 'bogár', 'worm': 'féreg',
        'pigeon': 'galamb', 'sparrow': 'veréb', 'crow': 'holló', 'eagle': 'sas',
        'owl': 'bagoly', 'parrot': 'papagáj', 'penguin': 'pingvin', 'swan': 'hattyú',
        'duck': 'kacsa', 'goose': 'liba', 'turkey': 'pulyka', 'ostrich': 'strucc',
        'dolphin': 'delfin', 'whale': 'bálna', 'shark': 'cápa', 'octopus': 'polip',
        'crab': 'rák', 'lobster': 'homár', 'shell': 'kagyló', 'clam': 'kagyló',
        
        // === TECHNOLOGY & MODERN LIFE ===
        'machine': 'gép', 'engine': 'motor', 'wheel': 'kerék', 'battery': 'battery',
        'electricity': 'elektromosság', 'energy': 'energia', 'current': 'áram',
        'keyboard': 'billentyűzet', 'mouse': 'egér', 'monitor': 'monitor', 'screen': 'képernyő',
        'speaker': 'hangszóró', 'microphone': 'mikrofon', 'camera': 'kamera', 'video': 'videó',
        'photograph': 'fénykép', 'image': 'kép', 'sound': 'hang', 'noise': 'zaj',
        'application': 'alkalmazás', 'program': 'program', 'software': 'szoftver', 'hardware': 'hardver',
        'data': 'adat', 'information': 'információ', 'file': 'fájl', 'folder': 'mappa',
        'password': 'jelszó', 'user': 'felhasználó', 'account': 'számla', 'login': 'bejelentkezés',
        
        // === HEALTH & MEDICAL ===
        'health': 'egészség', 'illness': 'betegség', 'pain': 'fájdalom', 'injury': 'sérülés',
        'fever': 'láz', 'cough': 'köhögés', 'cold': 'nátha', 'flu': 'influenza',
        'allergy': 'allergia', 'medicine': 'gyógyszer', 'pill': 'tabletta', 'injection': 'injekció',
        'doctor': 'orvos', 'nurse': 'nővér', 'patient': 'beteg', 'treatment': 'kezelés',
        'operation': 'műtét', 'surgery': 'műtét', 'examination': 'vizsgálat', 'diagnosis': 'diagnózis',
        'recovery': 'gyógyulás', 'prevention': 'megelőzés', 'blood': 'vér', 'bone': 'csont',
        
        // === ABSTRACT CONCEPTS ===
        'life': 'élet', 'death': 'halál', 'birth': 'születés', 'future': 'jövő',
        'past': 'múlt', 'present': 'jelen', 'dream': 'álom', 'reality': 'valóság',
        'truth': 'igazság', 'lie': 'hazugság', 'secret': 'titok', 'knowledge': 'tudás',
        'wisdom': 'bölcsesség', 'experience': 'tapasztalat', 'memory': 'emlék', 'thought': 'gondolat',
        'idea': 'ötlet', 'plan': 'terv', 'goal': 'cél', 'success': 'siker',
        'failure': 'kudarc', 'opportunity': 'lehetőség', 'choice': 'választás', 'decision': 'döntés',
        'freedom': 'szabadság', 'right': 'jog', 'duty': 'kötelezettség', 'responsibility': 'felelősség',
        'power': 'hatalom', 'force': 'erő', 'strength': 'erő', 'weakness': 'gyengeség',
    }
};
