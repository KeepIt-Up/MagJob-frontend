export const ROLE_PAGE = {
    APPERIANCE_PAGE: "APPERIANCE_PAGE",
    PERMISSION_PAGE: "PERMISSION_PAGE",
    ASSIGN_PAGE: "ASSIGN_PAGE",
  } as const;

  export type EditRolePage = keyof typeof ROLE_PAGE;