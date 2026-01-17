import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  AudioPlayer,
  MediaControls,
  VideoCall,
  type VideoCallParticipant,
  VideoCallSettings,
  VideoPlayer,
  VoiceMessage,
} from "./index";

const meta: Meta<typeof VideoPlayer> = {
  title: "Organisms/DomainSpecific/MediaPlayer",
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
      {
        id: "5",
        name: "Alex Brown",
        avatar: "https://i.pravatar.cc/200?img=6",
      },
      {
        id: "6",
        name: "Emily Davis",
        avatar: "https://i.pravatar.cc/200?img=7",
        isMuted: true,
      },
      { id: "7", name: "Chris Lee", avatar: "https://i.pravatar.cc/200?img=8" },
      {
        id: "8",
        name: "Pat Miller",
        avatar: "https://i.pravatar.cc/200?img=9",
        isVideoOff: true,
      },
      {
        id: "9",
        name: "Jordan Taylor",
        avatar: "https://i.pravatar.cc/200?img=10",
      },
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
        cover:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
      {
        title: "Ocean Breeze",
        artist: "Ambient Sounds",
        cover:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      },
      {
        title: "Mountain Echo",
        artist: "Nature Mix",
        cover:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
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
          <h3 className="font-semibold text-lg">
            {tracks[currentTrack].title}
          </h3>
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
                type="button"
                key={track.title}
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
                  <p className="text-xs text-muted-foreground">
                    {track.artist}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// =============================================================================
// VoiceMessage Stories
// =============================================================================

export const VoiceMessageDefault: StoryObj<typeof VoiceMessage> = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <VoiceMessage duration={45} timestamp="10:30 AM" />
    </div>
  ),
};

export const VoiceMessageSent: StoryObj<typeof VoiceMessage> = {
  render: () => (
    <div className="w-[400px] flex justify-end">
      <div className="max-w-[300px]">
        <VoiceMessage duration={32} variant="sent" timestamp="10:32 AM" />
      </div>
    </div>
  ),
};

export const VoiceMessageReceived: StoryObj<typeof VoiceMessage> = {
  render: () => (
    <div className="w-[400px]">
      <VoiceMessage
        duration={67}
        variant="received"
        senderName="John Doe"
        senderAvatar="https://i.pravatar.cc/200?img=1"
        timestamp="10:35 AM"
      />
    </div>
  ),
};

export const VoiceMessageCRM: StoryObj<typeof VoiceMessage> = {
  render: () => (
    <div className="w-[500px] space-y-4">
      <VoiceMessage
        duration={120}
        variant="crm"
        senderName="Sarah Wilson"
        senderAvatar="https://i.pravatar.cc/200?img=4"
        timestamp="Yesterday, 2:45 PM"
        status="played"
      />
      <VoiceMessage
        duration={45}
        variant="crm"
        senderName="Mike Johnson"
        senderAvatar="https://i.pravatar.cc/200?img=3"
        timestamp="Today, 9:15 AM"
        status="unplayed"
      />
    </div>
  ),
};

export const VoiceMessageSizes: StoryObj<typeof VoiceMessage> = {
  render: () => (
    <div className="w-[500px] space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Small</p>
        <VoiceMessage duration={30} size="sm" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Medium (Default)</p>
        <VoiceMessage duration={45} size="md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Large</p>
        <VoiceMessage duration={60} size="lg" />
      </div>
    </div>
  ),
};

