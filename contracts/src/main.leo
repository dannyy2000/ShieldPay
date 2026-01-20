// ============================================
// ShieldPay - Private Payroll on Aleo
// Wave 1: Core Private Payment
// ============================================

program shieldpay.aleo {

    // ============================================
    // RECORD: Payment
    // ============================================
    //
    // This is the core privacy primitive in Aleo.
    //
    // HOW IT WORKS:
    // - When created, all fields are encrypted on-chain
    // - Only the 'owner' address can decrypt and view the contents
    // - The sender knows what they sent, recipient knows what they received
    // - Nobody else (not even validators) can see the amount
    //
    // ANALOGY:
    // Think of it like a sealed envelope. Only the person whose
    // address is on it (owner) can open it and see what's inside.
    //
    record Payment {
        owner: address,      // Who received this payment (can decrypt)
        amount: u64,         // Payment amount in microcredits (private!)
        sender: address,     // Who sent the payment
        timestamp: u64,      // When it was sent (block height or unix time)
    }

    // ============================================
    // TRANSITION: pay_private
    // ============================================
    //
    // This is a "transition" - Aleo's version of a function that
    // changes state. It runs locally on your machine, generates a
    // ZK proof, then only the proof goes on-chain (not the inputs).
    //
    // WHAT HAPPENS:
    // 1. Employer calls this with recipient + amount
    // 2. Leo compiles this to a ZK circuit
    // 3. Proof is generated locally (proves valid execution)
    // 4. Proof + encrypted output go on-chain
    // 5. Recipient's wallet sees a new Payment record
    //
    // PRIVACY:
    // - 'recipient' is hidden (part of encrypted record)
    // - 'amount' is hidden (part of encrypted record)
    // - Public observers see: "someone called pay_private" - that's it
    //
    transition pay_private(
        recipient: address,   // Who to pay
        amount: u64,          // How much (in microcredits)
        timestamp: u64        // When (you provide this)
    ) -> Payment {

        // Create a new Payment record owned by the recipient
        // self.caller = the address calling this function (employer)
        return Payment {
            owner: recipient,
            amount: amount,
            sender: self.caller,
            timestamp: timestamp,
        };
    }

    // ============================================
    // TRANSITION: pay_private_with_memo
    // ============================================
    //
    // Same as above, but with a memo field.
    // In Leo, we use 'field' type for arbitrary data (like a hash of memo text)
    //
    record MemoPayment {
        owner: address,
        amount: u64,
        sender: address,
        timestamp: u64,
        memo: field,         // Hash of memo (e.g., "January salary")
    }

    transition pay_with_memo(
        recipient: address,
        amount: u64,
        timestamp: u64,
        memo: field           // Frontend hashes the memo string to a field
    ) -> MemoPayment {

        return MemoPayment {
            owner: recipient,
            amount: amount,
            sender: self.caller,
            timestamp: timestamp,
            memo: memo,
        };
    }
}
