// GitHub OAuth for Decap CMS on Vercel

export default async function handler(req, res) {
  const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
  
  if (!CLIENT_ID || !CLIENT_SECRET) {
    return res.status(500).json({ 
      error: 'OAuth not configured',
      hasClientId: !!CLIENT_ID,
      hasClientSecret: !!CLIENT_SECRET
    });
  }

  const { code } = req.query;
  const host = req.headers.host;
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const redirectUri = `${protocol}://${host}/api/auth`;

  // Step 1: No code = redirect to GitHub
  if (!code) {
    const authUrl = new URL('https://github.com/login/oauth/authorize');
    authUrl.searchParams.set('client_id', CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('scope', 'repo,user');
    
    return res.redirect(302, authUrl.toString());
  }

  // Step 2: Exchange code for token
  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await tokenResponse.json();

    if (data.error) {
      throw new Error(data.error_description || data.error);
    }

    if (!data.access_token) {
      throw new Error('No access token received');
    }

    // Return HTML that sends message to opener window (Decap CMS format)
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Authenticating...</title>
</head>
<body>
<p>Authenticating with GitHub...</p>
<script>
(function() {
  var token = "${data.access_token}";
  var provider = "github";
  
  if (window.opener) {
    // Decap CMS expects this exact message format
    window.opener.postMessage(
      "authorization:" + provider + ":success:" + JSON.stringify({token: token, provider: provider}),
      "*"
    );
    setTimeout(function() { window.close(); }, 500);
  } else {
    document.body.innerHTML = '<p>Success! Token received. You can close this window.</p>';
  }
})();
</script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);

  } catch (error) {
    console.error('OAuth error:', error);
    
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Authentication Error</title>
</head>
<body>
<p>Authentication error: ${error.message || 'Unknown error'}</p>
<script>
(function() {
  if (window.opener) {
    window.opener.postMessage(
      "authorization:github:error:" + JSON.stringify({error: "${error.message || 'Unknown error'}"}),
      location.origin
    );
    setTimeout(function() { window.close(); }, 2000);
  }
})();
</script>
<p><a href="/admin/">Back to admin</a></p>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  }
}
