import Link from "next/link";
import { Button } from "@heroui/react";
import { FiLock } from "react-icons/fi";

export default function NotAuthorized({
  title = "Access Denied",
  description = "This page is only available for job seekers.",
  actionLabel = "Back to Home",
  actionHref = "/",
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-4">
          <FiLock className="text-red-400 text-2xl" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          {title}
        </h2>

        <p className="text-zinc-400 mb-6">
          {description}
        </p>

        <Link href={actionHref}>
          <Button color="primary">
            {actionLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
}
