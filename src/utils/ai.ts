
export type AIProvider = 'openai' | 'gemini';

export const generateAIResponse = async (
  message: string,
  apiKey: string | null,
  provider: AIProvider = 'openai'
): Promise<string> => {
  if (!apiKey) {
    return `Please provide your ${provider === 'gemini' ? 'Gemini' : 'OpenAI'} API key to enable AI responses.`;
  }

  try {
    if (provider === 'gemini') {
      return await generateGeminiResponse(message, apiKey);
    } else {
      return await generateOpenAIResponse(message, apiKey);
    }
  } catch (error) {
    console.error(`Error generating ${provider} response:`, error);
    return "I apologize, but I'm having trouble connecting to my AI services right now. Please try again later or check your API key.";
  }
};

const generateOpenAIResponse = async (message: string, apiKey: string): Promise<string> => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-2025-04-14',
      messages: [
        {
          role: 'system',
          content: 'You are Refy, a friendly and helpful virtual assistant for Ref OS. Keep responses concise and focused on helping users navigate and use the operating system effectively.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate response');
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

const generateGeminiResponse = async (message: string, apiKey: string): Promise<string> => {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are Refy, a friendly and helpful virtual assistant for Ref OS. Keep responses concise and focused on helping users navigate and use the operating system effectively.\n\nUser: ${message}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 150,
      }
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate response');
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};
