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
          backgroundColor: "#10B981",
          backgroundImage: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
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
            backgroundColor: "rgba(0,0,0,0.1)",
            padding: "50px",
            borderRadius: "30px",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              fontSize: "100px",
              marginBottom: "20px",
            }}
          >
            🎉
          </div>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              marginBottom: "20px",
              margin: 0,
            }}
          >
            Badge Minted!
          </h1>
          <p
            style={{
              fontSize: "28px",
              marginBottom: "20px",
              opacity: 0.9,
            }}
          >
            Your Reputation Badge has been
          </p>
          <p
            style={{
              fontSize: "28px",
              marginBottom: "30px",
              opacity: 0.9,
            }}
          >
            successfully minted to your wallet
          </p>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              padding: "20px 30px",
              borderRadius: "15px",
              fontSize: "22px",
              fontWeight: "600",
            }}
          >
            🏆 Verified Human Status Achieved
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
