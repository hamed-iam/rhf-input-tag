import dynamic from 'next/dynamic';
import { useState } from 'react';
import InputTagStyle from './inputTag.style';
import { Controller } from 'react-hook-form';
import type { Control, RegisterOptions } from 'react-hook-form';
import { Tooltip } from 'antd';

const SvgIcon = dynamic(() => import('@/utils/svg-icon'), {
  loading: () => null,
  ssr: false,
});

interface RHFInputTagFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  infoText?: string;
  placeholder?: string;
  size?: 'small' | 'large' | 'middle';
  submitKey?: 'Space' | 'Enter';
  rules?:
    | Omit<
        RegisterOptions<any, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
  disabled?: boolean;
}

export default function InputTag({
  control,
  name,
  rules,
  label,
  placeholder,
  submitKey = 'Space',
  size = 'middle',
  infoText,
  disabled,
}: RHFInputTagFieldProps) {
  const key = submitKey === 'Space' ? ' ' : 'Enter';
  const [tags, setTags] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const handleKeyDown = (e: any, field: any) => {
    // FIXME: not sure about this line, there might be a better pattern to handle this.
    setTags(field.value);
    if (e.key === 'Backspace') {
      if (e.target.value === '') {
        if (tags.length > 0 || field.value.length > 0) {
          const newData =
            field.value.length > 0
              ? field.value.slice(0, field.value.length - 1)
              : tags.slice(0, tags.length - 1);

          field.onChange(newData);
          setTags(newData);
        } else field.onChange(tags);
      }
    }
    // TODO: this key could be dynamic, waiting for use case
    if (e.key === key) {
      e.preventDefault();

      const value = e.target.value.trim();
      if (value) {
        field.onChange([...tags, value]);
        setTags((prev) => {
          return [...prev, value];
        });
      }

      e.target.value = ''; // Clear the input field
      setValue('');
    }
  };

  const removeTag = (index: number, field: any) => {
    field.onChange(field.value.filter((_: any, i: any) => i !== index));
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e: string) => setValue(e);

  const handleAddTagManually = (field: any) => {
    const i = value.trim();
    if (i) {
      field.onChange([...tags, i]);
      setValue('');
      setTags((prev) => {
        return [...prev, value];
      });
    }
  };

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <InputTagStyle>
            <div className={`container ${size}`}>
              <div className="info-input-ctr">
                {label && <label htmlFor={field.name}>{label}</label>}
                {infoText && (
                  <Tooltip title={infoText}>
                    <span>
                      <SvgIcon title="informationIcon" viewBox="0 0 18 18" />
                    </span>
                  </Tooltip>
                )}
              </div>
              <div
                className={`tags-input-container ${
                  fieldState.error ? 'error' : ''
                }${disabled ? 'disabled' : ''}`}
              >
                {/* {tags.map((tag: string, index: number) => ( */}
                {(field.value || []).map((tag: string, index: number) => (
                  <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span
                      className="close"
                      onClick={() => removeTag(index, field)}
                    >
                      <SvgIcon title="closeIcon" viewBox="0 0 19 18" />
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  className="tags-input"
                  id={name}
                  value={value}
                  onKeyDown={(e) => handleKeyDown(e, field)}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder={placeholder}
                  disabled={disabled}
                />
                <button
                  type="button"
                  className="add-btn"
                  disabled={!value}
                  onClick={() => handleAddTagManually(field)}
                >
                  Add
                </button>
              </div>
              {fieldState.error ? (
                <span className="error-msg">{fieldState.error?.message}</span>
              ) : null}
            </div>
          </InputTagStyle>
        );
      }}
    />
  );
}
