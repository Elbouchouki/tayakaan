"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useStore } from "@/hooks/use-store"
import useAuthStore from "@/store/authStore"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"

export function UserNav() {

  const authStore = useStore(useAuthStore, state => state)

  const role: string | undefined = authStore?.user?.role;

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarImage src={authStore?.user?.avatar} alt={`${authStore?.user?.displayName}'s avatar`} />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56"
        align={langStore?.rtl === true ? "start" : "end"}
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className={cn("text-sm font-medium leading-none", {
              "text-right": langStore?.rtl
            })}>
              {authStore?.user?.displayName}
            </p>
            <p className={cn("text-xs leading-none text-muted-foreground", {
              "text-right": langStore?.rtl
            })}>
              {authStore?.user?.email}
            </p>
            <div className={cn("flex flex-row items-center gap-2 text-xs leading-none text-muted-foreground", {
              "flex-row-reverse justify-start": langStore?.rtl,
            })}>
              <span className="whitespace-nowrap">
                {dict?.connectedAs}
              </span>
              <div className="flex flex-row items-center gap-1">
                {role !== undefined ?
                  <Badge className="py-[1px] text-xs">
                    {`${role?.charAt(0).toUpperCase()}${role?.slice(1)}`}
                  </Badge> : null
                }
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem className={cn("flex flex-row ", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <span className="flex-none">
                {dict?.profile}
              </span>
              <DropdownMenuShortcut className={cn({
                "mr-auto w-full": langStore?.rtl,
              })}>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem className={cn("flex flex-row ", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <span className="flex-none">
                {dict?.settings}
              </span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={authStore?.logout} className={cn("flex flex-row ", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <span className="flex-none">
            {dict?.logout}
          </span>
          <DropdownMenuShortcut className={cn({
            "mr-auto w-full": langStore?.rtl,
          })}>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}