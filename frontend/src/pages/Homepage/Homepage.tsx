import { Component, For } from 'solid-js';
import { Form } from 'solid-js-form';
import { string } from 'yup';
import Input from '../../components/elements/Input';

export type Message = {
	id: string;
	createdAt: string;
	updatedAt: string;
	userId: string;
	content: string;
	user: {
		firstName: string;
		lastName: string;
		email: string;
	};
};

type Props = {
	messages: Message[];
	onSendMessage: (message: string) => Promise<void>;
};

const Homepage: Component<Props> = ({ messages, onSendMessage }) => {
	return (
		<div>
			<h1>Just-chat</h1>
			<For each={messages} fallback={<div>Loading...</div>}>
				{(message) => (
					<>
						<div>
							<div>
								<div>
									From: {`${message.user.firstName} ${message.user.lastName}`}
								</div>
								<div>When: {message.createdAt}</div>
								<div>Message: {message.content}</div>
							</div>
						</div>{' '}
						<br />
					</>
				)}
			</For>

			<div>
				<Form
					initialValues={{
						message: '',
					}}
					validation={{
						message: string().required(),
					}}
					onSubmit={async (form) => {
						try {
							await onSendMessage(form.values.message);
						} catch (err) {
							console.log('🚀 ~ onSubmit={ ~ err', err);
						}
					}}>
					<Input name='message' label='Message' />
					<button type='submit'>Send</button>
				</Form>
			</div>
		</div>
	);
};

export default Homepage;
