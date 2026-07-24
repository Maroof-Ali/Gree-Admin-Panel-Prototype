export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "success" | "warning" | "error" | "neutral" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
