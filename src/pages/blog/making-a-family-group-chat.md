---
layout: ../../layouts/BlogPostLayout.astro
title: Making a family group chat
date: 2026-04-08
---

There are a lot of group chats and messaging apps available out there that many people in my family use to communicate.
Some of them use iMessage, some of them use WhatsApp, some of them use Telegram, and many, many more ways to communicate. And as a result, information is often lost. A cousin may lose access to the chat history or my sister may not be able to find that meme that she posted two months ago. 
Me being the resident tech enthusiast in the family, I thought it'd be a good idea to solve this issue by making a self-hosted server that all of my family has an account on.
Then, we can keep all of our family wide communication together.
I attempted this once with a matrix server (conduit), and it worked fine for a while, but the complexity of matrix encryption keys caused many of my family members to lock themselves out, or miss notifications.
Another thing that really confused them is that there are actually two apps for elements on Android. There's Element Legacy, which actually tends to work better for people, and the newer element that is technically better but less reliable for things like notifications on android for example.
So as a result of this difficulty, I wanted to try something simpler. I went on a hunt for the most basic chat server I could find.

A project that really caught my eye as I was searching around was a very basic chat server written in Ruby on Rails by the team over at 37signals called Campfire.
It was meant to be a very simple chat server that can be run in Docker, which sounded family proof, exactly what I'd been looking for.
I set it up on a VPS and everything worked pretty much right out of the box. I did have some difficulty at first with web push notifications, but it was an issue on my end with my VIPER[^1] keys.
The server is invite only by default. So I only had to give the invite link to each of my family members and they were able to make an account, no problem.
This really worked out well so far. Because the app is web-based, there's no downloading that needs to be done. I don't have to explain to the iPhone users in my family to go to the App Store or for the Android users to have to go to their App Store or download from F-Droid. I simply had to give them an invite link and have them create an account.
Another nice thing is that Campfire is open source and therefore can be modified to our liking. It also has a very simple bot API. It's bare bones, but it does the job effectively. We have images, videos, and we really don't need much more than that.

I think that if I wanted to spin up a chat for a different group, I would go with Campfire again, because it's so straightforward to deploy. Notifications work on all platforms, and once you're done with it you can just delete it, no lingering accounts on a random platform.
I think it's nice to have a private place where my family can communicate without having to worry about seeing an ad on Amazon the next day about related to the things that we've talked about. Having younger people in the chat gives me security that their information won't be leaked (and if it does it's my fault).

[^1]: Vipro keys are used to authenticate notifications between web apps and various devices.
