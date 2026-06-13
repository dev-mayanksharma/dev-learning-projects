document.addEventListener('DOMContentLoaded', () => {
    
    const textArea = document.getElementById('text-input');
    const wordCounter = document.getElementById('word-counter');
    const errorMessage = document.getElementById('error-message');
    const voiceSelect = document.getElementById('voice-select');
    const convertBtn = document.getElementById('convert-btn');
    const visualizer = document.getElementById('visualizer');

   
    const synth = window.speechSynthesis;
    let voices = [];
    const MAX_WORDS = 1000;


    function loadVoices() {
        voices = synth.getVoices();
        if (voices.length === 0) return;

        voiceSelect.innerHTML = '';
        
      
        voices.sort((a, b) => {
            const aIsPremium = a.name.includes('Google') || a.name.includes('Premium') || a.name.includes('Online');
            const bIsPremium = b.name.includes('Google') || b.name.includes('Premium') || b.name.includes('Online');
            
            if (aIsPremium && !bIsPremium) return -1;
            if (!aIsPremium && bIsPremium) return 1;
            return 0;
        });

        voices.forEach(voice => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.setAttribute('data-name', voice.name);
            option.setAttribute('data-lang', voice.lang);
            voiceSelect.appendChild(option);
        });
    }

    
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    
    textArea.addEventListener('input', function() {
        
        errorMessage.classList.add('hidden');

        
        this.style.height = '120px'; 
        const newHeight = this.scrollHeight;
        
        if (newHeight > 240) {
            this.style.height = '240px';
            this.style.overflowY = 'auto';
        } else {
            this.style.height = newHeight + 'px';
            this.style.overflowY = 'hidden';
        }

        
        let text = this.value.trim();
        let words = text === "" ? [] : text.split(/\s+/);
        
        
        if (words.length > MAX_WORDS) {
            const truncatedText = words.slice(0, MAX_WORDS).join(" ");
            this.value = truncatedText;
            words = truncatedText.split(/\s+/);
            wordCounter.classList.add('limit-reached');
        } else {
            wordCounter.classList.remove('limit-reached');
        }

        wordCounter.textContent = `${words.length} / ${MAX_WORDS} words`;
    });

    
    convertBtn.addEventListener('click', () => {
        const text = textArea.value.trim();

        if (text === '') {
            errorMessage.classList.remove('hidden');
            return;
        }

        
        if (synth.speaking) {
            synth.cancel();
            visualizer.classList.remove('playing');
        }

        const utterance = new SpeechSynthesisUtterance(text);
        
        
        utterance.rate = 0.8;
        utterance.pitch = 1.0; 
        
        const selectedVoiceName = voiceSelect.options[voiceSelect.selectedIndex].getAttribute('data-name');
        const voice = voices.find(v => v.name === selectedVoiceName);
        if (voice) {
            utterance.voice = voice;
        }

        
        utterance.onstart = () => {
            visualizer.classList.add('playing');
        };

        utterance.onend = () => {
            visualizer.classList.remove('playing');
        };

        utterance.onerror = (e) => {
            console.error('SpeechSynthesisError:', e);
            visualizer.classList.remove('playing');
        };

        // Speak
        synth.speak(utterance);
    });
});