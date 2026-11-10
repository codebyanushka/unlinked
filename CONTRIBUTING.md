# Contributing to Unlinked

Thanks for helping people take control of their data.

## The easiest contribution: update the lists

You don’t need to write code. Two files hold most of the useful knowledge:

- **`src/data/services.json`**: how to close accounts on popular services.
- **`src/data/brokers.json`**: opt-out pages for caller-ID apps and people-search sites.

To add a service, add an entry keyed by its main domain:

```json
"example.com": {
  "name": "Example",
  "deleteUrl": "https://example.com/settings/delete",
  "how": "Optional short instructions, e.g. Settings → Account → Delete account.",
  "aliases": ["mail.example.com", "examplemail.com"]
}
```

- `deleteUrl`: the page where the user closes the account. Use `null` if it can only be done in an app.
- `aliases`: other domains the service sends email from, so they group together.

Please **check every link yourself** before submitting, and prefer the company’s official page over third-party guides. Opt-out entries for India and other underrepresented regions are especially welcome.

## Code contributions

1. Fork the repo and create a branch.
2. `npm install`, then `npm run dev`. See SETUP.md for the environment variables.
3. Run `npm run build` before opening a pull request to catch type errors.

## Ground rules

These keep Unlinked safe. Pull requests that break them won’t be merged.

- **Only the signed-in user’s own data.** No feature may look up an email, phone number or person the user hasn’t proven they own.
- **No storage.** No database, no logging of emails, numbers or results.
- **Minimum access.** Gmail requests stay limited to message headers. Never fetch email bodies.
- **No leaked data.** Show where someone was exposed and what kind of data, never the leaked values.
- **No probing other sites.** Don’t test whether an email is registered by hitting other sites’ signup or password-reset forms.

## Reporting a security issue

Please don’t open a public issue for security problems. Contact the maintainer privately through GitHub’s **Report a vulnerability** button on the repository’s Security tab.
