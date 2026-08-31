const ALLOWED_ORIGINS = new Set([
  "https://brandhere.co",
  "https://www.brandhere.co",
  "https://brand-here-website-repo.alton-nguyen-87.workers.dev",
]);

const PERMANENT_REDIRECTS = new Map([
  ["/advisory-lab", "/labs"],
  ["/alignment-lab", "/labs"],
  ["/commerce-lab", "/market-brand"],
  ["/executive-ai-lab", "/labs"],
  ["/next-stage", "/adaptation"],
  ["/vi/advisory-lab", "/vi/labs"],
  ["/vi/alignment-lab", "/vi/labs"],
  ["/vi/commerce-lab", "/vi/market-brand"],
  ["/vi/executive-ai-lab", "/vi/labs"],
  ["/vi/next-stage", "/vi/adaptation"],
]);

const OG_IMAGE_BY_PAGE = new Map([
  ["/", "home.jpg"],
  ["/index.html", "home.jpg"],
  ["/vi/", "home.jpg"],
  ["/vi/index.html", "home.jpg"],
  ["/about", "about.jpg"],
  ["/about.html", "about.jpg"],
  ["/vi/about", "about.jpg"],
  ["/vi/about.html", "about.jpg"],
  ["/adaptation", "adaptation.jpg"],
  ["/adaptation.html", "adaptation.jpg"],
  ["/vi/adaptation", "adaptation.jpg"],
  ["/vi/adaptation.html", "adaptation.jpg"],
  ["/labs", "labs.jpg"],
  ["/labs.html", "labs.jpg"],
  ["/vi/labs", "labs.jpg"],
  ["/vi/labs.html", "labs.jpg"],
  ["/intelligence", "intelligence.jpg"],
  ["/intelligence.html", "intelligence.jpg"],
  ["/vi/intelligence", "intelligence.jpg"],
  ["/vi/intelligence.html", "intelligence.jpg"],
  ["/insights", "insights.jpg"],
  ["/insights.html", "insights.jpg"],
  ["/vi/insights", "insights.jpg"],
  ["/vi/insights.html", "insights.jpg"],
  ["/work", "work.jpg"],
  ["/work.html", "work.jpg"],
  ["/vi/work", "work.jpg"],
  ["/vi/work.html", "work.jpg"],
]);

const EDITORIAL_IMAGES_BY_PAGE = new Map([
  ["/labs", [
    "/images/editorial/labs/adoption-gap.jpg",
    "/images/editorial/labs/marketing-model-after-ai.jpg",
    "/images/editorial/labs/ai-brand-mirror.jpg",
    "/images/editorial/labs/agency-model-2030.jpg",
  ]],
  ["/vi/labs", [
    "/images/editorial/labs/adoption-gap.jpg",
    "/images/editorial/labs/marketing-model-after-ai.jpg",
    "/images/editorial/labs/ai-brand-mirror.jpg",
    "/images/editorial/labs/agency-model-2030.jpg",
  ]],
  ["/intelligence", [
    "/images/editorial/intelligence/ai-adoption-index.jpg",
    "/images/editorial/intelligence/marketing-adaptation-index.jpg",
    "/images/editorial/intelligence/ai-reputation-intelligence.jpg",
    "/images/editorial/intelligence/agency-model-diagnostic.jpg",
  ]],
  ["/vi/intelligence", [
    "/images/editorial/intelligence/ai-adoption-index.jpg",
    "/images/editorial/intelligence/marketing-adaptation-index.jpg",
    "/images/editorial/intelligence/ai-reputation-intelligence.jpg",
    "/images/editorial/intelligence/agency-model-diagnostic.jpg",
  ]],
  ["/insights", [
    "/images/editorial/insights/technology-ready-business.jpg",
    "/images/editorial/insights/access-adoption-impact.jpg",
    "/images/editorial/insights/missing-middle.jpg",
    "/images/editorial/insights/agency-faster-marketing-better.jpg",
    "/images/editorial/insights/ai-customer-first-adviser.jpg",
  ]],
  ["/vi/insights", [
    "/images/editorial/insights/technology-ready-business.jpg",
    "/images/editorial/insights/access-adoption-impact.jpg",
    "/images/editorial/insights/missing-middle.jpg",
    "/images/editorial/insights/agency-faster-marketing-better.jpg",
    "/images/editorial/insights/ai-customer-first-adviser.jpg",
  ]],
  ["/work", ["/images/editorial/work/case-zero.jpg"]],
  ["/vi/work", ["/images/editorial/work/case-zero.jpg"]],
]);

const withoutHtmlSuffix = (pathname) =>
  pathname.endsWith(".html") ? pathname.slice(0, -5) : pathname;

