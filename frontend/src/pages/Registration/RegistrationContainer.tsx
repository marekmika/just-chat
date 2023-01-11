import { Component, createEffect, createSignal, Show } from 'solid-js';
import Registration, { UserRegistrationInput } from './Registration';
import registerMutation from '../../queries/register';
import { createGraphQLClient } from '@solid-primitives/graphql';
import useRedux from '../../store/useRedux';
import reduxStore from '../../store/store';
import actions from '../../store/actions';
import { useNavigate } from '@solidjs/router';

const query = createGraphQLClient(import.meta.env.VITE_FRONTED_API);

const RegistrationContainer: Component = () => {
	const [store, { login }] = useRedux(reduxStore, actions);
	const [queryVars, setQueryVars] = createSignal<boolean | object>(false);
	const [data] = query(registerMutation, () => queryVars());
	const navigate = useNavigate();

	const onRegister = async (userData: UserRegistrationInput) => {
		const { passwordConfirmation, ...restUserData } = userData;

		setQueryVars({ userData: restUserData });
	};

	createEffect(() => {
		let registerMutationResult;

		try {
			registerMutationResult = data();
		} catch (error) {
			console.log('🚀 ~ createEffect ~ error', error);
		}

		if (typeof registerMutationResult === 'undefined') {
			return;
		}

		window.localStorage.setItem(
			'jwtToken',
			registerMutationResult?.register.token
		);

		login(registerMutationResult?.register);
		navigate('/', { replace: true });
	});

	return <Registration onRegister={onRegister} />;
};

export default RegistrationContainer;
