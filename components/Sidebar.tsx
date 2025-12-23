"use client";
import links from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { colors } from "@/lib/design-system";

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="py-4 px-8 h-full border-r-2"
      style={{
        backgroundColor: colors.componentBg, // Yellow
        borderRightColor: colors.border,
      }}
    >
      {/*
        Next.js Image component with file from public folder
        - Files in public folder are served from root path (/)
        - width and height are required for Next.js Image optimization
        - These should match the actual SVG dimensions for best results
        - priority prop added to fix LCP warning
      */}
      <Image
        src="/logo.svg"
        alt="jobify logo"
        className="mx-auto"
        width={164}
        height={50}
        priority
      />
      <div className="flex flex-col mt-20 gap-y-4">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Button
              asChild
              key={link.href}
              variant={isActive ? "default" : "link"}
              style={{
                backgroundColor: isActive ? colors.accent : 'transparent',
                color: isActive ? colors.white : colors.text,
              }}
            >
              <Link href={link.href} className="flex items-center gap-x-2">
                {link.icon} <span className="capitalize">{link.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
}
export default Sidebar;
