type FilterValue = 'all' | 'global' | 'korea';

interface CategoryFilterProps {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
}

const filters: { label: string; value: FilterValue }[] = [
  { label: '전체', value: 'all' },
  { label: '글로벌', value: 'global' },
  { label: '한국', value: 'korea' },
];

export default function CategoryFilter({
  value,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-sm mb-lg">
      {filters.map((f) => (
        <button
          key={f.value}
          className={`py-[8px] px-[16px] rounded-full text-[13px] transition-all duration-150 ${
            value === f.value
              ? 'font-semibold bg-text-primary text-fg'
              : 'font-normal bg-fg text-text-secondary'
          }`}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
