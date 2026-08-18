export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="max-w-[760px] mx-auto">
      {items.map((it, i) => (
        <details key={i} className="group border-b border-sage-line">
          <summary className="list-none cursor-pointer py-5 font-semibold text-[17px] text-ink flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
            {it.q}
            <span className="flex-none relative w-[22px] h-[22px]">
              <span className="absolute left-0 right-0 top-[10px] h-0.5 bg-plum rounded" />
              <span className="absolute top-0 bottom-0 left-[10px] w-0.5 bg-plum rounded transition-opacity group-open:opacity-0" />
            </span>
          </summary>
          <div className="pb-5 text-muted text-[15.5px] max-w-[62ch]">{it.a}</div>
        </details>
      ))}
    </div>
  );
}
