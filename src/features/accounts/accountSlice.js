const ACCOUNT_DEPOSIT = "account/deposit";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
}

const host = 'api.frankfurter.app';

function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case ACCOUNT_DEPOSIT:
            return { ...state, balance: state.balance + action.payload, isLoading: false };
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
        case "account/loading":
            return {
                ...state,
                isLoading: true,
            }
        default:
            return state;


    }
}

function deposit(amount, currency) {
    if (currency === "USD") {
        return { type: ACCOUNT_DEPOSIT, payload: amount };
    }
    return async function (dispatch, getState) {
        dispatch({ type: "account/loading" })
        const res = await fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        const converted = data.rates.USD;
        dispatch({ type: ACCOUNT_DEPOSIT, payload: converted });
    };
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