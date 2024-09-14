import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    browser: {
      provider: 'playwright', // or 'webdriverio'
      enabled: true,
      name: 'chromium', // browser name is required
      providerOptions: {
        launch: {
          devtools: true,
        },
        context: {
          geolocation: {
            latitude: 45,
            longitude: -30,
          },
          reducedMotion: 'reduce',
        },
      },
    },
  },
});
