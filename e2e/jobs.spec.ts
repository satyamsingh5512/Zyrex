import { test, expect } from "@playwright/test";

test.describe("Job Listing Page", () => {
    test("should display job listings", async ({ page }) => {
        await page.goto("/jobs");

        // Check page title
        await expect(page.locator("h1")).toContainText("Find Your Next Opportunity");

        // Check that job cards are displayed
        await expect(page.locator("[data-testid='job-card']").first()).toBeVisible();
    });

    test("should open filter drawer on mobile", async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto("/jobs");

        // Click filter button
        await page.click("button[aria-label='Open filters']");

        // Check drawer is visible
        await expect(page.locator("text=Filters").first()).toBeVisible();
    });

    test("should filter by job type", async ({ page }) => {
        await page.goto("/jobs");

        // Click Internship filter
        await page.click("text=Internship");

        // URL should update with filter
        await expect(page).toHaveURL(/type=INTERNSHIP/);
    });
});

test.describe("Job Detail Page", () => {
    test("should display job details with prep guide", async ({ page }) => {
        await page.goto("/jobs/1");

        // Check job title is visible
        await expect(page.locator("h1")).toBeVisible();

        // Check prep guide section exists
        await expect(page.locator("text=How to Land This Role")).toBeVisible();

        // Check apply button exists
        await expect(page.locator("button:has-text('Apply')").first()).toBeVisible();
    });

    test("should have sticky apply button on mobile", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto("/jobs/1");

        // Scroll down
        await page.evaluate(() => window.scrollTo(0, 500));

        // Apply button should still be visible (sticky)
        await expect(page.locator("button:has-text('Apply')").first()).toBeVisible();
    });
});

test.describe("Admin Wizard", () => {
    test("should navigate through wizard steps", async ({ page }) => {
        await page.goto("/admin/jobs/create");

        // Step 1: Select company
        await expect(page.locator("text=Select Company")).toBeVisible();
        await page.click("text=Google");
        await page.click("text=Next");

        // Step 2: Role details
        await expect(page.locator("text=Job Title")).toBeVisible();
        await page.fill("input[placeholder*='Software']", "Test Job");
        await page.fill("input[placeholder*='Bangalore']", "Remote");
        await page.fill("input[placeholder*='50000']", "60000");
        await page.click("text=Next");

        // Step 3: Requirements
        await expect(page.locator("text=Tech Stack")).toBeVisible();
    });

    test("should show step indicator on mobile", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto("/admin/jobs/create");

        // Check mobile step indicator
        await expect(page.locator("text=Step 1 of 5")).toBeVisible();
    });
});
