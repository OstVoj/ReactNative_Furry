import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-native'

import login from 'ffw/store/actions/login'
import { AuthForm } from 'src/components/Auth'
import { auth } from 'src/utils/auth'
import { extractErrorMessage, log } from 'src/utils/fn'

const mapDispatchToProps = {
  login
}

@connect(null, mapDispatchToProps)
export class UserLogin extends React.PureComponent {
  state = {
    isLoading: false,
    requireCode: false
  }

  handleFormOnSubmit = async ({ email, password, phone, code, isCode }, formType) => {
    const {
      login,
      navigation
    } = this.props

    if (formType === AuthForm.FORM_TYPE.SMS) {
      if (isCode) {
        // todo: send received code to server
        return
      }

      this.setState({ requireCode: true })
      // todo: send phone number to server
      return
    }

    if (!email || !password) {
      return
    }

    try {
      this.setState({ isLoading: true })
      const result = await login({ email, password })

      this.setState({ isLoading: false })

      if (result && result.response && result.response.token) {
        await auth.setToken(result.response.token)
        navigation.navigate('App')
      } else {
        // todo treat errors
        _alertError(result)
      }
    } catch (e) {
      _alertError(e)
      this.setState({ isLoading: false })
    }
  }

  render () {
    return (
      <AuthForm
        formText='Sign in'
        footNote={{
          text: "Don't have an account?",
          actionText: 'Sign up',
          actionRef: 'SignUp'
        }}
        onSubmit={this.handleFormOnSubmit}
        requireCode={this.state.requireCode}
        isLoading={this.state.isLoading}
      />
    )
  }
}

// //
function _alertError (errorObject = {}) {
  Alert.alert('Whoops!', extractErrorMessage(errorObject))
  log.error('SERVER ERROR', errorObject)
}
