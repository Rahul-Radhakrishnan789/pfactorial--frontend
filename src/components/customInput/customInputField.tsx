import React from 'react';

interface CustomInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  touched?: boolean;
  showForgotPassword?: boolean;
  showPasswordToggle?: boolean;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  type = 'text',
  placeholder,
  name,
  className = '',
  onFocus,
  error,
  touched,
  showForgotPassword = false,
  showPasswordToggle = false,
  ...rest 
}) => {
  return (
    <div className="pt-3">
      <div
        className={`w-full flex items-center mt-2 p-3 border border-gray-300  focus-within:border-blue-500 bold-Inter bg-custom-white ${className}`}
      >
        <input
          autoComplete="off"
          type={type}
          placeholder={placeholder}
          name={name}
          onFocus={onFocus}
          className="border-none outline-none w-full text-sm"
          {...rest} 
        />
      </div>
      {touched && error && (
        <div className="text-red-500 mt-1 text-xs">{error}</div>
      )}
    </div>
  );
};

export default CustomInputField;


// interface CustomInputFieldProps {
//   type?: string;
//   placeholder?: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
//   name?: string;
//   className?: string;
//   onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
//   error?: string;
//   touched?: boolean;
//     showForgotPassword?: boolean;   
//     showPasswordToggle?: boolean;
// }

// const CustomInputField: React.FC<CustomInputFieldProps> = ({
//   type = "text",
//   placeholder,
//   value,
//   onChange,
//   onBlur,
//   name,
//   className = "",
//   onFocus,
//   error,
//   touched,
//   showForgotPassword = false,
//   showPasswordToggle = false,
// }) => {
//   return (
//     <div className="pt-3">
//       <div
//         className={`w-full flex items-center mt-2 p-3 border border-gray-300  focus-within:border-blue-500 bold-Inter bg-custom-white ${className}`}
//       >
//         <input
//           autoComplete="off"
//           type={type}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           onBlur={onBlur}
//           name={name}
//           onFocus={onFocus}
//           className="border-none outline-none w-full  text-sm "

//         />
//       </div>
//       {touched && error && (
//         <div className="text-red-500 mt-1 text-xs">{error}</div>
//       )}
//     </div>
//   );
// };

// export default CustomInputField;
