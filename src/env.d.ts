/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE: string
  // 你以后还能在这里继续加别的环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}