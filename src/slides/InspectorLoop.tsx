export function InspectorLoop() {
  return (
    <>
      <div className="kicker">04 · try it now</div>
      <h2>Feedback without leaving the browser</h2>
      <div className="cols">
        <div className="card">
          <p><strong>Press “inspect”</strong> (top-right), click any element on this slide, and write one line of feedback.</p>
        </div>
        <div className="card">
          <p><strong>Open “Feedback”</strong> (bottom bar) — notes are listed with their CSS selector and text snippet, ready to hand to your agent.</p>
        </div>
      </div>
      <p style={{ marginTop: 40 }}>
        In real open-slide these markers are archived <em>inline in the source</em>;
        the next agent pass reads them and applies edits automatically. This demo
        persists them in <code>localStorage</code> instead.
      </p>
    </>
  );
}
