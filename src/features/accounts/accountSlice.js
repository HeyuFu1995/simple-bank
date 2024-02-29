const ACCOUNT_DEPOSIT = "account/deposit";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case ACCOUNT_DEPOSIT:
            return { ...state, balance: state.balance + action.payload };
        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload };
        case "account/requestLoan":
            if (state.loan > 0) {
                return state;
            } else {
                return {
                    ...state,
                    loan: action.payload.amount,
                    loanPurpose: action.payload.purpose,
                    balance: state.balance + action.payload.amount,
                };
            }
        case "account/payLoan":
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan
            };
        default:
            return state;


    }
}

function deposit(amount) {
    return { type: ACCOUNT_DEPOSIT, payload: amount };
}
function withdraw(amount) {
    return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
    return {
        type: "account/requestLoan",
        payload: {
            amount,
            purpose,
        },
    }
}

function payLoan() {
    return { type: "account/payLoan" }
}


export default accountReducer;
export { deposit, withdraw, requestLoan, payLoan };