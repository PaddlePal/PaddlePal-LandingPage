/**
 * Hardware credibility ribbon between the hero and the feature grid.
 *
 * Every figure here is already stated elsewhere on the page (hero stats, the
 * feature copy, the FAQ). Nothing new is claimed — deliberately, because the
 * FAQ commits to publishing measured numbers rather than marketing ones.
 */
const SPECS = [
  { value: '4', unit: '', label: 'Face pressure zones' },
  { value: '6', unit: '-axis', label: 'Motion sensor' },
  { value: '100', unit: 'Hz', label: 'Sampling rate' },
  { value: 'BLE', unit: '', label: 'Low-energy link' },
  { value: 'Battery', unit: '', label: 'Rechargeable' },
  { value: 'iOS', unit: '', label: 'At launch' },
];

export function SpecStrip() {
  return (
    <section className="spec-strip" aria-label="Hardware at a glance">
      <div className="container">
        <ul className="spec-strip__list">
          {SPECS.map((spec) => (
            <li className="spec" key={spec.label}>
              <span className="spec__value data-display">
                {spec.value}
                {spec.unit && <span className="spec__unit">{spec.unit}</span>}
              </span>
              <span className="spec__label label-caps text-muted">{spec.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
