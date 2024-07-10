import React from 'react';
import axios from 'axios';
import Button from '@/Components/common/Button';
import { createToast } from '@/Components/common/Toast';
import { BiSolidFolder } from "react-icons/bi";
import { BsFilePdf, BsSearch } from "react-icons/bs";
import { AiFillBell, AiFillSetting } from "react-icons/ai";
import { TbDots, TbDotsVertical } from "react-icons/tb";
import { useRouter } from 'next/navigation';

interface Props {
    docs: any[]
}

export default function Home({ docs }: Props) {

    const router = useRouter()

    return <div className={"w-full h-screen overflow-y-auto bg-secondary"}>
        <div className="w-full">
            <div className={"px-10 py-5 flex items-center justify-between"}>
                <div className="flex flex-col">
                    <span className={"text-3xl text-secondary font-semibold"}>Overview</span>
                    <span className={"font-semibold text-gray-500"}>Overview about uploaded documents</span>
                </div>
                <div className={"flex justify-end"}>
                    <Button onClick={() => { router.push("/files?s=f") }} className={`flex text-xl items-center bg-white px-3 rounded-xl ml-3 !text-gray-500 shadow-2xl`}>
                        <BsSearch />
                    </Button>
                    <Button className={`flex text-xl items-center bg-white px-3 rounded-xl ml-3 !text-gray-500 shadow-2xl`}>
                        <AiFillBell />
                    </Button>
                    <Button className={`flex text-xl items-center bg-white px-3 rounded-xl ml-3 !text-gray-500 shadow-2xl `}>
                        <AiFillSetting />
                    </Button>
                </div>
            </div>
            <div className={"px-10 py-5 flex flex-col"}>
                <div className="w-full flex justify-between items-center">
                    <div>
                        <span className="text-secondary font-[500] text-2xl">New documents</span>
                    </div>
                    <div>
                        <Button onClick={() => router.push("/add")} className="px-5 py-3 !normal-case" variant={"contained"}>+&nbsp;Add
                            new</Button>
                    </div>
                </div>
                <div className={`mt-10`}>
                    <div className="grid grid-cols-3 gap-3">
                        {docs.slice(0, 6).map(((i, index) => {
                            return <div key={index} className="w-full bg-primary rounded-2xl">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div
                                            className="p-3 rounded-xl bg-tint-alt bg-opacity-20 text-2xl text-tint-alt">
                                            <BiSolidFolder />
                                        </div>
                                        <div className={"flex flex-1 flex-col ml-2"}>
                                            <span className="text-lg font-semibold">{i.title}</span>
                                            <span className="text-sm text-gray-500">Sep 25, 2022, 6:30 PM</span>
                                        </div>
                                        <span>
                                            <Button variant={"text"}>
                                                <TbDots />
                                            </Button>
                                        </span>
                                    </div>
                                    <div className={"mt-3 flex"}>
                                        {
                                            i.tags.map((tag: any, index: number) => {
                                                return <div
                                                    key={index}
                                                    className="mr-2 p-2 w-fit rounded-md font-bold bg-green-700 bg-opacity-20 text-sm text-green-950">
                                                    {tag.name}
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        }))}
                    </div>
                </div>
                <div className={"mt-10"}>
                    <span className="text-secondary font-[500] text-2xl">Recent documents</span>
                </div>
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
                                    docs.slice(0, 6).map((i, index) => {
                                        return <tr key={index}>
                                            <td className={"p-4 flex items-center gap-3"}>
                                                <div
                                                    className="mr-2 p-3 rounded-xl bg-red-800 bg-opacity-20 text-2xl text-red-800">
                                                    <BsFilePdf />
                                                </div>
                                                {i.title}
                                            </td>
                                            <td className={"p-4"}>{i.name}</td>
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
