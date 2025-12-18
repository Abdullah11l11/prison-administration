export const routes = {
  home: {
    path: "/",
    label: "لوحة التحكم",
  },

  login: {
    path: "/login",
    label: "تسجيل الدخول",
  },

  forgotPassword: {
    path: "/auth/forgot-password",
    label: "Reset password",
  },

  accessoryOrders: {
    path: "/accessory-orders",
    label: "طلبات الإكسسوارات",
  },
  accessoryOrderDetail: {
    path: "/accessory-orders/:id",
    label: "تفاصيل طلب الإكسسوارات",
  },

  ads: {
    path: "/ads",
    label: "الإعلانات",
  },
  adsBanners: {
    path: "/ads/banners",
    label: "بانرات الإعلانات",
  },
  adsNotifications: {
    path: "/ads/notifications",
    label: "إشعارات الإعلانات",
  },

  cars: {
    path: "/cars",
    label: "السيارات",
  },

  customers: {
    path: "/customers",
    label: "العملاء",
  },
  customerDetail: {
    path: "/customers/:id",
    label: "تفاصيل العميل",
  },

  orders: {
    path: "/orders",
    label: "الطلبات",
  },
  orderDetail: {
    path: "/orders/:id",
    label: "تفاصيل الطلب",
  },

  reviews: {
    path: "/reviews",
    label: "التقييمات",
  },

  services: {
    path: "/services",
    label: "الخدمات",
  },
  serviceDetail: {
    path: "/services/:id",
    label: "تفاصيل الخدمة",
  },

  settings: {
    path: "/settings",
    label: "الإعدادات",
  },

  stations: {
    path: "/stations",
    label: "المحطات",
  },

  accessories: {
    path: "/accessories",
    label: "الإكسسوارات",
  },
  serviceTimes: {
    path: "/service-times",
    label: "اوقات الخدمة",
  },
  packages: {
    path: "/packages",
    label: "البكجات",
  },
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes]["path"];
