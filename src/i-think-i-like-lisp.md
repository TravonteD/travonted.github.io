---
title: I think that I like LISP
---

Recently I've been utilizing [Neovim's][neovim] Lua integration for configuration.
Most of the functions in my configuration have been converted.
Then I saw a post on a Neovim plugin called [Aniseed][aniseed] that integrated [Fennel][fennel].
Naturally I looked up Fennel and discovered that it was a lisp-like language that compiled to Lua.
I often see programmers that I follow like Robert Martin talk about how good the lisp syntax is, so I figured that I'd give it a try.
When getting started I said to myself "I'm finally doing it! I'm finally giving lisp a shot!", and to start I decided to rewrite one of my Lua functions in Fennel.

Here is the function.
It uses a library that wrote called [Luajob][luajob] to asynchronously get the results of `git diff --shortstat`, and set them to a global variable for use elsewhere in my config.  

First let's take a look at the Lua version:

```lua
function GitDiffStatus()
  local job = require('luajob')
  job:new({
      cmd = 'git diff --shortstat',
      on_stdout = function(err, data)
        if not err then
          if data then
            local stats = vim.fn.split(data, ',')
            local changed, inserted, deleted = '0', '0', '0'
            for i, stat in ipairs(stats) do
              if i == 1 then
                changed = stat:gsub("%s*(%d+).*", "%1")
              elseif i == 2 then
                inserted = stat:gsub("%s*(%d+).*", "%1")
              elseif i == 3 then
                deleted = stats[3]:gsub("%s*(%d+).*", "%1")
              end
            end
            vim.g.git_diff_status = ("~%s +%s -%s"):format(changed, inserted, deleted)
          end
        end
      end
    })
  job:start()
end
```

This is pretty straight forward.
We create a new job object and call "new" on it with a table of configuration.
The "on_stdout" function checks for errors then parses out the values based on how many digits are given from `git`

Now let's look at the Fennel version:

```fennel
(global GitDiffStatus
  (fn []
    (let [job (require :luajob)]
      (job:new {"cmd" "git diff --shortstat"
                "on_stdout" (fn [err data]
                              (if (not err)
                                (if (not data)
                                  (var stats (vim.fn.split data ","))
                                  (var (changed inserted deleted) (values "0" "0" "0"))
                                  (each [i stat (ipairs stats)]
                                    (match i
                                      1 (set changed (stat:gsub "%s*(%d+).*" "%1"))
                                      2 (set inserted (stat:gsub "%s*(%d+).*" "%1"))
                                      3 (set deleted (string.gsub (. stats 3) "%s*(%d+).*" "%1"))))
                                  (set vim.g.git_diff_status 
                                       (string.format "~%s +%s -%s" changed inserted deleted)))))})
      (job:start))))
```

This version takes a different form but is still relatively readable.
One think that you will notice is that there are no commas or end lines.
I think that this looks very clean.
Another observation is the large use of parenthesis.
While this can be confusing at first, it has a wonderful benefit.
The different scopes are always clear, and it was this observation that made me start to like the lisp syntax.

What I realized is that I'm not just looking at the code, I'm also looking at the syntax tree itself.
In LISP you essentially edit the syntax-tree directly!
This opens of a world of flexibility that, while not impossible in non-lisp-like languages, is available to the programmer right at the start!

I proceeded to rewrite my entire Lua configuration in Fennel, and I enjoyed every bit of it.
I enjoyed it so much that I even wrote a [treesitter parser][treesitter-fennel] for it, so that I could have syntax aware highlighting.
Using Fennel has led me into researching other lisps. 
It turns out that there seems to be a lisp-like language that has been implemented on top of many programming languages like [Clojure][clojure] (Java), [LFE][lfe] (Erlang), and many [more][lisp-like-languages]

So I guess I'm on the road to being a lisper.
The rabbit hole only goes deeper.


[neovim]: https://neovim.io
[aniseed]: https://github.com/olical/aniseed
[fennel]: https://fennel-lang.org
[luajob]: https://github.com/travonted/luajob
[treesitter-fennel]: https://github.com/travonted/tree-sitter-fennel
[lisp-like-languages]: https://github.com/dundalek/awesome-lisp-languages
[clojure]: https://clojure.org
[lfe]: https://lfe.io/
