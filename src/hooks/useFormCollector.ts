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
    const forms = document.getElementsByTagName('form');
    for (let i = 0; i < forms.length; i++) {
      const f = forms[i];
      f.addEventListener("submit", e => {
        if (!e) return
        const data = e?.currentTarget
        log(data)
      })
    }
  }, [])
}
