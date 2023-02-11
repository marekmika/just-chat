import { Component, createEffect, createSignal } from 'solid-js'
import Registration from './Registration'
import registerMutation from '@/queries/register'
import { createGraphQLClient } from '@solid-primitives/graphql'
import useRedux from '@/store/useRedux'
import reduxStore from '@/store/store'
import actions from '@/store/actions'
import { useNavigate } from '@solidjs/router'
import { Mutation, UserRegisterInput } from '@/queries/generated/graphql'

const query = createGraphQLClient(import.meta.env.VITE_FRONTED_API)

const RegistrationContainer: Component = () => {
  const [{ login }] = useRedux(reduxStore, actions)
  const [queryVars, setQueryVars] = createSignal<boolean | object>(false)
  const [data] = query<{ register: Mutation['register'] }>(registerMutation, () => queryVars())
  const navigate = useNavigate()

  const onRegister = async (userData: UserRegisterInput & { passwordConfirmation: string }) => {
    const { passwordConfirmation, ...restUserData } = userData

    setQueryVars({ userData: restUserData })
  }

  createEffect(() => {
    let registerMutationResult

    try {
      registerMutationResult = data()
    } catch (error) {
      console.log('🚀 ~ createEffect ~ error', error)
    }

    if (typeof registerMutationResult === 'undefined') {
      return
    }

    window.localStorage.setItem('jwtToken', registerMutationResult?.register.token)

    login(registerMutationResult?.register)
    navigate('/', { replace: true })
  })

  return <Registration onRegister={onRegister} />
}

export default RegistrationContainer
