import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const Lookup = LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>;
  const Cmp = Lookup[name] ?? LucideIcons.Wrench;
  return <Cmp {...props} />;
}
