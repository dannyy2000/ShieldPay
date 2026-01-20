program shieldpay.aleo;

record Payment:
    owner as address.private;
    amount as u64.private;
    sender as address.private;
    timestamp as u64.private;

record MemoPayment:
    owner as address.private;
    amount as u64.private;
    sender as address.private;
    timestamp as u64.private;
    memo as field.private;

function pay_private:
    input r0 as address.private;
    input r1 as u64.private;
    input r2 as u64.private;
    cast r0 r1 self.caller r2 into r3 as Payment.record;
    output r3 as Payment.record;

function pay_with_memo:
    input r0 as address.private;
    input r1 as u64.private;
    input r2 as u64.private;
    input r3 as field.private;
    cast r0 r1 self.caller r2 r3 into r4 as MemoPayment.record;
    output r4 as MemoPayment.record;
