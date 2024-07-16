"use client"

import * as React from "react"
import { RxMoon } from "react-icons/rx";
import { IoSunny } from "react-icons/io5";
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <IoSunny className="h-[1.3rem] w-[1.3rem] rotate-0 scale-100 transition-transform duration-700 ease-in-out dark:-rotate-90 dark:scale-0" />
          <RxMoon className="absolute h-[1.3rem] w-[1.3rem] rotate-90 scale-0 transition-transform duration-700 ease-in-out dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="rounded-xl bg-[#f5f5f5] dark:bg-[#101415] border dark:border-[#202020] shadow-md">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
