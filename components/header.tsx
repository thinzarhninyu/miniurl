"use client";

import { APP_NAME } from "@/data/constants";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoginButton } from "./auth/login-button";
import { UserButton } from "./auth/user-button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CardInput from "@/app/_components/card-input";
import CardDialog from "@/app/_components/card-dialog";

export const Header: React.FC = () => {
  const user = useCurrentUser();

  return (
    <div className="h-16 flex items-center justify-between">
      <Link href="/">{APP_NAME}</Link>
      {user ? (
        <div className="flex flex-row items-center gap-x-3">
          <CardDialog />
          <UserButton />
        </div>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};
