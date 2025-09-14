import Link from "next/link";
import { ModeToggle } from "~/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

export function Navbar() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border/40 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 lg:space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-foreground text-lg font-bold">SIH 2025</span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className={`${navigationMenuTriggerStyle()} hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground px-3 py-2 text-sm font-medium transition-colors`}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/qr"
                    className={`${navigationMenuTriggerStyle()} hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground px-3 py-2 text-sm font-medium transition-colors`}
                  >
                    QR Code
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
