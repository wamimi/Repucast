// Simple reputation scoring algorithm for MVP
// In production, this would be much more sophisticated

interface FarcasterProfile {
  fid: number;
  follower_count: number;
  following_count: number;
  cast_count: number;
  active_status: string;
}

export async function calculateReputationScore(
  fid: number,
  walletAddress: string
): Promise<number> {
  try {
    // Fetch Farcaster social data
    const socialScore = await calculateSocialScore(fid);
    
    // Fetch on-chain activity data
    const onChainScore = await calculateOnChainScore(walletAddress);
    
    // Combine scores with weighting
    const finalScore = Math.min(100, Math.round(
      socialScore * 0.6 + onChainScore * 0.4
    ));
    
    return finalScore;
  } catch (error) {
    console.error("Error calculating reputation score:", error);
    return 0;
  }
}

async function calculateSocialScore(fid: number): Promise<number> {
  try {
    // In a real implementation, we'd call Neynar API or Farcaster Hubs
    // For MVP, we'll simulate with some logic based on FID
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Basic scoring based on FID (earlier users tend to be more authentic)
    let score = 0;
    
    // Early adopter bonus (lower FID = earlier user)
    if (fid < 1000) score += 40;
    else if (fid < 10000) score += 30;
    else if (fid < 100000) score += 20;
    else score += 10;
    
    // Simulate engagement metrics (in real app, fetch from API)
    const simulatedFollowers = Math.floor(Math.random() * 1000) + fid % 500;
    const simulatedCasts = Math.floor(Math.random() * 500) + fid % 200;
    
    // Follower score (capped to prevent farming)
    if (simulatedFollowers > 100) score += 15;
    else if (simulatedFollowers > 50) score += 10;
    else if (simulatedFollowers > 10) score += 5;
    
    // Activity score
    if (simulatedCasts > 100) score += 15;
    else if (simulatedCasts > 50) score += 10;
    else if (simulatedCasts > 10) score += 5;
    
    return Math.min(60, score);
  } catch (error) {
    console.error("Error calculating social score:", error);
    return 0;
  }
}

async function calculateOnChainScore(walletAddress: string): Promise<number> {
  try {
    // In a real implementation, we'd analyze Base blockchain transactions
    // For MVP, we'll simulate with basic checks
    
    let score = 0;
    
    // Simulate wallet age (check first transaction)
    const walletAge = Math.random() * 365; // days
    if (walletAge > 180) score += 15;
    else if (walletAge > 90) score += 10;
    else if (walletAge > 30) score += 5;
    
    // Simulate transaction count
    const txCount = Math.floor(Math.random() * 100);
    if (txCount > 50) score += 15;
    else if (txCount > 20) score += 10;
    else if (txCount > 5) score += 5;
    
    // Simulate DeFi interactions
    const defiInteractions = Math.random() > 0.7;
    if (defiInteractions) score += 10;
    
    return Math.min(40, score);
  } catch (error) {
    console.error("Error calculating on-chain score:", error);
    return 0;
  }
}

export function getScoreDescription(score: number): string {
  if (score >= 90) return "Legendary Human 🏆";
  if (score >= 80) return "Verified Human ✅";
  if (score >= 70) return "Likely Human 👤";
  if (score >= 50) return "Questionable 🤔";
  if (score >= 30) return "Suspicious 🚨";
  return "Likely Bot 🤖";
}
