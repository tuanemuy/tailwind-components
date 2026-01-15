import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  VideoPlayer,
  AudioPlayer,
  VideoCall,
  MediaControls,
  type VideoCallParticipant,
} from "./index";
import { Button } from "@/components/atoms/Button";

const meta: Meta<typeof VideoPlayer> = {
  title: "Organisms/MediaPlayer",
  component: VideoPlayer,
  parameters: {
    layout: "centered",
  },
};

export default meta;

// =============================================================================
// VideoPlayer Stories
// =============================================================================

export const VideoPlayerDefault: StoryObj<typeof VideoPlayer> = {
  render: () => (
    <div className="w-[800px]">
      <VideoPlayer
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        poster="https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop"
        title="Big Buck Bunny"
      />
    </div>
  ),
};

export const VideoPlayerTheater: StoryObj<typeof VideoPlayer> = {
  render: () => (
    <div className="w-full max-w-4xl">
      <VideoPlayer
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        poster="https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop"
        variant="theater"
      />
    </div>
  ),
};

export const VideoPlayerAutoplay: StoryObj<typeof VideoPlayer> = {
  render: () => (
    <div className="w-[640px]">
      <VideoPlayer
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        autoPlay
        muted
        loop
      />
    </div>
  ),
};

// =============================================================================
// AudioPlayer Stories
// =============================================================================

export const AudioPlayerDefault: StoryObj<typeof AudioPlayer> = {
  render: () => (
    <div className="w-[400px]">
      <AudioPlayer
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        title="SoundHelix Song 1"
        artist="SoundHelix"
        coverImage="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop"
      />
    </div>
  ),
};

export const AudioPlayerCompact: StoryObj<typeof AudioPlayer> = {
  render: () => (
    <div className="w-[350px]">
      <AudioPlayer
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        title="Morning Vibes"
        artist="Chill Beats"
        variant="compact"
      />
    </div>
  ),
};

export const AudioPlayerMinimal: StoryObj<typeof AudioPlayer> = {
  render: () => (
    <div className="w-[300px]">
      <AudioPlayer
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
        variant="minimal"
      />
    </div>
  ),
};

export const AudioPlayerPlaylist: StoryObj<typeof AudioPlayer> = {
  render: () => (
    <div className="w-[400px] space-y-2">
      <AudioPlayer
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        title="Track 1 - Sunset Dreams"
        artist="Chillwave"
        coverImage="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop"
        variant="compact"
      />
      <AudioPlayer
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        title="Track 2 - Ocean Breeze"
        artist="Ambient Sounds"
        coverImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop"
        variant="compact"
      />
      <AudioPlayer
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
        title="Track 3 - Mountain Echo"
        artist="Nature Mix"
        coverImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop"
        variant="compact"
      />
    </div>
  ),
};

// =============================================================================
// VideoCall Stories
// =============================================================================

const participants: VideoCallParticipant[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/200?img=1",
    isHost: true,
    isSpeaking: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/200?img=2",
  },
  {
    id: "3",
    name: "Mike Johnson",
    avatar: "https://i.pravatar.cc/200?img=3",
    isMuted: true,
  },
  {
    id: "4",
    name: "Sarah Wilson",
    avatar: "https://i.pravatar.cc/200?img=4",
    isVideoOff: true,
  },
];

export const VideoCallDefault: StoryObj<typeof VideoCall> = {
  render: function Render() {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    return (
      <div className="w-[900px] h-[600px]">
        <VideoCall
          participants={participants}
          localParticipant={{
            id: "me",
            name: "You",
            avatar: "https://i.pravatar.cc/200?img=5",
          }}
          isMuted={isMuted}
          isVideoOff={isVideoOff}
          onToggleMute={() => setIsMuted(!isMuted)}
          onToggleVideo={() => setIsVideoOff(!isVideoOff)}
          onEndCall={() => console.log("End call")}
          onToggleChat={() => console.log("Toggle chat")}
          onToggleParticipants={() => console.log("Toggle participants")}
          onShareScreen={() => console.log("Share screen")}
        />
      </div>
    );
  },
};

export const VideoCallOneOnOne: StoryObj<typeof VideoCall> = {
  render: function Render() {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    return (
      <div className="w-[800px] h-[500px]">
        <VideoCall
          participants={[participants[0]]}
          localParticipant={{
            id: "me",
            name: "You",
            avatar: "https://i.pravatar.cc/200?img=5",
          }}
          isMuted={isMuted}
          isVideoOff={isVideoOff}
          onToggleMute={() => setIsMuted(!isMuted)}
          onToggleVideo={() => setIsVideoOff(!isVideoOff)}
          onEndCall={() => console.log("End call")}
        />
      </div>
    );
  },
};

