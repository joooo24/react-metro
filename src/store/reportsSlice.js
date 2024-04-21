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
        },
        removeFromReports: (state, action) => {
            state.reports = state.reports.filter(
                (report) => report.title !== action.payload
            )
        }
    }
})

export const { addToReports, removeFromReports } = reportsSlice.actions
export default reportsSlice.reducer