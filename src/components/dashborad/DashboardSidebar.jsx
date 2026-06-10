"use client";

import { Bars, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoAddCircleSharp } from "react-icons/io5";

export function DashboardSidebar() {
  const router = useRouter();

  const navItems = [
    { icon: House, label: "Home", href: "/dashboard/rectuiter" },
    { icon: Magnifier, label: "Jobs", href: "/dashboard/rectuiter/jobs" },
    { icon: IoAddCircleSharp, label: "Add Job", href: "/dashboard/rectuiter/jobs/new" },
    { icon: Person, label: "Company Profile", href: "/dashboard/rectuiter/company" },
    { icon: Gear, label: "Settings", href: "/dashboard/rectuiter" },
  ];

  return (
    <>
      {/* Mobile header + drawer (uncontrolled) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-default-200 bg-background px-4 py-3">
        <Drawer>
          <Button isIconOnly variant="light">
            <Bars className="size-5" />
          </Button>
          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.Header>
                  <Drawer.Heading className="font-bold">HireLoop</Drawer.Heading>
                </Drawer.Header>
              <Drawer.Body>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Button
                      key={item.label}
                      variant="light"
                      className="w-full justify-start gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground"
                      slot="close"
                      onPress={() => router.push(item.href)}
                    >
                      <item.icon className="size-5 text-muted" />
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
        <h1 className="font-bold text-lg">HireLoop</h1>
        <div className="w-10" />
      </div>

      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col gap-1 border-r min-h-screen w-65 pt-3 px-3.5">
        <h1 className="font-bold text-2xl">HireLoop</h1>
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          >
            <item.icon className="size-5 text-muted" />
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}