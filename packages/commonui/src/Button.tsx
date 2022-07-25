type Props = {
  children?: any;
};

const Button = ({ children }: Props) => {
  return <button>{children || 'Button'}</button>;
};

export default Button;
