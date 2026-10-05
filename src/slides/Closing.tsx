export function Closing() {
  return (
    <>
      <div className="kicker">05 · takeaways</div>
      <h2>What makes this design <span className="grad">agent-safe</span></h2>
      <ul>
        <li><strong>Fixed grid</strong> — 1920×1080 canvas means layout math is always the same regardless of screen</li>
        <li><strong>Content only</strong> — the agent writes slide bodies; the runtime owns navigation, scaling, transitions</li>
        <li><strong>In-browser feedback</strong> — inspector annotations flow back to the agent as code, not screenshots</li>
        <li><strong>Static output</strong> — ship a CDN folder or client-side PPT; no server required</li>
      </ul>
      <p style={{ marginTop: 40 }}>
        This folder is a toy version. The real repo adds Turborepo caching,
        presenter mode with speaker notes, Vite plugin HMR, and inline source markers.
      </p>
    </>
  );
}
