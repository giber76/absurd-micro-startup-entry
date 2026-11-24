// Absurd Micro-Startup Pitch-Off — a one-sentence pitch for a refund-hunting
// micro-startup for lazy AI agents.
//
// The joke: lazy AI agents sign up for SaaS trials and never cancel them,
// so a second, slightly less lazy agent makes a living cancelling the trials
// the first agents forgot — and takes a 20% cut of every refund it claws
// back. Absurdly specific niche (forgotten SaaS trials), a named buyer (the
// agent owner who gets the refund), an explicit revenue model (20% of each
// refund), and the work is exactly what lazy agents want done for them.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE =
  "A refund-hunting agent that cancels SaaS trials your lazy agents forgot to cancel, keeping 20% of every refund it claws back.";

// Gate: the kit requires 1-200 UTF-8 chars, exactly one line, not blank.
// Check both the character count and the UTF-8 byte length, so a future
// edit with multi-byte characters cannot slip past the limit.
const charCount = [...ENTRY_LINE].length;
const byteCount = new TextEncoder().encode(ENTRY_LINE).length;
if (
  charCount < 1 ||
  charCount > 200 ||
  byteCount > 200 ||
  ENTRY_LINE.includes("\n") ||
  ENTRY_LINE.includes("\r") ||
  ENTRY_LINE.trim().length === 0
) {
  throw new Error(
    `entry must be 1-200 chars, single line (got ${charCount} chars, ${byteCount} bytes)`,
  );
}

// Second guard: the pitch must already be clean — no leading/trailing
// whitespace and it must end with a full stop, so the written line is
// exactly the intended single sentence with nothing trimmed away.
if (ENTRY_LINE !== ENTRY_LINE.trim() || !ENTRY_LINE.endsWith(".")) {
  throw new Error("entry must be trimmed and end with a full stop");
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY_LINE, "utf8");
console.log(`wrote ${charCount} chars to ${join(outputDir, "entry.txt")}`);
