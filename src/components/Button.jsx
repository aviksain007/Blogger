import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-700",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`py-2.5 px-5 me-2 mb-2 text-sm text-white font-medium focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
