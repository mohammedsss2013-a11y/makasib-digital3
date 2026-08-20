"use client";

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

interface SaveToolResult {
  toolSlug: string;
  toolTitle: string;
  category: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
}

export async function saveToolResult(result: SaveToolResult) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: new Error("يجب تسجيل الدخول لحفظ النتيجة") };
  }

  const { error } = await supabase.from("saved_tools").insert({
    user_id: user.id,
    category: result.category,
    tool_slug: result.toolSlug,
    tool_title: result.toolTitle,
    inputs: result.inputs,
    outputs: result.outputs,
  });

  return { error };
}
