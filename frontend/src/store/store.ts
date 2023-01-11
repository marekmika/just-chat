import { createStore, Reducer } from 'redux';

const defaultState = {
	user: {},
};

type State = {
	user: any;
};

const user: Reducer<State | undefined, any> = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, user: action.payload };
		case 'SET_USER':
			return { ...state, user: action.payload };
		case 'LOGOUT':
			return defaultState;
		default:
			return state;
	}
};

export default createStore(user);
