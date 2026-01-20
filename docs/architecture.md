# ShieldPay Architecture

## Overview

ShieldPay is a privacy-preserving payroll platform built on Aleo. This document outlines the technical architecture and design decisions.

---

## System Components

### 1. Aleo Smart Contracts (Leo)

The core privacy logic lives on-chain:

```
contracts/
├── src/
│   ├── main.leo          # Entry point, imports all modules
│   ├── payment.leo       # Private payment logic
│   ├── employee.leo      # Employee record management
│   ├── compliance.leo    # ZK proof generation for auditors
│   └── income.leo        # Employee income verification
├── program.json          # Project configuration
└── inputs/               # Test inputs
```

#### Key Design Decisions

**Why separate modules?**
- Separation of concerns
- Easier testing and auditing
- Modular upgrades

**Record-based ownership**
- Aleo uses records (like UTXOs) for privacy
- Each payment creates a record owned by the recipient
- Only the owner can view/spend their records

### 2. Frontend (Next.js)

```
frontend/
├── app/
│   ├── page.tsx              # Landing page
│   ├── employer/
│   │   ├── dashboard/        # Employer main view
│   │   ├── employees/        # Employee management
│   │   ├── payments/         # Payment history & creation
│   │   └── compliance/       # Auditor proof generation
│   ├── employee/
│   │   ├── dashboard/        # Employee main view
│   │   ├── history/          # Payment history
│   │   └── proofs/           # Income verification
│   └── api/                  # API routes
├── components/
│   ├── wallet/               # Wallet connection
│   ├── payment/              # Payment forms
│   ├── proof/                # Proof generation/verification
│   └── ai/                   # AI chat interface (Wave 7+)
└── lib/
    ├── aleo/                 # Aleo SDK integration
    ├── contracts/            # Contract ABIs and helpers
    └── utils/                # General utilities
```

### 3. AI Layer (Wave 7+)

The AI assistant translates natural language to contract calls:

```
User: "Pay the engineering team their December bonus"
       │
       ▼
┌─────────────────────────────────────────┐
│           Intent Parser                  │
│  - Identify action: "pay"               │
│  - Identify recipients: "engineering"   │
│  - Identify context: "December bonus"   │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         Employee Resolver                │
│  - Query encrypted employee records     │
│  - Filter by department: engineering    │
│  - Return: 12 employees                 │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│        Payment Orchestrator              │
│  - Calculate total (hidden from AI)     │
│  - Generate batch payment transaction   │
│  - Request employer confirmation        │
└─────────────────┬───────────────────────┘
                  │
                  ▼
AI: "Found 12 engineers. Ready to send December bonus. Confirm?"
```

**Important**: The AI never sees actual salary amounts. It works with:
- Employee identifiers and metadata
- Aggregated counts
- Confirmation flows

---

## Data Flow

### Private Payment Flow

```
1. Employer initiates payment
   └── Frontend collects: recipient, amount

2. Transaction built locally
   └── Leo program executed in browser/locally
   └── ZK proof generated (proves valid payment without revealing amount)

3. Transaction submitted to Aleo network
   └── Only encrypted record + proof go on-chain

4. Recipient receives payment
   └── Their wallet decrypts the record
   └── Only they can see the amount
```

### Compliance Proof Flow

```
1. Auditor requests proof
   └── "Prove Q1 payroll was between $500K-$600K"

2. Employer generates proof locally
   └── Inputs: All Q1 payment records (private)
   └── Circuit: Sum amounts, check range
   └── Output: ZK proof (no amounts revealed)

3. Proof shared with auditor
   └── Auditor verifies proof on-chain
   └── Cryptographically guaranteed correct
   └── Zero knowledge of individual payments
```

### Income Verification Flow

```
1. Employee needs proof for loan application
   └── Bank requires: "Prove monthly income ≥ $5,000"

2. Employee generates proof
   └── Inputs: Their payment records (private)
   └── Circuit: Check if monthly average ≥ threshold
   └── Output: ZK proof + employee signature

3. Bank verifies proof
   └── Proof verified on-chain or off-chain
   └── Bank knows: "Income ≥ $5,000" ✓
   └── Bank doesn't know: Exact salary, employer details
```

---

## Privacy Model

### Threat Model

| Actor | What They See | What They DON'T See |
|-------|--------------|---------------------|
| **Public** | Transaction hashes | Amounts, recipients, senders |
| **Other Employees** | Nothing | Other salaries, payments |
| **Employer** | All payments they sent | Employee spending |
| **Auditor** | Aggregated proofs | Individual salaries |
| **Aleo Validators** | Encrypted records | Decrypted contents |

### Cryptographic Primitives

1. **Poseidon Hash**: Fast ZK-friendly hash function
2. **Pedersen Commitments**: Commit to values without revealing
3. **Groth16 Proofs**: Succinct ZK proofs for verification
4. **Record Encryption**: AES-based encryption for record contents

---

## Scalability Considerations

### Batch Payments

Instead of N transactions for N employees:
- Single transaction with N encrypted outputs
- One proof covers all payments
- Gas efficient, privacy preserved

### Proof Generation

ZK proof generation is computationally intensive:
- Client-side generation (privacy preserved)
- WebAssembly for browser performance
- Optional: Delegated proving (trust tradeoff)

---

## Security Considerations

1. **Key Management**: Employee private keys never leave their devices
2. **Input Validation**: All inputs validated before circuit execution
3. **Proof Verification**: Always verify proofs on-chain for compliance
4. **Access Control**: Role-based access in smart contracts
5. **Audit Trail**: Hashed logs for debugging without privacy leak

---

## Future Considerations

- **Multi-chain**: Bridge to other chains for broader token support
- **Hardware Wallets**: Ledger/Trezor integration
- **Threshold Signatures**: Multi-party approval without single points of failure
- **Formal Verification**: Mathematical proofs of contract correctness
