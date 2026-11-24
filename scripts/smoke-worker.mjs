import assert from 'node:assert/strict';

const origin = process.argv[2] ?? 'http://localhost:8787';
const address = '0x1f98431c8ad98523631ae4a59f267346ea31f984';

async function get(path, status, contentType) {
  const response = await fetch(new URL(path, origin), {
    redirect: 'manual',
    headers: { accept: contentType === html ? 'text/html' : '*/*' },
    signal: AbortSignal.timeout(15_000),
  });
  assert.equal(response.status, status, path);
  assert.match(response.headers.get('content-type') ?? '', contentType, path);
  console.log(`${response.status} ${path}`);
  return response;
}

const html = /text\/html/;
const home = await (await get('/', 200, html)).text();
assert.match(home, /<h1[^>]*>Contract Scan<\/h1>/);

const contract = await (await get(`/contract/${address}`, 200, html)).text();
assert.match(contract, new RegExp(`<h1[^>]*>${address}</h1>`));

const bundle = await (
  await get(`/bundle?name=Worker+Smoke&addresses=${address}`, 200, html)
).text();
assert.match(bundle, /<h1[^>]*>Worker Smoke<\/h1>/);

const missing = await (await get('/__worker-smoke-missing', 404, html)).text();
assert.match(missing, /404/);
await (await get('/api/og', 404, /text\/html|application\/json/)).text();

const verification = await get(
  `/api/check-verification?chain=1&address=${address}`,
  200,
  /application\/json/,
);
assert.deepEqual(await verification.json(), { status: 'error' });

const js = home.match(/\bsrc="(\/_nuxt\/[^"]+\.js)"/)?.[1];
assert.ok(js, 'SSR HTML references a built JS entry');
assert.ok((await (await get(js, 200, /javascript/)).text()).length > 0);
assert.match(
  await (await get('/favicon.svg', 200, /image\/svg\+xml/)).text(),
  /<svg\b/,
);
