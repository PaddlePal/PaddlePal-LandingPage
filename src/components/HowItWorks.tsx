const STEPS = [
  {
    n: '01',
    title: 'Sensors read the hit',
    body: 'Force sensors bonded to the paddle face and a 6-axis motion sensor in the handle sample the moment of impact — contact zone, force, and the swing that got you there.',
  },
  {
    n: '02',
    title: 'Bluetooth sends it over',
    body: 'The onboard microcontroller packs each shot into a compact packet and streams it to your phone over Bluetooth Low Energy, shot by shot, with no lag you can feel.',
  },
  {
    n: '03',
    title: 'The app makes it useful',
    body: 'PaddlePal Connect turns the stream into a live impact map, swing metrics and shot breakdown — then saves the session so you can compare it to every one before it.',
  },
];

export function HowItWorks() {
  return (
    <section className="section section--alt" id="how">
      <div className="container">
        <header className="section__head">
          <span className="label-caps text-lime">How it works</span>
          <h2 className="headline-lg">Paddle to phone in three steps.</h2>
        </header>

        <ol className="steps">
          {STEPS.map((step) => (
            <li className="card step" key={step.n}>
              <span className="step__n">{step.n}</span>
              <h3 className="headline-md">{step.title}</h3>
              <p className="body-md text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
