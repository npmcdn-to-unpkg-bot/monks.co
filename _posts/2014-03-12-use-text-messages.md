---

title: how to develop things that use text messages
category: howto
year: 2014
---
Here's three approaches (of increasing complexity) for developing around SMS messages:

## [ifttt](https://ifttt.com/sms)

ifttt stands for if-this-then-that. It's a free online service for writing 'recipes' for connecting various other online services. That's a super vague description, but here's an example of a simple 'text to escape' recipe that calls your phone every time you text a particular number so you can pretend something urgent happened and duck out of the situation.

## [textit](http://textit.in/)

TextIt is a super-cheap rwandan service that provides a max/msp-like dataflow programming model for developing sms applications. If you want to make something that deals exclusively in text messages: receives a text and then responding accordingly, rather than working a website or something fancier, TextIt is likely a good choice.

## [nemxo](https://www.nexmo.com/pricing/)

If you want your website  to send or receive text messages, Nexmo is a popular service that provides an API for sending and receiving text messages. It can be a bit complicated to set up, but it's the same process you'd use to connect (for example) to Twitter's API and post or read tweets.
