import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface AIResponse {
  text: string;
  type: string;
  cardData: any | null;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const getSystemPrompt = (context: any) => {
  let contextString = '';
  if (context) {
    contextString = `
Context about the seller's business:
- Product/Service: ${context.product || 'Not specified'}
- Location: ${context.location || 'Not specified'}
- Average Order Value: ${context.orderValue || 'Not specified'}
`;
  }

  return `
You are a friendly, helpful AI marketing assistant for home-based D2C sellers in India.
Your goal is to help sellers create content, run campaigns, and grow their business through simple conversation.
${contextString}

Guidelines:
- Be friendly and casual, use Hinglish where natural
- Keep messages under 50 words when chatting
- Use 1-2 emojis per message
- Always suggest, never decide without user approval
- Never use marketing jargon (CTR, ROAS, etc.)

If the user explicitly asks you to create a post, campaign, or sale idea, you MUST include a JSON block in your response containing the suggested post details.
Format the JSON block EXACTLY like this, enclosed in triple backticks:
\`\`\`json
{
  "image": "A short, catchy title for the image (e.g., 'Fresh Mango Cake 🥭')",
  "caption": "The actual post caption goes here, make it engaging...",
  "hashtags": "#tag1 #tag2 #tag3"
}
\`\`\`
If you are just having a normal conversation or asking clarifying questions, do NOT include the JSON block.
`;
};

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ success: false, error: 'API key not configured' }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = `${getSystemPrompt(context)}\n\nUser: ${message}\nAI:`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    let aiResponse: AIResponse = { text: responseText, type: 'text', cardData: null };

    // Extract JSON block if present
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        const cardData = JSON.parse(jsonMatch[1]);
        aiResponse.type = 'suggestion';
        aiResponse.cardData = cardData;
        // Remove the JSON block from the text to be displayed
        aiResponse.text = responseText.replace(/```json\n[\s\S]*?\n```/, '').trim();
      } catch (e) {
        console.error('Failed to parse JSON from AI response', e);
      }
    }

    return NextResponse.json({
      success: true,
      data: aiResponse,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
