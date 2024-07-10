"use client";

import React from "react";
import Sidebar from "@/Components/feature/Sidebar/Sidebar";

export default function App({children,className,...props}:React.HTMLProps<HTMLDivElement>) {
    return <div {...props} className={`${className} w-full h-screen flex`}>
        <Sidebar/>
        <div className="flex-1">
            {children}
        </div>
    </div>
}