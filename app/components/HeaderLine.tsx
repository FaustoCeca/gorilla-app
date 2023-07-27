'use client'
import { useRouter } from "next/navigation";
import useSidebarMenu from "../hooks/useSidebarMenu";
import { SafeAdmin } from "../types";
import AdminMenu from "./AdminMenu";

interface HeaderLineProps {
  currentUser: any;
}

const HeaderLine = ({ currentUser }: HeaderLineProps) => {
  const { onClose, onOpen } = useSidebarMenu();
  const router = useRouter();

  return (
    <div className="flex bg-slate-800 flex-row w-full p-4 items-center justify-between">
          <svg 
              onClick={onOpen}
              className="cursor-pointer w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12">
              <g fill="white" fill-rule="nonzero">
                  <path d="M.686 6.5C.307 6.5 0 6.164 0 5.75S.307 5 .686 5h14.628c.379 0 .686.336.686.75s-.307.75-.686.75H.686zM.686 1.5C.307 1.5 0 1.164 0 .75S.307 0 .686 0h14.628c.379 0 .686.336.686.75s-.307.75-.686.75H.686zM.686 11.5c-.379 0-.686-.336-.686-.75S.307 10 .686 10h14.628c.379 0 .686.336.686.75s-.307.75-.686.75H.686z"></path>
              </g>
          </svg>
        <h2
          onClick={() => router.push('/')} 
          className="text-yellow-50 font-bold cursor-pointer uppercase"
        >
            Gorila Burguer
        </h2>
        <div className="flex flex-row gap-5 items-center">
          {
            currentUser && (
              <AdminMenu currentUser={currentUser} />
              )
          }
        </div>
    </div>
  )
}

export default HeaderLine;