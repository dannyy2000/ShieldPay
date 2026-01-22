# ShieldPay Deployment Details

## Testnet Deployment - Wave 1

**Deployment Date**: January 22, 2025
**Network**: Aleo Testnet
**Status**: ✅ Confirmed

---

## Contract Information

| Field | Value |
|-------|-------|
| **Program Name** | `shieldpay.aleo` |
| **Version** | 0.1.0 |
| **Leo Version** | 3.4.0 |
| **Consensus Version** | 2 |

---

## Transaction Details

| Field | Value |
|-------|-------|
| **Transaction ID** | `at1usjzgsqgu74hytmqjtaq8rt590pvc9qm209d3czezq5cqtsrpvgqq4cez8` |
| **Fee Transaction ID** | `at1ygwe4808qw770n7p2uarm06ljvtumullm0uq5waa00qa5nxytvgsr6en4j` |
| **Fee ID** | `au1deh7avutch6q74y9qtkr7xnl95l7ms3g8lek0lhlxrnje2dgycrqj5296j` |

---

## Cost Breakdown

| Component | Credits |
|-----------|---------|
| Transaction Storage | 1.855000 |
| Program Synthesis | 4.303175 |
| Namespace | 10.000000 |
| Constructor | 0.050000 |
| Priority Fee | 0.000000 |
| **Total Fee** | **16.208175** |

---

## Program Statistics

| Metric | Value |
|--------|-------|
| Total Variables | 94,719 |
| Total Constraints | 77,408 |
| Max Variables | 2,097,152 |
| Max Constraints | 2,097,152 |

---

## Deployed Functions

### 1. `pay_private`
Send a private payment to a recipient.

**Inputs:**
- `recipient: address` - Recipient's Aleo address
- `amount: u64` - Amount in microcredits
- `timestamp: u64` - Payment timestamp

**Output:** `Payment` record (encrypted, owned by recipient)

### 2. `pay_with_memo`
Send a private payment with a memo field.

**Inputs:**
- `recipient: address` - Recipient's Aleo address
- `amount: u64` - Amount in microcredits
- `timestamp: u64` - Payment timestamp
- `memo: field` - Hashed memo (e.g., "January Salary")

**Output:** `MemoPayment` record (encrypted, owned by recipient)

---

## Constructor

The program includes a `@noupgrade` constructor that sets:
```
edition 0u16
```

This prevents future upgrades to the deployed program.

---

## Explorer Links

- **Transaction**: https://explorer.aleo.org/transaction/at1usjzgsqgu74hytmqjtaq8rt590pvc9qm209d3czezq5cqtsrpvgqq4cez8
- **Program**: https://explorer.aleo.org/program/shieldpay.aleo

---

## Deployment Configuration

**Endpoint**: `https://api.explorer.provable.com/v1`
**Deployer Address**: `aleo144dd82ux4ldjqpmttlw...` (from .env private key)

---

## How to Interact

### Via Leo CLI
```bash
# Execute pay_private locally
leo run pay_private <recipient_address> <amount>u64 <timestamp>u64

# Execute on testnet
leo execute pay_private <recipient_address> <amount>u64 <timestamp>u64 --broadcast
```

### Via Frontend
1. Connect Leo Wallet
2. Enter recipient address and amount
3. Select "Testnet" mode
4. Click "Send Payment"

---

## Notes

- All payment amounts and recipient addresses are encrypted on-chain
- Only the recipient can decrypt and view their payment details
- The sender knows what they sent; the recipient knows what they received
- Public observers only see that a transaction occurred
