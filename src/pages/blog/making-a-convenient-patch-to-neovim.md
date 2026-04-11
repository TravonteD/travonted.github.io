---
layout: ../../layouts/BlogPostLayout.astro
title: Making a convenient patch to neovim
date: 2026-04-11
---

Neovim allows users to use LSP-style snippets natively.
By default, there are only a few variables that can be replaced with special text.

| | |
|---|---|
| TM_SELECTED_TEXT | The currently selected text or the empty string |
| TM_CURRENT_LINE | The contents of the current line |
| TM_CURRENT_WORD | The contents of the word under cursor or the empty string |
| TM_LINE_INDEX | The zero-index based line number |
| TM_LINE_NUMBER | The one-index based line number |
| TM_FILENAME | The filename of the current document |
| TM_FILENAME_BASE | The filename of the current document without its extensions |
| TM_DIRECTORY | The directory of the current document |
| TM_FILEPATH | The full file path of the current document |

These are great, but I wanted to make a snippet that included the current date and there's no way to do that without adding a plugin such as [vim-vsnip](https://github.com/hrsh7th/vim-vsnip) or [luasnip](https://github.com/L3MON4D3/LuaSnip).
I build my Neovim from source so looking at the innards is convenient, so I figured I'd look a how these variables work and it's pretty straight forward.

```lua
local function expand_or_default(str)
  local expansion = vim.fn.expand(str) --[[@as string]]
  return expansion == '' and default or expansion
end

if var == 'TM_SELECTED_TEXT' then
  -- Snippets are expanded in insert mode only, so there's no selection.
  return default
elseif var == 'TM_CURRENT_LINE' then
  return vim.api.nvim_get_current_line()
elseif var == 'TM_CURRENT_WORD' then
  return expand_or_default('<cword>')
elseif var == 'TM_LINE_INDEX' then
  return tostring(vim.fn.line('.') - 1)
elseif var == 'TM_LINE_NUMBER' then
  return tostring(vim.fn.line('.'))
elseif var == 'TM_FILENAME' then
  return expand_or_default('%:t')
elseif var == 'TM_FILENAME_BASE' then
  return expand_or_default('%:t:r')
elseif var == 'TM_DIRECTORY' then
  return expand_or_default('%:p:h:t')
elseif var == 'TM_FILEPATH' then
  return expand_or_default('%:p')
end
```

After looking at this, I just needed to add a way to declare a function that returned a string of what I wanted it to be replaced with. So I added this:

```lua
-- runtime/lua/vim/snippet.lua resolve_variable function
if vim.g.snippet_vars ~= nil and vim.g.snippet_vars[var] ~= nil then
  return vim.g.snippet_vars[var]()
end
```

and in my `init.lua` this

```lua
vim.g.snippet_vars = {
  TM_DATE = function ()
    return os.date('%Y-%m-%d')
  end
}
```

The patch checks a global variable called `vim.g.snippet_vars` that contains a table of key names and functions that return a string as the value.
So for my `TM_DATE` snippet (I figured I'd keep the naming convention from the standard variables), I just have a function that returns the current date in ISO format like so:

```lua
vim.snippet.expand("$TM_DATE") -- expands to 2026-04-11
```

To make sure that my patch would continue working in the future, I also added a spec that tested out this functionality.
And just like that, I now have the ability to declare custom snippet variables natively!
"But what if you don't have your custom build installed?"
In that case the default behavior of snippet variables will work which will treat `$TM_DATE` as a placeholder.


P.S. I don't plan on making this a pull request to upstream because the core maintainers mentioned that they want the snippet functionality to adhere strictly to the LSP spec.
