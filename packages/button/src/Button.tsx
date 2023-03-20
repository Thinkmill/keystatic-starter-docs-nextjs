type ButtonProps = {
  children: React.ReactNode;
};

export const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      {...rest}
    >
      {children}
    </button>
  );
};
