// spotifySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SpotifyState {
  token: string | null;
  player: any; // O el tipo adecuado para tu reproductor
  deviceId: string | null;
}

const initialState: SpotifyState = {
  token: null,
  player: null,
  deviceId: null,
};

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setPlayer: (state, action: PayloadAction<any>) => {
      state.player = action.payload;
    },
    setDeviceId: (state, action: PayloadAction<string>) => {
      state.deviceId = action.payload;
    },
    clearSpotifyData: (state) => {
      state.token = null;
      state.player = null;
      state.deviceId = null;
    },
  },
});

export const { setToken, setPlayer, setDeviceId, clearSpotifyData } = spotifySlice.actions;

export default spotifySlice.reducer;
