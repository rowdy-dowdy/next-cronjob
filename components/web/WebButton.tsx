import Link, { LinkProps } from 'next/link';
import {
  ButtonHTMLAttributes,
  FC,
  MouseEvent,
  ReactNode,
} from 'react';
import { twMerge } from 'tailwind-merge';
import LinkAuth from './LinkAuth';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  color?: 'red' | 'orange' | 'white';
}


type WebButtonProps = Omit<LinkProps, "href"> & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string,
  children: ReactNode;
  icon?: ReactNode;
  color?: 'red' | 'orange' | 'white';
}

const WebButton: FC<WebButtonProps> = (props) => {
  const { children, icon, color, href, ...rest } = props;

  const classColor = color === 'red'
    ? 'bg-red-600 text-white hover:bg-red-500 border-red-600'
    : color === 'orange'
    ? 'bg-orange-600 text-white hover:bg-orange-500 border-orange-600'
    : 'border-gray-300 bg-white hover:bg-gray-200';

  const commonClasses = twMerge(
    `${
      icon
        ? 'inline-flex space-x-2 items-center pl-2 pr-4 py-1.5'
        : 'inline px-4 py-1.5'
    } ${twMerge(
      'rounded-lg border border-gray-300 bg-white hover:bg-gray-200 font-semibold',
      classColor
    )}`,
    rest.className
  )

  rest.className = commonClasses

  if (href) {
    return (
      <LinkAuth href={href} {...rest}>
        {icon ? icon : null}
        <span>{children}</span>
      </LinkAuth>
    );
  } else {
    return (
      <button {...rest}>
        {icon ? icon : null}
        <span>{children}</span>
      </button>
    );
  }
};

export default WebButton;
