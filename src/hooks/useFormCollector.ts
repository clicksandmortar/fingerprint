import { useEffect } from "react";
import { useVisitor } from "../context/VisitorContext";
// import { useCollectorMutation } from "./useCollectorMutation";
import { useLogging } from "../context/LoggingContext";

export default function useFormCollector() {
  // const { mutateAsync: collect } = useCollectorMutation()
  const { visitor } = useVisitor();
  const { log } = useLogging()

  if (!visitor.id) return

  useEffect(() => {
    const forms = document.querySelectorAll('form');
    log(forms)
  }, [])
}
