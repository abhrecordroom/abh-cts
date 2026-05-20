import {
  // AudioWaveform,
  // BookOpen,
  // Bot,
  // Command,
  // Frame,
  GalleryVerticalEnd,
  // Map,
  // PieChart,
  // Settings2,
  FileChartColumn,
  Gauge,
  BookCheck,
  SquareUserRound,
  FileSliders,
  BrickWallShield,
} from "lucide-react"

const data = {
  user: {
    name: "Administrator",
    email: "bhakkaraipattu@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "BH, Akkaraipattu",
      logo: GalleryVerticalEnd,
      plan: "Dashboard",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Gauge,
      isActive: false,
      items: [
        {
          title: "Overview",
          url: "/",
        },
        {
          title: "Unit View",
          url: "/ui/dash_unitview",
        },
      ],
    },
    {
      title: "Correspondence",
      url: "#",
      icon: BookCheck,
      isActive: false,
      items: [
        {
          title: "New Entry",
          url: "/ui/correspondence/new_entry_step_form",
        },
      ],
    },
    {
      title: "Complainer",
      url: "#",
      icon: SquareUserRound,
      isActive: false,
      items: [
        {
          title: "Unit",
          url: "/ui/complainer/new_entry",
        },
        {
          title: "Person",
          url: "/ui/dash_unitview",
        },
      ],
    },
    {
      title: "References",
      url: "#",
      icon: FileSliders,
      isActive: false,
      items: [
        {
          title: "Designation",
          url: "/ui/utilities/designation",
        },
        {
          title: "Response Nature",
          url: "/ui/utilities/category",
        },
        {
          title: "Category",
          url: "/ui/utilities/category",
        },
        {
          title: "Status",
          url: "/ui/utilities/category",
        },
      ],
    },
    {
      title: "Master",
      url: "#",
      icon: BrickWallShield,
      isActive: false,
      items: [
        {
          title: "User",
          url: "/ui/utilities/designation",
        },
        {
          title: "Activity Log",
          url: "/ui/utilities/category",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: FileChartColumn,
      isActive: false,
      items: [
        {
          title: "Report",
          url: "/ui/utilities/designation",
        },
      ],
    },
  ],
}

export default data
