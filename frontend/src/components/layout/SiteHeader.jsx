import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { useLocation } from "react-router-dom";

function SiteHeader() {
  const location = useLocation();

  const headings = {
    "/dashboard": "Dashboard",
    "/applications": "Applications",
    "/contacts": "Contacts",
    "/documents": "Documents",
    "/board": "Application Status",
  };

  const heading = headings[location.pathname] || "Trackr";

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 size-5" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-6"
        />
        <h1 className="text-xl font-medium">{heading}</h1>
        <div className="ml-auto flex items-center gap-2">
          {/* <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button> */}
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
