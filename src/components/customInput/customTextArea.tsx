import React from 'react';

interface CustomTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  touched?: boolean;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  rows = 3,
  className = '',
  error,
  touched,
  ...rest
}) => (
  <div className="pt-3">
    <textarea
      rows={rows}
      className={`w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring ${
        className
      }`}
      {...rest}
    />
    {touched && error && (
      <div className="text-red-500 mt-1 text-xs">{error}</div>
    )}
  </div>
);

export default CustomTextArea;
