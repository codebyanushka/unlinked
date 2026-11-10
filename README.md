# Unlinked

**See every place your email has been, then take it back.**

Unlinked is a free, open-source privacy tool. Sign in with Google and it shows you:

- **Linked accounts**: every service that sent a welcome or verification email to your Gmail, in the order you joined, with a link to close each account.
- **Breaches**: known data breaches that included your email, what kind of data leaked, and what to do about it.
- **Password check**: whether a password you use has appeared in leaks, checked without the password leaving your browser.
- **Phone and public exposure**: searches for your own email and number, plus removal pages for caller-ID apps, people-search sites and Google.
- **Deletion requests**: ready-to-send letters citing India’s DPDP Act, GDPR or CCPA.
- **PDF report**: everything above as a checklist, created on your device.

## Privacy by design

Unlinked only ever checks the account you sign in with. There is no way to look up someone else.

- The inbox scan requests only the **From** and **Subject** headers (plus Gmail’s date) of signup-type emails. Email bodies are never requested.
- There is **no database**. Results live in your browser tab. The Google token sits in an encrypted cookie and expires within an hour.
- **Signing out revokes** Google access immediately.
- Breaches are shown by name and data type. **Leaked data itself is never shown or stored.**

## How it works

| Feature | Source | Cost |
|---|---|---|
| Sign-in and inbox scan | Google OAuth + Gmail API (read-only) | Free |
| Breach lookup | [XposedOrNot](https://xposedornot.com) public API | Free |
| Password check | [Pwned Passwords](https://haveibeenpwned.com/Passwords) range API (k-anonymity) | Free |
| Hosting | Vercel Hobby plan | Free |

Built with Next.js 16, React 19, TypeScript, Tailwind CSS, NextAuth and jsPDF.

## Run it yourself

Full step-by-step instructions, written for non-developers: **[SETUP.md](SETUP.md)**.

Quick version for developers:

```bash
npm install
cp .env.example .env.local   # fill in the four values
npm run dev                  # http://localhost:3000
```

## Project structure

```
src/
  app/
    page.tsx                 Landing page
    dashboard/page.tsx       Results (signed-in only)
    privacy/, terms/         Legal pages Google requires
    api/auth/[...nextauth]/  Google sign-in
    api/scan/                Scans one page of the inbox per call
    api/breaches/            Breach lookup for the signed-in email only
  components/                Dashboard panels
  lib/                       Gmail, breach, auth and formatting logic
  data/
    services.json            Account deletion links (community-maintained)
    brokers.json             Opt-out pages (community-maintained)
```

## Known limits

- **Gmail only** for the linked-accounts scan. Breach checks work for any email you sign in with.
- **Up to 100 users** until the Google app is verified. See SETUP.md, “Going public”.
- The scan finds accounts that sent a signup email you still have. Deleted emails can’t be found.
- Scans stop at 2,000 matching emails to stay fast.
- Breach coverage is as complete as XposedOrNot’s data.

## Contributing

The easiest way to help is adding deletion links and opt-out pages to the JSON files in `src/data/`. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
