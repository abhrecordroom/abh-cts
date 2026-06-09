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
      url: "/dashboard",
      icon: Gauge,
      isActive: false,
      items: [
        {
          title: "Overview",
          url: "ui/correspondence/test_form",
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
          url: "/ui/complainer/unit",
        },
        {
          title: "Person",
          url: "/ui/complainer/person",
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
          url: "/ui/references/designation",
        },
        {
          title: "Response Nature",
          url: "/ui/references/response_nature",
        },
        {
          title: "Category",
          url: "/ui/references/category",
        },
        {
          title: "Status",
          url: "/ui/references/status",
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
          url: "/ui/utilities/user",
        },
        {
          title: "Activity Log",
          url: "/ui/utilities/activity_log",
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
