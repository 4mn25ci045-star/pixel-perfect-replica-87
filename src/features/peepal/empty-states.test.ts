import { describe, expect, it } from "vitest";

import { getEmptyStateMessage } from "./empty-states";

describe("PEEPAL verified-data empty states", () => {
  it("uses the requested real-GPS waiting message", () => {
    expect(getEmptyStateMessage("gps")).toBe("Waiting for real GPS signal.");
  });

  it("states when verified route information is not available", () => {
    expect(getEmptyStateMessage("routes")).toBe("No verified route information available.");
  });

  it("does not imply crowd data when none is available", () => {
    expect(getEmptyStateMessage("crowd")).toBe("Crowd information unavailable.");
  });
});