import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest, res: Response) {
    console.log(req.body);


    return NextResponse.json(req.body);
}