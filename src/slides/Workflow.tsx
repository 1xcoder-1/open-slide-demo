export function Workflow() {
  return (
    <>
      <div className="kicker">03 · workflow</div>
      <h2>The agent loop</h2>
      <ul className="steps">
        <li><strong>Prompt</strong> — describe the deck in natural language</li>
        <li><strong>Generate</strong> — the coding agent writes React slides against the 1920×1080 grid</li>
        <li><strong>Preview</strong> — <code>pnpm dev</code> gives live visual output</li>
        <li><strong>Annotate</strong> — click elements in the inspector, attach feedback saved as source markers</li>
        <li><strong>Export</strong> — a plain static build for any host, or a client-side PPT</li>
      </ul>
    </>
  );
}
