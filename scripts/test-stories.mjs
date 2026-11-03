async function runStories() {
  let passed = 0;
  let total = 0;

  function assert(title, condition) {
    total++;
    if (condition) {
      console.log(`PASS: ${title}`);
      passed++;
    } else {
      console.error(`FAIL: ${title}`);
    }
  }

  // S3
  const g = await (await fetch('http://localhost:3000/guarantee')).text();
  assert('S3 - Guarantee has 10% back', g.includes('10% back'));
  assert('S3 - Guarantee has 15-year warranty', g.includes('15-year warranty'));
  assert('S3 - Guarantee mentions agreement', g.toLowerCase().includes('agreement'));

  // S5
  const m = await (await fetch('http://localhost:3000/method')).text();
  assert('S5 - Method stage 06 has cube tests', m.toLowerCase().includes('cube test'));
  assert('S5 - Method stage 06 has rebar scan', m.toLowerCase().includes('rebar'));
  assert('S5 - Method stage 06 has LiDAR scan', m.toLowerCase().includes('lidar'));

  // S6
  const t = await (await fetch('http://localhost:3000/technology')).text();
  assert('S6 - Tech has no "first in India"', !t.includes('first in India'));
  assert('S6 - Tech has no "only builder"', !t.includes('only builder'));

  // S7
  const n = await (await fetch('http://localhost:3000/nri')).text();
  assert('S7 - NRI has book-a-call link', n.includes('/book-a-call'));

  // S8
  const p = await (await fetch('http://localhost:3000/projects/jali-house')).text();
  assert('S8 - Project has Sample tag', p.includes('Sample project') || p.includes('Sample figure'));
  assert('S8 - Project has Illustration caption', p.includes('Illustration'));

  // S9
  const r = await fetch('http://localhost:3000/projects/the-clay-house', { redirect: 'manual' });
  assert('S9 - the-clay-house redirects with 308', r.status === 308 && r.headers.get('location') === '/projects');

  // S10
  const f = await (await fetch('http://localhost:3000/calculators/site-feasibility')).text();
  assert('S10 - Feasibility has coverage notice', f.includes('Bihar Building Bye-laws 2014') || f.includes('Rules coverage'));

  console.log(`\nTest Matrix Summary: ${passed}/${total} passed`);
  if (passed !== total) process.exit(1);
}

runStories().catch(err => {
  console.error(err);
  process.exit(1);
});
