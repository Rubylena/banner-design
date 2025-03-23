const Button = ({
  disabled,
  action,
    type,
    styles,
  text
}: {
  disabled: boolean;
  action?: () => void;
        type: "submit" | "reset" | "button" | undefined;
        styles?: string;
        text: string
}) => {
  return (
    <button
          type={type}
          disabled={disabled}
          onClick={action}
          className={`p-1.5 bg-[#019863] text-white ${styles} shadow-sm disabled:bg-[#019863]/70 disabled:cursor-not-allowed`}
    >
      {text}
    </button>
  );
};

export default Button;
