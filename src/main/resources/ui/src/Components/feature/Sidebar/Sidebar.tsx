import Button from "@/Components/common/Button";
import { GrHomeRounded } from "react-icons/gr";
import { useEffect, useState } from "react";
import { AiFillFolder } from "react-icons/ai";
import { FaShare } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import { RiAddCircleFill, RiAddFill } from "react-icons/ri";

const sidebarItems = [
    { title: "Home", Icon: GrHomeRounded, path: "/index" },
    { title: "Add", Icon: RiAddCircleFill, path: "/add" },
    { title: "Files", Icon: AiFillFolder, path: "/files" },
    // { title: "Shared", Icon: FaShare, path: "/shared" },
]

export default function Sidebar() {

    const [active, setActive] = useState("home")

    const router = useRouter()
    const pathName = usePathname()

    useEffect(() => {
        if (pathName == "/") return setActive("home")
        const path: any = pathName.split("/")[1]
        setActive(path)        
    }, [pathName])

    return <div className={"w-56 bg-primary shadow-2xl h-screen"}>
        <div className="p-5">
            <span className={"text-2xl font-bold text-black px-5"}>Minilib</span>
            <div className={"mt-5 "}>
                {
                    sidebarItems.map(({ Icon, title, path }, index) => {
                        return <Button onClick={() => { router.push(path); }} key={index} variant={"text"} className={`my-5 text-xl w-full !justify-start items-center ${active == title.toLocaleLowerCase() ? "!text-tint" : "!text-gray-500"} !px-5 !py-3`}>
                            <Icon className={`${active == title.toLocaleLowerCase() ? "fill-tint" : "fill-gray-500"}`} /><span className={"ml-3 !font-[500] text-lg !normal-case"}>{title}</span>
                        </Button>
                    })
                }
            </div>
        </div>
    </div>
}