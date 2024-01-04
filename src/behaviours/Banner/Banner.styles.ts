import { useBrandColors } from '../../hooks/useBrandConfig';

export const useBannerStyles = () => {
  const { textPrimary, backgroundPrimaryDimmed } = useBrandColors();

  const styles = {
    contentContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '1000px',
      margin: '0 auto',
    },
    text: {
      lineHeight: '1.2rem',
      margin: '0px 10px',
      color: textPrimary,
      fontWeight: 400,
      fontSize: '1rem',
    },
    iconContainer: {
      marginLeft: 5,
    },
    button: {
      border: 'none',
      color: textPrimary,
      backgroundColor: backgroundPrimaryDimmed,
      padding: '5px 10px',
      margin: '0px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 600,
    },
    closeButton: {
      background: 'transparent',
      color: textPrimary,
      margin: 0,
    },
  };

  return styles;
};
