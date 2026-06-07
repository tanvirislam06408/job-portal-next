import { Bars, Bell, Envelope, Gear, House, LayoutSideContent, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { IoAddCircleSharp } from "react-icons/io5";

export function DashboardSidebar() {
  const navItems = [
    { icon: House, label: "Home", href: "/dashboard/rectuiter" },
    { icon: Magnifier, label: "Jobs", href: "/dashboard/rectuiter/jobs" },
    { icon: IoAddCircleSharp, label: "Add Job", href: "/dashboard/rectuiter/jobs/new" },
    // { icon: Envelope, label: "Messages", href: "/dashboard/rectuiter" },
    { icon: Person, label: "Company Profile", href: "/dashboard/rectuiter/company" },
    { icon: Gear, label: "Settings", href: "/dashboard/rectuiter" },
  ];

  return (
    <div className="">
      <nav className="md:flex flex-col gap-1 border-r min-h-screen w-65 pt-3 hidden px-3.5">
        <h1 className="font-bold text-2xl">HireLoop</h1>
        {navItems.map((item) => (
          <Link
            href={item?.href}
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            type="button"
          >
            <item.icon className="size-5 text-muted" />
            {item.label}
          </Link>
        ))}
      </nav>


      <Drawer>
        <Button className={'md:hidden'} variant="secondary">
          <LayoutSideContent />

        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading className="font-bold">HireLoop</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                      type="button"
                    >
                      <item.icon className="size-5 text-muted" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
}