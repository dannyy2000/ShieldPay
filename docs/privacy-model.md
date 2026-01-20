# ShieldPay Privacy Model

## Core Principle

> **Prove everything. Reveal nothing.**

ShieldPay is designed around a fundamental principle: sensitive financial data should be provable without being visible.

---

## What Is Hidden

### Payment Amounts
- Individual salary amounts are encrypted
- Only the sender and recipient can decrypt
- Not visible to validators, other employees, or the public

### Recipient Identities
- Payment recipients are not publicly linked to payments
- External observers cannot determine who received what

### Payment History Patterns
- Transaction graph analysis is prevented
- Timing and frequency patterns are obscured

### Employer-Employee Relationships
- Who works for whom is not publicly visible
- Employment records are encrypted

---

## What Is Provable

Despite hiding sensitive data, ShieldPay can cryptographically prove:

### For Compliance (Employer → Auditor)

| Claim | Proof Type |
|-------|------------|
| "Total Q1 payroll was between $500K-$600K" | Range proof on sum |
| "No single payment exceeded $50K" | Max value proof |
| "We made exactly 47 payments this month" | Count proof |
| "All payments went to verified addresses" | Set membership proof |
| "Total payroll increased ≤10% YoY" | Comparison proof |

### For Income Verification (Employee → Third Party)

| Claim | Proof Type |
|-------|------------|
| "I earn at least $5,000/month" | Threshold proof |
| "I've been employed for 6+ months" | Duration proof |
| "My employer is a verified company" | Attestation proof |
| "I received consistent payments" | Regularity proof |

---

## How It Works

### Record-Based Privacy (Aleo's Model)

Aleo uses a record model similar to Bitcoin's UTXOs, but encrypted:

```
┌─────────────────────────────────────────┐
│           Payment Record                │
├─────────────────────────────────────────┤
│ owner: aleo1abc...     (encrypted)      │
│ amount: 5000000000     (encrypted)      │
│ sender: aleo1xyz...    (encrypted)      │
│ timestamp: 1706123456  (encrypted)      │
│ memo: "January salary" (encrypted)      │
└─────────────────────────────────────────┘
        │
        ▼
   On-chain: Only a commitment (hash) is visible
   Off-chain: Owner's wallet decrypts the full record
```

### Zero-Knowledge Proofs

When generating a compliance proof:

```
Private Inputs (known only to prover):
├── Payment 1: $4,200
├── Payment 2: $5,100
├── Payment 3: $3,800
└── ... (47 payments total)

Public Inputs:
├── Claimed range: $180,000 - $200,000
└── Number of payments: 47

Circuit Logic:
1. Sum all private payment amounts
2. Check: sum ≥ $180,000 AND sum ≤ $200,000
3. Check: count(payments) == 47

Output:
├── Proof: π (cryptographic proof)
└── Result: VALID or INVALID

What auditor learns: "The claim is TRUE"
What auditor doesn't learn: Individual payment amounts
```

---

## Privacy Levels

ShieldPay supports multiple privacy levels for different use cases:

### Level 1: Full Privacy (Default)
- All payment details encrypted
- Only sender/recipient can view
- Use case: Regular payroll

### Level 2: Selective Disclosure
- Some fields revealed by choice
- Example: Reveal department, hide amount
- Use case: Internal analytics

### Level 3: Compliance Mode
- ZK proofs generated for auditors
- Aggregates provable, individuals hidden
- Use case: External audits, investor reports

### Level 4: Public (Opt-in)
- Fully transparent payment
- Rare, for specific use cases
- Use case: Public grant distributions

---

## Threat Analysis

### What ShieldPay Protects Against

| Threat | Protection |
|--------|------------|
| **Salary snooping by colleagues** | Individual records encrypted, only owner can decrypt |
| **Blockchain analysis firms** | Transaction graph obscured, no public amounts |
| **Employer oversharing** | Compliance proofs reveal only aggregates |
| **Data breaches** | No centralized salary database to breach |
| **Loan officer overreach** | Income proofs reveal only threshold, not exact salary |

### What ShieldPay Does NOT Protect Against

| Threat | Why |
|--------|-----|
| **Employer knows your salary** | They set it; this is inherent |
| **Your wallet is compromised** | Private keys = full access; use hardware wallets |
| **You voluntarily share** | Can't prevent screenshot of your own data |
| **Side-channel attacks** | Network timing, etc. - mitigate with best practices |

---

## Comparison to Other Approaches

### vs. Traditional Payroll (ADP, Gusto)

| Aspect | Traditional | ShieldPay |
|--------|-------------|-----------|
| Who sees your salary | HR, managers, payroll provider, banks | Only you (and employer who set it) |
| Compliance audits | Full data access | ZK proofs only |
| Data breach risk | Centralized database | No central storage |
| Blockchain transparency | N/A | Fully private |

### vs. Public Blockchain Payroll

| Aspect | Public Chain | ShieldPay |
|--------|--------------|-----------|
| Salary visibility | Everyone forever | Only sender/recipient |
| Transaction analysis | Fully traceable | Protected |
| Compliance | Overshares data | ZK proofs |
| Employee privacy | None | Full |

### vs. Tornado Cash (Mixer)

| Aspect | Mixer | ShieldPay |
|--------|-------|-----------|
| Purpose | Obscure source | Private by default |
| Compliance | None (regulatory issues) | Built-in ZK compliance |
| Use case | One-time mixing | Ongoing payroll |
| Regulatory stance | Banned in many jurisdictions | Designed for compliance |

---

## Regulatory Compatibility

ShieldPay is designed to meet regulatory requirements through selective disclosure:

### Tax Compliance
- Employer can prove total payroll expenses
- Individual employees can generate tax documents
- No third party needs to see all salaries

### AML/KYC
- Payments to verified wallets only
- Proof of verification without exposing documents
- Audit trail available with appropriate warrants

### GDPR/Privacy Laws
- Minimal data collection
- User controls their own records
- Right to erasure: Users can destroy their records

---

## Technical Implementation

### Encryption Scheme
- **Algorithm**: AES-256-GCM (inside Aleo records)
- **Key Derivation**: From user's private key
- **Per-record encryption**: Each record independently encrypted

### ZK Proof System
- **Proving System**: Groth16 (via Aleo's snarkVM)
- **Curve**: BLS12-377
- **Proof Size**: ~200 bytes
- **Verification Time**: ~10ms

### Hash Functions
- **Poseidon**: ZK-friendly, used in circuits
- **Pedersen**: For commitments

---

## Best Practices for Users

### Employers
1. Use multi-sig for large payments
2. Generate compliance proofs proactively
3. Keep encrypted backups of payment records
4. Use separate wallets for different departments (optional)

### Employees
1. Use a hardware wallet for your Aleo account
2. Never share your private key
3. Generate income proofs only when necessary
4. Verify proof contents before sharing

### Auditors
1. Request specific range proofs, not raw data
2. Verify proofs on-chain for tamper evidence
3. Document proof verification for compliance records
