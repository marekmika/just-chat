export default {
	login: (user: any) => ({ type: 'LOGIN', payload: user }),
	setUser: (user: any) => ({ type: 'SET_USER', payload: user }),
};
