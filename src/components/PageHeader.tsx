interface PageHeaderProps {
  title: string
  lead: string
}

/** Opening block for the secondary routes. */
export default function PageHeader({ title, lead }: PageHeaderProps) {
  return (
    <header className="border-b border-hairline pb-10 pt-12 md:pt-16">
      <h1 className="text-title font-bold text-ink">{title}</h1>
      <p className="measure mt-5 text-lead text-ink-dim">{lead}</p>
    </header>
  )
}
