// Simple test endpoint
export default function handler(req, res) {
  const hasKey = !!process.env.DEEPSEEK_API_KEY;
  const keyLength = process.env.DEEPSEEK_API_KEY?.length || 0;
  return res.status(200).json({ 
    hasKey, 
    keyLength,
    nodeVersion: process.version 
  });
}
