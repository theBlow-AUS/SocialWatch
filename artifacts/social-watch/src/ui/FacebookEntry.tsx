import { useState } from 'preact/hooks';
import { beginLogin, clearPendingOAuth, oauthReturnStatus } from '../core/meta';
import { forgetPublicLogin, parsePublicLogin, readPublicLogin, rememberPublicLogin } from '../core/public-login';
import { val, errMsg } from './util';

/** Optional authorization step. It never unlocks or creates the encrypted vault. */
export function FacebookEntry({ disabled }: { disabled: boolean }) {
  const [initial] = useState(() => {
    try { return { settings: readPublicLogin(), error: '' }; }
    catch { return { settings: null, error: 'Saved Facebook setup could not be read. Re-enter the public IDs or use passphrase-only access.' }; }
  });
  const [appId, setAppId] = useState(initial.settings?.appId ?? '');
  const [configId, setConfigId] = useState(initial.settings?.configId ?? '');
  const [apiVersion, setApiVersion] = useState(initial.settings?.apiVersion ?? 'v27.0');
  const [remember, setRemember] = useState(!!initial.settings);
  const [error, setError] = useState(initial.error);
  const [pending, setPending] = useState(oauthReturnStatus());
  const [busy, setBusy] = useState(false);

  const start = async () => {
    setError('');
    if (!navigator.onLine) { setError('Facebook requires an internet connection. You can still unlock your vault with its passphrase.'); return; }
    setBusy(true);
    try {
      const settings = parsePublicLogin({ appId: appId.trim(), configId: configId.trim(), apiVersion: apiVersion.trim() });
      if (remember) rememberPublicLogin(settings); else forgetPublicLogin();
      clearPendingOAuth();
      await beginLogin(settings.appId, settings.apiVersion, settings.configId);
    } catch (e) { setError(errMsg(e)); setBusy(false); }
  };
  const skip = () => {
    clearPendingOAuth(); setPending(null); setError('');
  };
  const forget = () => {
    try {
      forgetPublicLogin(); skip(); setAppId(''); setConfigId(''); setApiVersion('v27.0'); setRemember(false);
    } catch { setError('Could not remove saved public IDs. Check browser storage permissions.'); }
  };

  return <div className="section" aria-label="Optional Facebook sign-in" style={{ marginBottom: 20 }}>
    <h3>Step 1 · Continue with Facebook (optional)</h3>
    <p className="muted">Authorize your Pages and linked Instagram accounts, then unlock below.
      Facebook cannot unlock or recover this device’s vault.</p>
    {pending && <p role="status" data-testid="text-facebook-return">{pending === 'returned'
      ? 'Facebook returned. Step 2: enter your vault passphrase below to verify the return and finish connecting. Nothing is unlocked yet.'
      : pending === 'code' ? 'This login returned an unsupported authorization code. Choose a User access token configuration, not System-user, or continue with passphrase only.'
      : 'Facebook sign-in was cancelled or declined. Retry, or continue with passphrase only.'}</p>}
    <details open={!initial.settings && !pending}>
      <summary>Facebook sign-in setup</summary>
      <p className="muted">Use the public IDs from your Meta app’s User access token configuration. Never enter an App Secret. These IDs may also be copied from General settings after unlocking.</p>
      <label className="field"><span>Meta App ID for sign-in</span><input className="input mono" inputMode="numeric" value={appId} onInput={e => setAppId(val(e))} data-testid="input-entry-app-id" /></label>
      <label className="field"><span>Business Login Configuration ID for sign-in</span><input className="input mono" inputMode="numeric" value={configId} onInput={e => setConfigId(val(e))} data-testid="input-entry-config-id" /></label>
      <label className="field"><span>Graph API version for sign-in</span><input className="input mono" value={apiVersion} onInput={e => setApiVersion(val(e))} /></label>
      <label className="field"><span><input type="checkbox" checked={remember} onChange={e => setRemember(e.currentTarget.checked)} /> Remember these public IDs on this device</span>
        <small>Opt-in: saves only App ID, Configuration ID and API version outside the encrypted vault. Never saves a passphrase, token or account name.</small></label>
    </details>
    {error && <div className="err" role="alert">{error}</div>}
    <div className="row" style={{ flexWrap: 'wrap' }}>
      <button type="button" className="btn primary" disabled={disabled || busy} onClick={() => void start()} data-testid="button-facebook-entry">{busy ? 'Opening Facebook…' : 'Continue with Facebook'}</button>
      <button type="button" className="btn" disabled={disabled || busy} onClick={skip} data-testid="button-passphrase-only">Use passphrase only</button>
      <button type="button" className="linkish" disabled={disabled || busy} onClick={forget}>Forget Facebook setup</button>
    </div>
  </div>;
}
