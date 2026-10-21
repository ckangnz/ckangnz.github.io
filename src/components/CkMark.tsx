type Props = {
  className?: string;
  title?: string;
};

const CkMark = ({ className, title }: Props) => (
  <svg
    className={className}
    viewBox="0 0 64 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="square"
    role={title ? "img" : undefined}
    aria-label={title}
    aria-hidden={title ? undefined : true}
  >
    <path d="M33.5 9.5A15 15 0 1 0 33.5 30.5" />
    <path d="M38 4v32M38 23l16-19M43.5 17l11 19" />
  </svg>
);

export default CkMark;
