// global.d.ts
interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: typeof Spotify;
  }
  
  declare namespace Spotify {
    interface Player {
      new (options: PlayerOptions): Player;
      connect(): Promise<boolean>;
      disconnect(): void;
      addListener(event: string, callback: (data: any) => void): void;
    }
  
    interface PlayerOptions {
      name: string;
      getOAuthToken: (cb: (token: string) => void) => void;
    }
  
    interface PlayerInstance {
      device_id: string;
    }
  }
  