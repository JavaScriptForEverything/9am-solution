type Props = React.ComponentProps<'svg'>

export const MessageIcon = (props: Props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20 2H4C2.897 2 2 2.897 2 4v14c0 1.103 0.897 2 2 2h4v4l6.586-4H20c1.103 0 2-0.897 2-2V4c0-1.103-0.897-2-2-2z" />
  </svg>
)
