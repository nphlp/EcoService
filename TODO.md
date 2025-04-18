# Todo

Complete auth and user management

## Priority

- Image profile
- Reset password

- Move Shadcn CSS Theme to a dedicated file
- Autorization / Permissions
- Rework Fetch Parallelized V2
- Make API Fetch props "Exact< Schema, S >"
- API and Zod -> Page per page
- Rework frontend
    - Components
    - Theme and styles

## API and Zod -> Page per page

- Create a `external API router` and `Fetch()` (page per page)
- Create a `internal API router` and `PrivateFetch()` (based on Class)
- Server and Client components use `external api`, that use `internal api`, that use `class`
- `Json Web Token` protection on `internal API` ?

## Vrac

- Theme and dark mode
- METADATA !!!!!!!!!
- Cursor rules
- Header disapearing issue ??
- Add a logging system
- Testing for classes
- View Transition ??
- Eslint and Prettier
- Internationalization

## User Experience

- [ ] Header mobile
- [ ] Search: make request and zod validation
- [ ] Accessibility: header menu `enter` key to open menu
- [ ] Filters ring and UI
- [ ] Perspective on catalog page ?

- [ ] Issue: if user is on `/catalog`, header categories link does not refresh the categories list
- [ ] Issue: footer links or scrollbar not clickable

## Stripe

- [ ] Product (CRUD)
- [ ] Clients (CRUD)
- [ ] Adress and payments methods (CRUD)

- [ ] Vendor (CRUD)

    - [ ] Pre-Create (vendor has to completion his inscription on Stripe, to add Iban, personnal informations...)

- [ ] Payment

    - [ ] Buy product (users)
    - [ ] Refound (admin and vendors)
    - [ ] Pay vendors (admin)
    - [ ] Pay myself (admin)

- [ ] Webhook
    - [ ] Send confirmation mail...
        - [ ] An user bought a product: payment succesfuly or failed
        - [ ] An user become a vendor after admin validation

## Authentification

- [ ] Auth

    - [ ] Reset passowrd
    - [ ] OTP / 2FA
    - [ ] Magic link / Passkey

- [ ] Edit profile

    - [ ] Image
    - [ ] Firstname
    - [ ] Lastname
    - [ ] Email
    - [ ] Password

- [ ] Session
    - [ ] See all session: `Browser` / `IP` / `OS` / `Last activity`
    - [ ] Disconnect: `only one` / `all others` / `all sessions`
