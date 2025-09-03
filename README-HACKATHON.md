# RepuCast - Hackathon MVP 🏆

## 🎯 Project Overview

**RepuCast** is a Farcaster Mini App that combats bots and Sybil attacks by providing verifiable on-chain reputation scores. Users can check their reputation and mint badges to prove their authenticity.

## 🚀 Quick Start

### 1. Environment Setup
```bash
cp .env.example .env.local
# Fill in the required API keys
```

### 2. Install Dependencies
```bash
pnpm install  # Using pnpm as preferred package manager
```

### 3. Run Development Server
```bash
pnpm dev
```

### 4. Configure Farcaster Frame
- Deploy to Vercel/production
- Frame URL: `https://your-domain.vercel.app/frame`
- Add to Farcaster via the manifest at `/.well-known/farcaster.json`

## 🏗️ Architecture

### Core Components
- **Frame Interface** (`/app/frame/`) - Entry point for users
- **Reputation Engine** (`/lib/reputation.ts`) - Scoring algorithm
- **API Routes** (`/app/api/frame/`) - Frame logic and minting
- **Smart Contract** (`/contracts/`) - Reputation badge NFTs

### User Flow
1. **Connect**: User clicks "Check My Reputation" in Farcaster
2. **Analyze**: System analyzes Farcaster activity + Base transactions  
3. **Score**: Generates composite reputation score (0-100)
4. **Mint**: Users with 70+ score can mint reputation badge (gasless)
5. **Share**: Viral sharing mechanism back to Farcaster

## 🎨 Hackathon Track Alignment

### 🥇 Primary: Best Mini App
- **Full Farcaster integration** with Mini App SDK
- **Native Frame experience** with tx actions
- **Viral sharing mechanics** for growth

### 🥈 Secondary: Best Use of OnchainKit  
- **Transaction components** for NFT minting
- **Identity components** for user profiles
- **Wallet integration** with automatic connection

### 🥉 Tertiary: Best Use of Paymaster
- **Gasless minting** for reputation badges
- **Frictionless UX** - no gas fees for users
- **Sponsored transactions** for better adoption

## 🛠️ Technical Stack

- **Frontend**: Next.js + OnchainKit + MiniKit
- **Backend**: Next.js API routes + Frame SDK
- **Blockchain**: Base (low fees, fast transactions)
- **Smart Contracts**: Solidity + ERC-721 (Soulbound)
- **Data Sources**: Farcaster Hubs + Base blockchain

## 🔮 Future Enhancements

### Production Features
- **Advanced Scoring**: ML-based bot detection
- **Cross-chain Data**: Multi-network reputation
- **Creator Tools**: Dashboard for audience analysis
- **API Monetization**: Pay-per-query reputation checking

### Scaling Strategy
- **Network Effects**: Viral sharing drives adoption
- **Creator Economy**: Premium tools for creators
- **Brand Partnerships**: Anti-Sybil services for airdrops

## 📊 Value Proposition

### For Users
- ✅ Build portable on-chain reputation
- ✅ Prove humanity without KYC
- ✅ Access to reputation-gated opportunities

### For Creators  
- ✅ Filter out bots from audience
- ✅ Run authentic community campaigns
- ✅ Reward genuine engagement

### For Brands
- ✅ Anti-Sybil protection for airdrops
- ✅ Identify authentic micro-influencers
- ✅ Programmatic reputation queries

## 🎭 Demo Script

1. **Show the Problem**: "Farcaster has bot issues..."
2. **Introduce Solution**: "RepuCast provides verifiable reputation"
3. **Live Demo**: Check reputation in Frame interface
4. **Show Results**: Dynamic scoring with visual feedback
5. **Mint Badge**: Gasless NFT minting for qualified users
6. **Viral Loop**: Share score back to Farcaster

## 🏁 Deployment Checklist

- [x] ✅ Frame manifest configured
- [x] ✅ API routes implemented  
- [x] ✅ Reputation scoring logic
- [x] ✅ Image generation for Frames
- [x] ✅ NFT minting functionality
- [x] ✅ Social sharing mechanism
- [ ] 🚀 Deploy to production
- [ ] 🚀 Configure environment variables
- [ ] 🚀 Deploy smart contract to Base
- [ ] 🚀 Test in Farcaster client

---

**Built for the Base + Farcaster Hackathon** 🔵💜

*Combating bots, one reputation score at a time.*
