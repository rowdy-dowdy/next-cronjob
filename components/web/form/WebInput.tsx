import {FC, InputHTMLAttributes} from 'react';
import { twMerge } from 'tailwind-merge';


const WebInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const { ...rest } = props;

  const commonClasses = twMerge(
    `rounded-md px-2 py-2 border-2 border-gray-100 !bg-white/10 text-gray-100 font-semibold text-lg`,
    rest.className
  )

  rest.className = commonClasses

  return (
    <input {...rest} />
  )
};

export default WebInput;
