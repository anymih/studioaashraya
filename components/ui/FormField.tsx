import React from 'react'

export interface FormFieldProps {
  label: string
  name: string
  id?: string
  type?: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select'
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  required?: boolean
  disabled?: boolean
  error?: string
  helperText?: string
  options?: { value: string; label: string }[]
  rows?: number
  maxLength?: number
  className?: string
  inputClassName?: string
}

export function FormField({
  label,
  name,
  id,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  required = false,
  disabled = false,
  error,
  helperText,
  options,
  rows = 4,
  maxLength,
  className = '',
  inputClassName = '',
}: FormFieldProps) {
  const fieldId = id || `field_${name}`

  const baseInputClasses =
    'w-full bg-[var(--surface)] text-[var(--ink)] border-[1.5px] border-[var(--ink)] p-[14px] font-sans text-base leading-normal rounded-none outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed'

  const borderStateClass = error ? 'border-[var(--accent)]' : 'border-[var(--ink)]'

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={fieldId}
        className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)] flex items-center justify-between"
      >
        <span>
          {label} {required && <span className="text-[var(--accent)]">*</span>}
        </span>
        {maxLength && value !== undefined && (
          <span className="text-[10px] tabular-nums">
            {value.length}/{maxLength}
          </span>
        )}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={fieldId}
          name={name}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          required={required}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={`${baseInputClasses} ${borderStateClass} resize-y ${inputClassName}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId}_error` : undefined}
        />
      ) : type === 'select' ? (
        <select
          id={fieldId}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`${baseInputClasses} ${borderStateClass} appearance-none cursor-pointer ${inputClassName}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId}_error` : undefined}
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={fieldId}
          name={name}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          className={`${baseInputClasses} ${borderStateClass} ${inputClassName}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId}_error` : undefined}
        />
      )}

      {error && (
        <span id={`${fieldId}_error`} className="font-sans text-xs text-[var(--accent)] font-medium mt-0.5">
          Error: {error}
        </span>
      )}

      {!error && helperText && (
        <span className="font-sans text-xs text-[var(--muted)] mt-0.5">
          {helperText}
        </span>
      )}
    </div>
  )
}
