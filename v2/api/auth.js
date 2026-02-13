// GitHub OAuth for Decap CMS on Vercel
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export default async function handler(req, res) {
  const { code } = req.query;
  
  if (!code) {
    // Redirect to GitHub OAuth
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user`;
    return res.redirect(authUrl);
  }
  
  // Exchange code for token
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
      }),
    });
    
    const data = await response.json();
    
    if (data.access_token) {
      // Return HTML that posts message to parent window
      const html = `
        <script>
          const token = "${data.access_token}";
          const provider = "github";
          
          if (window.opener) {
            window.opener.postMessage(
              'authorization:github:success:{"token":"' + token + '","provider":"' + provider + '"}',
              window.location.origin
            );
            window.close();
          }
        </script>
      `;
      res.setHeader('Content-Type', 'text/html');
      return res.send(html);
    } else {
      throw new Error(data.error_description || 'Failed to get token');
    }
  } catch (error) {
    const html = `
      <script>
        window.opener.postMessage(
          'authorization:github:error:' + ${JSON.stringify(error.message)},
          window.location.origin
        );
        window.close();
      </script>
    `;
    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
  }
}
