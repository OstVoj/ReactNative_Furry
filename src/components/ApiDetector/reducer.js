import createReducer from 'ffw/store/reducers/create'

const defaultState = () => ({
  isApiDetected: false,
  isFetching: false
})

export const apiDetector = createReducer(defaultState(), {
  DETECT_SERVER_REQUEST: (state) => ({
    ...state,
    isFetching: true
  }),
  DETECT_SERVER_SUCCESS: (state, action) => ({
    isFetching: false,
    isApiDetected: true,
    // servers: [{ 'label': 'DO Server 1', 'url': 'http://104.248.44.122/api/v1' }]
    servers: action.response.servers
  }),
  DETECT_SERVER_FAILURE: (state, action) => ({
    ...defaultState(),
    error: action.error
  })
})
