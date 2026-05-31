import { useLocation } from "react-router-dom";
import { tools } from "../tools";
import ToolSwitcher from "./ToolSwitcher";

export default function ToolSwitcherMount() {
  const location = useLocation();

  const isToolPage = tools.some((tool) => tool.path === location.pathname);

  if (!isToolPage) return null;

  return (
    <div className="tool-switcher-mount">
      <ToolSwitcher />
    </div>
  );
}
