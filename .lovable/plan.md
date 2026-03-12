

## Campaign Module Enhancement Plan

### Current State Assessment

The campaign module is **already substantially built**. The following components, hooks, DB tables, and features exist:

- **Sidebar**: Campaigns in correct position (Dashboard > Accounts > Contacts > Deals > Campaigns > Action Items)
- **DB Tables**: campaigns, campaign_accounts, campaign_contacts, campaign_communications, campaign_email_templates, campaign_phone_scripts, campaign_materials (all with RLS)
- **Pages/Components**: CampaignList, CampaignModal, CampaignDetailPanel with 9 tabs (Overview, Accounts, Contacts, Outreach, Templates, Scripts, Materials, Tasks, Analytics)
- **Hooks**: Full CRUD for all campaign entities, aggregates query
- **Convert to Deal**: ConvertToDealDialog creates deal at Lead stage with campaign attribution and stakeholder linking
- **Analytics**: Stats cards, outreach funnel chart, communication breakdown pie chart
- **Action Items**: Linked via module_type='campaigns'
- **Storage**: campaign-materials bucket exists
- **Audience segments, regional fields, timing fields**: All present in campaign modal and DB

### Gaps to Fill

Based on the plan document vs. existing code, these are the **remaining gaps**:

---

### 1. Bulk Contact Add (like Accounts tab)

**File**: `src/components/campaigns/CampaignContactsTab.tsx`

The Accounts tab already supports checkbox-based bulk add with search. The Contacts tab only supports single-add. Add the same bulk-add pattern: checkboxes, "X selected" footer, "Add Selected" button.

---

### 2. Contact Tab: Show LinkedIn & Phone Columns

**File**: `src/components/campaigns/CampaignContactsTab.tsx`

Currently shows: Contact, Email, Position, Stage. Add LinkedIn and Phone columns (data already fetched via the join query `contacts(contact_name, email, phone_no, linkedin, position, company_name)`).

---

### 3. Account Filter in Contacts Tab

**File**: `src/components/campaigns/CampaignContactsTab.tsx`

Allow filtering contacts by account. When adding contacts, optionally filter to show only contacts belonging to accounts already in the campaign.

---

### 4. Campaign Settings Section in Settings Page

**Files**: `src/pages/Settings.tsx`, new `src/components/settings/CampaignSettings.tsx`

Add a "Campaigns" tab in Settings (visible to admins) that lets users configure:
- Default campaign types
- Default follow-up rules (days between follow-ups)
- Default email template variables

This is a lightweight settings card -- no DB changes needed initially (can use local state or a simple settings JSON in a new row).

---

### 5. Communication History Cross-linking

**Current gap**: When a communication is logged in a campaign, it does NOT appear in the contact's or account's activity history.

**Enhancement**: When logging a campaign communication, also insert a record into `email_history` (for emails) so it appears in the entity's email history tab. This requires modifying `useCampaignCommunications.addCommunication` to optionally create a cross-linked record.

---

### 6. Outreach Tab Enhancements

**File**: `src/components/campaigns/CampaignOutreachTab.tsx`

- Add account selection to the log communication form (currently only has contact)
- Add body/message field for LinkedIn communications
- Show communication owner name (resolve from profiles)

---

### 7. Campaign List: Owner Filter

**File**: `src/pages/Campaigns.tsx`

Add an Owner filter dropdown alongside the existing Status and Type filters.

---

### Implementation Phases

**Phase 1** (Core UX improvements -- immediate value):
1. Bulk contact add with checkboxes
2. LinkedIn & Phone columns in contacts tab
3. Account filter in contacts tab add-picker
4. Outreach tab: add account field and owner display

**Phase 2** (Integration & Settings):
5. Campaign Settings section in Settings page
6. Communication cross-linking to email_history
7. Owner filter on campaign list

**Phase 3** (Future enhancements -- optional):
- Email scheduling from campaigns
- Follow-up reminder automation (edge function)
- Campaign cloning

### Estimated Changes

| File | Change |
|------|--------|
| `CampaignContactsTab.tsx` | Bulk add, LinkedIn/Phone columns, account filter |
| `CampaignOutreachTab.tsx` | Account field, owner display |
| `Campaigns.tsx` | Owner filter |
| `Settings.tsx` | Add Campaigns tab |
| New: `CampaignSettings.tsx` | Settings UI |
| `useCampaigns.tsx` | Cross-link communications to email_history |

No database migrations needed -- all required tables and columns already exist.

