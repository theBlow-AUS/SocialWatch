/** Public configuration only: never accepts an App Secret or performs a code exchange. */
export function businessLoginUrl(appId: string, configId: string, apiVersion: string, redirect: string, state: string): URL {
  if (!/^\d{5,30}$/.test(appId)) throw new Error('Enter your own numeric Meta App ID in settings first.');
  if (!/^\d{5,30}$/.test(configId)) throw new Error('Enter your numeric Facebook Login for Business Configuration ID in settings first.');
  if (!/^v\d{1,3}\.\d{1,2}$/.test(apiVersion)) throw new Error('Enter a Graph API version such as v27.0.');
  const url = new URL(`https://www.facebook.com/${apiVersion}/dialog/oauth`);
  url.search = new URLSearchParams({
    client_id: appId, config_id: configId, redirect_uri: redirect,
    state, response_type: 'token', auth_type: 'rerequest',
  }).toString();
  return url;
}
