'use client'
import useSidebarMenu from "../hooks/useSidebarMenu";
import { SafeAdmin } from "../types";
import AdminMenu from "./AdminMenu";

interface HeaderLineProps {
    currentUser: any;
}

const HeaderLine = ({ currentUser }: HeaderLineProps) => {
  const { onClose, onOpen } = useSidebarMenu();

  return (
    <div className="flex bg-slate-800 flex-row w-full p-4 items-center justify-between">
        <svg className="fill-white w-6 h-6 cursor-pointer" viewBox="0 0 10 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g stroke="white" stroke-width="2" fill="white" fill-rule="evenodd">
                    <g transform="translate(-265.000000, -178.000000)" stroke-width="2">
                      <g transform="translate(242.000000, 158.000000)">
                        <g transform="translate(24.000000, 21.000000)">
                          <g>
                            <path d="M0.153137207,6.26049805 L7.4343125,13.4343125"></path>
                            <path d="M7.4344,0.3093125 L0.188598633,7.65423584"></path>
                          </g>
                        </g>
                      </g>
                    </g>
            </g>
        </svg>
        <h2 className="text-yellow-50 font-bold cursor-pointer uppercase">
            Gorila Burguer
        </h2>
        <div className="flex flex-row gap-5 items-center">
          {
            currentUser && (
              <AdminMenu currentUser={currentUser} />
              )
          }
          <svg 
              onClick={onOpen}
              className="cursor-pointer w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12">
              <g fill="white" fill-rule="nonzero">
                  <path d="M.686 6.5C.307 6.5 0 6.164 0 5.75S.307 5 .686 5h14.628c.379 0 .686.336.686.75s-.307.75-.686.75H.686zM.686 1.5C.307 1.5 0 1.164 0 .75S.307 0 .686 0h14.628c.379 0 .686.336.686.75s-.307.75-.686.75H.686zM.686 11.5c-.379 0-.686-.336-.686-.75S.307 10 .686 10h14.628c.379 0 .686.336.686.75s-.307.75-.686.75H.686z"></path>
              </g>
          </svg>
        </div>
    </div>
  )
}

export default HeaderLine;