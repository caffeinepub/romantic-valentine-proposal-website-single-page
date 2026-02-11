import { useState, useEffect, useRef } from 'react';

interface UseLocalAudioOptions {
  src: string;
  autoPlay?: boolean;
}

interface UseLocalAudioReturn {
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  volume: number;
  isMuted: boolean;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

export function useLocalAudio({ src, autoPlay = false }: UseLocalAudioOptions): UseLocalAudioReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.src = src;
    audio.volume = volume;
    audio.loop = true;
    audioRef.current = audio;

    const handleCanPlay = () => {
      setIsLoading(false);
      setError(null);
      if (autoPlay) {
        audio.play().catch((err) => {
          console.error('Auto-play failed:', err);
          setIsPlaying(false);
        });
      }
    };

    const handleError = () => {
      setIsLoading(false);
      setError('Music file not found. Add your audio file to /assets/audio/music.mp3 to enable playback.');
      setIsPlaying(false);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Try to load the audio
    audio.load();

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audio.src = '';
    };
  }, [src, autoPlay]);

  const play = () => {
    if (audioRef.current && !error) {
      audioRef.current.play().catch((err) => {
        console.error('Play failed:', err);
        setError('Failed to play audio. Please check your browser settings.');
      });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return {
    isPlaying,
    isLoading,
    error,
    volume,
    isMuted,
    play,
    pause,
    togglePlay,
    setVolume,
    toggleMute,
  };
}
