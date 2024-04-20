import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reports: []
}

const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {
        addToReports: (state, action) => {
            state.reports.push({
                title: action.payload.title,
                userName: action.payload.userName,
                content: action.payload.content
            })
        }
    }
})

export const { addToReports } = reportsSlice.actions
export default reportsSlice.reducer