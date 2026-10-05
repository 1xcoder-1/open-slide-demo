export function Title() {
  return (
    <>
      <div className="kicker">demo deck · built with the mini runtime in src/core</div>
      <h1>
        <span className="grad">open-slide</span>,<br />
        from scratch
      </h1>
      <p style={{ maxWidth: 1200 }}>
        A slide framework built for agents. You describe the deck in natural
        language — your coding agent writes the React.
      </p>
      <p className="mono" style={{ marginTop: 40, fontSize: 26 }}>
        → / click edge to navigate&ensp;·&ensp;P presenter&ensp;·&ensp;I inspector
      </p>
    </>
  );
}
