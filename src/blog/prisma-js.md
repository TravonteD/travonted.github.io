---
layout: ../../layouts/Layout.astro
title: Making a simple CRUD app with prisma-js
---

# Making a simple CRUD app with prisma-js

Recently one of my friends asked me for a recommendation on an ORM<sub>[1](#1)</sub>, and I recommended [Prisma][prisma]. He asked me for a real-world example of it's usage so I've decided to make this post so that he, and others can benefit.

We're going to be making a [ledger][ledger] that lets the user create, update, and delete transactions
and show's the current balance from the transactions.

## Why Prisma
Prisma is a ORM that I like to call "TypeScript First", because it's written with types in mind from the beginning.
This yields some very nice benefits like type checking on database manipulations, and it has a nice schema syntax.

## Creating the schema
Let's start with a data source. For this project an `sqlite` databases.

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```


<div style="font-size: 0.96rem">
  <div><sup id="1">1</sup>: Object relation model</div>
</div>

[prisma]: https://www.prisma.io/
