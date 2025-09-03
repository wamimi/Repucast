import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY,
  });

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "Share My Badge",
          action: "post",
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/share`,
        },
        {
          label: "View on OpenSea",
          action: "link",
          target: "https://opensea.io/collection/repucast-badges",
        },
      ],
      image: {
        src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/badge-success`,
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
