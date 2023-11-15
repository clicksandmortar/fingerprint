import { useEffect } from "react";
import { useVisitor } from "../context/VisitorContext";
// import { useCollectorMutation } from "./useCollectorMutation";
import { useLogging } from "../context/LoggingContext";

export default function useFormCollector() {
  // const { mutateAsync: collect } = useCollectorMutation()
  const { visitor } = useVisitor();
  const { log } = useLogging()

  useEffect(() => {
    if (!visitor.id) return
    if (document === undefined) return
    log('trying to do form stuff')
    const forms = document.querySelectorAll('form');
    log(forms)
  }, [visitor])
}
