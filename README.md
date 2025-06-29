# Sui Magic 8 Ball (Client-Only)

This is a **React-based Magic 8 Ball app** that uses the **Slush Wallet** to
sign messages and generate 8-ball responses

> Its a **fully client-side** application. There is **no Move contract**, no
> on-chain logic, and no backend. All behavior is local and deterministic based
> on signature data.

It's deployed on Github Pages: https://delaklo.github.io/magic-8ball-on-sui/

Article on Medium about it: https://medium.com/@delaklovp/sui-developing-1-magic-8-ball-app-with-usesignpersonalmessage-hook-3327d2afa293

## Features

- Magic 8 Ball experience powered by your own Slush wallet signature
- No transaction submission or on-chain storage

## How it works

1. You type in a question.
2. Your Slush wallet signs a message containing that question and a timestamp.
3. The app hashes your signature to select a response from a predefined list.
4. The answer is revealed with a magic-ball animation.