async function enhanceProductionImages(request, env, canonicalPath, ogFilename) {
  const pageResponse = await env.ASSETS.fetch(request);
  if (!pageResponse.ok || !pageResponse.headers.get("Content-Type")?.startsWith("text/html")) {
    return pageResponse;
  }

  const editorialPaths = EDITORIAL_IMAGES_BY_PAGE.get(canonicalPath) || [];
  const checks = editorialPaths.map(async (pathname) => {
    const response = await env.ASSETS.fetch(new Request(new URL(pathname, request.url), { method: "HEAD" }));
    return response.ok && response.headers.get("Content-Type")?.startsWith("image/jpeg") ? pathname : null;
  });

  let ogImageUrl = null;
  if (ogFilename) {
    const candidate = new URL(`/images/og/${ogFilename}`, request.url);
    checks.push((async () => {
      const response = await env.ASSETS.fetch(new Request(candidate, { method: "HEAD" }));
      if (response.ok && response.headers.get("Content-Type")?.startsWith("image/jpeg")) ogImageUrl = candidate;
      return null;
    })());
  }

  const availableEditorial = new Set((await Promise.all(checks)).filter(Boolean));
  if (!ogImageUrl && !availableEditorial.size) return pageResponse;

  const rewriter = new HTMLRewriter();
  if (ogImageUrl) {
    rewriter
      .on('meta[property="og:image"]', {
        element(element) { element.setAttribute("content", ogImageUrl.href); },
      })
      .on('meta[name="twitter:image"]', {
        element(element) { element.setAttribute("content", ogImageUrl.href); },
      });
  }
  if (availableEditorial.size) {
    rewriter.on('.editorial-media-slot[data-image-src]', {
      element(element) {
        const source = element.getAttribute("data-image-src");
        if (source && availableEditorial.has(new URL(source, request.url).pathname)) {
          element.setAttribute("data-image-available", "true");
        }
      },
    });
  }
  return rewriter.transform(pageResponse);
}

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

async function handleRsvp(request, env) {
  const origin = request.headers.get("Origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) return json({ ok: false, error: "Origin not allowed" }, 403);
  if (!env.MS_TENANT_ID || !env.MS_CLIENT_ID || !env.MS_CLIENT_SECRET) return json({ ok: false, error: "RSVP service is not configured" }, 503);

  let data;
  try { data = await request.json(); } catch { return json({ ok: false, error: "Invalid request" }, 400); }
  const fields = ["name", "title", "company", "email", "phone", "size", "adoption", "priority", "decision", "connections", "source"];
  const values = Object.fromEntries(fields.map((key) => [key, String(data[key] || "").trim()]));
  if (String(data.website || "").trim()) return json({ ok: true });
  if (!values.name || !values.title || !values.company || !values.email || !values.phone || !values.size || !values.adoption || !values.priority || !values.decision || !data.consent) return json({ ok: false, error: "Please complete all required fields" }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return json({ ok: false, error: "Invalid email" }, 400);
  if (values.priority.length > 1200 || values.decision.length > 1200 || values.connections.length > 1200) return json({ ok: false, error: "Submission is too long" }, 400);

  const safe = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, escapeHtml(value || "Not provided").replaceAll("\n", "<br>")]));
  const token = await getGraphToken(env);
  const response = await fetch("https://graph.microsoft.com/v1.0/users/alton@brandhere.co/sendMail", {
    method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ message: {
      subject: `AI Adoption Workshop RSVP — ${values.name}, ${values.company}`,
      body: { contentType: "HTML", content: `<h2>New RSVP — From AI Ambition to Team Adoption</h2><p><strong>Name:</strong> ${safe.name}</p><p><strong>Title:</strong> ${safe.title}</p><p><strong>Company:</strong> ${safe.company}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Phone:</strong> ${safe.phone}</p><p><strong>Company size:</strong> ${safe.size}</p><p><strong>Current AI adoption:</strong> ${safe.adoption}</p><p><strong>12-month priority:</strong><br>${safe.priority}</p><p><strong>Hardest decision:</strong><br>${safe.decision}</p><p><strong>Desired connections:</strong><br>${safe.connections}</p><p><strong>Acquisition source:</strong> ${safe.source}</p>` },
      toRecipients: [{ emailAddress: { address: "hello@brandhere.co" } }], replyTo: [{ emailAddress: { address: values.email, name: values.name } }]
    }, saveToSentItems: true })
  });
  if (!response.ok) throw new Error("Microsoft Graph rejected the RSVP");
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const canonicalPath = withoutHtmlSuffix(url.pathname);

    const redirectTarget = PERMANENT_REDIRECTS.get(canonicalPath);
    if (redirectTarget) {
      const destination = new URL(redirectTarget, url);
      destination.search = url.search;
      return Response.redirect(destination.href, 301);
    }

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

    if (url.pathname === "/api/rsvp") {
      if (request.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);
      try { return await handleRsvp(request, env); } catch (error) { console.error("RSVP form error", error); return json({ ok: false, error: "Unable to submit RSVP" }, 500); }
    }

    const ogFilename = OG_IMAGE_BY_PAGE.get(url.pathname);
    if (ogFilename && request.method === "GET") {
      return enhanceProductionImages(request, env, canonicalPath, ogFilename);
    }

    return env.ASSETS.fetch(request);
  },
};
