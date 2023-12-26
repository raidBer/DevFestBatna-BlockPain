import Replicate from "replicate";
import { ReplicateStream, StreamingTextResponse } from "ai";
export const runtime = "edge";

const token = process.env.NEXT_REPLICATE_API_TOKEN;
const replicate = new Replicate({
  auth: token,
});

if (!token) {
  throw new Error("The REPLICATE_API_TOKEN environment variable is not set.");
}

const VERSIONS = {
  "yorickvp/llava-13b":
    "e272157381e2a3bf12df3a8edd1f38d1dbd736bbb7437277c8b34175f8fce358",
  "nateraw/salmonn":
    "ad1d3f9d2bd683628242b68d890bef7f7bd97f738a7c2ccbf1743a594c723d83",
};

export async function POST(req) {
  const params = await req.json();

  let response = await runLlama({ ...params, model: "meta/llama-2-70b-chat" });

  // Convert the response into a friendly text-stream
  const stream = await ReplicateStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

async function runLlama({ model, prompt, maxTokens, temperature, topP }) {
  console.log("model", model);

  return await replicate.predictions.create({
    model: model,
    stream: true,
    input: {
      prompt: `${prompt}`,
      prompt_template: "{prompt}",
      max_new_tokens: maxTokens,
      temperature: temperature,
      repetition_penalty: 1,
      top_p: topP,
    },
  });
}
