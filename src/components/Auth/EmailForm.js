import React from 'react'
import PropTypes from 'prop-types'

import { InputText } from 'src/components/UI/InputText'
import { Button } from 'src/components/UI/Button'
import { FormContainer } from 'src/components/UI/FormContainer'

export class AuthEmailForm extends React.PureComponent {
  static propTypes = {
    actionText: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func
  }
  static defaultProps = {
    onSubmit: () => {}
  }

  state = {
    email: '',
    password: ''
  }

  handleActionPress = () => {
    this.props.onSubmit(this.state)
  }

  render () {
    return (
      <FormContainer center justify>
        <InputText
          placeholder='Email'
          keyboardType='email-address'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />

        <InputText
          placeholder='Password'
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />

        <Button
          black
          onPress={this.handleActionPress}
          isLoading={this.props.isLoading}
        >
          {this.props.actionText}
        </Button>
      </FormContainer>
    )
  }
}
