import { OrganizationInterface } from "shared/types/organization";
import { BadRequestError } from "back-end/src/util/errors";

export function isPublicSharingDisabled(
  organization: Pick<OrganizationInterface, "settings">,
): boolean {
  return organization.settings?.disablePublicSharing === true;
}

export function assertPublicSharingAllowed(
  organization: Pick<OrganizationInterface, "settings">,
  shareLevel: string | undefined,
): void {
  if (shareLevel === "public" && isPublicSharingDisabled(organization)) {
    throw new BadRequestError(
      "Public sharing is disabled by your organization administrator.",
    );
  }
}