export const VideoCallManyParticipants: StoryObj<typeof VideoCall> = {
  render: function Render() {
    const manyParticipants: VideoCallParticipant[] = [
      ...participants,
      { id: "5", name: "Alex Brown", avatar: "https://i.pravatar.cc/200?img=6" },
      { id: "6", name: "Emily Davis", avatar: "https://i.pravatar.cc/200?img=7", isMuted: true },
      { id: "7", name: "Chris Lee", avatar: "https://i.pravatar.cc/200?img=8" },
      { id: "8", name: "Pat Miller", avatar: "https://i.pravatar.cc/200?img=9", isVideoOff: true },
      { id: "9", name: "Jordan Taylor", avatar: "https://i.pravatar.cc/200?img=10" },
    ];

    return (
      <div className="w-[1000px] h-[700px]">
        <VideoCall
          participants={manyParticipants}
          localParticipant={{
            id: "me",
            name: "You",
            avatar: "https://i.pravatar.cc/200?img=5",
          }}
          onToggleMute={() => {}}
          onToggleVideo={() => {}}
          onEndCall={() => {}}
        />
      </div>
    );
  },
};

// =============================================================================
// MediaControls Stories
// =============================================================================

export const MediaControlsDefault: StoryObj<typeof MediaControls> = {
  render: function Render() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.7);

    return (
      <div className="w-[500px] rounded-xl border border-border bg-card p-4">
        <MediaControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          currentTime={120}
          duration={300}
          volume={volume}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onMute={() => setIsMuted(!isMuted)}
          onVolumeChange={setVolume}
          onSeek={(time) => console.log("Seek to:", time)}
          onPrevious={() => console.log("Previous")}
          onNext={() => console.log("Next")}
        />
      </div>
    );
  },
};

export const MediaControlsCompact: StoryObj<typeof MediaControls> = {
  render: function Render() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
      <div className="w-[300px] rounded-xl border border-border bg-card p-4">
        <MediaControls
          isPlaying={isPlaying}
          currentTime={45}
          duration={180}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          showVolume={false}
          variant="compact"
          align="center"
        />
      </div>
    );
  },
};

// =============================================================================
// Full Media Player Experience
// =============================================================================

export const MusicPlayerFull: StoryObj<typeof AudioPlayer> = {
  render: function Render() {
    const [currentTrack, setCurrentTrack] = useState(0);
    const tracks = [
      {
        title: "Sunset Dreams",
        artist: "Chillwave",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
      {
        title: "Ocean Breeze",
        artist: "Ambient Sounds",
        cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      },
      {
        title: "Mountain Echo",
        artist: "Nature Mix",
        cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      },
    ];

    return (
      <div className="w-[400px] rounded-xl border border-border bg-card overflow-hidden">
        {/* Album Art */}
        <div className="aspect-square relative">
          <img
            src={tracks[currentTrack].cover}
            alt={tracks[currentTrack].title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Track Info */}
        <div className="p-4 text-center">
          <h3 className="font-semibold text-lg">{tracks[currentTrack].title}</h3>
          <p className="text-sm text-muted-foreground">
            {tracks[currentTrack].artist}
          </p>
        </div>

        {/* Player Controls */}
        <div className="p-4 pt-0">
          <MediaControls
            isPlaying={false}
            currentTime={0}
            duration={180}
            onPlayPause={() => {}}
            onPrevious={() =>
              setCurrentTrack((i) => (i > 0 ? i - 1 : tracks.length - 1))
            }
            onNext={() =>
              setCurrentTrack((i) => (i < tracks.length - 1 ? i + 1 : 0))
            }
            onRepeat={() => console.log("Repeat")}
            align="center"
          />
        </div>

        {/* Playlist */}
        <div className="border-t border-border p-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            UP NEXT
          </p>
          <div className="space-y-2">
            {tracks.map((track, index) => (
              <button
                key={index}
                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  index === currentTrack
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
                onClick={() => setCurrentTrack(index)}
              >
                <img
                  src={track.cover}
                  alt={track.title}
                  className="size-10 rounded object-cover"
                />
                <div className="text-left">
                  <p className="text-sm font-medium">{track.title}</p>
                  <p className="text-xs text-muted-foreground">{track.artist}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
