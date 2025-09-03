import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { calculateReputationScore } from "@/lib/reputation";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY,
  });

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const fid = message?.interactor?.fid;
  const walletAddress = message?.interactor?.verified_accounts?.[0];
  const username = message?.interactor?.username || "anon";

  if (!fid || !walletAddress) {
    return new NextResponse("User data not found", { status: 400 });
  }

  // Recalculate score for sharing
  const reputationScore = await calculateReputationScore(fid, walletAddress);

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "Check Your Reputation",
          action: "post",
        },
        {
          label: "Learn About RepuCast",
          action: "link",
          target: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        },
      ],
      image: {
        src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/shared-score?score=${reputationScore}&username=${username}`,
        aspectRatio: "1:1",
      },
      postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
