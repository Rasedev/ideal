
//////////////FINAL/////////////////////////

// import React from 'react';
// import styles from './Button.module.css';

// const Button = ({ title, onClick, className, style, width, height, type, href, ...props }) => {
//   const buttonContent = (
//     <div 
//       className={`${styles.button_F} ${className}`} 
//       style={{ ...style, width, height }}
//     >
//       <span className={`${styles.contact_mas}`}>{title}</span>
//       <button type="button" onClick={onClick} {...props}></button>
//     </div>
//   );

//   if (type === 'link') {
//     return (
//       <a 
//         href={href} 
//         target="_blank" 
//         rel="noopener noreferrer"
//         style={{ display: 'inline-block' }}
//       >
//         {buttonContent}
//       </a>
//     );
//   }

//   return buttonContent;
// };

// export default Button;







import React from 'react';
import styles from './Button.module.css';

const Button = ({ 
  title, 
  onClick, 
  className = '', 
  style = {}, 
  width = 'auto', 
  height = 'auto',
  type = 'button',
  href,
  variant = 'primary', // 'primary' | 'secondary'
  icon,
  ...props 
}) => {
  const buttonStyles = {
    primary: {
      backgroundColor: '#00abc9',
      color: '#ffffff',
      border: 'none'
    },
    secondary: {
      backgroundColor: 'transparent',
      color: '#ffffff',
      border: '2px solid #ffffff'
    }
  };

  const buttonContent = (
    <div 
      className={`${styles.button_F} ${className}`} 
      style={{ 
        ...style, 
        width, 
        height,
        ...buttonStyles[variant]
      }}
    >
      <span className={styles.contact_mas}>
        {icon && <span className="button-icon">{icon}</span>}
        {title}
      </span>
      <button 
        type="button" 
        onClick={onClick} 
        style={{ backgroundColor: buttonStyles[variant].backgroundColor }}
        {...props}
      ></button>
    </div>
  );

  if (type === 'link') {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ display: 'inline-block' }}
      >
        {buttonContent}
      </a>
    );
  }

  if (href) {
    return (
      <a 
        href={href}
        style={{ display: 'inline-block', textDecoration: 'none' }}
      >
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
};

export default Button;








