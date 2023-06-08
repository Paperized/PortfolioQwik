import {defineConfig} from 'vite';
import {qwikVite} from '@builder.io/qwik/optimizer';
import {qwikCity} from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({mode}) => {
  if(mode == 'ssr') {
    const result = require('dotenv').config({path: __dirname + '/.env.development.local'})

    if (result.error) {
      throw result.error
    }

    console.log(result.parsed)
  }

  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});
