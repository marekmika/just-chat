import { Component, createEffect, createSignal, onMount, Show } from 'solid-js'
import useRedux from '@/store/useRedux'
import reduxStore from '@/store/store'
import Login from './Login'
import actions from '@store/actions'
import loginQuery from '@/queries/login'
import { createGraphQLClient } from '@solid-primitives/graphql'
import { Navigate } from '@solidjs/router'
import { UserLogin } from '@/queries/generated/graphql'

const query = createGraphQLClient(import.meta.env.VITE_FRONTED_API)

const LoginContainer: Component = () => {
  const [store, { login }] = useRedux(reduxStore, actions)
  const [queryVars, setQueryVars] = createSignal<boolean | object>(false)
  const [data] = query<{ login: UserLogin }>(loginQuery, () => queryVars())

  const onLogin = async (email: string, password: string) => {
    setQueryVars({ email, password })
  }

  createEffect(() => {
    let loginQueryResult

    try {
      loginQueryResult = data()
    } catch (error) {
      console.log('🚀 ~ createEffect ~ error', error)
    }

    if (typeof loginQueryResult === 'undefined') {
      return
    }

    window.localStorage.setItem('jwtToken', loginQueryResult?.login.token)

    login(loginQueryResult?.login)
  })

  return (
    <Show when={store.user === undefined} fallback={<Navigate href="/" />}>
      <Login onLogin={onLogin} />;
    </Show>
  )
}

export default LoginContainer
