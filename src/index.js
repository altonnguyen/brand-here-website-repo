const ALLOWED_ORIGINS = new Set([
  "https://brandhere.co",
  "https://www.brandhere.co",
  "https://brand-here-website-repo.alton-nguyen-87.workers.dev",
]);

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

async function getGraphToken(env) {
  const response = await fetch(
    `https://login.microsoftonline.com/${env.MS_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: env.MS_CLIENT_ID,
        client_secret: env.MS_CLIENT_SECRET,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    },
  );

  if (!response.ok) throw new Error("Unable to authenticate with Microsoft Graph");
  return (await response.json()).access_token;
}

async function handleContact(request, env) {
  const origin = request.headers.get("Origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return json({ ok: false, error: "Origin not allowed" }, 403);
  }

  if (!env.MS_TENANT_ID || !env.MS_CLIENT_ID || !env.MS_CLIENT_SECRET) {
    return json({ ok: false, error: "Contact service is not configured" }, 503);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request" }, 400);
  }

  const name = String(data.name || "").trim();
  const company = String(data.company || "").trim();
  const email = String(data.email || "").trim();
  const message = String(data.message || "").trim();
  const honeypot = String(data.website || "").trim();

  if (honeypot) return json({ ok: true });
  if (!name || !email || !message) {
    return json({ ok: false, error: "Please complete all required fields" }, 400);
  }
  if (name.length > 120 || company.length > 160 || email.length > 254 || message.length > 5000) {
    return json({ ok: false, error: "Submission is too long" }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "Please enter a valid email address" }, 400);
  }

  const token = await getGraphToken(env);
  const safeName = escapeHtml(name);
  const safeCompany = escapeHtml(company || "Not provided");
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");

  const response = await fetch(
    "https://graph.microsoft.com/v1.0/users/alton@brandhere.co/sendMail",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: `Website enquiry — ${name}${company ? `, ${company}` : ""}`,
          body: {
            contentType: "HTML",
            content: `<h2>New Brand Here website enquiry</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Company:</strong> ${safeCompany}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>What they are looking to solve:</strong><br>${safeMessage}</p>`,
          },
          toRecipients: [
            { emailAddress: { address: "hello@brandhere.co" } },
          ],
          replyTo: [
            { emailAddress: { address: email, name } },
          ],
        },
        saveToSentItems: true,
      }),
    },
  );

  if (!response.ok) throw new Error("Microsoft Graph rejected the message");
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return json({ ok: false, error: "Method not allowed" }, 405);
      }

      try {
        return await handleContact(request, env);
      } catch (error) {
        console.error("Contact form error", error);
        return json({ ok: false, error: "Unable to send message" }, 500);
      }
    }

    return env.ASSETS.fetch(request);
  },
};
