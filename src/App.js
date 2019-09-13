import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'

import configureStore from 'ffw/store/configure'
import NavigationService from 'src/utils/NavigationService'
import { AppNavigation } from 'src/AppNavigation'
import { theme } from 'src/theme'
import { ApiDetector } from 'src/components/ApiDetector'

const store = configureStore()

export default function () {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ApiDetector>
          <AppNavigation
            ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)}
          />
        </ApiDetector>
      </ThemeProvider>
    </Provider>
  )
}
