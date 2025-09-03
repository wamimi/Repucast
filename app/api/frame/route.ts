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

  if (!fid || !walletAddress) {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: "Try Again",
            action: "post",
          },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/error`,
          aspectRatio: "1:1",
        },
        postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
      }),
    );
  }

  // Calculate reputation score
  const reputationScore = await calculateReputationScore(fid, walletAddress);

  // Determine if user qualifies for badge
  const qualifiesForBadge = reputationScore >= 70;

  const buttons = qualifiesForBadge
    ? [
        {
          label: "Mint Reputation Badge",
          action: "tx" as const,
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/mint`,
          postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/success`,
        },
        {
          label: "Share My Score",
          action: "post" as const,
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/share`,
        },
      ]
    : [
        {
          label: "Learn How to Improve",
          action: "post" as const,
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/improve`,
        },
        {
          label: "Check Again",
          action: "post" as const,
        },
      ];

  return new NextResponse(
    getFrameHtmlResponse({
      buttons,
      image: {
        src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/score?score=${reputationScore}&qualified=${qualifiesForBadge}`,
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
