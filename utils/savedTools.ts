"use client";

import { toolsService } from "@/services/tools.service";
import type { SavedToolRecord } from "@/types/tools";

export interface SaveToolResult {
  toolSlug: string;
  toolTitle: string;
  category: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
}

export async function saveToolResult(result: SaveToolResult) {
  try {
    const record: SavedToolRecord = {
      tool_slug: result.toolSlug,
      tool_title: result.toolTitle,
      category: result.category,
      inputs: result.inputs,
      outputs: result.outputs,
    };
    return await toolsService.saveToolCalculation(record);
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

