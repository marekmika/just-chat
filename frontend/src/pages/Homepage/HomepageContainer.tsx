import {
	Component,
	createEffect,
	createMemo,
	createSignal,
	Show,
} from 'solid-js';
import Homepage, { Message } from './Homepage';
import { useNavigate } from '@solidjs/router';
import { io } from 'socket.io-client';

const HomepageContainer: Component = () => {
	const [messages, setMessages] = createSignal<Message[]>([]);
	const navigate = useNavigate();

	const socket = createMemo(() => {
		const jwtToken = window.localStorage.getItem('jwtToken');

		if (!jwtToken) {
			navigate('/', { replace: true });
			return;
		}

		return io('http://localhost:4000', {
			reconnectionDelayMax: 10000,
			auth: {
				token: jwtToken,
			},
		});
	});

	createEffect(() => {
		socket()?.on('init_messages', (data) => {
			setMessages(data?.content);
		});
	});

	createEffect(() => {
		socket()?.on('receive_message', (data) => {
			setMessages((currentMessages) => [
				{ ...data.message, user: data.user },
				...currentMessages,
			]);
		});
	});

	const sendMessage = async (message: string) => {
		socket()?.emit('message', message);
	};

	return (
		<Show when={messages()?.length} fallback={<div>Loading...</div>}>
			<Homepage messages={messages()} onSendMessage={sendMessage} />
		</Show>
	);
};

export default HomepageContainer;
