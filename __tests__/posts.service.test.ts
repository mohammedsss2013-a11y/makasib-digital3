import { describe, expect, it, vi } from "vitest";

const query = {
  select: vi.fn(),
  eq: vi.fn(),
  order: vi.fn(),
  range: vi.fn(),
};

query.select.mockReturnValue(query);
query.eq.mockReturnValue(query);
query.order.mockReturnValue(query);

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({ from: vi.fn(() => query) })),
}));

import { getPostsService } from "@/services/posts.service";

describe("posts service", () => {
  it("applies published status, category, ordering, and pagination", async () => {
    query.range.mockResolvedValue({
      data: [{ id: 1, title: "مقال" }],
      count: 1,
      error: null,
    });

    const result = await getPostsService({ page: 2, limit: 5, category: "finance" });

    expect(result).toEqual({ posts: [{ id: 1, title: "مقال" }], totalCount: 1 });
    expect(query.eq).toHaveBeenCalledWith("status", "published");
    expect(query.eq).toHaveBeenCalledWith("category", "finance");
    expect(query.range).toHaveBeenCalledWith(5, 9);
  });
});
