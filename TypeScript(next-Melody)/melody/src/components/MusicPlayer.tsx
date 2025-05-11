import React, { useState, useRef, useEffect } from 'react';

interface MusicPlayerProps {
  songUrl: string | null;
  onClose: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songUrl, onClose }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current && songUrl) {
      audioRef.current.play();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [songUrl]);

  if (!songUrl) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex items-center justify-between">
      <button onClick={onClose} className="text-lg">Close</button>
      <audio ref={audioRef} src={songUrl} controls />
    </div>
  );
};

export default MusicPlayer;
