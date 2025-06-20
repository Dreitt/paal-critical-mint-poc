### ν³ Critical Vulnerability: Unauthorized Token Minting by Owner

#### ν³ Bug Type
**Access Control Issue β Unrestricted Minting**

#### νΊ² Vulnerability Summary
The `mint()` and `mintTo()` functions in the PAAL token contract are callable by `owner()` without any additional checks or time locks. This allows the deployer (or compromised owner) to arbitrarily inflate token supply, leading to:

- **Direct devaluation of user-held tokens**
- **Theft of value via inflationary minting**

---

### ν³ Proof-of-Concept Structure

```
paal-critical-mint-poc/
βββ contracts/
β   βββ VulnerableToken.sol        # Minimal token contract with mint() exposed to owner
βββ scripts/
β   βββ unauthorizedMintPoC.js     # Script demonstrating unauthorized minting
βββ hardhat.config.js              # Hardhat configuration
βββ package.json / package-lock.json
βββ .gitignore
```

---

### ν·ͺ How to Run the PoC

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Run PoC on Local Hardhat Network
```bash
npx hardhat run scripts/unauthorizedMintPoC.js --network hardhat
```

#### β Expected Output:
```
νΊ VulnerableToken deployed to: 0x...
β Mint successful. Owner balance: 1000000.0 PAAL
```

This demonstrates successful unauthorized minting by the contract owner.

---

### ν»‘οΈ Recommended Fix
Restrict minting to governance-controlled contracts or remove minting altogether post-deployment. For example:

```solidity
// Replace onlyOwner with a governance modifier or remove after deployment
function mint(address to, uint256 amount) external onlyGovernance {
    _mint(to, amount);
}
```

---

### ν΄ PoC Repository

> [https://github.com/Dreitt/paal-critical-mint-poc](https://github.com/Dreitt/paal-critical-mint-poc)

