interface CategoryTagProps {
  label: string;
}

export function CategoryTag({ label }: CategoryTagProps) {
  return (
    <span className="inline-block border border-secondary px-2 py-1 font-label-sm text-label-sm uppercase text-secondary">
      {label}
    </span>
  );
}