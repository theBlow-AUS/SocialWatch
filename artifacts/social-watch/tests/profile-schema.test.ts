import { test } from 'node:test';
import assert from 'node:assert/strict';
import { defaultProfile, ProfileSchema } from '../src/core/types.ts';

test('patched Zod accepts existing saved profiles without notification preferences', () => {
  const original = defaultProfile();
  assert.deepEqual(ProfileSchema.parse(JSON.parse(JSON.stringify(original))), original);
});

test('notification record validation preserves valid account preferences and rejects invalid values', () => {
  const profile = defaultProfile();
  profile.settings.notifications = {
    'account-123': { enabled: true, comments: true, replies: false, watchlistOnly: true },
  };
  assert.deepEqual(ProfileSchema.parse(profile), profile);
  const invalid = JSON.parse(JSON.stringify(profile));
  invalid.settings.notifications['account-123'].enabled = 'true';
  assert.equal(ProfileSchema.safeParse(invalid).success, false);
});

test('profile collection limits and unsafe-link validation remain enforced after the upgrade', () => {
  const profile = defaultProfile();
  profile.tiles = Array.from({ length: 101 }, (_, i) => ({
    id: String(i), title: 'Tile', url: 'https://example.test/', platform: 'custom' as const,
  }));
  assert.equal(ProfileSchema.safeParse(profile).success, false);
  profile.tiles = [{ id: 'bad', title: 'Unsafe', url: 'javascript:alert(1)', platform: 'custom' }];
  assert.equal(ProfileSchema.safeParse(profile).success, false);
});
