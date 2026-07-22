import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState:{
        userData: null,
        token: localStorage.getItem('token') || null,
        loading: false,
        skills: [],
        projects: [],
        experiences: [],
    },
    reducers:{
        setUserData: (state, action)=>{
            state.userData = action.payload;
        },
        setToken: (state, action)=>{
            state.token = action.payload;
        },
        setLoading: (state, action)=>{
            state.loading = action.payload;
        },
        setSkills:(state, action)=>{
            state.skills = action.payload;
        },
        setProjects:(state, action)=>{
            state.projects= action.payload;
        },
         setExperiences: (state, action) => {
            state.experiences = action.payload;
    },
    },
})

export default userSlice.reducer;

export const {setUserData, setToken, setLoading, setSkills, setProjects,  setExperiences,} = userSlice.actions;