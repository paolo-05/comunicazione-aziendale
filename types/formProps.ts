type FormProps = {
  id: string;
  placeholder?: string | null;
  initialValue?: string | null;
  error?: string | null;
  checkRegex: boolean;
  onValueChange: Function;
};
