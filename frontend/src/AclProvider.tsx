import {
	children,
	Component,
	createSignal,
	JSX,
	onMount,
	createEffect,
} from 'solid-js';
import findMeQuery from './queries/findMe';
import useRedux from './store/useRedux';
import actions from './store/actions';
import reduxStore from './store/store';
import { createGraphQLClient, gql } from '@solid-primitives/graphql';

type Props = {
	children: JSX.Element;
};

const query = createGraphQLClient(import.meta.env.VITE_FRONTED_API, {
	headers: {
		authorization: `Bearer ${window.localStorage.getItem('jwtToken')}`,
	},
});

const AclProvider: Component<Props> = (props) => {
	const [, { setUser }] = useRedux(reduxStore, actions);
	const [shouldExecuteQuery, setShouldExecuteQuery] = createSignal(false);
	const [data] = query<{ findMe: any }>(findMeQuery, shouldExecuteQuery);

	onMount(() => {
		if (!window.localStorage.getItem('jwtToken')) {
			return;
		}

		setShouldExecuteQuery(true);
	});

	createEffect(() => {
		if (!data()?.findMe) {
			return;
		}

		setUser(data()?.findMe);
	});

	const c = children(() => props.children);
	return <>{c()}</>;
};

export default AclProvider;
