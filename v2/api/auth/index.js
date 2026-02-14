// GitHub OAuth authorize redirect
export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = 'https://v2-sigma-two.vercel.app/api/auth/callback';
  const scope = 'repo,user';
  
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
  
  res.redirect(authUrl);
}
