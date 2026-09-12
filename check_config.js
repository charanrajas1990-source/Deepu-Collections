import { loadConfigFromFile } from 'vite';
loadConfigFromFile({}, 'vite.config.ts').then(res => console.log(res.config.base));
