// /lib/judge0.ts
import axios from "axios";

const JUDGE0_API_URL = process.env.NEXT_PUBLIC_JUDGE0_API_URL!;
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY!;

export const executeCode = async (
  language_id: number,
  source_code: string,
  stdin: string = ""
) => {
  try {
    console.log(
      "Heelo from execute code\n",
      "here is code ",
      source_code,
      "\nlanguageID ",
      language_id
    );
    const response = await axios.post(
      `${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
      {
        language_id,
        source_code,
        stdin,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Judge0 API Error:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Judge0 request failed");
  }
};
