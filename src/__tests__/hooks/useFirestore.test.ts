import useCard from "@/hooks/useCards";

vi.mock("@/hooks/useFirestore/", () => {
  return {
    useFirestore: async () => {
      return {
        checkCardCreated: vi.fn().mockResolvedValue(true),
      };
    },
  };
});

describe("useFirestore", () => {
  it("checkCardCreted is true", async () => {
    const { checkCardCreated } = useCard(null);
    const isChecked = await checkCardCreated();
    expect(isChecked).toBe(true);
  });
});
