import test from 'node:test';
import assert from 'node:assert/strict';
import { businessLoginUrl } from '../src/core/oauth.ts';
import { defaultProfile, ProfileSchema } from '../src/core/types.ts';

test('Business Login uses a configuration and user-token response, preserving the host subpath', () => {
  for (const redirect of ['https://example.github.io/mySocialWatchPWA/', 'https://example.org/social/']) {
    const url = businessLoginUrl('1234567890', '9876543210', 'v27.0', redirect, 'random-single-use-state');
    assert.equal(url.origin, 'https://www.facebook.com');
    assert.equal(url.pathname, '/v27.0/dialog/oauth');
    assert.equal(url.searchParams.get('config_id'), '9876543210');
    assert.equal(url.searchParams.get('client_id'), '1234567890');
    assert.equal(url.searchParams.get('response_type'), 'token');
    assert.equal(url.searchParams.get('redirect_uri'), redirect);
    assert.equal(url.searchParams.get('state'), 'random-single-use-state');
    assert.equal(url.searchParams.has('scope'), false);
    assert.equal(url.searchParams.has('client_secret'), false);
  }
});

test('invalid public configuration fails before navigation', () => {
  for (const config of ['', 'secret-not-an-id', '1234', '1'.repeat(31)]) {
    assert.throws(() => businessLoginUrl('1234567890', config, 'v27.0', 'https://example.org/', 'state'), /Configuration ID/);
  }
  assert.throws(() => businessLoginUrl('bad', '9876543210', 'v27.0', 'https://example.org/', 'state'), /App ID/);
  assert.throws(() => businessLoginUrl('1234567890', '9876543210', 'bad', 'https://example.org/', 'state'), /API version/);
});

test('older profiles remain valid and configuration survives schema parsing', () => {
  const old = defaultProfile();
  assert.equal(ProfileSchema.parse(old).settings.configId, undefined);
  const configured = { ...old, settings: { ...old.settings, configId: '9876543210' } };
  assert.equal(ProfileSchema.parse(configured).settings.configId, '9876543210');
  assert.equal(ProfileSchema.safeParse({ ...old, settings: { ...old.settings, configId: 'not-digits' } }).success, false);
});
