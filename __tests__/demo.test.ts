// fonctions mathématiques
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

function fibonacci(n: number): number {
  if (n <= 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

function factorial(n: number): number {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
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

  it("fibonacci with negative number", () => {
    expect(fibonacci(-1)).toBe(0);
  });
  it("fibonacci with 0", () => {
    expect(fibonacci(0)).toBe(0);
  });
  it("fibonacci with 1", () => {
    expect(fibonacci(1)).toBe(1);
  });
  it("fibonacci with 2", () => {
    expect(fibonacci(2)).toBe(1);
  });
  it("fibonacci with 3", () => {
    expect(fibonacci(3)).toBe(2);
  });
  it("fibonacci with 4", () => {
    expect(fibonacci(4)).toBe(3);
  });
  it("fibonacci with 5", () => {
    expect(fibonacci(5)).toBe(5);
  });
  it("fibonacci with 6", () => {
    expect(fibonacci(6)).toBe(8);
  });
  it("fibonacci with 7", () => {
    expect(fibonacci(7)).toBe(13);
  });
  it("fibonacci with 8", () => {
    expect(fibonacci(8)).toBe(21);
  });
  it("fibonacci with 9", () => {
    expect(fibonacci(9)).toBe(34);
  });
  it("fibonacci with 10", () => {
    expect(fibonacci(10)).toBe(55);
  });
  it("factorial with 0", () => {
    expect(factorial(0)).toBe(1);
  });
  it("factorial with 1", () => {
    expect(factorial(1)).toBe(1);
  });
  it("factorial with 2", () => {
    expect(factorial(2)).toBe(2);
  });
  it("factorial with 3", () => {
    expect(factorial(3)).toBe(6);
  });
  it("factorial with 4", () => {
    expect(factorial(4)).toBe(24);
  });
  it("factorial with 5", () => {
    expect(factorial(5)).toBe(120);
  });
});
