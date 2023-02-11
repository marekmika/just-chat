import { For } from 'solid-js'
import type { Component } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import pages from './pages'

import styles from './App.module.css'
import AclProvider from './AclProvider'

const App: Component = () => {
  return (
    <AclProvider>
      <div class={styles.App}>
        <Routes>
          <For each={pages} fallback={<div>Not found</div>}>
            {({ path, component }) => <Route path={path} component={component} />}
          </For>
        </Routes>
      </div>
    </AclProvider>
  )
}

export default App
