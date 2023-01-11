import { Store } from 'redux';
import { onCleanup } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';

// TODO: Solve any types
export default function useRedux(store: Store, actions: any) {
	const [state, setState] = createStore(store.getState());
	const unsubscribe = store.subscribe(() =>
		setState(reconcile(store.getState()))
	);

	onCleanup(() => unsubscribe());

	return [state, mapActions(store, actions)];
}

function mapActions(store: Store, actions: any) {
	const mapped: any = {};
	for (const key in actions) {
		mapped[key] = (...args: any) => store.dispatch(actions[key](...args));
	}
	return mapped;
}
