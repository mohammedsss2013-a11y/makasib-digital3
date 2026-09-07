import { createAdminPostAction, deleteAdminPostAction, updateAdminPostAction } from "@/actions/admin.actions";
import { createClient } from "@/lib/supabase/server";
import AdminContentTabs from "@/components/admin/AdminContentTabs";

export default async function AdminContentManagerPage() {
  const supabase = await createClient();
  const [{ data: posts }, { data: tools }] = await Promise.all([
    supabase
      .from("posts")
      .select("id, title, category, status, created_at")
      .order("created_at", { ascending: false })
      .limit(12),
    supabase
      .from("tools")
      .select("id, title, slug, description, sector, status, created_at")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <AdminContentTabs
      posts={posts ?? []}
      tools={tools ?? []}
      createPostAction={createAdminPostAction}
      deletePostAction={deleteAdminPostAction}
      updatePostAction={updateAdminPostAction}
    />
  );
}
