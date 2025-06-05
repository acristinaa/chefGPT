import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

type RecipeContext = {
  content: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  // 1. Embed the user question
  const [{ embedding }] = await openai.embeddings
    .create({ model: "text-embedding-ada-002", input: question })
    .then((r) => r.data);

  // 2. Retrieve similar chunks
  const { data: contexts, error } = await supabase.rpc(
    "match_recipe_sections",
    {
      query_embedding: embedding,
      match_threshold: 0.8,
      match_count: 10,
    }
  );
  if (error) return NextResponse.json({ error }, { status: 500 });

  // 3. Build a prompt
  const contextText = contexts.map((c: RecipeContext) => c.content).join("\n---\n");
  const system = `You are a polite cooking assistant. Use ONLY the context.`;
  const user = `Context:\n${contextText}\n\nQuestion: ${question}`;

  // 4. Ask OpenAI (streaming skipped for brevity)
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: system }, { role: "user", content: user }],
  });

  return NextResponse.json({ answer: completion.choices[0].message.content });
}
