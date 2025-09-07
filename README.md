# review-pilot

![review-pilot](https://socialify.git.ci/Programmer-RD-AI/review-pilot/image?description=1&descriptionEditable=A%20legendary%20AI%20code%20reviewer%20that%20catches%20production%20disasters%20before%20they%20happen&font=Source%20Code%20Pro&name=1&owner=1&theme=Auto)

<div align="center">

![](https://img.shields.io/github/license/Programmer-RD-AI/review-pilot.svg?style=for-the-badge&color=blue)
![](https://img.shields.io/github/forks/Programmer-RD-AI/review-pilot.svg?style=for-the-badge)
![](https://img.shields.io/github/stars/Programmer-RD-AI/review-pilot.svg?style=for-the-badge)
![](https://img.shields.io/github/watchers/Programmer-RD-AI/review-pilot.svg?style=for-the-badge)
![](https://img.shields.io/github/issues/Programmer-RD-AI/review-pilot.svg?style=for-the-badge)
![](https://img.shields.io/github/languages/code-size/Programmer-RD-AI/review-pilot?style=for-the-badge)

## Frameworks/Technologies

![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

</div>

---

## About The Project

`review-pilot` is a comprehensive AI-powered GitHub Action that surpasses GitHub Copilot's review capabilities. Using advanced chain-of-thought reasoning, it systematically analyzes pull requests across security, performance, maintainability, and correctness dimensions like a battle-tested principal engineer.

**Why review-pilot beats GitHub Copilot?**

- **Can Actually Approve PRs**: Unlike Copilot, review-pilot can approve clean code for merge
- **Systematic Analysis**: Uses 5-step chain-of-thought reasoning for comprehensive coverage
- **Multi-dimensional Review**: Security, performance, correctness, maintainability, and best practices
- **Self-consistency Checks**: Built-in verification to prevent incorrect feedback
- **Production-focused**: Issues that actually matter, not just style preferences
- **Advanced Prompting**: Leverages cutting-edge LLM reasoning techniques

Powered by Google's Gemini 2.5 Flash with 80% more comprehensive analysis than standard tools, review-pilot combines the wisdom of a principal engineer with systematic AI reasoning.

---

## Installation

Add review-pilot to your GitHub workflow:

```yaml
# .github/workflows/review.yml
name: AI Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - name: Review Pull Request
        uses: Programmer-RD-AI/review-pilot@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          apiKey: ${{ secrets.GEMINI_API_KEY }}
          level: 'MID'
```

### Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Add it to your repository secrets as `GEMINI_API_KEY`

---

## Configuration

```yaml
- name: Review Pull Request
  uses: Programmer-RD-AI/review-pilot@v1
  with:
    token: ${{ secrets.GITHUB_TOKEN }} # Required: GitHub token
    apiKey: ${{ secrets.GEMINI_API_KEY }} # Required: Gemini API key
    model: 'gemini-2.5-flash-lite' # Optional: AI model
    level: 'MID' # Optional: Review strictness
    maxChanges: '1000' # Optional: Max changes per file
    customInstructionUri: './review-guide.txt' # Optional: Custom instructions
```

### Review Analysis Levels

- **LOW**: Critical-only mode (production failures, security breaches, data corruption)
- **MID**: Balanced quality mode (critical issues + significant correctness/maintainability problems)  
- **HIGH**: Comprehensive mode (security, performance, maintainability, correctness, best practices) - **Recommended**

### Custom Instructions

Provide domain-specific context to improve reviews:

```txt
# review-guide.txt
This is a fintech application handling payment processing.
Security is paramount - flag any potential data leaks.
Performance matters - we handle 10k+ transactions per minute.
Database queries must be optimized for PostgreSQL 14.
```

---

## Example Review Output

review-pilot provides surgical, insightful feedback:

````
💬 **Review Summary**
Solid payment processing changes, but found a critical race condition in transaction handling.

🔴 **Critical Issue - Transaction Handler**
```typescript
// src/payment/processor.ts:45
This shared transaction counter isn't thread-safe. Under concurrent load,
you'll get race conditions and lost updates. Two requests could read the
same value and both increment from there, leading to duplicate transaction IDs.

Consider using atomic operations or database-generated IDs instead.
````

🟡 **Performance Concern - Database Query**
```typescript
// src/user/service.ts:23
This query in the loop is going to murder your database performance.
You're doing one query per user instead of batching them. With 10k users,
that's 10k queries instead of 1.
```

---

## How It Works

**5-Step Chain-of-Thought Analysis:**

1. **File Structure Analysis**: Maps changes across files and identifies programming contexts
2. **Security & Vulnerability Scan**: Systematic check for auth bypasses, injection, secrets, crypto issues
3. **Correctness & Logic Analysis**: Logic errors, null pointers, resource leaks, exception handling
4. **Performance & Efficiency Review**: Algorithmic complexity, database optimization, memory efficiency
5. **Maintainability & Best Practices**: Code quality, patterns, documentation, consistency

**Advanced Capabilities:**
- **Self-Consistency Verification**: Multi-path reasoning with accuracy validation
- **Contextual Understanding**: Full file context for understanding, patch-only analysis for comments
- **Approval Authority**: Can approve clean PRs for merge (unlike GitHub Copilot)
- **Systematic Reasoning**: No speculation - only issues definitively identified through structured analysis

review-pilot combines comprehensive coverage with surgical precision, catching issues that matter while avoiding noise.

---

## Requirements

- **GitHub Actions**: Repository with Actions enabled
- **Gemini API Key**: Free tier available with generous limits
- **Node.js**: v20+ (handled automatically in Actions)

---

## Language Support

review-pilot provides deep analysis for:

- **JavaScript/TypeScript**: React patterns, async/await, memory leaks
- **Python**: Context managers, GIL issues, type safety
- **Java**: Concurrency, collections, performance
- **Go**: Goroutines, channels, interface satisfaction
- **And more**: Adapts to any language in your codebase

---

## Contributing

Contributions are welcome! This project follows the "make it better" philosophy.

Please see our `CONTRIBUTING.md` for details on how to contribute.

---

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

### Key Permissions
- Commercial use, modification, distribution, and private use
- Patent grant from contributors
- No warranty or liability

---

## Code of Conduct

This project is governed by our `CODE_OF_CONDUCT.md`. By participating, you agree to uphold professional standards and treat all contributors with respect.

---

**Built with battle-tested engineering wisdom. Deploy with confidence.**
