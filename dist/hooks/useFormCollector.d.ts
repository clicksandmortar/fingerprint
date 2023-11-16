/**
 * Hook into forms on the page and collect their data
* Principle:
* 1. Scan for forms on the page every `scanIntervalMs` ms
* 2. When a form is detected, add a listener to it. If there are multiple forms,
*    add a listener to each of them.
* 2.1 Continue looking for forms. If more forms are found (or if fewer) remove all listeners
*     and add them again - to make sure we are listening to each form only once.

* 3. When the form is submitted:
    3.1 prevent the default behaviour
    3.2 filter out the fields based with sensitive information
    3.3 collect the data and send it to the server
    3.4 without waiting for the server response, optimistically submit the form after a
    delay of `submitionDelay` ms
* 4.
 */
export default function useFormCollector(): void;
