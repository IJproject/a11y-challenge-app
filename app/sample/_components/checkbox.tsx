"use client";

import { forwardRef, useId } from "react";
import { A11yError } from "./error";

interface A11yCheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  errorText?: string;
}

export const A11yCheckbox = forwardRef<HTMLInputElement, A11yCheckboxProps>(
  ({ label, errorText, ...rest }, ref) => {
    const autoId = useId();
    const formId = rest.id ?? autoId;
    const errorId = `${formId}-error`;
    const hasError = Boolean(errorText);

    return (
      <div>
        <input
          type="checkbox"
          {...rest}
          ref={ref}
          id={formId}
          aria-invalid={hasError || undefined}
          aria-describedby={errorText ? errorId : undefined}
        />
        {label && <label htmlFor={formId}>{label}</label>}
        <A11yError id={errorId} errorText={errorText ?? ""} />
      </div>
    );
  }
);

A11yCheckbox.displayName = "A11yCheckbox";
