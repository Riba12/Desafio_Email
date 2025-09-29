import { Mail } from "lucide-react";
import { ModeToggle } from "./modeToggle";

export function Header() {
  return (
    <div className="flex justify-between px-3 py-1 border-2">
      <div className="flex space-x-3 pt-1">
        <Mail />
        <span>NextMail</span>
      </div>
      <div>
        <ModeToggle/>
      </div>
    </div>
  );
}
