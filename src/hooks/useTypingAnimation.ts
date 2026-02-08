import { useState, useEffect, useCallback } from 'react';

interface UseTypingAnimationOptions {
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export const useTypingAnimation = (
  text: string,
  options: UseTypingAnimationOptions = {}
) => {
  const { speed = 50, delay = 0, onComplete } = options;
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    setIsTyping(false);

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onComplete]);

  return { displayedText, isComplete, isTyping };
};

export const useSequentialTyping = (
  lines: string[],
  options: { speed?: number; lineDelay?: number } = {}
) => {
  const { speed = 50, lineDelay = 500 } = options;
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsComplete(true);
      return;
    }

    const line = lines[currentLineIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex < line.length) {
        setCurrentText(line.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setCompletedLines(prev => [...prev, line]);
        setCurrentText('');
        
        setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
        }, lineDelay);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex, lines, speed, lineDelay]);

  const reset = useCallback(() => {
    setCurrentLineIndex(0);
    setCompletedLines([]);
    setCurrentText('');
    setIsComplete(false);
  }, []);

  return { completedLines, currentText, isComplete, currentLineIndex, reset };
};
