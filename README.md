# Sui Magic 8 Ball (Client-Only)

This is a **React-based Magic 8 Ball app** that uses the **Slush Wallet** to sign messages and generate 8-ball responses

> Its a **fully client-side** application. There is **no Move contract**, no on-chain logic, and no backend. All behavior is local and deterministic based on signature data.

## Features

- Magic 8 Ball experience powered by your own Slush wallet signature
- No transaction submission or on-chain storage

##  How it works

1. You type in a question.
2. Your Slush wallet signs a message containing that question and a timestamp.
3. The app hashes your signature to select aresponse from a predefined list.
4. The answer is revealed with a magic-ball animation.
