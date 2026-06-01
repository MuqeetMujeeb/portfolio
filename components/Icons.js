export function FlourishDivider({ className = "divider" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 11h58M102 11h58"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M80 3l5 8-5 8-5-8 5-8z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.25"
      />
      <circle cx="62" cy="11" r="2.2" fill="currentColor" />
      <circle cx="98" cy="11" r="2.2" fill="currentColor" />
    </svg>
  );
}

export const Icon = {
  github: (p) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" {...p}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
    </svg>
  ),
  linkedin: (p) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" {...p}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  email: (p) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M3 6l9 7 9-7" />
    </svg>
  ),
  phone: (p) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M6.5 3h3l1.5 5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 5 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5a2 2 0 0 1 2-2z" />
    </svg>
  ),
  chat: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  send: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...p}>
      <path d="M3 11l18-8-8 18-2.5-7.5L3 11z" />
    </svg>
  ),
  resume: (p) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M6 2.5h7l5 5v14a0 0 0 0 1 0 0H6a0 0 0 0 1 0 0V2.5z" />
      <path d="M13 2.5V8h5" />
      <path d="M8.5 12.5h7M8.5 15.5h7M8.5 18.5h4" strokeLinecap="round" />
    </svg>
  ),
};
