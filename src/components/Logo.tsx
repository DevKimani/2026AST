export function Logo({ size = 40, badge = false }: { size?: number; badge?: boolean }) {
  const img = (
    <img src="/images/logo-mark.png" alt="Arise Strong Together" width={size} height={size}
      className="object-contain flex-none" style={{ width: size, height: size }} />
  );
  if (badge) {
    return (
      <span className="rounded-full bg-white inline-flex items-center justify-center flex-none"
        style={{ width: size + 12, height: size + 12 }}>{img}</span>
    );
  }
  return img;
}
