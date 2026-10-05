export function CoreIdea() {
  return (
    <>
      <div className="kicker">01 · core idea</div>
      <h2>Slides are just React components</h2>
      <div className="cols">
        <div className="card">
          <p><strong>The author writes</strong></p>
          <p>One plain component per slide. No proprietary markup, no editor — anything React can render, a slide can be.</p>
        </div>
        <div className="card">
          <p><strong>The runtime owns</strong></p>
          <p>A fixed <code>1920 × 1080</code> canvas, scaling to any window, navigation state, transitions, presenter mode, playback.</p>
        </div>
      </div>
      <p style={{ marginTop: 40 }}>
        That separation is why an agent can safely generate slide code: it only
        ever touches <em>content</em> — the frame can’t break.
      </p>
    </>
  );
}
