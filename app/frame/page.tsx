import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import type { Metadata } from "next";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Check My Reputation",
      action: "post",
    },
  ],
  image: {
    src: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/image`,
    aspectRatio: "1:1",
  },
  postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: "RepuCast - On-Chain Reputation",
  description: "Check your on-chain reputation score and prove you're human",
  openGraph: {
    title: "RepuCast - On-Chain Reputation",
    description: "Check your on-chain reputation score and prove you're human",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/image`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Frame() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold">RepuCast</h1>
        <p className="text-xl">On-Chain Reputation for Authentic Users</p>
        <p className="text-lg opacity-90">
          Combat bots and Sybil attacks with verifiable reputation scores
        </p>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mt-8">
          <p className="text-sm">
            Click "Check My Reputation in your Farcaster client to get started
          </p>
        </div>
      </div>
    </div>
  );
}
