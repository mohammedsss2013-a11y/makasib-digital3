import { createClient } from "@/lib/supabase/client";
import { ContractData, ContractFinancialSummary } from "@/types/contracts";
import { Json } from "@/types/database.types";

export const contractsService = {
  calculateFinancials(totalFee: number, advancePercent: number): ContractFinancialSummary {
    const advanceAmount = (totalFee * advancePercent) / 100;
    const remainingAmount = totalFee - advanceAmount;
    return { advanceAmount, remainingAmount };
  },

  generateContractMarkdown(data: ContractData): string {
    const { advanceAmount, remainingAmount } = this.calculateFinancials(data.totalFee, data.advancePercent);

    return `📄 **اتفاقية تقديم خدمات عمل حر**

**الطرف الأول (المستقل):** ${data.freelancerName}
**الطرف الثاني (العميل):** ${data.clientName}

**1. نطاق العمل:**
يتعهد الطرف الأول بتنفيذ مشروع: (${data.projectTitle}) وفقاً للمواصفات والمتطلبات المتفق عليها بين الطرفين.

**2. التكلفة والشروط المالية:**
- القيمة الإجمالية للمشروع: ${data.totalFee} دولار أمريكي.
- الدفعة المقدمة المطلوبة (${data.advancePercent}%): ${advanceAmount} دولار أمريكي (تُدفع قبل البدء).
- المتبقي عند التسليم النهائي: ${remainingAmount} دولار أمريكي.

**3. مدة التنفيذ والتسليم:**
يلتزم الطرف الأول بتسليم المخرجات النهائية خلال (${data.deliveryDays}) يوماً من تاريخ استلام الدفعة المقدمة.

**4. الملكية الفكرية وحقوق الاستخدام:**
تنتقل كافة حقوق الملكية الفكرية للمخرجات للطرف الثاني فور سداد كامل القيمة المستحقة.

**تاريخ الاتفاقية:** ${new Date().toLocaleDateString("ar-EG")}`;
  },

  async saveContract(contract: ContractData) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { data: null, error: new Error("يجب تسجيل الدخول لحفظ العقد") };
    }

    const { advanceAmount } = this.calculateFinancials(contract.totalFee, contract.advancePercent);

    const { data, error } = await supabase
      .from("saved_tools")
      .insert({
        user_id: user.id,
        category: "finance",
        tool_slug: "contract-generator",
        tool_title: `عقد: ${contract.projectTitle}`,
        inputs: contract as unknown as Json,
        outputs: {
          "الطرفان": `${contract.freelancerName} / ${contract.clientName}`,
          "القيمة": `${contract.totalFee} $`,
          "الدفعة الأولى": `${advanceAmount} $`,
        } as unknown as Json,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return { data, error: null };
  },

  async getSavedContracts() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("saved_tools")
      .select("*")
      .eq("tool_slug", "contract-generator")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  },
};
