
export const generateAIResponse = async (
  message: string,
  apiKey: string | null
): Promise<string> => {
  if (!apiKey) {
    return "Please provide your Perplexity API key to enable AI responses.";
  }

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
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
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I apologize, but I'm having trouble connecting to my AI services right now. Please try again later or check your API key.";
  }
};
