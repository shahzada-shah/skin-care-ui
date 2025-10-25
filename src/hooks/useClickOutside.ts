/**
 * useClickOutside Hook
 *
 * Custom hook for detecting clicks outside of specified element refs.
 * Useful for closing dropdowns, modals, and other overlay components.
 *
 * @param {Array<React.RefObject>} refs - Array of refs to monitor
 * @param {Function} callback - Function to call when click occurs outside
 *
 * @example
 * const dropdownRef = useRef(null);
 * useClickOutside([dropdownRef], () => setOpen(false));
 */

import { useEffect, RefObject } from 'react';

export const useClickOutside = (
  refs: RefObject<HTMLElement>[],
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target as Node)
      );

      if (clickedOutside) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [refs, callback]);
};
