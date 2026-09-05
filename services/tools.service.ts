import { createClient } from "@/lib/supabase/client";
import { FreelancePricingParams, FreelancePricingResult, SavedToolRecord } from "@/types/tools";
import { Json } from "@/types/database.types";

export const toolsService = {
  calculateFreelancePricing(params: FreelancePricingParams): FreelancePricingResult {
    const { targetIncome, fixedExpenses, hoursPerWeek, adminRatio, taxReserve } = params;
    const totalMonthlyTarget = (targetIncome + fixedExpenses) * (1 + taxReserve / 100);
    const totalHoursMonth = hoursPerWeek * 4.2;
    const billableHoursMonth = totalHoursMonth * (1 - adminRatio / 100);
    const hourlyRateRecommended = billableHoursMonth > 0 ? Math.ceil(totalMonthlyTarget / billableHoursMonth) : 0;
    const hourlyRateMinimum = billableHoursMonth > 0 ? Math.ceil((targetIncome + fixedExpenses) / billableHoursMonth) : 0;

    return {
      hourlyRateRecommended,
      hourlyRateMinimum,
      billableHoursMonth,
      totalMonthlyTarget,
    };
  },

  async saveToolCalculation(record: SavedToolRecord) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { data: null, error: new Error("يجب تسجيل الدخول لحفظ النتيجة") };
    }

    const { data, error } = await supabase
      .from("saved_tools")
      .insert({
        user_id: user.id,
        category: record.category,
        tool_slug: record.tool_slug,
        tool_title: record.tool_title,
        inputs: record.inputs as unknown as Json,
        outputs: record.outputs as unknown as Json,
      })
      .select("id, user_id, category, tool_slug, tool_title, inputs, outputs, created_at, updated_at")
      .single();

    if (error) throw new Error(error.message);
    return { data, error: null };
  },

  async getSavedTools(category?: string) {
    const supabase = createClient();
    let query = supabase
      .from("saved_tools")
      .select("id, user_id, category, tool_slug, tool_title, inputs, outputs, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  },

  async deleteSavedTool(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from("saved_tools").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return true;
  },
};
