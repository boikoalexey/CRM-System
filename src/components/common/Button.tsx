type Props = {
  title: string
  onClick?: () => void
  className?: string
}

export const Button = (Props: Props) => {
  const { title, onClick, className } = Props

  return <button onClick={onClick} className={className}>{title}</button>
}