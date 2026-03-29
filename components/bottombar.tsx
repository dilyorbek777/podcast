"use client";
import { bottomLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { 
  FaHouse, 
  FaCircleInfo, 
  FaPodcast, 
  FaBlog, 
  FaRobot,
  FaEnvelope,
  FaGear
} from "react-icons/fa6";

const BottomBar = () => {
  const pathName = usePathname();

  const getIcon = (name: string) => {
    switch (name) {
      case "Home":
        return <FaHouse size={20} />;
      case "About Us":
        return <FaCircleInfo size={20} />;
      case "Episodes":
        return <FaPodcast size={20} />;
      case "Blog":
        return <FaBlog size={20} />;
      case "AI":
        return <FaRobot size={20} />;
      case "Settings":
        return <FaGear size={20} />;
      case "Contact":
        return <FaEnvelope size={20} />;
      default:
        return <FaHouse size={20} />;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 z-50 lg:hidden">
      <div className="flex items-center justify-around py-2">
        {bottomLinks.map((link) => (
          <a
            key={link.path}
            href={link.path}
            className={`flex flex-col items-center justify-center p-2 transition-all ${
              pathName === link.path 
                ? "text-primary" 
                : "text-gray-600 dark:text-gray-400 hover:text-primary"
            }`}
          >
            {getIcon(link.name)}
            <span className="text-xs mt-1">{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BottomBar;
