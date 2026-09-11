<instructions>
This file will be automatically added to your context. 
It serves multiple purposes:
  1. Storing frequently used tools so you can use them without searching each time
  2. Recording the user's code style preferences (naming conventions, preferred libraries, etc.)
  3. Maintaining useful information about the codebase structure and organization
  4. Remembering tricky quirks from this codebase

When you spend time searching for certain configuration files, tricky code coupled dependencies, or other codebase information, add that to this CODER.md file so you can remember it for next time.
Keep entries sorted in DESC order (newest first) so recent knowledge stays in prompt context if the file is truncated.
</instructions>

<coder>
## 2026-09-11
- Header is rendered twice via `Header` variants (`desktop` + `mobile`) in `src/App.tsx`; desktop header styles live in `src/sections/Header/index.tsx`.
- Main homepage content is largely centralized in `src/sections/Hero/index.tsx` (FAQ + CTA included), so branding text updates often belong there.
- Logo strip under hero heading is controlled in `src/sections/Hero/components/HeroContent.tsx`; previous left drift came from `pl-16 -left-20`.
- Broken non-render placeholders existed as empty `<img />` tags in `src/App.tsx`; safe to remove.
</coder>
