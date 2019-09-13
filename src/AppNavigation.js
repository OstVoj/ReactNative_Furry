import { createStackNavigator, createSwitchNavigator } from 'react-navigation'

import FfwApp from 'ffw/components/App'
import { UserLogin } from 'src/containers/Auth/Login'
import { AuthLoading } from 'src/containers/Auth/AuthLoading'
import { UserRegister } from 'src/containers/Auth/Register'

const stockNavigationSettings = { headerMode: 'none' }

const AppStack = createStackNavigator({
  Home: FfwApp
}, stockNavigationSettings)

const AuthStack = createStackNavigator({
  SignIn: UserLogin,
  SignUp: UserRegister
}, stockNavigationSettings)

export const AppNavigation = createSwitchNavigator({
  AuthLoading: AuthLoading,
  App: AppStack,
  Auth: AuthStack
}, {
  initialRouteName: 'AuthLoading'
})
