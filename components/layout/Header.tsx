interface HeaderProps {
  date?: string;
  title: string;
}

export default function Header({ date, title }: HeaderProps) {
  return (
    <header className="py-md mb-sm">
      {date && (
        <p className="text-caption text-text-secondary mb-[2px]">{date}</p>
      )}
      <h1 className="text-heading font-bold leading-heading text-text-primary">
        {title}
      </h1>
    </header>
  );
}
