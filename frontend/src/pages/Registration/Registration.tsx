import type { Component } from 'solid-js';
import { Form } from 'solid-js-form';
import { string } from 'yup';
import Input from '../../components/elements/Input';

// TODO: Generate types from BE
export type UserRegistrationInput = {
	email: string;
	password: string;
	passwordConfirmation: string;
	firstName: string;
	lastName: string;
};

type Props = {
	onRegister: (userData: UserRegistrationInput) => Promise<void>;
};

const Registration: Component<Props> = ({ onRegister }) => {
	return (
		<div>
			<h1>Registration</h1>
			<Form
				initialValues={{
					email: '',
					password: '',
					passwordConfirmation: '',
					firstName: '',
					lastName: '',
				}}
				validation={{
					email: string().required(),
					password: string().required(),
					passwordConfirmation: string().required(),
					firstName: string().required(),
					lastName: string().required(),
				}}
				onSubmit={async (form) => {
					try {
						await onRegister(form.values);
					} catch (err) {
						console.log('🚀 ~ onSubmit={ ~ err', err);
					}
				}}>
				<Input name='email' label='Email' />
				<Input name='password' label='Password' type='password' />
				<Input
					name='passwordConfirmation'
					label='Password confirmation'
					type='password'
				/>
				<Input name='firstName' label='First name' />
				<Input name='lastName' label='Last name' />
				<button type='submit'>Register</button>
			</Form>
		</div>
	);
};

export default Registration;
