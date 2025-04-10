// Type definitions for the Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionResult {
  readonly length: number;
  readonly isFinal: boolean;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

// Speech Recognition Function
export const startSpeechRecognition = (
  onResult: (transcript: string) => void,
  onEnd: () => void,
  onError: (error: string) => void
): (() => void) => {
  if (typeof window === 'undefined') {
    return () => {}; // Return empty function for SSR
  }

  // Check if browser supports speech recognition
  const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognitionAPI) {
    onError('Speech recognition not supported in this browser');
    return () => {};
  }

  const recognition = new SpeechRecognitionAPI();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    onError(`Speech recognition error: ${event.error}`);
  };

  recognition.onend = () => {
    onEnd();
  };

  // Start recognition
  try {
    recognition.start();
  } catch (error) {
    onError(`Failed to start speech recognition: ${error}`);
  }

  // Return function to stop recognition
  return () => {
    try {
      recognition.stop();
    } catch (error) {
      console.error('Error stopping speech recognition', error);
    }
  };
};

// Text-to-Speech Function
export const speak = (text: string, onEnd?: () => void): void => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.error('Speech synthesis not supported');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Get available voices and set a natural-sounding voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(
    (voice) => voice.name.includes('Google') || voice.name.includes('Female') || voice.name.includes('Samantha')
  );

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
  }

  window.speechSynthesis.speak(utterance);
};

// Function to initialize voices (should be called on component mount)
export const initVoices = (callback?: () => void): void => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return;
  }

  // Some browsers load voices asynchronously
  if (window.speechSynthesis.getVoices().length > 0) {
    if (callback) callback();
    return;
  }

  window.speechSynthesis.onvoiceschanged = () => {
    if (callback) callback();
  };
};
