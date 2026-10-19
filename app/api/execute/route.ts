import { NextResponse } from "next/server";
import { executeCode, ExecutionRequest } from "@/lib/services/code-runner";

export async function POST(req: Request) {
  try {
    const body: ExecutionRequest = await req.json();

    if (!body.code || !body.language || !body.problemId) {
      return NextResponse.json(
        { error: "Missing required fields: code, language, problemId" },
        { status: 400 }
      );
    }

    const result = await executeCode(body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Execution request failed" },
      { status: 500 }
    );
  }
}
