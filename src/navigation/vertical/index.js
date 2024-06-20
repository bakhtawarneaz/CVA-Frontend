import { Home, User, Award, Gift} from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "organizations",
    title: "Organizations",
    icon: <Gift size={20} />,
    navLink: "/organizations",
  },
  {
    id: "brands",
    title: "Brands",
    icon: <Award size={20} />,
    navLink: "/brands",
  },
  {
    id: "user",
    title: "User",
    icon: <User size={20} />,
    navLink: "/user",
  },
  
];
