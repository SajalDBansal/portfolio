export async function GET() {
    const fileId = process.env.RESUME_FILE_ID;

    const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    const res = await fetch(driveUrl);

    const buffer = await res.arrayBuffer();

    return new Response(buffer, {
        headers: {
            "Content-Type": "application/pdf",
        },
    });
}