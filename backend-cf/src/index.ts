import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
  GEMINI_API_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
}))

app.post('/api/feedback', async (c) => {
  const body = await c.req.json()
  const { topic, name, feedback, suggestion, rating } = body

  if (!topic || !feedback || !rating) {
    return c.json({ error: 'Missing required fields' }, 400)
  }

  const { success } = await c.env.DB.prepare(
    'INSERT INTO feedbacks (topic, name, feedback, suggestion, rating) VALUES (?1, ?2, ?3, ?4, ?5)'
  ).bind(topic, name || 'Anonymous', feedback, suggestion || '', rating).run()

  if (success) {
    return c.json({ message: 'Feedback stored successfully' }, 201)
  }
  return c.json({ error: 'Failed to store feedback' }, 500)
})

app.get('/api/feedback', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM feedbacks ORDER BY created_at DESC').all()
  return c.json(results)
})

app.post('/api/ai/chat', async (c) => {
  const { prompt } = await c.req.json()
  
  if (!prompt) return c.json({ error: 'Prompt is required' }, 400)
  
  const apiKey = c.env.GEMINI_API_KEY
  if (!apiKey) return c.json({ error: 'AI not configured on server (Missing Gemini API Key)' }, 500)

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }]}]
      })
    })
    
    const data = await response.json() as any;
    
    if (data.error) {
       return c.json({ error: data.error.message }, 500)
    }

    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received"
    return c.json({ response: aiText })
  } catch (err) {
    return c.json({ error: 'AI service unavailable' }, 500)
  }
})

app.get('/', (c) => {
  return c.text('AlgoLabs API Running (Cloudflare Worker)!')
})

export default app
