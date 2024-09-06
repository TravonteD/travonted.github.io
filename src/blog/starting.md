---
layout: ../../layouts/Layout.astro
title: (Re)Starting my blog
---

# (Re)Starting my blog

Over the years, I've written many personal logs on various topics to give myself a refresher should I ever want to explore further.
I often speak on these topics with friends/family and when I do they always give the same advice "You should start a blog".
I usually like to keep my internet footprint pretty small, but I've decided to come out of my shell and start sharing some of the things that I've learned with a wider audience.
I've made no commitments to frequency or quantity, when I find something cool I'll just write about it.

To get things started I'll talk about the simple and useful utilities that I'm using to make this happen.

## Astro.js

I discovered [Astro][astro] from the [JS Party][jsparty] podcast. The creators were being interviewed and I enjoyed listening to their reasoning for creating the framework. There are other similar tools out there<sup>[1](#1)</a></sup> but I've decided on Astro simply because I think that it's neat. If I hadn't heard of it, however I'd have gone with Hugo.

## Simple.css

For people like me who like things to look basic and uniform, [Simple.css][simplecss] is an _excellent_ choice.
It has a nice, clean, default look and styles the html tags directly (with a few classes here and there).
Not having to worry about formatting is something that I value in my workflow<sup>[2](#2)</sup> and it takes much of the tedium from the writing process.

## Github/Gitlab/Cloudflare Pages

There are a _ton_ of choices to pick from when it comes to hosting a website.
In my case, I just needed a bare-bones "serve this directory" hosting solution that I could plug into CI.
Currently what you're reading is on [Github Pages][ghpages], but I mentioned the others to make the point that this is an **extremely** simple and easily migrated solution. Heck, I could even just spin up an nginx container and serve the file themselves (there are more steps than that, but hopefully you get the point).

## Vim

One of the biggest, if not _the_ biggest, tools necessary for writing a blog is having a good editor.
I know that for many a "proper" word processor is critical, but for me, it's just good'ol [(neo)vim][nvim].
I'm partial to this mostly because I live in the terminal<sup>[3](#3)</sup>, and I can move _very_ fast with vim's powerful keybindings.
Of course, to ensure that I'm not making a complete fool of myself I use tools like `ltex-ls` which uses [Language Tool][languagetool] to check grammar and spelling.

### Conclusion

Ultimately I'm hoping that a few of the things that I write in this blog are useful for others, but if not it's useful to me 🤷.

<div style="font-size: 0.96rem">
  <div><sup id="1">1</sup>: Next.js, Gatsby, and Hugo to name a few</div>
  <div><sup id="2">2</sup>: Stay tuned for a post on latex</div>
  <div><sup id="3">3</sup>: I should probably write about that!</div>
</div>

[astro]: https://astro.build
[jsparty]: https://changelog.com/jsparty
[simplecss]: https://simplecss.org
[ghpages]: https://pages.github.com
[nvim]: https://neovim.io
[languagetool]: https://languagetool.org
