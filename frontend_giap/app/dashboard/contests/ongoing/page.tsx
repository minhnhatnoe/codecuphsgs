"use client"; 

import { contestInfoI } from "@/backend_api/contests"
import { useState, useEffect, useContext } from "react"
import Link from "next/link"
import { displayMili } from "../helper"
import { contestsInfoContext } from "../layout";
import assert from "assert";

function OngoingContest({
    contestInfo
}: { 
    contestInfo: contestInfoI
}): JSX.Element {
    const [beforeEnd, setBeforeEnd] = useState(displayMili(contestInfo.endDate - (new Date())));
    useEffect(() => { 
        const interval = setInterval(() => {
            setBeforeEnd(displayMili(contestInfo.endDate - new Date()));
        }, 1000);
    
        return () => clearInterval(interval);
    })

    return (
        <div className="min-w-0 flex gap-x-4">
            <Link href={`/dashboard/contests/${contestInfo.contestId}`}
                className="text-sm underline font-semibold leading-6 text-gray-900">
                {contestInfo.contestName}
            </Link>
            <p>End in {beforeEnd}</p>
        </div>
    )
}

export default function OngoingContests() { 
    const contestsInfo = useContext(contestsInfoContext)
    try {
        assert (contestsInfo != null); 
        return (
            <div className="w-full">
                {/* <h2>Ongoing Contests</h2> */}
                <ul className={`divide-y divide-gray-100`}>
                    {contestsInfo.map((contestInfo) => { 
                        if(contestInfo.startDate > new Date() ||
                            contestInfo.endDate < new Date()) { 
                            return <></>; 
                        }
                        else { 
                            return <OngoingContest contestInfo={contestInfo}></OngoingContest>; 
                        }
                    })}
                </ul>
            </div>
        )
    }
    catch (error) { 
        console.log(contestsInfo)
        console.log(error); 
        return <>Loading...</>; 
    }
}

