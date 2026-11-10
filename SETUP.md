# Setup guide

This takes about 20 minutes and costs nothing. You need a Google account, a GitHub account and a Vercel account (sign up for Vercel with GitHub).

There are four parts: put the code on GitHub, deploy it to Vercel, set up Google sign-in, then connect them.

---

## Part 1: Put the code on GitHub

1. Go to [github.com/new](https://github.com/new).
2. Name the repository `unlinked`, choose **Public** (it’s open source), and click **Create repository**.
3. On the next page, click **uploading an existing file**.
4. Unzip the project and drag **all the files and folders inside it** into the upload area. Don’t upload a `node_modules` or `.next` folder if you have one.
5. Click **Commit changes**.

## Part 2: Deploy to Vercel (first time)

1. Go to [vercel.com/new](https://vercel.com/new) and import your `unlinked` repository.
2. Leave every setting as it is and click **Deploy**.
3. When it finishes, copy your site address, for example `https://unlinked-abc.vercel.app`. You need it in the next part.

Sign-in won’t work yet. That’s expected.

## Part 3: Set up Google sign-in

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and create a new project called **Unlinked**.
2. **Turn on Gmail access.** Search the top bar for **Gmail API**, open it and click **Enable**.
3. **Set up the consent screen.** Open **Google Auth Platform** (search “OAuth consent screen” if you can’t find it) and click **Get started**:
   - App name: `Unlinked`. Support email: your email.
   - Audience: **External**.
   - Contact email: your email. Agree and click **Create**.
4. **Add app details.** Under **Branding**, fill in:
   - Application home page: your Vercel address
   - Privacy policy: your Vercel address + `/privacy`
   - Terms of service: your Vercel address + `/terms`
5. **Add permissions.** Under **Data access**, click **Add or remove scopes** and tick:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
   - `https://www.googleapis.com/auth/gmail.readonly` (search for “gmail.readonly” if it isn’t listed)

   Click **Update**, then **Save**.
6. **Add testers.** Under **Audience**, find **Test users**, click **Add users**, and add your own Gmail address plus anyone else who will use the site (up to 100).
7. **Create the login keys.** Under **Clients**, click **Create client**:
   - Application type: **Web application**
   - Authorized JavaScript origins: add your Vercel address and `http://localhost:3000`
   - Authorized redirect URIs: add your Vercel address + `/api/auth/callback/google`, and `http://localhost:3000/api/auth/callback/google`
   - Click **Create**, then copy the **Client ID** and **Client secret**.

## Part 4: Connect Vercel to Google

1. In Vercel, open your project, then **Settings → Environment Variables**. Add these:

   | Name | Value |
   |---|---|
   | `NEXTAUTH_URL` | Your Vercel address, e.g. `https://unlinked-abc.vercel.app` |
   | `NEXTAUTH_SECRET` | A random string from [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32) |
   | `GOOGLE_CLIENT_ID` | The Client ID from Part 3 |
   | `GOOGLE_CLIENT_SECRET` | The Client secret from Part 3 |
   | `NEXT_PUBLIC_REPO_URL` | Your GitHub repo address (optional, shown in the footer) |

2. Go to **Deployments**, open the menu on the latest one and click **Redeploy**.

Open your site and click **Check my email with Google**. Google will warn that the app isn’t verified. That’s normal for test mode: click **Continue**, tick the Gmail permission and allow.

---

## Troubleshooting

**“Access blocked” or “app has not completed the Google verification process”**
The account isn’t on the test user list. Add it in Part 3, step 6.

**“redirect_uri_mismatch”**
The redirect address in Google doesn’t exactly match your site. Check Part 3, step 7: it must be your exact Vercel address + `/api/auth/callback/google`, with `https` and no trailing slash.

**“Gmail access wasn’t granted”**
On Google’s permission screen, the Gmail checkbox was left unticked. Sign in again and tick it.

**Breach check says the service didn’t respond**
XposedOrNot limits how often it can be called. Wait a minute and press **Check again**.

**Sign-in loops back to the home page**
Check that `NEXTAUTH_URL` matches your site address exactly and that `NEXTAUTH_SECRET` is set, then redeploy.

## Using your own domain

Add the domain in Vercel under **Settings → Domains**. Then update `NEXTAUTH_URL`, and add the new address to the origins, redirect URIs and branding pages in Google (Part 3, steps 4 and 7). Redeploy.

## Going public (more than 100 users)

To let anyone sign in, click **Publish app** under **Audience** in Google Auth Platform. Because Unlinked reads Gmail, Google treats it as a “restricted scope” app and requires:

- Verified ownership of your domain (a `vercel.app` address won’t do; you need your own domain)
- A short demo video showing how the app uses Gmail
- An independent security assessment, which may have a fee depending on the assessor

Being open source helps here, because reviewers can read exactly what the code does. Until then, test mode with up to 100 users works indefinitely.

## Running it on your own computer

You need [Node.js](https://nodejs.org) 20.9 or newer.

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` with the same values as Part 4, but set `NEXTAUTH_URL=http://localhost:3000`. Then run `npm run dev` and open http://localhost:3000.
