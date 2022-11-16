import { For } from 'solid-js';
import type { Component } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import pages from './pages';
import { createClient, Provider } from 'solid-urql';

import styles from './App.module.css';

const App: Component = () => {
	const client = createClient({
		url: import.meta.env.VITE_FRONTED_API,
	});

	return (
		<Provider value={client}>
			<div class={styles.App}>
				<Routes>
					<For each={pages} fallback={<div>Not found</div>}>
						{({ path, component }) => (
							<Route path={path} component={component} />
						)}
					</For>
				</Routes>
			</div>
		</Provider>
	);
};

export default App;
