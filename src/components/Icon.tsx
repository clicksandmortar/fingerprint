import React from 'react';
import { useLogging } from '../hooks/useLogging';

export type Icon = 'exclamation' | 'ticket' | 'heart'

// <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->

export type IconProps = Omit<React.HTMLProps<SVGElement>, 'ref'> & {
  fill?: string
}

function Ticket(props: IconProps) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="18"
    viewBox="0 0 576 512"
    {...props}
  >
    <path d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z" />
         </svg>;
}

function Exclamation(props: IconProps) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="16"
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
         </svg>;
}

function Heart(props: IconProps) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="16"
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
         </svg>;
}

export const iconList: Record<Icon, React.FC> = {
  exclamation: Exclamation,
  ticket: Ticket,
  heart: Heart,
};

type Props = {
  icon: Icon
} & IconProps

export function Icon({ icon, ...props }: Props) {
  const { error } = useLogging();
  const IconComponent = iconList[icon];

  if (!icon) return null;

  if (icon && !IconComponent) {
    error('BannerIcon: iconName is not valid');
    return null;
  }

  return <IconComponent {...props} />;
}
