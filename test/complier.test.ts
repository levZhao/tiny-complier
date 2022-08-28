import { expect, test } from "vitest";
import { complier } from "../src/complier";

test('complier', () => {
    const code = "(add 2 (subtract 4 2))";

    expect(complier(code)).toMatchInlineSnapshot('"add(2, subtract(4, 2));"')
})