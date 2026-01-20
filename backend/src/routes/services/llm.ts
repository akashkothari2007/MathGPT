import { TimelineSchema } from "./schema";
import { buildPrompt } from "./prompt";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.DEEPSEEK_API_KEY;

type DeepSeekResponse = {
  choices?: {
    message?: {
      content?: string;
    };
  }[];
};

export async function generateTimeline(question: string) {
  console.log('[Backend] [LLM] Generating timeline for question:', question);
  console.log('[Backend] [LLM] Using API key:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'MISSING');
  
  const prompt = buildPrompt(question);
  console.log('[Backend] [LLM] Built prompt, length:', prompt.length, 'characters');
  console.log('[Backend] [LLM] Prompt preview (first 300 chars):', prompt.substring(0, 300));

  const endpoint = "https://api.deepseek.com/v1/chat/completions";
  console.log('[Backend] [LLM] Sending request to DeepSeek API:', endpoint);

  const requestBody = {
    model: "deepseek-chat",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 4000,
    temperature: 0.2,
  };
  console.log('[Backend] [LLM] Request body:', JSON.stringify({ ...requestBody, messages: [{ ...requestBody.messages[0], content: `[${requestBody.messages[0].content.length} chars]` }] }, null, 2));

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  });

  console.log('[Backend] [LLM] Response received - status:', response.status, response.statusText);

  // ✅ First, await and assign to `any`
  const rawData: any = await response.json();
  console.log('[Backend] [LLM] Response parsed, keys:', Object.keys(rawData));
  console.log('[Backend] [LLM] Response model:', rawData.model);
  console.log('[Backend] [LLM] Token usage:', JSON.stringify(rawData.usage, null, 2));

  // ✅ Then cast to our type
  const data = rawData as DeepSeekResponse;

  let textResponse = data.choices?.[0]?.message?.content ?? "";
  console.log('[Backend] [LLM] Extracted text response, length:', textResponse.length);
  console.log('[Backend] [LLM] Text response preview (first 300 chars):', textResponse.substring(0, 300));
  
  if (!textResponse) {
    console.error('[Backend] No output text from LLM. Full response:', JSON.stringify(data, null, 2));
    throw new Error("LLM returned no output text");
  }

  // Clean JSON response - remove markdown code blocks if present
  textResponse = textResponse.trim();
  if (textResponse.startsWith('```json')) {
    textResponse = textResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (textResponse.startsWith('```')) {
    textResponse = textResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  textResponse = textResponse.trim();
  console.log(textResponse)
  textResponse = textResponse.replace(/Math\.PI/g, '3.14159265359')
  let timelineData: unknown;
  try {
    timelineData = JSON.parse(textResponse);
    console.log('[Backend] Successfully parsed JSON. Type:', Array.isArray(timelineData) ? 'array' : typeof timelineData);
    if (Array.isArray(timelineData)) {
      console.log('[Backend] Timeline has', timelineData.length, 'actions');
    }
  } catch (err) {
    console.error('[Backend] Failed to parse JSON. Error:', err);
    console.error('[Backend] Text response that failed to parse (first 500 chars):', textResponse.substring(0, 500));
    throw new Error("Failed to parse JSON:\n" + textResponse.substring(0, 500));
  }

  console.log('[Backend] [LLM] Validating with Zod schema...');
  const parsed = TimelineSchema.parse(timelineData);
  console.log('[Backend] [LLM] Zod validation passed. Timeline has', parsed.length, 'steps');
  console.log('[Backend] [LLM] Returning validated timeline to route handler');
  return parsed;
}
