import {
  assertPublicSharingAllowed,
  isPublicSharingDisabled,
} from "back-end/src/services/publicSharing";

describe("public sharing policy", () => {
  it("allows public sharing unless the organization disables it", () => {
    expect(isPublicSharingDisabled({ settings: {} })).toBe(false);
    expect(() =>
      assertPublicSharingAllowed({ settings: {} }, "public"),
    ).not.toThrow();
  });

  it("rejects public sharing when disabled", () => {
    const organization = { settings: { disablePublicSharing: true } };

    expect(isPublicSharingDisabled(organization)).toBe(true);
    expect(() => assertPublicSharingAllowed(organization, "public")).toThrow(
      "Public sharing is disabled by your organization administrator.",
    );
  });

  it("allows non-public sharing when disabled", () => {
    const organization = { settings: { disablePublicSharing: true } };

    expect(() =>
      assertPublicSharingAllowed(organization, "organization"),
    ).not.toThrow();
    expect(() =>
      assertPublicSharingAllowed(organization, undefined),
    ).not.toThrow();
  });
});
