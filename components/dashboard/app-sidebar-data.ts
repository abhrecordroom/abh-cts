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
  SquareTerminal,
  Gauge,
  BookCheck,
  SquareUserRound,
  FileSliders
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
        {
          title: "Assign Person",
          url: "/ui/dash_unitview",
        },
      ],
    },
    {
      title: "Complainer",
      url: "#",
      icon:   SquareUserRound,
      isActive: false,
      items: [
        {
          title: "New Entry",
          url: "/ui/complainer/new_entry",
        },
        {
          title: "View Data",
          url: "/ui/dash_unitview",
        },
      ],
    },
    {
      title: "Utilities",
      url: "#",
      icon: FileSliders,
      isActive: false,
      items: [
        {
          title: "Job Designations",
          url: "/ui/utilities/designation",
        },
        {
          title: "Category",
          url: "/ui/utilities/category",
        },
      ],
    },
  ],
}

export default data
