import type { Component } from 'solid-js';
import { Form } from 'solid-js-form';
import { string } from 'yup';
import Input from '../../components/elements/Input';

type Props = {
	onLogin: (email: string, password: string) => Promise<void>;
};

const Login: Component<Props> = ({ onLogin }) => {
	return (
		<div>
			<h1>Login</h1>
			<Form
				initialValues={{ email: 'user@gmail.com', password: 'Test1234' }}
				validation={{
					email: string().required(),
					password: string().required(),
				}}
				onSubmit={async (form) => {
					const { email, password } = form.values;
					try {
						await onLogin(email, password);
					} catch (err) {
						console.log('🚀 ~ onSubmit={ ~ err', err);
					}
				}}>
				<Input name='email' label='Email' />
				<Input name='password' label='Password' />
				<button type='submit'>Login</button>
			</Form>
		</div>
	);
};

export default Login;
