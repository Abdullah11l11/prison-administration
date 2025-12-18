import type { ComponentType } from "react";
import { routes } from "@/routes/route-names";

export type HeaderItem = {
  href: string;
  label: string;
  desc?: string;
  editButton?: ComponentType<any>;
};

export const headerItems: HeaderItem[] = [
  // لوحة التحكم / الصفحة الرئيسية
  {
    href: routes.home.path, // "/" مثلاً
    label: "لوحة التحكم",
  },

  // الطلبات
  {
    href: routes.orders.path, // "/orders"
    label: "الطلبات",
    desc: "قم بإدارة الطلبات و إضافتها",
  },
  {
    href: routes.orderDetail.path, // "/orders/:id"
    label: "تفاصيل الطلب",
  },

  // طلبات الإكسسوارات
  {
    href: routes.accessoryOrders.path, // "/accessory-orders"
    label: "طلبات الإكسسوارات",
    desc: "قم بإدارة الطلبات وإضافتها",
  },
  {
    href: routes.accessoryOrderDetail.path, // "/accessory-orders/:id"
    label: "تفاصيل طلب الإكسسوارات",
  },

  // الإكسسوارات
  {
    href: routes.accessories.path, // "/accessories"
    label: "الإكسسوارات",
    desc: "قم بإدارة الإكسسوارات و إضافتها",
  },

  // الخدمات
  {
    href: routes.services.path, // "/services"
    label: "الخدمات",
    desc: "قم بإدارة الخدمات و إضافتها",
  },
  {
    href: routes.serviceDetail.path, // "/services/:id"
    label: "تفاصيل الخدمة",
  },

  // السيارات
  {
    href: routes.cars.path, // "/cars"
    label: "السيارات",
    desc: "قم بإدارة السيارات وإضافتها",
  },

  // العملاء
  {
    href: routes.customers.path, // "/customers"
    label: "العملاء",
    desc: "قم بإدارة العملاء وإضافتها",
  },
  {
    href: routes.customerDetail.path, // "/customers/:id"
    label: "تفاصيل العميل",
  },

  // المحطات
  {
    href: routes.stations.path, // "/stations"
    label: "المحطات",
    desc: "قم بإدارة المحطات وإضافتها",
  },

  // الإعلانات
  {
    href: routes.ads.path, // "/ads"
    label: "الإعلانات",
  },
  {
    href: routes.adsBanners.path, // "/ads/banners"
    label: "الإعلانات(البنرات)",
    desc: "قم بإدارة الاعلانات وإضافتها",
  },
  {
    href: routes.adsNotifications.path, // "/ads/notifications"
    label: "الإعلانات(الإشعارات)",
    desc: "قم بإدارة الاعلانات وإضافتها",
  },

  // التقييمات
  {
    href: routes.reviews.path, // "/reviews"
    label: "التقييمات",
    desc: "قم بإدارة التقييمات وإضافتها",
  },

  // أوقات الخدمة
  {
    href: routes.serviceTimes.path, // "/service-times"
    label: "اوقات الخدمة",
    desc: "قم بإدارة أوقات الخدمة وإضافتها",
  },

  // البكجات
  {
    href: routes.packages.path, // "/packages"
    label: "البكجات",
    desc: "قم بإدارة البكجات وإضافتها",
  },
];
