import React, { useState } from "react"

import * as config from "./config"
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/link-context"

const httpLink = new HttpLink({ uri: config.GRAPHQL_SERVER_URL })
const cache = new InMemoryCache()
const client = new ApolloClient({ link: httpLink, cache })

const initialLocalAppState = {
  component: { name: "Home", props: {} },
  user: JSON.parse(window.localStorage.getItem("azdev:user")),
}

// The useStoreObject is a custom hook function designed
// to be used with React's context feature
export const useStoreObject = () => {
  // This state object is used to manage
  // all local app state elements (like user/component)
  const [state, setState] = useState(() => initialLocalAppState)

  // This function can be used with 1 or more
  // state elements. For example:
  // const user = useLocalAppState('user');
  // const [component, user] = useLocalAppState('component', 'user');
  const useLocalAppState = (...stateMapper) => {
    if (stateMapper.length === 1) {
      return state[stateMapper[0]]
    }
    return stateMapper.map((element) => state[element])
  }

  // This function shallow-merges a newState object
  // with the current local app state object
  const setLocalAppState = (newState) => {
    if (newState.component) {
      newState.component.props = newState.component.props ?? {}
    }
    setState((currentState) => {
      return { ...currentState, ...newState }
    })
    if (newState.user || newState.user === null) {
      client.resetStore()
    }
  }

  const AppLink = ({ children, to, ...props }) => {
    const handleClick = (event) => {
      event.preventDefault()
      setLocalAppState({
        component: { name: to, props },
      })
    }
    return (
      <a href={to} onClick={handleClick}>
        {children}
      </a>
    )
  }

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: state.user ? `Bearer ${state.user.authToken}` : "",
      },
    }
  })
  client.setLink(authLink.concat(httpLink))

  return {
    useLocalAppState,
    setLocalAppState,
    AppLink,
    client,
  }
}

// Define React's context object and the useStore
// custom hook function that'll use it
const AZContext = React.createContext()
export const Provider = AZContext.Provider
export const useStore = () => React.useContext(AZContext)
