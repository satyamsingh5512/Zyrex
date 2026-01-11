import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge Component", () => {
    it("renders with default variant", () => {
        render(<Badge>Test Badge</Badge>);
        expect(screen.getByText("Test Badge")).toBeInTheDocument();
    });

    it("renders with accent variant for PPO", () => {
        render(<Badge variant="accent">✨ PPO</Badge>);
        const badge = screen.getByText("✨ PPO");
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass("bg-accent-50");
    });

    it("renders with premium variant for IIT/NIT", () => {
        render(<Badge variant="premium">🏛️ IIT/NIT</Badge>);
        const badge = screen.getByText("🏛️ IIT/NIT");
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass("bg-premium");
    });

    it("renders with urgency variant for deadlines", () => {
        render(<Badge variant="urgency">🔥 24h left</Badge>);
        const badge = screen.getByText("🔥 24h left");
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass("bg-urgency-100");
    });

    it("accepts custom className", () => {
        render(<Badge className="custom-class">Custom</Badge>);
        expect(screen.getByText("Custom")).toHaveClass("custom-class");
    });
});
