import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import Button from '@/Components/common/Button';
import { createToast } from '@/Components/common/Toast';
import { BiSolidFolder } from "react-icons/bi";
import { BsFilePdf, BsSearch } from "react-icons/bs";
import { AiFillBell, AiFillSetting } from "react-icons/ai";
import { TbDots, TbDotsVertical } from "react-icons/tb";
import { useRouter } from 'next/navigation';
import Tooltip from '@/Components/common/Tooltip';

interface Props {
    docs: any[]
    search: (query: string) => void
}

export default function Files({ docs, search }: Props) {

    const router = useRouter()
    const searchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (window.location.href.includes("?s=f")) {
            searchRef.current?.focus()
        }
    }, [window.location.href])

    return <div className={"w-full h-screen overflow-y-auto bg-secondary"}>
        <div className="w-full">
            <div className={"px-10 py-5 flex items-center justify-between"}>
                <div className="flex flex-col">
                    <span className={"text-3xl text-secondary font-semibold"}>Files</span>
                    <span className={"font-semibold text-gray-500"}>View all files</span>
                </div>
                <div className={"flex justify-end"}>
                    <div className={`flex-1 flex items-center bg-white px-3 rounded-xl shadow-2xl`}>
                        <BsSearch className={"text-xl text-gray-500"} />
                        <input onChange={(e) => search(e.target.value)} ref={searchRef} className={"border-none outline-none p-3"} placeholder={"search here"} />
                    </div>
                    <Button className={`flex text-xl items-center bg-white px-3 rounded-xl ml-3 !text-gray-500 shadow-2xl`}>
                        <AiFillBell />
                    </Button>
                    <Button className={`flex text-xl items-center bg-white px-3 rounded-xl ml-3 !text-gray-500 shadow-2xl `}>
                        <AiFillSetting />
                    </Button>
                </div>
            </div>
            <div className={"px-10 py-5 flex flex-col"}>
                <div className={"w-full mt-10"}>
                    <div className={"bg-white rounded-2xl px-4"}>
                        <table className={"w-full"}>
                            <thead>
                                <tr>
                                    <th className={"p-4 text-left !text-gray-500 !font-normal"}>Document name</th>
                                    <th className={"p-4 text-left !text-gray-500 !font-normal"}>Document title</th>
                                    <th className={"p-4 text-left !text-gray-500 !font-normal"}>File size</th>
                                    <th className={"p-4 text-left !text-gray-500 !font-normal"}>Uploaded on</th>
                                    <th className={"p-4 text-left !text-gray-500 !font-normal"}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    docs.map((i, index) => {
                                        return <tr key={index}>
                                            <td className={"p-4 flex items-center gap-3"}>
                                                <div
                                                    className="mr-2 p-3 rounded-xl bg-red-800 bg-opacity-20 text-2xl text-red-800">
                                                    <BsFilePdf />
                                                </div>
                                                {i.title}
                                            </td>
                                            <td className={"p-4"}>
                                                <Tooltip title={i.name}>
                                                    <div className="w-full text-start">
                                                        {i.name.length <= 10 ? i.name : `${i.name.slice(0, 6)}...${i.name.slice(i.name.length - 6, i.name.length)}`}
                                                    </div>
                                                </Tooltip>
                                            </td>
                                            <td className={"p-4"}>{(i.size / (1024 * 1024)).toLocaleString()} MB</td>
                                            <td className={"p-4"}>{
                                                new Date(i.createdAt).toLocaleDateString()
                                            }</td>
                                            <td className={"p-4"}>
                                                <Button className="bg-primary !text-tint px-5 py-3 !normal-case"
                                                    variant={"text"}>
                                                    <TbDotsVertical />
                                                </Button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
