import {
  CreditCard,
  Layers,
  User,
  ShieldAlert,
  KeyRound,
  MessageSquare,
  ChartNoAxesCombined,
} from "lucide-react";
import { FaUsers, FaUserShield } from "react-icons/fa";
import { PiBuildingOfficeThin, PiCreditCard } from "react-icons/pi";
import { MdDisplaySettings } from "react-icons/md";
import { GiSwipeCard } from "react-icons/gi";
import { TfiList } from "react-icons/tfi";
import { CiMap } from "react-icons/ci";
import { MdCreditScore } from "react-icons/md";

export const sidebarItems = [
  { name: "Branches", icon: PiBuildingOfficeThin, href: "/dashboard/branches" },
  { name: "Roles", icon: FaUserShield, href: "/dashboard/roles" },
  { name: "Users", icon: FaUsers, href: "/dashboard/users" },
  {
    name: "Card Scheme",
    icon: MdDisplaySettings,
    href: "/dashboard/card-scheme",
  },
  { name: "Card Profile", icon: GiSwipeCard, href: "/dashboard/card-profile" },
  { name: "Card Request", icon:  MdCreditScore, href: "/dashboard/card-request" },
  { name: "Stock", icon: ChartNoAxesCombined, href: "/dashboard/stock" },
  {
    name: "Cards",
    icon: CreditCard,
    children: [
      {
        name: "Cards",
        icon: PiCreditCard,
        href: "/dashboard/cards",
      },
      {
        name: "Block/Unblock Card",
        icon: ShieldAlert,
        href: "/dashboard/block-unblock-card",
      },
      {
        name: "Generate/Reissue Pin",
        icon: KeyRound,
        href: "/dashboard/generate-reissue-pin",
      },
      {
        name: "Complaints: Log",
        icon: MessageSquare,
        href: "/dashboard/complaints-log",
      },
      {
        name: "Complaints: Resolve",
        icon: MessageSquare,
        href: "/dashboard/complaints-resolve",
      },
      {
        name: "Authorization List",
        icon: TfiList,
        href: "/dashboard/auth-list",
      },
    ],
  },

  {
    name: "Authorization Queue",
    icon: Layers,
    href: "/dashboard/auth-queue",
  },
  { name: "Trail", icon: CiMap, href: "/dashboard/trail" },
  { name: "Account", icon: User, href: "/dashboard/account" },
];