export const VoiceMessageConversation: StoryObj<typeof VoiceMessage> = {
  render: () => (
    <div className="w-[500px] space-y-3 bg-muted/30 p-4 rounded-xl">
      {/* Received message */}
      <div className="max-w-[80%]">
        <VoiceMessage
          duration={25}
          variant="received"
          senderAvatar="https://i.pravatar.cc/200?img=2"
          timestamp="10:30 AM"
          status="played"
        />
      </div>

      {/* Sent message */}
      <div className="flex justify-end">
        <div className="max-w-[80%]">
          <VoiceMessage duration={18} variant="sent" timestamp="10:32 AM" />
        </div>
      </div>

      {/* Received message */}
      <div className="max-w-[80%]">
        <VoiceMessage
          duration={42}
          variant="received"
          senderAvatar="https://i.pravatar.cc/200?img=2"
          timestamp="10:35 AM"
          status="unplayed"
        />
      </div>
    </div>
  ),
};

// =============================================================================
// VideoCallSettings Stories
// =============================================================================

export const VideoCallSettingsDefault: StoryObj<typeof VideoCallSettings> = {
  render: function Render() {
    const [isMicEnabled, setIsMicEnabled] = useState(true);
    const [isCameraEnabled, setIsCameraEnabled] = useState(true);
    const [selectedCamera, setSelectedCamera] = useState("default");
    const [selectedMic, setSelectedMic] = useState("default");
    const [selectedSpeaker, setSelectedSpeaker] = useState("default");
    const [selectedBackground, setSelectedBackground] = useState("none");

    return (
      <div className="w-[500px]">
        <VideoCallSettings
          isMicEnabled={isMicEnabled}
          isCameraEnabled={isCameraEnabled}
          selectedVideoDevice={selectedCamera}
          selectedAudioInput={selectedMic}
          selectedAudioOutput={selectedSpeaker}
          selectedBackground={selectedBackground}
          onMicToggle={() => setIsMicEnabled(!isMicEnabled)}
          onCameraToggle={() => setIsCameraEnabled(!isCameraEnabled)}
          onVideoDeviceChange={setSelectedCamera}
          onAudioInputChange={setSelectedMic}
          onAudioOutputChange={setSelectedSpeaker}
          onBackgroundChange={setSelectedBackground}
          onClose={() => console.log("Close")}
        />
      </div>
    );
  },
};

export const VideoCallSettingsCompact: StoryObj<typeof VideoCallSettings> = {
  render: function Render() {
    const [isMicEnabled, setIsMicEnabled] = useState(true);
    const [isCameraEnabled, setIsCameraEnabled] = useState(false);

    return (
      <div className="w-[400px]">
        <VideoCallSettings
          variant="compact"
          isMicEnabled={isMicEnabled}
          isCameraEnabled={isCameraEnabled}
          onMicToggle={() => setIsMicEnabled(!isMicEnabled)}
          onCameraToggle={() => setIsCameraEnabled(!isCameraEnabled)}
          showPreview={true}
        />
      </div>
    );
  },
};

export const VideoCallSettingsModal: StoryObj<typeof VideoCallSettings> = {
  render: function Render() {
    const [isMicEnabled, setIsMicEnabled] = useState(true);
    const [isCameraEnabled, setIsCameraEnabled] = useState(true);

    return (
      <div className="w-[500px] p-8 bg-muted/30 rounded-xl">
        <VideoCallSettings
          variant="modal"
          isMicEnabled={isMicEnabled}
          isCameraEnabled={isCameraEnabled}
          onMicToggle={() => setIsMicEnabled(!isMicEnabled)}
          onCameraToggle={() => setIsCameraEnabled(!isCameraEnabled)}
          onClose={() => console.log("Close modal")}
        />
      </div>
    );
  },
};

export const VideoCallSettingsNoPreview: StoryObj<typeof VideoCallSettings> = {
  render: function Render() {
    const [selectedCamera, setSelectedCamera] = useState("default");
    const [selectedMic, setSelectedMic] = useState("default");

    return (
      <div className="w-[400px]">
        <VideoCallSettings
          showPreview={false}
          selectedVideoDevice={selectedCamera}
          selectedAudioInput={selectedMic}
          onVideoDeviceChange={setSelectedCamera}
          onAudioInputChange={setSelectedMic}
        />
      </div>
    );
  },
};
