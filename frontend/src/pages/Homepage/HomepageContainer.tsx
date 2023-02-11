import { Component, createEffect, createMemo, createSignal, onMount, Show } from 'solid-js'
import Homepage, { Message } from './Homepage'
import { Navigate, useNavigate } from '@solidjs/router'
import { io } from 'socket.io-client'
import useRedux from '@/store/useRedux'
import reduxStore from '@/store/store'
import actions from '@/store/actions'

const HomepageContainer: Component = () => {
  const [store] = useRedux(reduxStore, actions)
  const [messages, setMessages] = createSignal<Message[]>([])
  const navigate = useNavigate()

  const socket = createMemo(() => {
    const jwtToken = window.localStorage.getItem('jwtToken')

    if (!jwtToken) {
      navigate('/', { replace: true })
      return
    }

    return io('http://localhost:4000', {
      reconnectionDelayMax: 10000,
      auth: {
        token: jwtToken,
      },
    })
  })

  createEffect(() => {
    socket()?.on('init_messages', (data) => {
      setMessages(data?.content)
    })
  })

  createEffect(() => {
    socket()?.on('receive_message', (data) => {
      setMessages((currentMessages) => [...currentMessages, { ...data.message, user: data.user }])
    })
  })

  const sendMessage = async (message: string) => {
    socket()?.emit('message', message)
  }

  return (
    <Show when={store.user} fallback={<Navigate href="/login" />}>
      <Show when={messages()?.length} fallback={<div>Loading...</div>}>
        <Homepage messages={messages()} onSendMessage={sendMessage} />
      </Show>
    </Show>
  )
}

export default HomepageContainer
