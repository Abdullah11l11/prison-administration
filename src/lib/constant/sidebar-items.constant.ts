import {
  AccessoriesIcon,
  BillIcon,
  ClockIcon,
  CustomIcon,
  DeliveryIcon,
  HeartEyeIcon,
  HomeIcon,
  LocationIcon,
  OrdersIcon,
  ProductsIcon,
  SettingsIcon,
  StarIcon,
  TableIcon,
} from "@/assets";
import type { IconType } from "react-icons";
import { routes, type RoutePath } from "@/routes/route-names";

export type SidebarItem = {
  href: RoutePath;
  icon: IconType;
  label: string;
  desc?: string;
  children?: SidebarItem[];
};

export const sidebarItems: SidebarItem[] = [
  {
    href: routes.home.path, // "/"
    icon: HomeIcon,
    label: "لوحة التحكم",
  },
  {
    href: routes.orders.path, // "/orders"
    icon: OrdersIcon,
    label: "الطلبات",
    desc: "قم بإدارة الطلبات و إضافتها",
  },
  {
    href: routes.accessoryOrders.path, // "/accessory-orders"
    icon: AccessoriesIcon,
    label: "طلبات الإكسسوارات",
    desc: "قم بإدارة الطلبات وإضافتها",
  },
  {
    href: routes.accessories.path, // "/accessories"
    icon: AccessoriesIcon,
    label: "الإكسسوارات",
    desc: "قم بإدارة الإكسسوارات و إضافتها",
  },
  {
    href: routes.services.path, // "/services"
    icon: DeliveryIcon,
    label: "الخدمات",
    desc: "قم بإدارة الخدمات و إضافتها",
  },
  {
    href: routes.cars.path, // "/cars"
    icon: ProductsIcon,
    label: "السيارات",
    desc: "قم بإدارة السيارات وإضافتها",
  },
  {
    href: routes.customers.path, // "/customers"
    icon: HeartEyeIcon,
    label: "العملاء",
    desc: "قم بإدارة العملاء وإضافتها",
  },
  {
    href: routes.stations.path, // "/stations"
    icon: LocationIcon,
    label: "المحطات",
    desc: "قم بإدارة المحطات وإضافتها",
  },
  {
    href: routes.ads.path, // "/ads"
    icon: CustomIcon,
    label: "الإعلانات",
    desc: "قم بإدارة الاعلانات وإضافتها",
    children: [
      {
        href: routes.adsBanners.path, // "/ads/banners"
        icon: TableIcon,
        label: "البنرات",
      },
      {
        href: routes.adsNotifications.path, // "/ads/notifications"
        icon: BillIcon,
        label: "الإشعارات",
      },
    ],
  },
  {
    href: routes.reviews.path, // "/reviews"
    icon: StarIcon,
    label: "التقييمات",
    desc: "قم بإدارة التقييمات وإضافتها",
  },
  {
    href: routes.serviceTimes.path, // "/service-times"
    icon: ClockIcon,
    label: "اوقات الخدمة",
    desc: "قم بإدارة أوقات الخدمة وإضافتها",
  },
  {
    href: routes.packages.path, // "/packages"
    icon: ClockIcon,
    label: "البكجات",
    desc: "قم بإدارة البكجات وإضافتها",
  },
];

export const sittingsItem = {
  href: routes.settings.path, // "/settings"
  icon: SettingsIcon,
  label: " الاعدادات",
};
