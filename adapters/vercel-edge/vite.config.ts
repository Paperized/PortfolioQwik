import { vercelEdgeAdapter } from '@builder.io/qwik-city/adapters/vercel-edge/vite';
import { extendConfig } from '@builder.io/qwik-city/vite';
import baseConfig from '../../vite.config';

export default extendConfig(baseConfig, () => {
  if(process.env.VERCEL_ENV === 'development')
    require('dotenv').config({ path: '.env.development.local' });
  else {
    console.log("prod!!");
    require('dotenv').config({path: '.env.production'});
  }


  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ['src/entry.vercel-edge.tsx', '@qwik-city-plan'],
      },
      outDir: '.vercel/output/functions/_qwik-city.func',
    },
    plugins: [vercelEdgeAdapter()],
  };
});
