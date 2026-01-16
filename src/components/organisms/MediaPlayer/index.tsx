"use client";

import type { VariantProps } from "class-variance-authority";
import { useRef, useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import {
  ImageIcon,
  MaximizeIcon,
  MessageSquareIcon,
  MicIcon,
  MicOffIcon,
  PauseIcon,
  PhoneOffIcon,
  PlayIcon,
  RepeatIcon,
  SettingsIcon,
  SkipBackIcon,
  SkipForwardIcon,
  UsersIcon,
  VideoIcon,
  VideoOffIcon,
  Volume2Icon,
  VolumeXIcon,
  XIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  audioPlayerVariants,
  mediaControlButtonVariants,
  mediaControlsVariants,
  mediaProgressBarVariants,
  mediaProgressFillVariants,
  videoCallButtonVariants,
  videoCallControlsVariants,
  videoCallParticipantVariants,
  videoCallVariants,
  videoControlsVariants,
  videoPlayerVariants,
} from "@/lib/variants";

// =============================================================================
// VideoPlayer
// =============================================================================

export interface VideoPlayerProps
  extends VariantProps<typeof videoPlayerVariants> {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  className?: string;
}

export function VideoPlayer({
  src,
  poster,
  title: _title,
  autoPlay = false,
  loop = false,
  muted = false,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  variant,
  size,
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(muted ? 0 : 1);
  const [isMuted, setIsMuted] = useState(muted);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        onPause?.();
      } else {
        videoRef.current.play();
        onPlay?.();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      onTimeUpdate?.(videoRef.current.currentTime, videoRef.current.duration);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * duration;
    }
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, percent));
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (videoRef.current) {
      videoRef.current.muted = newMuted;
    }
  };

  const handleFullscreen = () => {
    videoRef.current?.requestFullscreen();
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  return (
    <section
      className={cn(videoPlayerVariants({ variant, size }), className)}
      aria-label="Video player"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          onEnded?.();
        }}
        onClick={handlePlayPause}
      />

      <div
        className={cn(
          videoControlsVariants({ visible: showControls }),
          "transition-opacity duration-300",
        )}
      >
        {/* Progress bar */}
        <div
          className={cn(mediaProgressBarVariants({}))}
          role="slider"
          tabIndex={0}
          aria-label="Video progress"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          onClick={handleSeek}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" && videoRef.current) {
              e.preventDefault();
              videoRef.current.currentTime = Math.min(
                duration,
                currentTime + 5,
              );
            } else if (e.key === "ArrowLeft" && videoRef.current) {
              e.preventDefault();
              videoRef.current.currentTime = Math.max(0, currentTime - 5);
            }
          }}
        >
          <div
            className={cn(mediaProgressFillVariants({}))}
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={cn(
                mediaControlButtonVariants({ variant: "primary", size: "md" }),
              )}
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <PauseIcon className="size-5" />
              ) : (
                <PlayIcon className="size-5" />
              )}
            </button>

            <button
              type="button"
              className={cn(mediaControlButtonVariants({}))}
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeXIcon className="size-5" />
              ) : (
                <Volume2Icon className="size-5" />
              )}
            </button>

            <div
              className="w-20 h-1 rounded-full bg-white/20 cursor-pointer group"
              role="slider"
              tabIndex={0}
              aria-label="Volume"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round((isMuted ? 0 : volume) * 100)}
              onClick={handleVolumeChange}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                  e.preventDefault();
                  const newVolume = Math.min(1, volume + 0.1);
                  setVolume(newVolume);
                  setIsMuted(newVolume === 0);
                  if (videoRef.current) {
                    videoRef.current.volume = newVolume;
                    videoRef.current.muted = newVolume === 0;
                  }
                } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                  e.preventDefault();
                  const newVolume = Math.max(0, volume - 0.1);
                  setVolume(newVolume);
                  setIsMuted(newVolume === 0);
                  if (videoRef.current) {
                    videoRef.current.volume = newVolume;
                    videoRef.current.muted = newVolume === 0;
                  }
                }
              }}
            >
              <div
                className="h-full rounded-full bg-white transition-all"
                style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
              />
            </div>

            <span className="text-xs text-white/80 ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className={cn(mediaControlButtonVariants({}))}
            >
              <SettingsIcon className="size-5" />
            </button>
            <button
              type="button"
              className={cn(mediaControlButtonVariants({}))}
              onClick={handleFullscreen}
            >
              <MaximizeIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {!isPlaying && !showControls && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            className="flex size-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            onClick={handlePlayPause}
          >
            <PlayIcon className="size-8 text-white" />
          </button>
        </div>
      )}
    </section>
  );
}

