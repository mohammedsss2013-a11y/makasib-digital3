import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  href?: string;
  compact?: boolean;
  light?: boolean;
}

export function BrandLogo({ href = "/", compact = false, light = false }: BrandLogoProps) {
  return (
    <Link href={href} className="group inline-flex items-center gap-3" aria-label="مكاسب رقمية - معرفة وأدوات رقمية">
      <span className={`relative flex shrink-0 items-center justify-center ${compact ? "h-10 w-10" : "h-14 w-14"}`}>
        <Image
          src="/logo-official.png.png"
          alt=""
          width={407}
          height={407}
          priority
          aria-hidden="true"
          className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-2"
        />
      </span>
      {!compact && (
        <span className="flex min-w-0 flex-col items-start leading-none">
          <span className={`whitespace-nowrap text-lg font-black tracking-tight ${light ? "text-slate-950" : "text-white"}`}>مكاسب رقمية</span>
          <span className="mt-1.5 whitespace-nowrap text-[10px] font-bold tracking-wide text-emerald-400">معرفة وأدوات رقمية</span>
        </span>
      )}
    </Link>
  );
}
