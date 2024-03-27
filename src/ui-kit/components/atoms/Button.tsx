import FishAnimation from '../assets/FishAnimation';
import Icon from './Icon';
import Loading from './Loading';

export interface Props {
  danger?: boolean,
  fill?: boolean,
  neomorph?: boolean,
  icon?: any,
  iconPosition?: "right",
  loader?: "fish",
  loading?: boolean,
  onClick?: (...args: any[]) => any,
  size?: "small" | "large",
  rounded?: boolean,
  success?: boolean,
  disabled?: boolean,
  text?: string,
  type?: "button" | "submit" | "reset" | undefined,
  className?: string,
  children?: any
}

const Button = ({
  danger,
  fill,
  neomorph,
  icon,
  iconPosition,
  loader,
  loading,
  onClick,
  size,
  rounded,
  success,
  disabled,
  text,
  type,
  className,
  children
}: Props): JSX.Element => (
  <button
        className={`
      uik-button
      ${fill ? 'uik-button--fill' : ''}
      ${neomorph ? 'uik-button--neomorph' : ''}
      ${danger ? 'uik-button--danger' : ''}
      ${success ? 'uik-button--success' : ''}
      ${size === 'small' ? 'uik-button--small' : ''}
      ${size === 'large' ? 'uik-button--large' : ''}
      ${rounded ? 'uik-button--rounded' : ''}
      ${loading ? 'uik-button--loading' : ''}
      ${disabled ? 'uik-button--disabled' : ''}
      ${!!icon && !text && !children ? 'uik-button--icon' : ''}
      ${className || ''}
    `}
    disabled={loading || disabled}
    onClick={onClick}
    type={type || 'button'}
  >
    {
      loading &&
      (
        loader === 'fish' ?
        <FishAnimation />
        : <Loading />
      )
    }
    
    {
      !!icon && iconPosition !== 'right' &&
      <Icon
        className='uik-button__icon'
        icon={icon}
      />
    }

    {
      (!!children || !!text) &&
      <span className='uik-button__text'>{children}{text}</span>
    }

    {
      !!icon && iconPosition === 'right' &&
      <Icon
        className='uik-button__icon'
        icon={icon}
      />
    }
  </button>
)

export default Button