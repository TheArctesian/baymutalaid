# About Page Editing Guide

This guide will help you edit the content on the About page without needing to know how to code.

## Where to Find the Content File

The About page content is stored in a file called `about-content.json` located in the `static` folder. You can edit this file with any text editor.

**File location:** `static/about-content.json`

## How to Edit the Content

### 📝 Important Rules

1. **Do NOT delete commas, quotation marks, or curly braces** - these are required for the file to work
2. **Always keep text inside quotation marks** like this: `"Your text here"`
3. **Be careful with commas** - they separate different pieces of content
4. **Test your changes** after editing to make sure everything still works

### Editing the Page Header

```json
"header": {
  "title": "MUTUAL AID",
  "subtitle": "SOLIDARITY NOT CHARITY"
}
```

- Change `"MUTUAL AID"` to modify the main title
- Change `"SOLIDARITY NOT CHARITY"` to modify the subtitle

### Editing Organization Cards

Each organization card has:

- **title**: The organization name/category
- **description**: A paragraph describing the organization
- **items**: A list of specific organizations or resources

```json
{
	"title": "Oakland Community Organizations",
	"description": "Community-led organizations working to provide...",
	"items": ["East Bay Mutual Aid", "Oakland Community Land Trust", "Anti Police-Terror Project"]
}
```

To add a new organization to a list:

1. Add a comma after the last item
2. Add your new item in quotes: `"New Organization Name"`

To add a completely new organization card:

1. Find the end of the last card (look for `}`)
2. Add a comma after the `}`
3. Copy an existing card structure and modify the content

### Editing History Sections

History sections have:

- **title**: The section heading
- **content**: An array of paragraphs
- **principles**: (optional) Special list for the principles section

```json
{
	"title": "The Black Panther Party's Free Breakfast Program",
	"content": ["First paragraph of content...", "Second paragraph of content..."]
}
```

To add a new paragraph:

1. Add a comma after the last paragraph
2. Add your new paragraph in quotes

### Editing Help Cards

Help cards show resources and contact information:

```json
{
	"title": "FOOD ASSISTANCE",
	"description": "Access to free meals, groceries...",
	"items": ["Daily meal programs (see our map)", "Community fridges and pantries"],
	"contact": "HOTLINE: 211 (dial 2-1-1)"
}
```

- **title**: The type of help (keep it short and in CAPS)
- **description**: Brief explanation of what's available
- **items**: List of specific resources
- **contact**: How to get help (phone number, website, etc.)

### Editing the Quote

```json
"quote": {
  "text": "Mutual aid is not charity. Charity is hierarchical...",
  "author": "Dean Spade"
}
```

- **text**: The quote text (don't include quotation marks here - they're added automatically)
- **author**: Who said it

## Common Editing Tasks

### ✅ Adding a New Organization

1. Find the organization section you want to add to
2. Look for the `"items": [` part
3. Add a comma after the last item
4. Add your new item: `"New Organization Name"`

### ✅ Changing Contact Information

1. Find the help card you want to update
2. Look for the `"contact":` line
3. Change the text inside the quotes

### ✅ Adding a New Help Category

1. Go to the help section
2. Find the end of the last help card (look for `}`)
3. Add a comma after the `}`
4. Copy an existing help card structure and modify it

### ✅ Updating the Quote

1. Find the `"quote"` section at the bottom
2. Change the `"text"` and/or `"author"` as needed

## Example: Adding a New Organization

**Before:**

```json
"items": [
  "East Bay Mutual Aid",
  "Oakland Community Land Trust"
]
```

**After:**

```json
"items": [
  "East Bay Mutual Aid",
  "Oakland Community Land Trust",
  "New Organization Name"
]
```

## What NOT to Do

❌ **Don't remove commas between items**
❌ **Don't remove quotation marks around text**
❌ **Don't remove curly braces `{}` or square brackets `[]`**
❌ **Don't add extra commas at the end of lists**

## Getting Help

If you break something by accident:

1. **Don't panic!**
2. You can always restore the original file
3. Check that all your quotation marks match up
4. Make sure you didn't accidentally delete a comma or bracket
5. Ask for help if needed

## Testing Your Changes

After making changes:

1. Save the file
2. Refresh the About page on the website
3. Check that all your content appears correctly
4. If something looks wrong, double-check your commas and quotation marks

Remember: Take it slow, make small changes, and test frequently!
