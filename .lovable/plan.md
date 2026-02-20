

## Stakeholders Section Enhancement Plan

### Problem
The stakeholders section in the Deal Expanded Panel has:
1. No visual boundaries -- it blends into the white background with no card/border styling
2. No way to replace an existing stakeholder (swap button)
3. No stakeholder notes summary view or search capability

### Changes (Single File: `src/components/DealExpandedPanel.tsx`)

#### 1. Visual Styling -- Add Boundaries and Subtle Colors

**Current**: The section is a plain `div` with only a `border-t` separator. The 2x2 grid of roles has no visual distinction.

**Enhancement**:
- Wrap the entire stakeholders section in a rounded card with a subtle border and light background tint (e.g., `bg-muted/30 border border-border rounded-lg`)
- Add a section header row: "Stakeholders" label with a Users icon, styled similarly to the "Updates" and "Action Items" headers (dark `bg-muted/50` bar)
- Each role cell gets a subtle left-colored accent border per role type (Budget Owner = blue, Champion = green, Influencer = amber, Objector = red) for quick visual identification
- Add subtle hover state on each role row for better interactivity feedback

#### 2. Replace/Swap Button on Hover

**Current**: When a contact exists for a role, only Info (note) and X (remove) buttons show on hover. The add dropdown only shows when no contact exists.

**Enhancement**:
- Add a swap/replace icon button (using `ArrowRight` or a refresh icon from lucide) that appears on hover, positioned between the info and remove buttons
- Clicking the swap button opens the same `StakeholderAddDropdown` contact picker
- When a contact is selected from the picker, it triggers the existing `promptReplace()` confirmation flow (which already exists in the code but has no UI trigger)
- The confirmation dialog already handles showing the existing note warning

**Technical detail**: Modify the `group/row` hover area (lines 443-501) to include a new replace button. When clicked, it opens a `StakeholderAddDropdown` inline. On contact selection, call `promptReplace(existingSh, newContact, role)`.

#### 3. Stakeholder Notes Summary View

**Enhancement**:
- Add a small "Notes" toggle button in the stakeholders section header
- When toggled, show a compact summary panel below the grid listing all stakeholders that have notes
- Each entry shows: Role badge (colored) + Contact name + Note text (truncated)
- Add a search input at the top of the summary that filters notes by content or contact name
- The summary is collapsible to avoid taking permanent space

#### 4. Test End-to-End

After implementation:
- Add a contact to a role, add a note, then remove -- verify the confirmation dialog shows the note
- Hover over an existing stakeholder -- verify the swap button appears
- Click swap, select a new contact -- verify the replacement confirmation shows
- Toggle the notes summary -- verify it lists all notes and search works

### Technical Implementation Details

**Lines affected in `DealExpandedPanel.tsx`**:

1. **StakeholdersSection return JSX (lines 413-567)**:
   - Wrap outer div with card styling: `bg-muted/20 border border-border/60 rounded-lg`
   - Add header bar with icon and "Stakeholders" title + Notes summary toggle
   - Add role-specific accent colors to `STAKEHOLDER_ROLES` constant (line 203)

2. **Role row rendering (lines 428-517)**:
   - Add colored left border per role
   - Add replace button in the hover actions group (between info and remove buttons)
   - The replace button renders a `StakeholderAddDropdown` that on select calls `promptReplace()`

3. **New Notes Summary sub-component** (added inside StakeholdersSection):
   - State: `showNotesSummary` boolean, `noteSearch` string
   - Renders below the grid when toggled
   - Filters `stakeholders.filter(s => s.note)` and applies search
   - Each row: colored role badge + contact name + note preview

4. **STAKEHOLDER_ROLES update**:
   ```text
   { role: "budget_owner", label: "Budget Owner", color: "blue" }
   { role: "champion", label: "Champion", color: "green" }
   { role: "influencer", label: "Influencer", color: "amber" }
   { role: "objector", label: "Objector", color: "red" }
   ```

No new files needed. No database changes required. All changes are contained within `DealExpandedPanel.tsx`.

