// API endpoint for handling website change requests

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = 'vinaysolapurkar/vedantadfw';
const BRANCH = 'master';
const REQUESTS_FILE = 'v2/content/requests.json';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  try {
    if (req.method === 'GET') {
      // Fetch existing requests
      const response = await fetch(`https://api.github.com/repos/${REPO}/contents/${REQUESTS_FILE}?ref=${BRANCH}`, {
        headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
      });
      
      if (response.status === 404) {
        return res.status(200).json({ requests: [], sha: null });
      }
      
      const data = await response.json();
      const content = JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'));
      return res.status(200).json({ requests: content, sha: data.sha });
    }
    
    if (req.method === 'POST') {
      const newRequest = req.body;
      
      // Validate required fields
      if (!newRequest.name || !newRequest.email || !newRequest.title || !newRequest.details) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      // Get existing requests
      let requests = [];
      let sha = null;
      
      const getResponse = await fetch(`https://api.github.com/repos/${REPO}/contents/${REQUESTS_FILE}?ref=${BRANCH}`, {
        headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
      });
      
      if (getResponse.ok) {
        const data = await getResponse.json();
        sha = data.sha;
        requests = JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'));
      }
      
      // Add new request
      const fullRequest = {
        id: Date.now().toString(),
        ...newRequest,
        status: 'pending',
        submittedAt: new Date().toISOString()
      };
      
      requests.unshift(fullRequest);
      
      // Save to GitHub
      const content = JSON.stringify(requests, null, 2);
      const body = {
        message: `New request: ${newRequest.title} (by ${newRequest.name})`,
        content: Buffer.from(content).toString('base64'),
        branch: BRANCH
      };
      if (sha) body.sha = sha;
      
      const saveResponse = await fetch(`https://api.github.com/repos/${REPO}/contents/${REQUESTS_FILE}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      if (saveResponse.ok) {
        return res.status(200).json({ success: true, request: fullRequest });
      } else {
        const error = await saveResponse.json();
        throw new Error(error.message);
      }
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('Request API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
