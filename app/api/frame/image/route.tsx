import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0052FF",
          backgroundImage: "linear-gradient(135deg, #0052FF 0%, #6366F1 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              marginBottom: "20px",
              background: "linear-gradient(45deg, #FFFFFF, #E0E7FF)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            RepuCast
          </h1>
          <p
            style={{
              fontSize: "32px",
              opacity: 0.9,
              marginBottom: "40px",
            }}
          >
            On-Chain Reputation Scoring
          </p>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              padding: "30px",
              borderRadius: "20px",
              backdropFilter: "blur(10px)",
            }}
          >
            <p style={{ fontSize: "24px", margin: 0 }}>
              🛡️ Combat Bots & Sybil Attacks
            </p>
            <p style={{ fontSize: "20px", margin: "10px 0 0 0", opacity: 0.8 }}>
              Click below to check your reputation
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 600,
      height: 600,
    },
  );
}
