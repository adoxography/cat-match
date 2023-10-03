import { type ChangeEvent, Fragment, useId } from 'react';
import styles from './StarInput.module.css';

type StarInputProps<T extends string | number> = {
  value: T;
  options: T[];
  name?: string;
  onChange?: (value: T) => void;
};

const StarInput = <T extends string | number>({ value, options, name, onChange }: StarInputProps<T>) => {
  const defaultName = useId();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue: string | number = event.target.value;

    if (typeof value === 'number') {
      newValue = parseInt(newValue);
    }

    onChange?.(newValue as T);
  };

  return (
    <div className={styles.StarInput}>
      {options.map((option) => (
        <Fragment key={option}>
          <label className="material-symbols-outlined" key={option} htmlFor={`${defaultName}-${option}`} />
          <input
            id={`${defaultName}-${option}`}
            type="radio"
            name={name ?? defaultName}
            value={option}
            checked={value === option}
            onChange={handleChange}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default StarInput;
