export interface PublicLoginSettings { appId: string; configId: string; apiVersion: string }
export const PUBLIC_LOGIN_KEY = 'social-watch-public-login';

export function parsePublicLogin(value: unknown): PublicLoginSettings {
  const v = value as Partial<PublicLoginSettings> | null;
  if (!v || typeof v.appId !== 'string' || !/^\d{5,30}$/.test(v.appId) ||
    typeof v.configId !== 'string' || !/^\d{5,30}$/.test(v.configId) ||
    typeof v.apiVersion !== 'string' || !/^v\d{1,3}\.\d{1,2}$/.test(v.apiVersion))
    throw new Error('Enter numeric App and Configuration IDs (5–30 digits) and a version such as v27.0.');
  // Whitelist public identifiers; never serialize a caller's extra properties.
  return { appId: v.appId, configId: v.configId, apiVersion: v.apiVersion };
}
export function readPublicLogin(): PublicLoginSettings | null {
  const raw = localStorage.getItem(PUBLIC_LOGIN_KEY);
  return raw ? parsePublicLogin(JSON.parse(raw)) : null;
}
export function rememberPublicLogin(settings: PublicLoginSettings): void {
  localStorage.setItem(PUBLIC_LOGIN_KEY, JSON.stringify(parsePublicLogin(settings)));
}
export function forgetPublicLogin(): void {
  localStorage.removeItem(PUBLIC_LOGIN_KEY);
}
