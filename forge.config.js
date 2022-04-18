const process = require('process')

const BUNDLE_ID = 'frost'

const { APPLE_API_KEY, APPLE_API_ISSUER } = process.env
const osxNotarize = (process.platform === 'darwin') ? {
  appBundleId: BUNDLE_ID,
  appleApiKey: APPLE_API_KEY,
  appleApiIssuer: APPLE_API_ISSUER,
} : undefined

module.exports = {
  packagerConfig: {
    name: 'Frost',
    appBundleId: BUNDLE_ID,
    out: './out',
    osxSign: {
      "hardened-runtime": true,
      "entitlements": "entitlements.plist",
      "entitlements-inherit": "entitlements.plist",
      "signature-flags": "library"
    },
    osxNotarize,
  },

  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
  ],

  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'popen2',
          name: 'frost',
        },
      },
    },
  ],
}