import FormField from "./form-field";

type SelectFieldProps = {
  label: string;
  options: readonly string[];
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectField = ({ label, options, error, ...props }: SelectFieldProps) => (
  <FormField label={label} error={error}>
    <select
      {...props}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </FormField>
);

export default SelectField;
