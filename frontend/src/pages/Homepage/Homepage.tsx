import { Component, For, onMount, createEffect } from 'solid-js';
import { Form } from 'solid-js-form';
import { string } from 'yup';
import Input from '../../components/elements/Input';
import { styled } from 'solid-styled-components';

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

const MessagesContainer = styled('div')`
	height: 30rem;
	width: 20rem;
	overflow: auto;
	margin-right: auto;
	margin-left: auto;
`;

type Props = {
	messages: Message[];
	onSendMessage: (message: string) => Promise<void>;
};

const Homepage: Component<Props> = (props) => {
	let formRef: HTMLDivElement | undefined;
	let messageRef: HTMLInputElement | undefined;


	createEffect(() => {
		if (!formRef || !props.messages.length) return;

		formRef.scrollTop = formRef?.scrollHeight;
	});

	return (
		<div>
			<h1>Just-chat</h1>
			<MessagesContainer ref={formRef}>
				<For each={props.messages} fallback={<div>Loading...</div>}>
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
							</div>
							<br />
						</>
					)}
				</For>
			</MessagesContainer>
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
							await props.onSendMessage(form.values.message);

							if(!messageRef || !formRef) return

							messageRef.value = '';
							formRef.scrollTo(0, formRef.scrollHeight);
						} catch (err) {
							console.log('🚀 ~ onSubmit={ ~ err', err);
						}
					}}>
					<Input name='message' label='Message' ref={messageRef} />
					<button type='submit'>Send</button>
				</Form>
			</div>
		</div>
	);
};

export default Homepage;
