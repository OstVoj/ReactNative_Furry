import fetch from 'cross-fetch'

const MANIFEST_SERVER = 'http://104.248.44.122/api/v1/manifest'

export function apiServerDetectRequest () {
  return {
    types: ['DETECT_SERVER_REQUEST', 'DETECT_SERVER_SUCCESS', 'DETECT_SERVER_FAILURE'],
    callAPI: async () => {
      const response = await fetch(MANIFEST_SERVER, {
        headers: this.headers
      })

      return response.json()
    }
  }
}
