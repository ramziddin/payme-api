# Payme API

A collection of utilities to implement Payme's [Merchant API](https://developer.help.paycom.uz/ru/protokol-merchant-api) and [Subscribe API](https://developer.help.paycom.uz/ru/protokol-subscribe-api) protocols compatible with Next.js and Express.js.

## Installation

```bash
npm i payme-api
```

## Usage

### Merchant API

#### Example with Express.js

```typescript
import { createBilling } from "payme-api"

const { handleBillingRequest } = createBilling(
  process.env.MERCHANT_ID,
  process.env.MERCHANT_KEY,
  {
    async checkPerformTransaction() {},

    async createTransaction() {},

    async performTransaction() {},

    async cancelTransaction() {},

    async checkTransaction() {},

    async getStatement() {},
  }
)
```
