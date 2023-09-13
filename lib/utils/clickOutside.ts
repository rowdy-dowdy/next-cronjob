import { useEffect, useLayoutEffect, useRef } from "react";

const useClickOutside = (ref: any, cb: () => void) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target) && !event.defaultPrevented) {
        cb()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside, false);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside, false);
    };
  }, [ref]);
}

function useResizeObserver<T extends HTMLElement>(
  callback: (target: T, entry: ResizeObserverEntry) => void
) {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const element = ref?.current

    if (!element) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      callback(element, entries[0])
    })

    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [callback, ref])

  return ref
}

export { useClickOutside, useResizeObserver }