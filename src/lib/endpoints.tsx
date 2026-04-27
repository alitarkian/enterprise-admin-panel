const TENANT_SCHEMA = process.env.EXPO_PUBLIC_TENANT_SCHEMA || "interbank";

export const API_ENDPOINTS = {
  GENERAL: {
    GET_CSRF_TOKEN: "/get-csrf-token/",
  },
  AUTH: {
    LOGIN: `/auth/login/`,
    SIGNUP: `/auth/temp-register/`,
    SEND_VERIFICATION: `/auth/send-verification/`,
    VERIFY_SIGNUP: `/auth/verify-register/`,
    FORGOT_PASSWORD: `/auth/forgot-password/`,
    REFRESH_TOKEN: `/auth/refresh-token/`,
    ME: `/auth/profile/info/`,
    LOGOUT: `/auth/logout/`,
    UPDATE: `/auth/profile/update/`,
    UPLOAD_AVATAR: `/auth/avatar/upload/`,
    REFERRALS: {
      BASE: `/auth/profile/referrals/`,
      SENT: `/auth/profile/referrals/sent/`,
      RECEIVED: `/auth/profile/referrals/received/`,
    },
  },
  LANDING: {
    SOCIALLINK: "/landing/socials/",
    CONTACT_MESSAGE: "/landing/contacts/",
  },
  KYC: {
    CREATE: "/kyc/create/",
    LIST: "/kyc/list/",
    DOCUMENTS: "/kyc/documents/",
    REQUIREMENTS: "/kyc/requirements",
  },
    CATALOG: {
        CATEGORIES: "/catalogs/categories/",        
        PRODUCTS: "/catalogs/products/",
        ATTRIBUTES: "/catalogs/attributes/",
        ATTRIBUTES_VALUES: "/catalogs/attributes-values/",
        SPECIAL_OFFERS: "/catalogs/special-offers/",
        PRODUCTS_DETAIL: (slug: string) => `/catalogs/products/${slug}/`,
    }
} as const;
