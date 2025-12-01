# MemeCore 개발 가이드 요약

## 📖 공식 문서

- **Quickstart 가이드**: https://docs.memecore.com/developer-guide/quickstart

## 🚀 시작하기

### 1. 기본 환경 설정 (Basic Environment Setup)

MemeCore 네트워크 개발을 위한 기본 환경을 설정합니다.

### 2. 지갑에 MemeCore 네트워크 추가

개발을 위해 지갑에 MemeCore 네트워크를 추가해야 합니다.

### 3. 테스트 토큰 수령 (Faucet)

테스트 환경에서 사용할 토큰을 Faucet을 통해 받을 수 있습니다.

**Insectarium Testnet Faucet**: https://faucet.memecore.com/insectarium

1. 위 링크로 이동
2. 지갑 주소 입력
3. 테스트 토큰 요청
4. 지갑에서 토큰 수령 확인

## 🔗 네트워크 정보

### MemeCore 테스트넷 (Insectarium Testnet)

#### 네트워크 설정

- **네트워크 이름**: Insectarium Testnet
- **체인 ID**: 43522
- **RPC URL**: https://rpc.insectarium.memecore.net
- **WebSocket**: wss://ws.insectarium.memecore.net
- **블록 탐색기**: (TBD)
- **Faucet**: https://faucet.memecore.com/insectarium
- **네이티브 토큰 심볼**: M

#### 지갑에 네트워크 추가

프론트엔드에서 자동으로 추가되거나, 수동으로 다음 정보를 사용하여 추가할 수 있습니다:

```javascript
{
  chainId: 43522,
  chainName: 'Insectarium Testnet',
  nativeCurrency: {
    name: 'MemeCore',
    symbol: 'M',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.insectarium.memecore.net'],
  blockExplorerUrls: ['https://explorer.insectarium.memecore.net/'],
}
```

### MemeCore 네트워크

- MemeCore는 밈(Meme) 문화를 기반으로 한 블록체인 생태계입니다.
- Proof of Meme (PoM) 컨센서스 메커니즘을 사용합니다.
- MRC-20 토큰 표준을 지원합니다.

## 💰 토큰 관련

### MRC-20 Meme 토큰

- MRC-20은 MemeCore 네트워크의 토큰 표준입니다.
- 밈 토큰 민팅이 가능합니다.

### Stablecoin 브리징

- 다른 체인에서 MemeCore로 스테이블코인을 브리징할 수 있습니다.

## 📝 스마트 컨트랙트

### 배포 (Deploying Smart Contracts)

- MemeCore 네트워크에 스마트 컨트랙트를 배포할 수 있습니다.
- 개발 가이드에 배포 방법이 상세히 설명되어 있습니다.

## 🔐 지갑 연결

### Connect to MemeCore

- Web3 지갑을 통해 MemeCore 네트워크에 연결할 수 있습니다.
- 지갑 설정 방법은 개발 가이드에 포함되어 있습니다.

## 🎁 에어드롭

### Claim $M Airdrop

- $M 토큰 에어드롭을 청구할 수 있습니다.

## 📚 주요 개념

### What is MemeCore?

MemeCore는 밈 문화를 기반으로 한 블록체인 플랫폼입니다.

### What is Meme 2.0?

Meme 2.0은 MemeCore의 핵심 개념으로, 밈 토큰의 새로운 패러다임을 제시합니다.

### Proof of Meme (PoM)

MemeCore의 컨센서스 메커니즘으로, 밈 문화 참여를 기반으로 합니다.

## 🛠 개발 팁

1. **테스트 환경 활용**: Faucet을 통해 테스트 토큰을 받아 개발을 진행하세요.
2. **네트워크 설정**: 지갑에 MemeCore 네트워크를 올바르게 추가했는지 확인하세요.
3. **스마트 컨트랙트**: 배포 전에 테스트넷에서 충분히 테스트하세요.

## 🔗 관련 링크

- [MemeCore 공식 문서](https://docs.memecore.com)
- [MemeCore 개발자 가이드](https://docs.memecore.com/developer-guide/quickstart)

## 📝 참고사항

- MemeCore는 커뮤니티 중심의 확장 구조를 지향합니다.
- 밈 관련 프로젝트와의 협업을 통해 생태계를 확장하고 있습니다.
- 우수 프로젝트에 최대 10만 달러의 지원금을 제공하는 프로그램이 있습니다.
