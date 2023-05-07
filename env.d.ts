/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TMBD_API_KEY: string;
  readonly VITE_URL_IMAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
