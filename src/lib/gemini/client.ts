import { GoogleGenAI } from '@google/genai';

export function getApiKey(): string {
  if (typeof window !== 'undefined') {
    const customKey = localStorage.getItem('fwd_gemini_api_key');
    if (customKey && customKey.trim().length > 0) {
      return customKey.trim();
    }
  }
  const envKey = (import.meta as unknown as { env: { VITE_GEMINI_API_KEY?: string } }).env?.VITE_GEMINI_API_KEY;
  return envKey || '';
}

export function createGeminiClient(): GoogleGenAI | null {
  const apiKey = getApiKey();
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

export const ai = new GoogleGenAI({ apiKey: getApiKey() });
