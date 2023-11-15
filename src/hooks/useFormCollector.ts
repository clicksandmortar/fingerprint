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
    const forms = document.querySelectorAll('form');
    for (let i = 0; i < forms.length; i++) {
      const f = forms[i]
      f.addEventListener("submit", (e) => {
        e.preventDefault();
        log(e);
      })
    }
  }, [visitor])
}
