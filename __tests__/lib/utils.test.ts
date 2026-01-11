import { cn, formatCurrency, formatDate, timeUntil, slugify, truncate } from "@/lib/utils";

describe("Utils", () => {
    describe("cn", () => {
        it("merges class names correctly", () => {
            expect(cn("foo", "bar")).toBe("foo bar");
        });

        it("handles conditional classes", () => {
            expect(cn("base", true && "active", false && "hidden")).toBe("base active");
        });

        it("resolves tailwind conflicts", () => {
            expect(cn("p-4", "p-2")).toBe("p-2");
        });
    });

    describe("formatCurrency", () => {
        it("formats Indian Rupees correctly", () => {
            const result = formatCurrency(50000);
            expect(result).toContain("₹");
            expect(result).toContain("50");
        });

        it("handles zero", () => {
            const result = formatCurrency(0);
            expect(result).toContain("₹");
        });
    });

    describe("formatDate", () => {
        it("formats date in Indian locale", () => {
            const date = new Date("2024-03-15");
            const result = formatDate(date);
            expect(result).toContain("2024");
        });

        it("handles string dates", () => {
            const result = formatDate("2024-03-15");
            expect(result).toContain("2024");
        });
    });

    describe("timeUntil", () => {
        it("calculates days correctly", () => {
            const futureDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
            const result = timeUntil(futureDate);
            expect(result.days).toBe(5);
            expect(result.isUrgent).toBe(false);
        });

        it("marks as urgent when less than 24 hours", () => {
            const soonDate = new Date(Date.now() + 12 * 60 * 60 * 1000);
            const result = timeUntil(soonDate);
            expect(result.isUrgent).toBe(true);
        });
    });

    describe("slugify", () => {
        it("converts text to slug", () => {
            expect(slugify("Hello World")).toBe("hello-world");
        });

        it("removes special characters", () => {
            expect(slugify("Hello, World!")).toBe("hello-world");
        });
    });

    describe("truncate", () => {
        it("truncates long text", () => {
            const long = "This is a very long text that should be truncated";
            expect(truncate(long, 20)).toBe("This is a very long ...");
        });

        it("returns short text unchanged", () => {
            expect(truncate("Short", 20)).toBe("Short");
        });
    });
});
