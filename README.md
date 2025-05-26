### í³› Critical Vulnerability: Unauthorized Token Minting by Owner

#### í³Œ Bug Type
**Access Control Issue â€“ Unrestricted Minting**

#### íº² Vulnerability Summary
The `mint()` and `mintTo()` functions in the PAAL token contract are callable by `owner()` without any additional checks or time locks. This allows the deployer (or compromised owner) to arbitrarily inflate token supply, leading to:

- **Direct devaluation of user-held tokens**
- **Theft of value via inflationary minting**

---

### í³‚ Proof-of-Concept Structure

```
paal-critical-mint-poc/
â”œâ”€â”€ contracts/
â”‚   â””â”€â”€ VulnerableToken.sol        # Minimal token contract with mint() exposed to owner
â”œâ”€â”€ scripts/
â”‚   â””â”€â”€ unauthorizedMintPoC.js     # Script demonstrating unauthorized minting
â”œâ”€â”€ hardhat.config.js              # Hardhat configuration
â”œâ”€â”€ package.json / package-lock.json
â””â”€â”€ .gitignore
```

---

### í·ª How to Run the PoC

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Run PoC on Local Hardhat Network
```bash
npx hardhat run scripts/unauthorizedMintPoC.js --network hardhat
```

#### âœ… Expected Output:
```
íº€ VulnerableToken deployed to: 0x...
âœ… Mint successful. Owner balance: 1000000.0 PAAL
```

This demonstrates successful unauthorized minting by the contract owner.

---

### í»¡ï¸ Recommended Fix
Restrict minting to governance-controlled contracts or remove minting altogether post-deployment. For example:

```solidity
// Replace onlyOwner with a governance modifier or remove after deployment
function mint(address to, uint256 amount) external onlyGovernance {
    _mint(to, amount);
}
```

---

### í´— PoC Repository

> [https://github.com/Dreitt/paal-critical-mint-poc](https://github.com/Dreitt/paal-critical-mint-poc)

