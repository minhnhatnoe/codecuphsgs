"use client"; 

import { getUserInfo } from "@/session_storage_api/api";
import { redirect } from "next/navigation";

export default function DashboardPage() { 
    let userInfo = getUserInfo(); 
    if(!userInfo) { 
        redirect("/authentication/login"); 
    }
    return <div>Home page</div>; 
}