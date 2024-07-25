import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = import.meta.env.VITE_API_KEY;

export const runChat = async ({
  profession,
  country,
  salary,
  currency_type,
  age,
  marital_status,
  goal,
  dependence,
  tax,
  debts,
}) => {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chat.sendMessage(
    `hello bot i am ${profession} living in ${country} and my salary is ${salary} ${currency_type} per month. Other info age = ${age}, Martial Status = ${marital_status}, Dependents = ${dependence}.I pay ${tax}% in taxes and ${debts} ${currency_type} deductive from my salary for my debts. My financial goal is ${goal}. Create financial plan for me`
  );
  const response = result.response;
  console.log();
  console.log(response?.candidates[0]?.content?.parts[0]?.text);
  return response.text();
};
