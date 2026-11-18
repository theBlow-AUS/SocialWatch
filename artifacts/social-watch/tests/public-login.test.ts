import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePublicLogin, rememberPublicLogin, readPublicLogin, forgetPublicLogin, PUBLIC_LOGIN_KEY } from '../src/core/public-login.ts';

const settings = { appId: '1234567890', configId: '9876543210', apiVersion: 'v27.0' };
test('public sign-in setup is an explicit whitelist, never a token or passphrase store', () => {
  assert.deepEqual(parsePublicLogin({ ...settings, access_token: 'synthetic', passphrase: 'synthetic', name: 'example' }), settings);
  for (const value of [null, {}, { ...settings, configId: 'secret' }, { ...settings, apiVersion: '../x' }])
    assert.throws(() => parsePublicLogin(value));
});
test('remembering only stores public IDs, and forgetting removes them', () => {
  const map = new Map<string, string>();
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => map.set(k, v),
    removeItem: (k: string) => map.delete(k),
  } });
  try {
    assert.equal(readPublicLogin(), null);
    rememberPublicLogin({ ...settings, token: 'synthetic' } as typeof settings);
    assert.equal(map.get(PUBLIC_LOGIN_KEY), JSON.stringify(settings));
    assert.deepEqual(readPublicLogin(), settings);
    map.set(PUBLIC_LOGIN_KEY, 'malformed');
    assert.throws(readPublicLogin);
    forgetPublicLogin();
    assert.equal(readPublicLogin(), null);
  } finally {
    if (previous) Object.defineProperty(globalThis, 'localStorage', previous);
    else Reflect.deleteProperty(globalThis, 'localStorage');
  }
});
