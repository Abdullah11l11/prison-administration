type FormFieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

const FormField = ({ label, error, children }: FormFieldProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">{label}</label>
    {children}
    {error && <p className="text-sm text-destructive">{error}</p>}
  </div>
);

export default FormField;
