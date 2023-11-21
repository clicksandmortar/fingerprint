/**
 * Hook into forms on the page and collect their data
* Principle:
* 1. Scan for forms on the page every `scanIntervalMs` ms
* 2. When a form is detected, add a listener to it. If there are multiple forms,
*    add a listener to each of them.
* 2.1 Continue looking for forms. If more forms are found (or if fewer) remove all listeners
*     and add them again - to make sure we are listening to each form only once.

* 3. When the form is "submitted":
  (DO NOT PREVENT DEFAULT BEHAVIOUR. Hell knows if the form is actually submitted or if its behaviour is hijacked)
    3.1 filter out the fields based with sensitive information
    3.2 Use whatever property of the input is available as the field name: name, id, placeholder, type.
    3.3 collect the data and send it to the server
    3.4 without waiting for the server response, continue with the default behaviour
* 4.
 */
export default function useFormCollector(): void;
