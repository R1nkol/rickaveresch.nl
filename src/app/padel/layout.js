import { PadelProvider } from "@/components/padel/PadelProvider";

export default function PadelLayout({ children }) {
  return <PadelProvider>{children}</PadelProvider>;
}
