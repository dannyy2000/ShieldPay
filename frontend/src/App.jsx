import { useState } from "react";
import "./App.css";
import shieldpay_program from "../shieldpay/build/main.aleo?raw";
import { AleoWorker } from "./workers/AleoWorker.js";

const aleoWorker = AleoWorker();

function App() {
  const [account, setAccount] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [txHistory, setTxHistory] = useState([]);

  const connectWallet = () => {
    setAccount("aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px");
    setError(null);
  };

  const disconnectWallet = () => {
    setAccount(null);
    setResult(null);
  };

  async function executePayment() {
    if (!recipient) {
      setError("Please enter a recipient address");
      return;
    }
    const cleanRecipient = recipient.trim();
    if (!cleanRecipient.startsWith("aleo1") || cleanRecipient.length < 60) {
      setError("Invalid Aleo address format");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setExecuting(true);
    setError(null);
    setResult(null);

    try {
      const amountInMicro = Math.floor(Number(amount) * 1000000);
      const timestamp = Math.floor(Date.now() / 1000);

      const inputs = [
        cleanRecipient,
        `${amountInMicro}u64`,
        `${timestamp}u64`,
      ];

      const output = await aleoWorker.localProgramExecution(
        shieldpay_program,
        "pay_private",
        inputs
      );

      const newTx = {
        id: Date.now(),
        recipient: cleanRecipient,
        amount: amount,
        timestamp: new Date().toLocaleString(),
        status: "success"
      };

      setTxHistory(prev => [newTx, ...prev]);
      setResult({
        success: true,
        output: output,
        details: {
          recipient: cleanRecipient,
          amount: amount,
          timestamp: new Date(timestamp * 1000).toLocaleString(),
        }
      });
      setRecipient("");
      setAmount("");
    } catch (e) {
      console.error("Payment error:", e);
      setError("Payment failed: " + (e.message || String(e)));
    }

    setExecuting(false);
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="nav-logo">🛡️</span>
          <span className="nav-title">ShieldPay</span>
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link active">Dashboard</a>
          <a href="#" className="nav-link">Employees</a>
          <a href="#" className="nav-link">History</a>
          <a href="#" className="nav-link">Settings</a>
        </div>
        <div className="nav-wallet">
          {account ? (
            <div className="wallet-connected-nav">
              <span className="wallet-dot"></span>
              <span className="wallet-addr">{account.slice(0, 8)}...{account.slice(-6)}</span>
              <button onClick={disconnectWallet} className="btn-disconnect">×</button>
            </div>
          ) : (
            <button onClick={connectWallet} className="btn-connect">
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="main">
        {/* Left Column - Payment Form */}
        <div className="content-left">
          <div className="page-header">
            <h1>Send Payment</h1>
            <p>Transfer funds privately to employees or contractors</p>
          </div>

          <div className="payment-card">
            {!account ? (
              <div className="connect-prompt">
                <div className="connect-icon">🔐</div>
                <h3>Connect Your Wallet</h3>
                <p>Connect your Aleo wallet to start sending private payments</p>
                <button onClick={connectWallet} className="btn btn-primary btn-large">
                  Connect Wallet
                </button>
              </div>
            ) : (
              <>
                <div className="form-section">
                  <label>Recipient Address</label>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="aleo1..."
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="input"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn-text"
                    onClick={() => setRecipient("aleo107x7scs0jnq7s7euxx7u32k74unc8p8ttmx290xkpsc4p73cju9sjkkwnz")}
                  >
                    + Use test employee address
                  </button>
                </div>

                <div className="form-section">
                  <label>Amount</label>
                  <div className="input-group input-with-token">
                    <input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="input"
                      min="0"
                      step="0.01"
                    />
                    <div className="token-badge">
                      <span className="token-icon">◈</span>
                      <span>ALEO</span>
                    </div>
                  </div>
                </div>

                <div className="payment-summary">
                  <div className="summary-row">
                    <span>Network Fee</span>
                    <span>~0.01 ALEO</span>
                  </div>
                  <div className="summary-row">
                    <span>Privacy</span>
                    <span className="privacy-badge">🔒 Fully Private</span>
                  </div>
                </div>

                <button
                  onClick={executePayment}
                  disabled={executing}
                  className="btn btn-primary btn-large"
                >
                  {executing ? (
                    <>
                      <span className="spinner"></span>
                      Generating ZK Proof...
                    </>
                  ) : (
                    "Send Private Payment"
                  )}
                </button>

                {executing && (
                  <div className="processing-info">
                    <p>Creating zero-knowledge proof. This may take 30-60 seconds...</p>
                  </div>
                )}
              </>
            )}

            {error && (
              <div className="alert alert-error">
                <span className="alert-icon">⚠️</span>
                <span>{error}</span>
                <button onClick={() => setError(null)} className="alert-close">×</button>
              </div>
            )}

            {result && (
              <div className="alert alert-success">
                <div className="alert-header">
                  <span className="alert-icon">✅</span>
                  <span className="alert-title">Payment Successful!</span>
                </div>
                <div className="alert-body">
                  <div className="alert-row">
                    <span>To:</span>
                    <code>{result.details.recipient.slice(0, 12)}...{result.details.recipient.slice(-8)}</code>
                  </div>
                  <div className="alert-row">
                    <span>Amount:</span>
                    <strong>{result.details.amount} ALEO</strong>
                  </div>
                </div>
                <details className="alert-details">
                  <summary>View encrypted record</summary>
                  <pre>{JSON.stringify(result.output, null, 2)}</pre>
                </details>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Info & History */}
        <div className="content-right">
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{txHistory.length}</span>
              <span className="stat-label">Payments Sent</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">100%</span>
              <span className="stat-label">Private</span>
            </div>
          </div>

          {/* How it works */}
          <div className="info-card">
            <h3>🔒 How Privacy Works</h3>
            <div className="info-steps">
              <div className="info-step">
                <div className="step-num">1</div>
                <div className="step-content">
                  <strong>You Enter Payment</strong>
                  <p>Recipient address and amount</p>
                </div>
              </div>
              <div className="info-step">
                <div className="step-num">2</div>
                <div className="step-content">
                  <strong>ZK Proof Generated</strong>
                  <p>Cryptographic proof created locally</p>
                </div>
              </div>
              <div className="info-step">
                <div className="step-num">3</div>
                <div className="step-content">
                  <strong>Encrypted On-Chain</strong>
                  <p>Only recipient can see the amount</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          {txHistory.length > 0 && (
            <div className="history-card">
              <h3>Recent Payments</h3>
              <div className="tx-list">
                {txHistory.map(tx => (
                  <div key={tx.id} className="tx-item">
                    <div className="tx-icon">↗</div>
                    <div className="tx-details">
                      <span className="tx-addr">{tx.recipient.slice(0, 10)}...{tx.recipient.slice(-6)}</span>
                      <span className="tx-time">{tx.timestamp}</span>
                    </div>
                    <div className="tx-amount">-{tx.amount} ALEO</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <span>Built on Aleo • Privacy by Default</span>
          <span className="footer-links">
            <a href="https://aleo.org" target="_blank" rel="noopener">Aleo</a>
            <a href="https://developer.aleo.org" target="_blank" rel="noopener">Docs</a>
            <a href="#" target="_blank" rel="noopener">GitHub</a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
