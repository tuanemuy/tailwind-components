"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  videoPlayerVariants,
  videoControlsVariants,
  audioPlayerVariants,
  audioWaveformVariants,
  audioWaveformBarVariants,
  videoCallVariants,
  videoCallParticipantVariants,
  videoCallControlsVariants,
  videoCallButtonVariants,
  mediaControlsVariants,
  mediaControlButtonVariants,
  mediaProgressBarVariants,
  mediaProgressFillVariants,
  volumeSliderVariants,
} from "@/lib/variants";
import { Button } from "@/components/atoms/Button";
import { Avatar } from "@/components/atoms/Avatar";
import {
  PlayIcon,
  PauseIcon,
  Volume2Icon,
  VolumeXIcon,
  MaximizeIcon,
  SkipBackIcon,
  SkipForwardIcon,
  RepeatIcon,
  SettingsIcon,
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
  PhoneIcon,
  PhoneOffIcon,
  UsersIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
} from "@/lib/icons";
import type { VariantProps } from "class-variance-authority";

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
  title,
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
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

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
    <div
      className={cn(videoPlayerVariants({ variant, size }), className)}
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
          "transition-opacity duration-300"
        )}
      >
        {/* Progress bar */}
        <div
          className={cn(mediaProgressBarVariants({}))}
          onClick={handleSeek}
        >
          <div
            className={cn(mediaProgressFillVariants({}))}
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className={cn(mediaControlButtonVariants({ variant: "primary", size: "md" }))}
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <PauseIcon className="size-5" />
              ) : (
                <PlayIcon className="size-5" />
              )}
            </button>

            <button
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
              onClick={handleVolumeChange}
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
            <button className={cn(mediaControlButtonVariants({}))}>
              <SettingsIcon className="size-5" />
            </button>
            <button
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
            className="flex size-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            onClick={handlePlayPause}
          >
            <PlayIcon className="size-8 text-white" />
          </button>
        </div>
      )}
    </div>
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
  const [volume, setVolume] = useState(1);

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
      />

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
              onClick={handleSeek}
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

export interface VideoCallProps
  extends VariantProps<typeof videoCallVariants> {
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
              "aspect-video flex items-center justify-center"
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
          className={cn(
            videoCallButtonVariants({
              variant: isMuted ? "muted" : "default",
            })
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
          className={cn(
            videoCallButtonVariants({
              variant: isVideoOff ? "muted" : "default",
            })
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
          className={cn(videoCallButtonVariants({}))}
          onClick={onShareScreen}
        >
          <MaximizeIcon className="size-5" />
        </button>
        <button
          className={cn(videoCallButtonVariants({}))}
          onClick={onToggleParticipants}
        >
          <UsersIcon className="size-5" />
        </button>
        <button
          className={cn(videoCallButtonVariants({}))}
          onClick={onToggleChat}
        >
          <MessageSquareIcon className="size-5" />
        </button>
        <button
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
  onShuffle,
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
            onClick={handleSeek}
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
          variant="default"
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
              onClick={handleVolumeChange}
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
// Exports
// =============================================================================

export type { VideoCallParticipant };
