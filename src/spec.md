# Specification

## Summary
**Goal:** Make the Valentine page’s music feature generic (no Weeknd reference) and add a small decorative girlfriend corner photo on both the initial and success screens.

**Planned changes:**
- Remove all “Earned It — The Weeknd” labeling and any Weeknd-specific references from the music UI.
- Stop hardcoding the audio source to an “earned-it” filename; keep play/pause, mute, and volume controls working with a local/static audio file.
- Add a clear English help/error message when the local audio file is missing.
- Add a small, polished corner avatar-style girlfriend photo (rounded with subtle border/shadow) as a static frontend asset, shown consistently on both the initial and success views without covering key content/controls.

**User-visible outcome:** The Valentine page no longer mentions The Weeknd or a specific track; users see generic local-audio controls with guidance if the audio file isn’t present, and a small girlfriend photo appears neatly in a corner on both the opening and success screens.
