'use client';
import { useEffect } from 'react';

export default function MemePopper() {
  useEffect(() => {
    const messages = [
      "You've been memed 💥",
      "Frank just sent a spicy message 🌶️",
      "Nina's typing... or is she? 👀",
      "Alert: Meme overload detected 🚨",
      "TalkJS just got weird 😎",
      "PLEASE AT LEAST GIVE US A FLOPPY DISK 💾",
    ];

    function showRandomAlert() {
      const randomIndex = Math.floor(Math.random() * messages.length);
      alert(messages[randomIndex]);
    }

    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        showRandomAlert();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
