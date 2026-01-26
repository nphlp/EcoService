# Todo

## Dashboard on mobile

- Retravailler les paddings

## Logs

```
2026-01-26T11:45:48.657Z 🚀 Starting Next.js application...
2026-01-26T11:45:49.332Z > eco-service@0.1.0 prisma:deploy /app
2026-01-26T11:45:49.332Z > pnpm dlx prisma migrate deploy

2026-01-26T11:45:59.960Z > tsx scripts/fixtures.ts setup
2026-01-26T11:46:01.012Z 🔍 Checking existing data...
2026-01-26T11:46:01.266Z 🔍 Inserting data...
2026-01-26T11:46:02.564Z 📊 Inserted data:
2026-01-26T11:46:02.567Z ┌──────────────┬────────┐
2026-01-26T11:46:02.568Z │ (index)      │ Values │
2026-01-26T11:46:02.568Z ├──────────────┼────────┤
2026-01-26T11:46:02.568Z │ Verification │ 0      │
2026-01-26T11:46:02.568Z │ Fruit        │ 7      │
2026-01-26T11:46:02.568Z │ User         │ 4      │
2026-01-26T11:46:02.568Z │ Session      │ 0      │
2026-01-26T11:46:02.568Z │ Account      │ 4      │
2026-01-26T11:46:02.568Z │ Address      │ 0      │
2026-01-26T11:46:02.568Z │ Article      │ 15     │
2026-01-26T11:46:02.568Z │ Diy          │ 15     │
2026-01-26T11:46:02.568Z │ Content      │ 90     │
2026-01-26T11:46:02.568Z │ Product      │ 50     │
2026-01-26T11:46:02.568Z │ Category     │ 10     │
2026-01-26T11:46:02.568Z │ Quantity     │ 0      │
2026-01-26T11:46:02.568Z │ Order        │ 0      │
2026-01-26T11:46:02.568Z └──────────────┴────────┘
2026-01-26T11:46:02.568Z 📈 Total: 195 records
2026-01-26T11:46:02.568Z ✅ Fixtures created successfully

2026-01-26T11:46:12.990Z ▲ Next.js 16.1.0-canary.13
2026-01-26T11:46:12.991Z - Local:         http://localhost:3000
2026-01-26T11:46:12.991Z - Network:       http://0.0.0.0:3000
2026-01-26T11:46:12.991Z ✓ Starting...
2026-01-26T11:46:13.113Z ✓ Ready in 134ms

// Aucune idée..

2026-01-26T11:47:41.473Z Error: Something went wrong...
2026-01-26T11:47:41.473Z at f.error (.next/server/chunks/ssr/[root-of-the-server]__0a77b0e4._.js:1:1199)
2026-01-26T11:47:41.473Z at f.create (.next/server/chunks/ssr/[root-of-the-server]__0a77b0e4._.js:1:191)
2026-01-26T11:47:41.473Z at async i (.next/server/chunks/ssr/[root-of-the-server]__5458db1c._.js:5:748)
2026-01-26T11:47:41.473Z at async o (.next/server/chunks/ssr/_e89a1a02._.js:1:2110)
2026-01-26T11:47:41.473Z at async n (.next/server/chunks/ssr/_dc26485a._.js:1:7789)

2026-01-26T11:47:41.475Z ⨯ unhandledRejection:  Error: Something went wrong...
2026-01-26T11:47:41.475Z at f.error (.next/server/chunks/ssr/[root-of-the-server]__0a77b0e4._.js:1:1199)
2026-01-26T11:47:41.475Z at f.create (.next/server/chunks/ssr/[root-of-the-server]__0a77b0e4._.js:1:191)
2026-01-26T11:47:41.475Z at async i (.next/server/chunks/ssr/[root-of-the-server]__5458db1c._.js:5:748)
2026-01-26T11:47:41.475Z at async o (.next/server/chunks/ssr/_e89a1a02._.js:1:2110)
2026-01-26T11:47:41.475Z at async n (.next/server/chunks/ssr/_dc26485a._.js:1:7789)

// Lors du checkout

2026-01-26T12:01:05.387Z ┏━ Unsafe Server Action called... ✏️
2026-01-26T12:01:05.387Z ┃
2026-01-26T12:01:05.387Z ┃  Name   -> OrderFindUniqueAction ✅
2026-01-26T12:01:05.387Z ┃  Model  -> Order
2026-01-26T12:01:05.387Z ┃  Method -> findUnique
2026-01-26T12:01:05.387Z ┃
2026-01-26T12:01:05.387Z ┃  Make sure to set up security checks:
2026-01-26T12:01:05.387Z ┃
2026-01-26T12:01:05.387Z ┃    1. Wrap the `/services/actions` basic action in a safe `/process` action
2026-01-26T12:01:05.387Z ┃    2. Use Zod to validate user input data
2026-01-26T12:01:05.387Z ┃    3. Use hasPermission() function to check if the user has the required permissions
2026-01-26T12:01:05.387Z ┃    4. Disable this message by adding `true` to action calls
2026-01-26T12:01:05.387Z ┗━

2026-01-26T12:01:05.404Z ┏━ Unsafe Server Action called... ✏️
2026-01-26T12:01:05.404Z ┃
2026-01-26T12:01:05.404Z ┃  Name   -> OrderUpdateAction ✅
2026-01-26T12:01:05.404Z ┃  Model  -> Order
2026-01-26T12:01:05.404Z ┃  Method -> update
2026-01-26T12:01:05.404Z ┃
2026-01-26T12:01:05.404Z ┃  Make sure to set up security checks:
2026-01-26T12:01:05.404Z ┃
2026-01-26T12:01:05.404Z ┃    1. Wrap the `/services/actions` basic action in a safe `/process` action
2026-01-26T12:01:05.404Z ┃    2. Use Zod to validate user input data
2026-01-26T12:01:05.404Z ┃    3. Use hasPermission() function to check if the user has the required permissions
2026-01-26T12:01:05.404Z ┃    4. Disable this message by adding `true` to action calls
2026-01-26T12:01:05.404Z ┗━
```
