import React from 'react';

const closeButtonStyles: React.CSSProperties = {
  borderRadius: '100%',
  backgroundColor: 'white',
  width: '2rem',
  border: 'none',
  height: '2rem',
  margin: 10,
  color: 'black',
  fontSize: '1.2rem',
  fontWeight: 300,
  cursor: 'pointer',
  display: 'grid',
  placeContent: 'center',
};

type Props = Pick<React.HTMLProps<HTMLButtonElement>, 'onClick' | 'style'>

function CloseButton({ onClick, style }: Props) {
  const buttonStyle = { ...closeButtonStyles, ...style };
  return (
    <button style={buttonStyle} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path
          fill={buttonStyle.color || buttonStyle.fill}
          fillRule="evenodd"
          d="M8.707 8l3.647-3.646a.5.5 0 0 0-.708-.708L8 7.293 4.354 3.646a.5.5 0 1 0-.708.708L7.293 8l-3.647 3.646a.5.5 0 0 0 .708.708L8 8.707l3.646 3.647a.5.5 0 0 0 .708-.708L8.707 8z"
        />
      </svg>
    </button>
  );
}

export default CloseButton;
