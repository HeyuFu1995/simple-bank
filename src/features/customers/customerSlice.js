const initialStateCustomer = {
    fullName: "",
    nationalId: "",
    createAt: "",
}

function createCustomer(fullName, nationalId) {
    return {
        type: "customer/create",
        payload: {
            fullName,
            nationalId,
            createAt: new Date().toISOString(),
        },
    }
}

function updateName(fullName) {
    return {
        type: "customer/fullname/update",
        payload: fullName,
    }
}

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/create":
            return { ...state, ...action.payload };
        case "customer/fullname/update":
            return { ...state, fullName: action.payload };
        default:
            return state;
    }
}

export default customerReducer;
export { createCustomer, updateName };