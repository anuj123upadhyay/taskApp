import { ComponentType } from "react";

interface ButtonProps {
  extraBtnClasses?: string;
  textColor?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  disable?: boolean;
  type?: "button" | "submit" | "reset";
  content?: {
    text?: string;
    icon?: ComponentType<any>;
  };
}

const Button = ({
  extraBtnClasses,
  textColor,
  handleClick,
  title,
  disable,
  type = "button",
  content
}: ButtonProps) => {
  // Handling the onClick for non-submit types
  const handleClickProp = type === "submit" ? undefined : handleClick;

  return (
    <button
      type={type}
      title={title ?? ""}
      onClick={handleClickProp}
      disabled={disable}
      className={`flex gap-2 items-center text-iconColor ${extraBtnClasses} ${
        textColor ?? ""
      } rounded-md px-2 py-1 hover:scale-105 transition duration-300 ease-in-out`}
    >
      {content?.text && <span>{content.text}</span>}
      {content?.icon && <content.icon className="w-5 h-5" />}
    </button>
  );
};

export default Button;
