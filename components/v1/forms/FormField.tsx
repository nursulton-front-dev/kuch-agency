'use client'

import React from 'react'

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'textarea'
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  placeholder?: string
}

export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required,
  placeholder,
}: FormFieldProps) {
  const id = `field-${name}`

  const baseInputClass = [
    'w-full bg-kuch-white text-kuch-black px-4 py-3 outline-none',
    'border-2 border-transparent',
    'focus:border-kuch-pink',
    'transition-colors duration-150',
    'font-sans text-base',
    error ? 'border-kuch-red' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-sans text-sm font-medium text-kuch-white">
        {label}
        {required && (
          <span className="ml-1 text-kuch-pink" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          rows={4}
          className={baseInputClass}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={error ? true : undefined}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className={baseInputClass}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={error ? true : undefined}
        />
      )}

      {error && (
        <p id={`${id}-error`} role="alert" className="text-kuch-red text-sm font-sans mt-0.5">
          {error}
        </p>
      )}
    </div>
  )
}
