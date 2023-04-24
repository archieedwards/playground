interface LayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function Layout({ title, description, children }: LayoutProps) {
  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-4">{description}</p>
      <div className="mt-8">{children}</div>
    </main>
  );
}
