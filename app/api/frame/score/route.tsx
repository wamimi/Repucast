import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getScoreDescription } from "@/lib/reputation";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const score = parseInt(searchParams.get("score") || "0");
  const qualified = searchParams.get("qualified") === "true";

  const description = getScoreDescription(score);
  
  // Color based on score
  let bgColor = "#EF4444"; // Red for low scores
  let accentColor = "#FCA5A5";
  
  if (score >= 70) {
    bgColor = "#10B981"; // Green for high scores
    accentColor = "#6EE7B7";
  } else if (score >= 50) {
    bgColor = "#F59E0B"; // Yellow for medium scores  
    accentColor = "#FCD34D";
  }

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
          backgroundColor: bgColor,
          backgroundImage: `linear-gradient(135deg, ${bgColor} 0%, ${accentColor} 100%)`,
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
            padding: "40px",
            borderRadius: "30px",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              fontSize: "120px",
              fontWeight: "bold",
              marginBottom: "20px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {score}
          </div>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "10px",
              margin: 0,
            }}
          >
            Reputation Score
          </h2>
          <p
            style={{
              fontSize: "28px",
              marginBottom: "20px",
              opacity: 0.9,
            }}
          >
            {description}
          </p>
          {qualified && (
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: "15px 25px",
                borderRadius: "15px",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              🎉 Eligible for Reputation Badge!
            </div>
          )}
          {!qualified && (
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: "15px 25px",
                borderRadius: "15px",
                fontSize: "18px",
              }}
            >
              Need 70+ to qualify for badge
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 600,
      height: 600,
    },
  );
}
