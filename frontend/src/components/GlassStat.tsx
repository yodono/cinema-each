import { DarkGlass } from "./DarkGlass";

type GlassStatProps = {
  title: string;
  value: number | string | boolean;
};

export function GlassStat({ title, value }: GlassStatProps) {
  return (
    <DarkGlass>
      <p className="text-sm text-zinc-300">{title}</p>
      <p className="mt-3 text-4xl font-extrabold text-white">{value}</p>
    </DarkGlass>
  );
}
