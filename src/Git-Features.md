---
title: Effective Git
---

Git is a version control tool intended to allow decentralized management of code (namely the Linux Kernel). It however has found its way throughout many code bases and for good reason. Its many features make it easy and simple to keep track of changes in code and any other plain-text document. Most people have only a limited knowledge of git and its capabilities, so I'm going to go through some of the lesser known commands that make managing the repository easy

### Git stash
  
Do you ever have that bit of code that you're working on, but then realize that you're not in the correct branch? Then, when you attempt to checkout the proper message you're met with an error that looks like this.

`error: Your local changes to the following files would be overwritten by checkout:`

So what do you do? Some people will rename the file temporarily, checkout the branch then rename it back so that they can commit. Others will open the file in an editor so that they can simple save the changes again after they remove the file and checkout the proper branch. The git centric solution to this problem is "git stash".
From the manual: 

> "Use git stash when you want to record the current state of the working directory and the index, but want to go back to a clean working directory. The command saves your local modifications away and reverts the working directory to match the HEAD commit."

This is exactly what we were looking for! So now we can run the command 

```zsh
> git stash save
Saved working directory and index state WIP on dark_mode: 4304fd7 remove status bar
```

to see the list run **git stash list**

```zsh
> git stash list
stash@{0}: WIP on dark_mode: 4304fd7 remove status bar
```

and after checking out the correct branch run **git stash pop**

```zsh
> git stash pop
On branch dark_mode
Your branch is up to date with 'origin/dark_mode'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   .tmux.conf
        modified:   config/newsboat/config
        modified:   init.vim
        modified:   scripts/ddg.rb

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (3337c0c25b6055febcfe0a9141b9ea70a90dc68f)
```

and there are my changes ready to be committed!
  
## Git log
  
Most people who use git know what git log is. It's the list of commits that have been made in the repository. It has a ton of features that I rarely see get used so I'm going to highlight a few of them.

### `git log --follow`
    
This command allows you to **look through the history of a single file even _beyond_ its renames**. 
Which is great for when you change "thing.rb" to "thing_v1.rb". 
Many people don't realize that the commits are still tied you just need to specify that you want them. 
The only caveat with this command is that it can only be used on a single file at a time. 
So you'll need to know where to look.
    
### `git log --grep/invert-grep/all-match`
    
These are a quick way to find that commit that you made weeks ago relating to a certain piece of code. 
If you've named your commits well, you can give an expression and **grep & invert-grep will give the first match, and all-match will give any commits that match the search expression**
    
### `git log --since/until=<date>`
    
If you know that you've made a change, say last week, that you want to find. 
You can use the **since** and **until** flags to **time constrain the dates** to be from Monday to Friday of last week. 
**You can also filter using a range if you have the commit refs like so `git log 61966bf..`**
    
## Git revert

This command is often avoided for fear of losing information, but I believe that it is a false notion about what this command does. **Git revert simply takes a change that you made in your commit and makes a new commit with the opposite thing done.** For instance, you've deleted some code that seemed unimportant and now have realized that it is in fact necessary for the feature. Instead of going through the log and copy-pasting from the diff, or rewriting it you can use git revert. 
  
Lets say I have this commit that I want to revert:

```zsh
commit edee54c add ruby shebang
``` 
  
When I run the command `git revert edee54(this is a shortname)`, **git creates a new commit with a helpful commit message with a reference to the previous commit** like so:
  
```zsh
Revert "add ruby shebang"

This reverts commit edee54c11c2a7f7a9f20d0ce91dd69fee0a562e8.
```

Now I just finalize the commit and I've picked up the change that I needed easy-peasy!
  
## Git add \--patch
  
  We've all gotten on a roll and added a ton of changes to a file in between commits. Then we think to ourselves "what am I going to say in the message?" There are so many changes, some unrelated to each other that it would be a paragraph to write and it would make our git log less useful because the small change we may need to find is bundled into this gigantic commit. Enter `git add --patch`. **This command brings up an interactive menu with the changes to each file that shows us each "hunk" that has been changed.** 
  

```diff
@@ -24,7 +32,12 @@ module CoreMIDI
   functions.each do |func|
-    attach_function *func
+    begin
+      attach_function *func
+    rescue Exception => e
+      $stderr.puts "Couldn't attach function #{func.first}"
+      raise
+    end
   end

   def midi_read_proc()
Stage this hunk [y/n/a/d/K/j/J/e/?]?

```

Here entering "?" will describe each of the options at the bottom. Here's a quick guide to get you going:

- "y" - Yes, add this hunk
- "n" - No, don't add this hunk
- "a" - add this hunk and the remaining hunks. (Useful when you want to add the rest of the changes)
- "d" - No, don't add this hunk and the remaining hunks. (Useful for when you're done adding and want to skip to the end)
- "s" - Split the hunk into smaller hunks (this only works if there are unchanged lines between the pieces)
- "e" - Manually edit the hunk (will open up a text editor for you to add exactly what you want, but I usually just use 's')

Now we can just commit the changes that we want grouped together, or commit each change individually with its own descriptive commit message! If the hunks are still to large you can even break them up into smaller pieces. This makes for a better git log so that we can find the changes that we need easily and precisely.
