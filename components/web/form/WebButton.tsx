import { LinkProps } from 'next/link';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import LinkAuth from '../ui/LinkAuth';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: ReactNode;
  variant?: 'outlined' | 'contained';
}

type WebButtonProps = Omit<LinkProps, "href"> & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string,
  children?: ReactNode;
  icon?: ReactNode;
  variant?: 'outlined' | 'contained';
}

const WebButton: FC<WebButtonProps> = (props) => {
  const { children, icon, variant = "contained", href, ...rest } = props;

  const classVariant = variant == "contained"
    ? 'rounded-md px-2 h-11 bg-gray-100 text-indigo-900 font-black uppercase hover:bg-indigo-200 inline-flex items-center'
    : `rounded-md px-2 h-11 border-2 border-gray-300 text-gray-300 font-black uppercase bg-black/20 hover:bg-white/20 inline-flex items-center`

  const commonClasses = twMerge(classVariant, rest.className)

  rest.className = commonClasses
  rest.style = variant == "contained" ? { boxShadow: 'rgb(48, 26, 107) 0px 6px 0px 0px' } : {}

  if (href) {
    return (
      <LinkAuth href={href} {...rest}>
        {icon ? icon : null}
        <span className='px-6'>{children}</span>
      </LinkAuth>
    );
  } else {
    return (
      <button {...rest}>
        {icon ? icon : null}
        <span className="px-6">{children}</span>
      </button>
    );
  }
};

export default WebButton;
