import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = forwardRef(
  (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => (
    <button
      ref={ref}
      className="p-4 border rounded-sm bg-gray-50 hover:bg-gray-100"
      {...props}
    />
  )
);

Button.displayName = "Button";
export default Button;
