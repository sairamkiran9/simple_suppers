import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    token: null,
    profile: null,
    needsCompletion: false,
    profileLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
    },
    setProfile: (state, action) => {
      state.profile = action.payload.profile;
      state.needsCompletion = action.payload.needsCompletion || false;
      state.profileLoading = false;
    },
    setProfileLoading: (state, action) => {
      state.profileLoading = action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    setNeedsCompletion: (state, action) => {
      state.needsCompletion = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.profile = null;
      state.needsCompletion = false;
      state.profileLoading = false;
    },
  },
});

export const { setUser, setProfile, setProfileLoading, updateProfile, setNeedsCompletion, logout } = userSlice.actions;
export default userSlice.reducer;
