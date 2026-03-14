"use client";

import dynamic from "next/dynamic";

const Resume = dynamic(
    () => import("@/components/page-sections/Resume"),
    { ssr: false }
);

export default function ResumeClient() {
    return <Resume />;
}