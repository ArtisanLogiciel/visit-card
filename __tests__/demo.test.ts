function sum(a: number, b: number): number;
function sum(a: string, b: string): string;
function sum(a: string, b: number): string;
function sum(a: number, b: string): string;
function sum(
  a: string | number,
  b: string | number
): string | number | undefined {
  if (typeof a === "number" && typeof b === "number") {
    return a + b; // retourne la somme si les deux paramètres sont des nombres
  } else if (typeof a === "string" && typeof b === "string") {
    return a + b; // concatène les chaînes si les deux paramètres sont des chaînes
  } else if (typeof a === "number" && typeof b === "string") {
    return a + b; //
  } else if (typeof a === "string" && typeof b === "number") {
    return a + b; //
  }
}

describe("Maths operation", () => {
  it("basic addition with number", () => {
    expect(sum(1, 12)).toBe(13);
  });
  it("addition with one string", () => {
    expect(sum(10, "1")).toBe("101");
  });
  it("addition with another string", () => {
    expect(sum("66", 6)).toBe("666");
  });
  it("addition with two string", () => {
    expect(sum("66", "6")).toBe("666");
  });
});