// =============================================================================
// AudioPlayer
// =============================================================================

export interface AudioPlayerProps
  extends VariantProps<typeof audioPlayerVariants> {
  src: string;
  title?: string;
  artist?: string;
  coverImage?: string;
  autoPlay?: boolean;
  loop?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  className?: string;
}

export function AudioPlayer({
  src,
  title,
  artist,
  coverImage,
  autoPlay = false,
  loop = false,
  onPlay,
  onPause,
  onEnded,
  variant,
  size,
  className,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [_volume, _setVolume] = useState(1);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        onPause?.();
      } else {
        audioRef.current.play();
        onPlay?.();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = percent * duration;
    }
  };

  return (
    <div className={cn(audioPlayerVariants({ variant, size }), className)}>
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => {
          setIsPlaying(false);
          onEnded?.();
        }}
      >
        <track kind="captions" />
      </audio>

      <div className="flex items-center gap-4">
        {coverImage && (
          <img
            src={coverImage}
            alt={title || "Audio cover"}
            className="size-12 rounded-lg object-cover"
          />
        )}

        <div className="flex-1 min-w-0">
          {title && <p className="font-medium truncate">{title}</p>}
          {artist && (
            <p className="text-sm text-muted-foreground truncate">{artist}</p>
          )}

          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-muted-foreground w-10">
              {formatTime(currentTime)}
            </span>
            <div
              className="flex-1 h-1 rounded-full bg-muted cursor-pointer"
              role="slider"
              tabIndex={0}
              aria-label="Audio progress"
              aria-valuemin={0}
              aria-valuemax={duration}
              aria-valuenow={currentTime}
              onClick={handleSeek}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" && audioRef.current) {
                  e.preventDefault();
                  audioRef.current.currentTime = Math.min(
                    duration,
                    currentTime + 5,
                  );
                } else if (e.key === "ArrowLeft" && audioRef.current) {
                  e.preventDefault();
                  audioRef.current.currentTime = Math.max(0, currentTime - 5);
                }
              }}
            >
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={handlePlayPause}>
            {isPlaying ? (
              <PauseIcon className="size-5" />
            ) : (
              <PlayIcon className="size-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// VideoCall
// =============================================================================

export interface VideoCallParticipant {
  id: string;
  name: string;
  avatar?: string;
  isMuted?: boolean;
  isVideoOff?: boolean;
  isSpeaking?: boolean;
  isHost?: boolean;
}

export interface VideoCallProps extends VariantProps<typeof videoCallVariants> {
  participants: VideoCallParticipant[];
  localParticipant?: VideoCallParticipant;
  isMuted?: boolean;
  isVideoOff?: boolean;
  onToggleMute?: () => void;
  onToggleVideo?: () => void;
  onEndCall?: () => void;
  onToggleChat?: () => void;
  onToggleParticipants?: () => void;
  onShareScreen?: () => void;
  className?: string;
}

export function VideoCall({
  participants,
  localParticipant,
  isMuted = false,
  isVideoOff = false,
  onToggleMute,
  onToggleVideo,
  onEndCall,
  onToggleChat,
  onToggleParticipants,
  onShareScreen,
  layout,
  className,
}: VideoCallProps) {
  const gridCols =
    participants.length <= 1
      ? "grid-cols-1"
      : participants.length <= 4
        ? "grid-cols-2"
        : "grid-cols-3";

  return (
    <div className={cn(videoCallVariants({ layout }), "relative", className)}>
      {/* Participants grid */}
      <div className={cn("grid gap-2 p-2 flex-1", gridCols)}>
        {participants.map((participant) => (
          <div
            key={participant.id}
            className={cn(
              videoCallParticipantVariants({
                variant: participant.isSpeaking ? "speaking" : "default",
              }),
              "aspect-video flex items-center justify-center",
            )}
          >
            {participant.isVideoOff ? (
              <Avatar
                name={participant.name}
                src={participant.avatar}
                size="xl"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-700" />
            )}
            <div className="absolute bottom-2 left-2 flex items-center gap-2">
              <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                {participant.name}
                {participant.isHost && " (Host)"}
              </span>
              {participant.isMuted && (
                <span className="bg-red-500 p-1 rounded">
                  <MicOffIcon className="size-3 text-white" />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Local video (picture-in-picture) */}
      {localParticipant && (
        <div className="absolute bottom-20 right-4 w-48 aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-800">
          {isVideoOff ? (
            <div className="w-full h-full flex items-center justify-center">
              <Avatar
                name={localParticipant.name}
                src={localParticipant.avatar}
                size="lg"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-700" />
          )}
          <span className="absolute bottom-1 left-2 text-white text-xs bg-black/50 px-1 rounded">
            You
          </span>
        </div>
      )}

      {/* Controls */}
      <div className={cn(videoCallControlsVariants({ variant: "floating" }))}>
        <button
          type="button"
          className={cn(
            videoCallButtonVariants({
              variant: isMuted ? "muted" : "default",
            }),
          )}
          onClick={onToggleMute}
        >
          {isMuted ? (
            <MicOffIcon className="size-5" />
          ) : (
            <MicIcon className="size-5" />
          )}
        </button>
        <button
          type="button"
          className={cn(
            videoCallButtonVariants({
              variant: isVideoOff ? "muted" : "default",
            }),
          )}
          onClick={onToggleVideo}
        >
          {isVideoOff ? (
            <VideoOffIcon className="size-5" />
          ) : (
            <VideoIcon className="size-5" />
          )}
        </button>
        <button
          type="button"
          className={cn(videoCallButtonVariants({}))}
          onClick={onShareScreen}
        >
          <MaximizeIcon className="size-5" />
        </button>
        <button
          type="button"
          className={cn(videoCallButtonVariants({}))}
          onClick={onToggleParticipants}
        >
          <UsersIcon className="size-5" />
        </button>
        <button
          type="button"
          className={cn(videoCallButtonVariants({}))}
          onClick={onToggleChat}
        >
          <MessageSquareIcon className="size-5" />
        </button>
        <button
          type="button"
          className={cn(videoCallButtonVariants({ variant: "danger" }))}
          onClick={onEndCall}
        >
          <PhoneOffIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// MediaControls
// =============================================================================

export interface MediaControlsProps
  extends VariantProps<typeof mediaControlsVariants> {
  isPlaying?: boolean;
  isMuted?: boolean;
  currentTime?: number;
  duration?: number;
  volume?: number;
  onPlayPause?: () => void;
  onMute?: () => void;
  onVolumeChange?: (volume: number) => void;
  onSeek?: (time: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onRepeat?: () => void;
  onShuffle?: () => void;
  showProgress?: boolean;
  showVolume?: boolean;
  className?: string;
}

export function MediaControls({
  isPlaying = false,
  isMuted = false,
  currentTime = 0,
  duration = 0,
  volume = 1,
  onPlayPause,
  onMute,
  onVolumeChange,
  onSeek,
  onPrevious,
  onNext,
  onRepeat,
  onShuffle: _onShuffle,
  showProgress = true,
  showVolume = true,
  variant,
  align,
  className,
}: MediaControlsProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek?.(percent * duration);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onVolumeChange?.(Math.max(0, Math.min(1, percent)));
  };

  return (
    <div className={cn("space-y-2", className)}>
      {showProgress && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-10">
            {formatTime(currentTime)}
          </span>
          <div
            className="flex-1 h-1 rounded-full bg-muted cursor-pointer"
            role="slider"
            tabIndex={0}
            aria-label="Media progress"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={currentTime}
            onClick={handleSeek}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                onSeek?.(Math.min(duration, currentTime + 5));
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                onSeek?.(Math.max(0, currentTime - 5));
              }
            }}
          >
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground w-10 text-right">
            {formatTime(duration)}
          </span>
        </div>
      )}

      <div className={cn(mediaControlsVariants({ variant, align }))}>
        {onRepeat && (
          <Button variant="ghost" size="icon" onClick={onRepeat}>
            <RepeatIcon className="size-4" />
          </Button>
        )}
        {onPrevious && (
          <Button variant="ghost" size="icon" onClick={onPrevious}>
            <SkipBackIcon className="size-5" />
          </Button>
        )}
        <Button
          variant="primary"
          size="icon"
          className="size-10"
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <PauseIcon className="size-5" />
          ) : (
            <PlayIcon className="size-5" />
          )}
        </Button>
        {onNext && (
          <Button variant="ghost" size="icon" onClick={onNext}>
            <SkipForwardIcon className="size-5" />
          </Button>
        )}

        {showVolume && (
          <div className="flex items-center gap-2 ml-4">
            <Button variant="ghost" size="icon" onClick={onMute}>
              {isMuted || volume === 0 ? (
                <VolumeXIcon className="size-4" />
              ) : (
                <Volume2Icon className="size-4" />
              )}
            </Button>
            <div
              className="w-20 h-1 rounded-full bg-muted cursor-pointer"
              role="slider"
              tabIndex={0}
              aria-label="Volume"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round((isMuted ? 0 : volume) * 100)}
              onClick={handleVolumeChange}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                  e.preventDefault();
                  onVolumeChange?.(Math.min(1, volume + 0.1));
                } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                  e.preventDefault();
                  onVolumeChange?.(Math.max(0, volume - 0.1));
                }
              }}
            >
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// VoiceMessage
// =============================================================================

export interface VoiceMessageProps {
  src?: string;
  duration: number;
  variant?: "default" | "sent" | "received" | "crm";
  status?: "played" | "unplayed";
  size?: "sm" | "md" | "lg";
  timestamp?: string;
  senderName?: string;
  senderAvatar?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  className?: string;
}

export function VoiceMessage({
  src,
  duration,
  variant = "default",
  status = "unplayed",
  size = "md",
  timestamp,
  senderName,
  senderAvatar,
  onPlay,
  onPause,
  onEnded,
  className,
}: VoiceMessageProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [played, setPlayed] = useState(status === "played");

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        onPause?.();
      } else {
        audioRef.current.play();
        onPlay?.();
        if (!played) setPlayed(true);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = percent * duration;
    }
  };

  // Generate random waveform bars for visual representation
  const waveformBars = Array.from({ length: 30 }, (_, i) => {
    const height = Math.random() * 60 + 20;
    const progress = (currentTime / duration) * 100;
    const barProgress = (i / 30) * 100;
    const isActive = barProgress <= progress;

    return { id: `bar-${i}`, height, isActive };
  });

  const sizeClasses = {
    sm: { icon: "size-4", text: "text-xs" },
    md: { icon: "size-5", text: "text-sm" },
    lg: { icon: "size-6", text: "text-base" },
  };

  const isSent = variant === "sent";

  return (
    <div className={cn("flex items-start gap-2", className)}>
      {/* Avatar for received/CRM variant */}
      {(variant === "received" || variant === "crm") && senderAvatar && (
        <Avatar name={senderName || "User"} src={senderAvatar} size="sm" />
      )}

      <div className="flex flex-col gap-1 min-w-0 flex-1">
        {/* Sender name for CRM */}
        {variant === "crm" && senderName && (
          <span className="text-xs font-medium text-foreground">
            {senderName}
          </span>
        )}

        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl px-4 py-3",
            variant === "default" && "bg-muted",
            variant === "sent" && "bg-primary text-primary-foreground",
            variant === "received" && "bg-muted",
            variant === "crm" && "bg-card border border-border shadow-sm",
            played && "opacity-80",
            size === "sm" && "px-3 py-2 gap-2",
            size === "lg" && "px-5 py-4 gap-4",
          )}
        >
          {src && (
            <audio
              ref={audioRef}
              src={src}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => {
                setIsPlaying(false);
                setCurrentTime(0);
                onEnded?.();
              }}
            >
              <track kind="captions" />
            </audio>
          )}

          {/* Play/Pause button */}
          <button
            type="button"
            className={cn(
              "flex items-center justify-center rounded-full shrink-0 transition-colors",
              isSent
                ? "bg-primary-foreground/20 hover:bg-primary-foreground/30"
                : "bg-primary/10 hover:bg-primary/20",
              size === "sm" && "size-8",
              size === "md" && "size-10",
              size === "lg" && "size-12",
            )}
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <PauseIcon
                className={cn(
                  sizeClasses[size].icon,
                  isSent ? "text-primary-foreground" : "text-primary",
                )}
              />
            ) : (
              <PlayIcon
                className={cn(
                  sizeClasses[size].icon,
                  isSent ? "text-primary-foreground" : "text-primary",
                )}
              />
            )}
          </button>

          {/* Waveform */}
          <div
            className={cn(
              "flex items-center gap-0.5 flex-1 cursor-pointer",
              size === "sm" && "h-6 gap-px",
              size === "md" && "h-8 gap-0.5",
              size === "lg" && "h-10 gap-1",
            )}
            role="slider"
            tabIndex={0}
            aria-label="Voice message progress"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={currentTime}
            onClick={handleSeek}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" && audioRef.current) {
                e.preventDefault();
                audioRef.current.currentTime = Math.min(
                  duration,
                  currentTime + 2,
                );
              } else if (e.key === "ArrowLeft" && audioRef.current) {
                e.preventDefault();
                audioRef.current.currentTime = Math.max(0, currentTime - 2);
              }
            }}
          >
            {waveformBars.map((bar) => (
              <div
                key={bar.id}
                className={cn(
                  "rounded-full transition-all",
                  size === "sm" && "w-0.5",
                  size === "md" && "w-1",
                  size === "lg" && "w-1.5",
                  bar.isActive
                    ? isSent
                      ? "bg-primary-foreground"
                      : "bg-primary"
                    : isSent
                      ? "bg-primary-foreground/40"
                      : "bg-foreground/30",
                )}
                style={{ height: `${bar.height}%` }}
              />
            ))}
          </div>

          {/* Duration */}
          <span
            className={cn(
              "shrink-0 tabular-nums",
              sizeClasses[size].text,
              isSent ? "text-primary-foreground/70" : "text-muted-foreground",
            )}
          >
            {formatTime(isPlaying ? currentTime : duration)}
          </span>
        </div>

        {/* Timestamp and status */}
        {(timestamp || status === "unplayed") && (
          <div className="flex items-center gap-1 px-1">
            {timestamp && (
              <span className="text-xs text-muted-foreground">{timestamp}</span>
            )}
            {status === "unplayed" && !played && (
              <span className="size-1.5 rounded-full bg-primary" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// VideoCallSettings
// =============================================================================

export interface VideoDevice {
  id: string;
  label: string;
}

export interface AudioDevice {
  id: string;
  label: string;
}

export interface BackgroundOption {
  id: string;
  label: string;
  type: "none" | "blur" | "image";
  imageUrl?: string;
}

export interface VideoCallSettingsProps {
  variant?: "default" | "compact" | "modal";
  videoDevices?: VideoDevice[];
  audioInputDevices?: AudioDevice[];
  audioOutputDevices?: AudioDevice[];
  backgroundOptions?: BackgroundOption[];
  selectedVideoDevice?: string;
  selectedAudioInput?: string;
  selectedAudioOutput?: string;
  selectedBackground?: string;
  isMicEnabled?: boolean;
  isCameraEnabled?: boolean;
  onVideoDeviceChange?: (deviceId: string) => void;
  onAudioInputChange?: (deviceId: string) => void;
  onAudioOutputChange?: (deviceId: string) => void;
  onBackgroundChange?: (backgroundId: string) => void;
  onMicToggle?: () => void;
  onCameraToggle?: () => void;
  onClose?: () => void;
  showPreview?: boolean;
  className?: string;
}

const defaultVideoDevices: VideoDevice[] = [
  { id: "default", label: "Default Camera" },
  { id: "facetime", label: "FaceTime HD Camera" },
  { id: "external", label: "External USB Camera" },
];

const defaultAudioInputDevices: AudioDevice[] = [
  { id: "default", label: "Default Microphone" },
  { id: "builtin", label: "Built-in Microphone" },
  { id: "headset", label: "Headset Microphone" },
];

const defaultAudioOutputDevices: AudioDevice[] = [
  { id: "default", label: "Default Speakers" },
  { id: "builtin", label: "Built-in Speakers" },
  { id: "headphones", label: "Headphones" },
];

const defaultBackgroundOptions: BackgroundOption[] = [
  { id: "none", label: "None", type: "none" },
  { id: "blur", label: "Blur", type: "blur" },
  {
    id: "office",
    label: "Office",
    type: "image",
    imageUrl: "/backgrounds/office.jpg",
  },
  {
    id: "nature",
    label: "Nature",
    type: "image",
    imageUrl: "/backgrounds/nature.jpg",
  },
];

export function VideoCallSettings({
  variant = "default",
  videoDevices = defaultVideoDevices,
  audioInputDevices = defaultAudioInputDevices,
  audioOutputDevices = defaultAudioOutputDevices,
  backgroundOptions = defaultBackgroundOptions,
  selectedVideoDevice = "default",
  selectedAudioInput = "default",
  selectedAudioOutput = "default",
  selectedBackground = "none",
  isMicEnabled = true,
  isCameraEnabled = true,
  onVideoDeviceChange,
  onAudioInputChange,
  onAudioOutputChange,
  onBackgroundChange,
  onMicToggle,
  onCameraToggle,
  onClose,
  showPreview = true,
  className,
}: VideoCallSettingsProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-card",
        variant === "default" && "p-6",
        variant === "compact" && "p-4",
        variant === "modal" && "p-6 border border-border shadow-lg",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Settings</h3>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <XIcon className="size-4" />
          </Button>
        )}
      </div>

      {/* Video Preview */}
      {showPreview && (
        <div className="relative aspect-video max-w-md mb-6 rounded-lg overflow-hidden bg-gray-900 mx-auto">
          {isCameraEnabled ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/60 text-sm">Camera Preview</div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <VideoOffIcon className="size-12 text-white/40" />
                <span className="text-white/60 text-sm">Camera is off</span>
              </div>
            </div>
          )}

          {/* Quick controls overlay */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <button
              type="button"
              className={cn(
                "rounded-full p-2 transition-colors",
                isMicEnabled
                  ? "bg-white/20 hover:bg-white/30 text-white"
                  : "bg-red-500 text-white",
              )}
              onClick={onMicToggle}
            >
              {isMicEnabled ? (
                <MicIcon className="size-4" />
              ) : (
                <MicOffIcon className="size-4" />
              )}
            </button>
            <button
              type="button"
              className={cn(
                "rounded-full p-2 transition-colors",
                isCameraEnabled
                  ? "bg-white/20 hover:bg-white/30 text-white"
                  : "bg-red-500 text-white",
              )}
              onClick={onCameraToggle}
            >
              {isCameraEnabled ? (
                <VideoIcon className="size-4" />
              ) : (
                <VideoOffIcon className="size-4" />
              )}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-1">
        {/* Camera selection */}
        <div className="flex items-center justify-between gap-4 py-3 border-b border-border">
          <div className="flex items-center gap-3 shrink-0">
            <VideoIcon className="size-5 text-muted-foreground" />
            <span className="text-sm font-medium">Camera</span>
          </div>
          <select
            className="w-full max-w-[200px] rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            value={selectedVideoDevice}
            onChange={(e) => onVideoDeviceChange?.(e.target.value)}
          >
            {videoDevices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.label}
              </option>
            ))}
          </select>
        </div>

        {/* Microphone selection */}
        <div className="flex items-center justify-between gap-4 py-3 border-b border-border">
          <div className="flex items-center gap-3 shrink-0">
            <MicIcon className="size-5 text-muted-foreground" />
            <span className="text-sm font-medium">Microphone</span>
          </div>
          <select
            className="w-full max-w-[200px] rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            value={selectedAudioInput}
            onChange={(e) => onAudioInputChange?.(e.target.value)}
          >
            {audioInputDevices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.label}
              </option>
            ))}
          </select>
        </div>

        {/* Speaker selection */}
        <div className="flex items-center justify-between gap-4 py-3 border-b border-border">
          <div className="flex items-center gap-3 shrink-0">
            <Volume2Icon className="size-5 text-muted-foreground" />
            <span className="text-sm font-medium">Speakers</span>
          </div>
          <select
            className="w-full max-w-[200px] rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            value={selectedAudioOutput}
            onChange={(e) => onAudioOutputChange?.(e.target.value)}
          >
            {audioOutputDevices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.label}
              </option>
            ))}
          </select>
        </div>

        {/* Background selection */}
        <div className="py-3">
          <div className="flex items-center gap-3 mb-3">
            <ImageIcon className="size-5 text-muted-foreground" />
            <span className="text-sm font-medium">Background</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {backgroundOptions.map((option) => (
              <button
                type="button"
                key={option.id}
                className={cn(
                  "relative size-16 rounded-lg border-2 overflow-hidden transition-all",
                  selectedBackground === option.id
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-border hover:border-primary/50",
                )}
                onClick={() => onBackgroundChange?.(option.id)}
              >
                {option.type === "none" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <XIcon className="size-5 text-muted-foreground" />
                  </div>
                )}
                {option.type === "blur" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur">
                    <span className="text-xs font-medium">Blur</span>
                  </div>
                )}
                {option.type === "image" && option.imageUrl && (
                  <img
                    src={option.imageUrl}
                    alt={option.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Types are exported at their definitions above
