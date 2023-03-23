---
layout: ../../layouts/Layout.astro
title: Having fun with qr-codes
---

# Having fun with qr-codes

I had recently learned of a useful program for creating qr-codes called `qrencode`.

`qrencode` takes some plain-text data and converts it into qr-code format.
What's cool about this is that _any_ data can be encoded,
so I decided to try a few things.

The first thing that I tried was encoding the url for a website.
I thought it'd be cool to be able to quickly convert the url for
any site I was browsing at the time to a qr-code.
Since I use [qutebrowser][fn:1],
Doing this is possible using its extensible [user-scripts][fn:2] api.

```sh
#!/bin/sh

echo "$QUTE_URL" | qrencode -o - | feh
```

This script takes the current url that I'm on and passes it to `qrencode` via standard input,
which then outputs it to standard out and displays it using `feh` (an image viewer).

I have this script bound to the keys <kbd>,q</kbd> (q for qr-code) in my browser configuration,
and it's very convenient for those times when I'm about to walk away from the computer,
but I'd like to continue reading the article or viewing the listing that I'm on.

With that convenience now added to my workflow,
I thought to myself how could I take this further.
I saw an article with the example of having a virtual contact card (`*.vcard` or `*.vcs`)
Being able to have someone import my contact info in a quick scan?
Sign me up!
So I looked up the [vCard spec][fn:3],
and began writing up a simple contact card.
The vCard spec allows for adding all sorts of useful things,
like you're website, company, multiple email addresses and phone numbers.

I typically want to share only certain information with certain people depending on the context.
So I decided to make three separate vCards for myself.
One for personal contacts,
another for professional contacts,
and a third for work related contacts.

Now the next time someone wants to exchange personal information,
It's a quick scan away for me to give them exactly the information that I need.

I'm looking for more ways to utilize qr-codes in my daily life
since the spec allows for some very interesting applications.
One has to be mindful that there is a character limit to the data that can be converted.
(well unless it's just really, really large)

[fn:1]: qutebrowser.org
[fn:2]: https://qutebrowser.org/doc/userscripts.html
[fn:3]: https://www.rfc-editor.org/rfc/rfc6350#section-4.1
