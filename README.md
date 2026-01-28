# ShieldPay

**Privacy-Preserving Payroll & B2B Payments on Aleo**

> Prove everything. Reveal nothing. Pay everyone.

ShieldPay is a privacy-first payroll platform built on [Aleo](https://aleo.org), enabling companies to pay employees and contractors while keeping individual salaries completely confidential. Using zero-knowledge proofs, employers can prove compliance to auditors without exposing sensitive compensation data.

---

## The Problem

Traditional payroll systems expose sensitive data at multiple points:
- **Blockchain payroll** puts every salary on a public ledger forever
- **Employees** can see each other's compensation (causing workplace tension)
- **Audits** require exposing individual salary data to third parties
- **Income verification** for loans/rentals requires sharing exact salary figures

**Privacy shouldn't be a luxury. It should be the default.**

---

## The Solution

ShieldPay leverages Aleo's zero-knowledge architecture to enable:

| Feature | How It Works |
|---------|--------------|
| **Private Batch Payments** | 1 transaction pays 50 employees. Each sees only their own payment. |
| **ZK Compliance Proofs** | Prove "total payroll is $X-$Y" without revealing individual salaries |
| **Income Verification** | Employees prove "I earn ≥ $5K/month" without showing exact amount |
| **AI Assistant** | Natural language payroll management ("Pay the engineering team") |

---

## Key Features

### For Employers
- Pay employees/contractors with a single private transaction
- Individual salaries hidden from everyone (including other employees)
- Generate compliance proofs for auditors and investors
- AI-powered payroll assistant for natural language commands
- Recurring payment scheduling
- Multi-sig approval workflows

### For Employees
- View only your own payment history
- Generate proof of income for loans, rentals, or background checks
- Prove employment duration without revealing salary
- Privacy-preserving pay stubs

### For Auditors
- Verify total payroll spend is within a declared range
- Confirm no single payment exceeded a threshold
- Validate all payments went to verified wallets
- **All without seeing individual salaries**

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│            Next.js + Wallet Integration + AI Chat           │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                       API LAYER                             │
│         Intent Parsing │ Payment Orchestration              │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                   ALEO SMART CONTRACTS                      │
│    Private Payments │ ZK Proofs │ Compliance Verification   │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Blockchain** | Aleo (L1 with programmable privacy) |
| **Smart Contracts** | Leo |
| **Frontend** | React, JavaScript|
| **Wallet** | Leo Wallet / Aleo Wallet Adapter |
| **AI** | LLM for natural language processing |

---

## Project Structure

```
shieldpay/
├── contracts/           # Leo smart contracts
│   ├── src/
│   │   └── main.leo    # Core payment contract
│   ├── inputs/         # Test inputs
│   └── build/          # Compiled outputs
├── frontend/           # Next.js application
│   ├── app/            # App router pages
│   ├── components/     # React components
│   ├── lib/            # Utilities and Aleo integration
│   └── public/         # Static assets
├── docs/               # Documentation
│   ├── architecture.md
│   ├── privacy-model.md
│   └── api.md
└── README.md
```

---

## Privacy Model

### What's Hidden
- Individual payment amounts
- Employee salary data
- Payment recipient mapping (who received what)
- Exact payment timestamps

### What's Provable (via ZK)
- Total payroll spend is within range X-Y
- No single payment exceeded threshold Z
- All recipients are verified wallet addresses
- Payment count matches employee count
- Employee earns above/below a threshold

### How It Works

1. **Encrypted Records**: Each payment is stored as an encrypted record on Aleo, visible only to sender and recipient
2. **Commitment Scheme**: Employer commits to total payroll, individual proofs sum to commitment
3. **Selective Disclosure**: Employees can generate proofs about their income without revealing exact figures
4. **Auditor Proofs**: Range proofs and aggregate proofs for compliance without data exposure

---

## Roadmap: 10-Wave Development Plan

ShieldPay is being built as part of the [Aleo Privacy Buildathon](https://app.akindo.io) — a 3-month program with 10 progressive waves. Each wave is 14 days (10 build days + 4 evaluation days).

### Phase 1: Core Infrastructure (Waves 1-3)

#### Wave 1: First Private Payment (Jan 20 - Feb 3)
**Goal**: Prove the core ZK payment concept works

| Deliverable | Status |
|-------------|--------|
| Leo contract: single private payment | ✅ |
| Basic web UI (connect wallet, send payment) | ✅ |
| Recipient sees only their payment | ✅ |
| Testnet deployment | ✅ |
| GitHub repo with README | ✅ |

**Privacy Demonstrated**: Payment amounts hidden from public

---

#### Wave 2: Employer Dashboard (Feb 3 - Feb 17)
**Goal**: Multi-recipient payments and employee management

| Deliverable | Status |
|-------------|--------|
| Add/manage employee records (encrypted) | ⬜ |
| Batch payment to multiple recipients (3-5) | ⬜ |
| Payment confirmation flow | ⬜ |
| Improved UI/UX | ⬜ |

**Privacy Demonstrated**: Individual salaries hidden from each other

---

#### Wave 3: Employee Portal (Feb 17 - Mar 3)
**Goal**: Employee-facing features

| Deliverable | Status |
|-------------|--------|
| Employee login/dashboard | ⬜ |
| View personal payment history | ⬜ |
| Download payment receipts | ⬜ |
| Mobile-responsive design | ⬜ |

**Privacy Demonstrated**: Employees see only their own data

---

### Phase 2: ZK Proofs & Verification (Waves 4-6)

#### Wave 4: Compliance Proofs (Mar 3 - Mar 17)
**Goal**: Enterprise-ready compliance features

| Deliverable | Status |
|-------------|--------|
| ZK proof: "total payroll in range X-Y" | ⬜ |
| ZK proof: "no payment exceeded $X" | ⬜ |
| Auditor verification interface | ⬜ |
| Proof generation UI | ⬜ |

**Privacy Demonstrated**: Prove compliance without revealing individual amounts

---

#### Wave 5: Income Verification (Mar 17 - Mar 31)
**Goal**: Employee-generated proofs for third parties

| Deliverable | Status |
|-------------|--------|
| Employee generates proof of income | ⬜ |
| "I earn ≥ $X/month" proof | ⬜ |
| "Employed for ≥ Y months" proof | ⬜ |
| Shareable verification links | ⬜ |

**Privacy Demonstrated**: Prove income without revealing exact salary

---

#### Wave 6: Recurring & Scheduling (Mar 31 - Apr 14)
**Goal**: Automated payment workflows

| Deliverable | Status |
|-------------|--------|
| Recurring payment setup | ⬜ |
| Payment templates by department | ⬜ |
| Scheduled execution | ⬜ |
| Email/notification system | ⬜ |

**Privacy Demonstrated**: Automated private payments

---

### Phase 3: AI Integration (Waves 7-8)

#### Wave 7: AI Assistant v1 (Apr 14 - Apr 28)
**Goal**: Natural language payment interface

| Deliverable | Status |
|-------------|--------|
| Natural language payment commands | ⬜ |
| "Pay engineering team" → executes | ⬜ |
| Confirmation flows with AI | ⬜ |
| Basic intent parsing | ⬜ |

**Privacy Demonstrated**: AI triggers ZK payments without seeing amounts

---

#### Wave 8: AI Analytics (Apr 28 - May 12)
**Goal**: Privacy-preserving insights

| Deliverable | Status |
|-------------|--------|
| Aggregated insights dashboard | ⬜ |
| Department-level trends (not individual) | ⬜ |
| Cash flow forecasting | ⬜ |
| Anomaly flagging via ZK queries | ⬜ |

**Privacy Demonstrated**: Analytics without exposing individual data

---

### Phase 4: Enterprise & Mainnet (Waves 9-10)

#### Wave 9: Enterprise Features (May 12 - May 26)
**Goal**: Production-ready enterprise features

| Deliverable | Status |
|-------------|--------|
| Multi-sig approval workflows | ⬜ |
| Role-based access control | ⬜ |
| DAO treasury integration | ⬜ |
| API documentation | ⬜ |

**Privacy Demonstrated**: Enterprise-grade privacy controls

---

#### Wave 10: Mainnet Launch (May 26 - Jun 9)
**Goal**: Ship to production

| Deliverable | Status |
|-------------|--------|
| Mainnet deployment | ⬜ |
| Security review/hardening | ⬜ |
| Full documentation | ⬜ |
| Demo video | ⬜ |
| Landing page | ⬜ |

**Privacy Demonstrated**: Production-ready private payroll

---

### Wave Submission Checklist

Each wave submission includes:

1. **Project Overview**: Name, description, problem solved, PMF/GTM plan
2. **Working Demo**: Deployed on Aleo Testnet (or Mainnet for Wave 10)
3. **Technical Documentation**: GitHub repo with README, architecture overview
4. **Team Information**: Member names, Discord handles, Aleo wallet addresses
5. **Progress Changelog** (Wave 2+): What changed, feedback incorporated, next goals

---

### Judging Criteria

| Criteria | Weight | Our Approach |
|----------|--------|--------------|
| **Privacy Usage** | 40% | Multiple ZK proofs: payments, compliance, income verification |
| **Technical Implementation** | 20% | Leo contracts + AI integration |
| **User Experience** | 20% | AI chat interface, clean dashboard |
| **Practicality** | 10% | Real demand from DAOs, crypto companies, freelancers |
| **Novelty** | 10% | AI + ZK payroll is unique in the ecosystem |

---

## Getting Started

### Prerequisites
- [Leo](https://developer.aleo.org/leo/installation) (Aleo's programming language)
- [Node.js](https://nodejs.org/) v18+
- [Aleo Wallet](https://www.leo.app/) browser extension

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/shieldpay.git
cd shieldpay

# Install Leo (if not installed)
curl -sSf https://raw.githubusercontent.com/AleoHQ/leo/mainnet/install.sh | sh

# Build the smart contracts
cd contracts
leo build

# Install frontend dependencies
cd ../frontend
npm install

# Start development server
npm run dev
```

### Deploy to Testnet

```bash
cd contracts
leo deploy --network testnet --broadcast --yes --consensus-version 2
```

### Live Deployment (Testnet)

| Field | Value |
|-------|-------|
| **Program** | `shieldpay.aleo` |
| **Network** | Aleo Testnet |
| **Transaction ID** | `at1usjzgsqgu74hytmqjtaq8rt590pvc9qm209d3czezq5cqtsrpvgqq4cez8` |
| **Explorer** | [View on Aleo Explorer](https://explorer.aleo.org/program/shieldpay.aleo) |

---

## Usage

### Employer: Send Private Payment

```typescript
// Connect wallet and send private payment
const payment = await shieldpay.pay({
  recipient: "aleo1...",
  amount: 5000_000000n, // 5000 tokens (6 decimals)
  memo: "January salary"
});
```

### Employer: Generate Compliance Proof

```typescript
// Generate proof for auditors
const proof = await shieldpay.generateComplianceProof({
  startDate: "2026-01-01",
  endDate: "2026-03-31",
  proofType: "total_in_range",
  range: { min: 500000, max: 600000 }
});
```

### Employee: Generate Income Proof

```typescript
// Prove income for loan application
const incomeProof = await shieldpay.generateIncomeProof({
  proofType: "minimum_income",
  threshold: 5000,
  period: "monthly"
});
```

---

## Smart Contract Overview

### Core Functions

| Function | Description |
|----------|-------------|
| `pay_private` | Send private payment to a single recipient |
| `pay_batch` | Send payments to multiple recipients |
| `generate_compliance_proof` | Create ZK proof for auditors |
| `verify_compliance` | Verify a compliance proof |
| `generate_income_proof` | Employee generates proof of income |
| `verify_income` | Third party verifies income proof |

### Records

```leo
record PaymentRecord {
    owner: address,
    amount: u64,
    sender: address,
    timestamp: u64,
    memo: field,
}

record EmployeeRecord {
    owner: address,      // employer
    employee: address,
    salary: u64,         // encrypted, only visible to owner
    start_date: u64,
}
```

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Security

ShieldPay takes security seriously. If you discover a vulnerability, please:
1. **Do not** open a public issue
2. Email us at security@shieldpay.xyz (placeholder)
3. Allow 48 hours for initial response

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Aleo](https://aleo.org) - Privacy-first blockchain infrastructure
- [AKINDO](https://akindo.io) - Buildathon platform and support
- Zero-knowledge cryptography researchers and pioneers

---

## Links

- [Aleo Developer Docs](https://developer.aleo.org)
- [Leo Language Documentation](https://developer.aleo.org/leo)
- [Leo Playground](https://play.leo-lang.org)
- [Aleo Testnet Faucet](https://faucet.aleo.org)

---

<p align="center">
  <strong>ShieldPay</strong> — Where Privacy Meets Payroll
</p>
