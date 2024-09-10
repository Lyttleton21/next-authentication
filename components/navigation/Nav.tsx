import { auth } from "@/server/auth";
import logo from "@/public/logo.svg";
import UserButton from "./UserButton";
import Image from "next/image";

export default async function Nav() {
  const session = await auth();
  //   console.log("TCL: Nav -> user", user);

  return (
    <header className="bg-slate-500 py-4">
      <nav>
        <ul className="flex justify-between">
          <li>
            <Image src={logo} alt={"Logo"} />
          </li>
          <li>
            <UserButton expires={""} user={session?.user} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
