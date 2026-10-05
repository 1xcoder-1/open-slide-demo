export function Architecture() {
  return (
    <>
      <div className="kicker">02 · architecture</div>
      <h2>One repo, three layers</h2>
      <ul>
        <li><strong>packages/core</strong> — runtime engine: canvas, deck state, viewer, presenter, inspector, Vite integration <span className="mono">→ this demo’s src/core/</span></li>
        <li><strong>packages/cli</strong> — scaffolds a minimal workspace with pre-built agent commands <span className="mono">→ try: open-slide init</span></li>
        <li><strong>apps/demo</strong> — a reference deck consuming core <span className="mono">→ this demo’s src/slides/</span></li>
      </ul>
      <p style={{ marginTop: 40 }}>
        pnpm + Turborepo monorepo · React · Vite · TypeScript · Biome · Vitest.
        Works with any coding agent — Claude Code, Codex, Cursor…
      </p>
    </>
  );
}
