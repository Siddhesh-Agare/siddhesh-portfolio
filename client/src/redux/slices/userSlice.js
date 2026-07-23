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
        educations: [],
        services: [],
        reviews: [],
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
        setEducations: (state, action)=>{
            state.educations = action.payload;
        },
        setServices: (state, action) => {
        state.services = action.payload;
        },
        setReviews: (state, action) => {
        state.reviews = action.payload;
        },
    },
})

export default userSlice.reducer;

export const {setUserData, setToken, setLoading, setSkills, setProjects,  setExperiences, setEducations, setServices, setReviews,} = userSlice.actions;