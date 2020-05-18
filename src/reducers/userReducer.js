import {
	FETCH_BALANCE,
	SIGN_IN,
	FETCH_BANKS,
	ADD_BANK,
} from '../actions/types';

const INITIAL_STATE = {
	first_name: '',
	last_name: '',
	email: '',
	balance: -1.0,
	banks: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_BALANCE:
			return { ...state, balance: action.payload.balance };

		// TODO : This should be removed when we verify that the
		// backend is using JWT to decode access tokens
		case SIGN_IN:
			return { ...state, email: action.email };

		case FETCH_BANKS: {
			if (action.payload.bank_name === '' || action.payload.bank_no === '') {
				return { ...state };
			} else {
				return {
					...state,
					banks: [
						...state.banks,
						{ name: action.payload.bank_name, number: action.payload.bank_no },
					],
				};
			}
		}

		case ADD_BANK:
			return {
				...state,
				banks: [
					...state.banks,
					{ name: action.payload.name, number: action.payload.number },
				],
			};

		default:
			return { ...state };
	}
};
