import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';

const output = path.resolve('.next/check-blog-renderer.cjs');
mkdirSync(path.dirname(output), { recursive: true });
await build({ entryPoints: ['scripts/check-blog-renderer.tsx'], bundle: true, platform: 'node', format: 'cjs', packages: 'external', jsx: 'automatic', outfile: output,
  // Next's CJS entrypoints need their default export outside Next's compiler.
  plugins: [{ name: 'next-cjs-interop', setup(build) {
    build.onResolve({ filter: /^next\/(image|link)$/ }, (args) => args.kind === 'require-call' ? { path: args.path, external: true } : { path: args.path, namespace: 'next-interop' });
    build.onLoad({ filter: /.*/, namespace: 'next-interop' }, (args) => ({ contents: `export default require(${JSON.stringify(args.path)}).default;`, loader: 'js' }));
  } }]
});
try { createRequire(import.meta.url)(output); }
finally { rmSync(output, { force: true }); }
