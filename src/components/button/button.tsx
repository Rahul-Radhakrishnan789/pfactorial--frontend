
import React from "react";

type ButtonProps = {
  buttonText: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({ buttonText, className, onClick, type = "button" }) => {
  return (
    <button
      type={type} 
      className={` flex items-center justify-center  ${className}`}
      onClick={onClick}
    >
      <span className="flex items-center gap-2 p-3 bold-Inter"> 
        <span>{buttonText}</span>
       
      </span>
    </button>
  );
};

export default Button;