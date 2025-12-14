"use client";

import { forwardRef, useId } from "react";
import { A11yError } from "./error";

interface Option {
  value: string | number;
  label: string;
}

interface A11ySelectProps extends React.ComponentPropsWithoutRef<"select"> {
  options: Option[];
  label?: string;
  errorText?: string;
}

export const A11ySelect = forwardRef<HTMLSelectElement, A11ySelectProps>(
  ({ options, label, errorText, ...rest }, ref) => {
    const autoId = useId();
    const formId = rest.id ?? autoId;
    const errorId = `${formId}-error`;
    const hasError = Boolean(errorText);

    return (
      <div>
        {label && <label htmlFor={formId}>{label}</label>}
        <select
          {...rest}
          ref={ref}
          id={formId}
          aria-invalid={hasError || undefined}
          aria-describedby={errorText ? errorId : undefined}
        >
          <option value="">選択してください</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <A11yError id={errorId} errorText={errorText ?? ""} />
      </div>
    );
  }
);

A11ySelect.displayName = "A11ySelect";
