import {
  FrameRequest,
  getFrameMessage,
  FrameTransactionResponse,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";

// Simple NFT contract ABI for minting
const REPUTATION_BADGE_ABI = [
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

// For MVP, we'll use a simple contract address (would deploy actual contract)
const REPUTATION_BADGE_CONTRACT = "0x1234567890123456789012345678901234567890" as `0x${string}`;

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY,
  });

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const walletAddress = message?.address;
  const fid = message?.interactor?.fid;

  if (!walletAddress || !fid) {
    return new NextResponse("No wallet address found", { status: 400 });
  }

  // Generate unique token ID based on FID
  const tokenId = BigInt(1000000 + fid);

  const data = encodeFunctionData({
    abi: REPUTATION_BADGE_ABI,
    functionName: "mint",
    args: [walletAddress as `0x${string}`, tokenId],
  });

  const txData: FrameTransactionResponse = {
    chainId: "eip155:8453", // Base chain ID
    method: "eth_sendTransaction",
    params: {
      abi: REPUTATION_BADGE_ABI,
      to: REPUTATION_BADGE_CONTRACT,
      data,
      value: "0", // Free mint
    },
  };

  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
