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

`review-pilot` is an AI-powered GitHub Action that reviews your pull requests like a battle-tested senior engineer with 25+ years of experience. Unlike generic code review tools, review-pilot focuses laser-sharp attention on issues that actually matter in production - security vulnerabilities, performance bottlenecks, race conditions, and logic bugs that cause 3 AM outages.

**Why review-pilot?**

- **Production-focused**: Only flags issues that will bite you in production
- **Battle-tested perspective**: Reviews code like someone who's debugged every possible failure
- **Surgical precision**: No bikeshedding or style wars - just real problems
- **Legendary insights**: Comments backed by war stories from the trenches

Powered by Google's Gemini 2.5 Flash Lite, review-pilot analyzes Git patches with the wisdom of a principal engineer who's seen it all.

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

### Review Strictness Levels

- **LOW**: Only critical issues (production failures, security holes, major performance problems)
- **MID**: Critical issues + important suggestions (default)
- **HIGH**: Everything including style and minor nitpicks

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

1. **Patch Analysis**: review-pilot analyzes Git diff patches, not full files
2. **Pattern Recognition**: Identifies dangerous patterns from production war stories
3. **Surgical Comments**: Only comments on lines that will cause real problems
4. **Battle-tested Wisdom**: Reviews like a senior engineer who's seen every footgun

review-pilot understands it's working with limited patch context and focuses on issues it can definitively identify - no speculation, just solid engineering judgment.

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
