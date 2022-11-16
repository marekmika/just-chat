import type { Component, createMemo } from 'solid-js';
import { createQuery, useClient } from 'solid-urql';
import Login from './Login';

const LoginQuery = /* gql */ `
    query login($email: String!, $password: String!){
        login(email: $email, password: $password) {
            id
            email
            token
        }
  }`;

const LoginContainer: Component = () => {
	const handleLogin = async (email: string, password: string) => {
		const [resultQuery, queryState] = createQuery({
			query: LoginQuery,
			variables: {
				email,
				password,
			},
			context: {
				url: import.meta.env.VITE_FRONTED_API,
			},
		});

		if (queryState()?.error) {
			// TODO: Handle error
			return;
		}

		window.localStorage.setItem('sessionToken', resultQuery()?.login?.token);
	};

	return <Login onLogin={handleLogin} />;
};

export default LoginContainer;
