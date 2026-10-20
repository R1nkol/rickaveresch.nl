"use client";

export default function ChoiceGroup({ label, name, value, onChange, options, controls }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-xs font-medium text-muted">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map(({ value: optionValue, label: optionLabel, Icon }) => (
          <label key={optionValue} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={optionValue}
              checked={value === optionValue}
              onChange={() => onChange(optionValue)}
              aria-controls={controls}
              className="peer sr-only"
            />
            <span className={`${value === optionValue ? "button-primary" : "button-secondary"} peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[var(--accent)]`}>
              {Icon && <Icon aria-hidden="true" size={16} />}
              {optionLabel}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
