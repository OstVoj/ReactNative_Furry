import React, { PureComponent } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    minHeight: 60
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 15,
    right: 16
  },
  closeIconText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 24
  },
  input: {
    height: 60,
    width: '80%',
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: 'transparent',
    borderRadius: 0,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'arial',
    color: '#747474',
    ...Platform.select({
      ios: {
        shadowOffset: { height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.2
      },
      android: {
        elevation: 2
      }
    })
  }
})

class SearchResultsInput extends PureComponent {
  componentDidMount () {
    this.searchInput.focus()
  }

  componentWillUnmount () {
    this.props.close()
  }

  render () {
    const {
      value,
      onChange,
      close
    } = this.props

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder='Search for places or categories'
          returnKeyType='search'
          ref={input => (this.searchInput = input)}
        />

        <TouchableOpacity
          style={styles.closeIcon}
          onPress={close}
        >
          <Text style={styles.closeIconText}>
            &times;
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default SearchResultsInput
