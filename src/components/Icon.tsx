export type IconName =
  | "play"
  | "pause"
  | "external"
  | "arrow-right"
  | "arrow-left"
  | "mail"
  | "linkedin"
  | "github"
  | "printer"
  | "code";

const paths: Record<IconName, JSX.Element> = {
  play: <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" stroke="none" />,
  pause: (
    <g fill="currentColor" stroke="none">
      <rect x="6" y="4.5" width="4" height="15" />
      <rect x="14" y="4.5" width="4" height="15" />
    </g>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  "arrow-right": <path d="M4 12h15M13 6l6 6-6 6" />,
  "arrow-left": <path d="M20 12H5M11 6l-6 6 6 6" />,
  mail: <path d="M3 5.5h18v13H3zM3 6l9 7 9-7" />,
  linkedin: (
    <g fill="currentColor" stroke="none">
      <path d="M4 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM2.3 9h3.4v11.5H2.3zM8.8 9h3.3v1.6h.05c.46-.87 1.58-1.8 3.26-1.8 3.48 0 4.12 2.29 4.12 5.27v6.43H16.1v-5.7c0-1.36-.03-3.11-1.9-3.11-1.9 0-2.18 1.48-2.18 3v5.81H8.8z" />
    </g>
  ),
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
    />
  ),
  printer: <path d="M7 9V3.5h10V9M7 17H4.5V9.5h15V17H17M7 14h10v6.5H7z" />,
  code: <path d="M8.5 7 3.5 12l5 5M15.5 7l5 5-5 5" />,
};

type Props = {
  name: IconName;
  className?: string;
};

const Icon = ({ name, className = "" }: Props) => (
  <svg
    className={`icon ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    aria-hidden="true"
    focusable="false"
  >
    {paths[name]}
  </svg>
);

export default Icon;
