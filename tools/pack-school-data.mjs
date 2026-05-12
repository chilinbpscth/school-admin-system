import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

function usage() {
  return [
    'Usage:',
    '  node tools/pack-school-data.mjs --html <input.html> --json <school-data.json> --out <output.html>',
    '',
    'Notes:',
    '  - Replaces the block between /*__SCHOOL_DATA_BEGIN__*/ and /*__SCHOOL_DATA_END__*/ in the HTML.',
    '  - Output is a single-file distributable (schools can double-click open).',
  ].join('\n');
}

function getArg(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return null;
  return process.argv[idx + 1] ?? null;
}

const inHtml = getArg('--html');
const inJson = getArg('--json');
const outHtml = getArg('--out');
if (!inHtml || !inJson || !outHtml) {
  console.error(usage());
  process.exit(2);
}

const BEGIN = '/*__SCHOOL_DATA_BEGIN__*/';
const END = '/*__SCHOOL_DATA_END__*/';

const [htmlRaw, jsonRaw] = await Promise.all([
  readFile(inHtml, 'utf8'),
  readFile(inJson, 'utf8'),
]);

const beginIdx = htmlRaw.indexOf(BEGIN);
const endIdx = htmlRaw.indexOf(END);
if (beginIdx === -1 || endIdx === -1 || endIdx <= beginIdx) {
  throw new Error(`Could not find data markers in HTML: ${BEGIN} ... ${END}`);
}

let dataObj;
try {
  dataObj = JSON.parse(jsonRaw);
} catch (e) {
  throw new Error(`Invalid JSON at ${inJson}: ${e?.message || e}`);
}

const pretty = JSON.stringify(dataObj, null, 2);
const replacement =
  `${BEGIN}\n` +
  `        const SCHOOL_DATA_VNEXT = ${pretty};\n` +
  `        ${END}`;

const before = htmlRaw.slice(0, beginIdx);
const after = htmlRaw.slice(endIdx + END.length);
const out = before + replacement + after;

await writeFile(outHtml, out, 'utf8');
console.log(`Wrote packed HTML to ${path.resolve(outHtml)}`);

