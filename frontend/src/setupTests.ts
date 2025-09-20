// Adds matchers like .toBeInTheDocument(), .toHaveAttribute(), etc.
import '@testing-library/jest-dom';
import { vi } from "vitest";

// You could also mock browser APIs here if needed:
window.scrollTo = vi.fn();
