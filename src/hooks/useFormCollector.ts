import { useEffect } from "react";
import { useVisitor } from "../context/VisitorContext";
// import { useCollectorMutation } from "./useCollectorMutation";
import { useLogging } from "../context/LoggingContext";

export default function useFormCollector() {
  // const { mutateAsync: collect } = useCollectorMutation()
  const { visitor } = useVisitor();
  const { log } = useLogging()
  const bannedTypes = [
    "password",
    "submit"
  ]
  useEffect(() => {
    if (!visitor.id) return
    if (document === undefined) return
    const forms = document.querySelectorAll('form');
    for (let i = 0; i < forms.length; i++) {
      const f = forms[i]
      log('Form +', i)
      f.addEventListener("submit", (e) => {
        e.preventDefault();
        const a = e?.target as HTMLFormElement;
        
        const elements = Array.from(a.elements).filter((b: HTMLFormElement) => {
          return bannedTypes.includes(b?.type)
        });
        log(elements)
      })
    }
  }, [visitor])
}
