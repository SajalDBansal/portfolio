"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import RetroWindow from "../retro-window";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function Resume() {
    const pdfURL = "/api/resume";

    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>();

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.offsetWidth);
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    return (
        <section id="about" className="py-10 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl sm:text-5xl font-bold mb-10 font-mono">
                    Resume
                </h2>

                {/* Download Resume & project button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-4 mb-12"
                >
                    <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={pdfURL}
                        download={"resume_sajaldbansal.pdf"}
                        className="border-4 border-black rounded-xl dark:border-white px-8 py-4 font-black text-lg bg-white dark:bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all inline-flex items-center gap-2"
                    >
                        <Download className="w-6 h-6 font-bold" />
                        Download Resume
                    </motion.a>
                </motion.div>

                <RetroWindow filename="resume.txt" className="m-auto">
                    <div ref={containerRef} className="p-6 w-full overflow-x-auto flex justify-center">
                        <Document
                            file={pdfURL}
                            loading={<p>Loading resume...</p>}
                            error={<p>Failed to load PDF</p>}
                        >
                            <Page
                                pageNumber={1}
                                width={Math.min(width ?? 800, 900)}
                                devicePixelRatio={window.devicePixelRatio}
                                renderTextLayer
                                renderAnnotationLayer
                            />
                        </Document>
                    </div>
                </RetroWindow>
            </div>
        </section>
    )

}