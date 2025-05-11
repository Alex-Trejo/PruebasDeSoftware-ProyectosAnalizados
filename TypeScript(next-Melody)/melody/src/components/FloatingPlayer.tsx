import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Repeat,
  Shuffle
} from "lucide-react";
import { spotifyApi } from "../utils/spotify";

type Track = {
  album: {
    images: { url: string }[];
  };
  name: string;
  artists: { name: string }[];
  duration_ms: number;
};

const FloatingPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [progress, setProgress] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false); // Estado para shuffle


  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const response = await spotifyApi.getMyCurrentPlaybackState();
        if (response.item) {
          setCurrentTrack(response.item);
          setIsPlaying(response.is_playing);
          setProgress(response.progress_ms ?? 0);
          setIsRepeat(response.repeat_state !== "off");
          setIsShuffle(response.shuffle_state); // Obtener el estado actual de shuffle

        }
      } catch (error) {
        console.error("Error fetching current track:", error);
      }
    };

    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await spotifyApi.pause();
    } else {
      await spotifyApi.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkip = async (direction: "next" | "previous") => {
    if (direction === "next") {
      await spotifyApi.skipToNext();
    } else {
      await spotifyApi.skipToPrevious();
    }
  };

  const handleShuffle = async () => {
    const newShuffleState = !isShuffle;
    await spotifyApi.setShuffle(newShuffleState); // Cambiar estado de shuffle
    setIsShuffle(newShuffleState);
  };


  const handleVolumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    await spotifyApi.setVolume(newVolume);
  };

  const handleProgressChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPosition = parseInt(e.target.value);
    setProgress(newPosition);
    await spotifyApi.seek(newPosition);
  };

  const handleRepeat = async () => {
    const newRepeatState = isRepeat ? "off" : "track";
    await spotifyApi.setRepeat(newRepeatState);
    setIsRepeat(!isRepeat);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="floating-player fixed bottom-0 left-0 right-0 bg-white bg-opacity-20 text-white p-4 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {currentTrack && (
            <>
              <img
                src={currentTrack.album.images[0].url}
                alt={currentTrack.name}
                className="w-12 h-12 mr-4"
              />
              <div>
                <p className="font-semibold">{currentTrack.name}</p>
                <p className="text-sm text-gray-400">
                  {currentTrack.artists[0].name}
                </p>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
        <button
            onClick={handleShuffle}
            className={`focus:outline-none ${isShuffle ? "text-green-500" : ""}`}
          >
            <Shuffle size={24} />
          </button>
          <button onClick={() => handleSkip('previous')} className="focus:outline-none">
            <SkipBack size={24} />
          </button>
          <button onClick={handlePlayPause} className="focus:outline-none">
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button onClick={() => handleSkip('next')} className="focus:outline-none">
            <SkipForward size={24} />
          </button>
          <button
            onClick={handleRepeat}
            className={`focus:outline-none ${isRepeat ? "text-green-500" : ""}`}
          >
            <Repeat size={24} />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <Volume2 size={20} />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs">{formatTime(progress)}</span>
        <input
          type="range"
          min="0"
          max={currentTrack?.duration_ms ?? 100}
          value={progress}
          onChange={handleProgressChange}
          className="w-full "
        />
        <span className="text-xs">
          {currentTrack ? formatTime(currentTrack.duration_ms) : "0:00"}
        </span>
      </div>
    </div>
  );
};

export default FloatingPlayer;
