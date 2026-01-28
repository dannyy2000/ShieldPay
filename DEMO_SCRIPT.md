# ShieldPay Wave 1 Demo Script

## Video Length Target: 2-3 minutes

---

## INTRO (15 seconds)

**[Show: Landing page or title slide]**

> "Hi, I'm [Your Name], and this is ShieldPay - a privacy-first payroll platform built on Aleo.
>
> The problem: Traditional payroll exposes sensitive salary data at every step. ShieldPay uses zero-knowledge proofs to let companies pay employees while keeping individual salaries completely confidential.
>
> Let me show you how it works."

---

## PART 1: Connect Wallet (20 seconds)

**[Show: App at localhost:5173, wallet disconnected]**

> "Here's the ShieldPay dashboard. First, I'll connect my Leo Wallet."

**[Action: Click wallet button, approve connection]**

> "Now I'm connected to the Aleo testnet. You can see my wallet address in the top right."

---

## PART 2: Send a Private Payment (45 seconds)

**[Show: Payment form]**

> "Let's send a private payment. I'll enter a recipient address..."

**[Action: Enter recipient address or click "Use test employee address"]**

> "...and an amount. Let's send 0.1 ALEO."

**[Action: Enter 0.1 in amount field]**

> "Notice I have two modes: Local Demo for testing, and Testnet for real transactions. I'll use Testnet to show a real on-chain transaction."

**[Action: Select Testnet mode]**

> "When I click Send, my browser will generate a zero-knowledge proof locally. This proof says 'I'm making a valid payment' without revealing the amount or recipient to anyone else."

**[Action: Click "Send Private Payment"]**

> "This takes about 30-60 seconds because the ZK proof is being computed right here in my browser..."

**[Wait for completion, show success message]**

> "Done! The transaction was submitted. Notice I got a transaction ID - let's verify this on the blockchain."

---

## PART 3: Verify Privacy on Explorer (45 seconds)

**[Action: Click the "View" link or open Aleo Explorer]**

> "Here's the transaction on Aleo's block explorer. Let me show you the privacy in action."

**[Show: Transaction page with inputs]**

> "Look at the INPUTS section - it says 'private' and shows ciphertext, not the actual values.
>
> This gibberish - 'ciphertext1qgq...' - IS my recipient address and amount, but encrypted.
>
> Anyone looking at this transaction can see:
> - A transaction happened
> - It called the 'pay_private' function on shieldpay.aleo
>
> But they CANNOT see:
> - Who I paid
> - How much I sent
>
> Only the recipient can decrypt their payment record with their private key."

---

## PART 4: Show the Smart Contract (30 seconds)

**[Show: contracts/src/main.leo or the code on screen]**

> "Here's the Leo smart contract powering this. It's simple but powerful.
>
> The `Payment` record stores the owner, amount, sender, and timestamp - all encrypted on-chain.
>
> The `pay_private` function creates this record. When called, Leo compiles it to a ZK circuit, generates a proof locally, and only the proof goes on-chain - never the actual inputs."

---

## CLOSING (15 seconds)

**[Show: App dashboard or roadmap slide]**

> "That's ShieldPay Wave 1 - proving that private payments work on Aleo.
>
> Coming next: batch payments to multiple employees, compliance proofs for auditors, and income verification for employees - all while keeping individual salaries private.
>
> Thanks for watching!"

---

## KEY POINTS TO EMPHASIZE

1. **Privacy is real** - Show the ciphertext on the explorer
2. **ZK happens in browser** - Mention the 30-60 second proof generation
3. **Recipient-only decryption** - Only the owner of the record can see the amount
4. **No trusted third party** - The blockchain itself can't see the data

---

## TECHNICAL DETAILS TO MENTION (if asked)

- Program: `shieldpay.aleo`
- Network: Aleo Testnet
- Language: Leo (compiles to ZK circuits)
- Frontend: React + Vite + Leo Wallet Adapter
- Proof system: Marlin (Aleo's ZK-SNARK)

---

## SCREEN RECORDING TIPS

1. **Clean browser** - Close unnecessary tabs
2. **Zoom in** - Make text readable (125-150% zoom)
3. **Pre-fund wallet** - Have testnet credits ready
4. **Have explorer open** - In a separate tab for quick switch
5. **Practice once** - Do a dry run to check timing

---

## BACKUP: If Transaction Takes Too Long

If the proof generation is slow during recording, you can:

1. Use "Local Demo" mode to show the flow quickly
2. Then show a pre-recorded testnet transaction on the explorer
3. Say: "I've already submitted a testnet transaction - let me show you what it looks like on-chain"

---

## SAMPLE TRANSACTION TO SHOW

If you need a backup transaction that's already confirmed:

- **Transaction ID**: `at19u39hnz4r9ted55wlmpzzdsmazhmkxmm850m5ecn9cls3hj2aczqpf5qaj`
- **Explorer**: https://explorer.aleo.org/transaction/at19u39hnz4r9ted55wlmpzzdsmazhmkxmm850m5ecn9cls3hj2aczqpf5qaj
- **Block**: 13,940,419
