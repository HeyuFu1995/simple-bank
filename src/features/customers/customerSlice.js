import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    nationalId: "",
    createAt: "",
}

const custommerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalId) {
                return {
                    payload: {
                        fullName,
                        nationalId,
                        createAt: new Date().toISOString(),
                    },
                }
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalId = action.payload.nationalId;
                state.createAt = action.payload.createAt;
            }
        },
        updateName(state, action) {
            state.fullName = action.payload;
        },
    }
})

// function createCustomer(fullName, nationalId) {
//     return {
//         type: "customer/create",
//         payload: {
//             fullName,
//             nationalId,
//             createAt: new Date().toISOString(),
//         },
//     }
// }

// function updateName(fullName) {
//     return {
//         type: "customer/fullname/update",
//         payload: fullName,
//     }
// }

// function customerReducer(state = initialStateCustomer, action) {
//     switch (action.type) {
//         case "customer/create":
//             return { ...state, ...action.payload };
//         case "customer/fullname/update":
//             return { ...state, fullName: action.payload };
//         default:
//             return state;
//     }
// }

export default custommerSlice.reducer;
export const { createCustomer, updateName } = custommerSlice.actions;