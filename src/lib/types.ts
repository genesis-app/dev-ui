export interface iDev {
  id: string;
  plugins: string[];
}
export interface iPlugin {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
  versionCode: number;
  builtinVersion: number;
  disabled: boolean;
  builtin: boolean;
}

export interface iDevUser {
  userId: string;
  isAdmin: boolean;
  isDev: boolean;
}
