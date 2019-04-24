title: spring解析错误解决
author: tyrantqiao
tags:
  - java
  - spring
categories: []
date: 2018-08-05 14:08:00
copyright: true
toc: true
---

Well, I am not sure this answer will help u, as the question is posed in 14. In order to help people resolve this question, I send some of my resolutions. Hope this will help.

> - **make sure your `@Controller` 's configuration** 
>     - **`@RequestMapping("/xx")` cannot be the same as your view(jsp or templates)**

For example, you have a view name home.html. You cannot let the `@RequestMapping()` be the same as view's name. This will cause ***circle error*** (--> I am not sure the actual exception name) Correction, it should be the path cannot be the name.(That's the JSP files mostly happen)

When u input the same name, u will get this. 
> Circular view path [preference]: would dispatch back to the current handler URL [/preference] again. Check your ViewResolver setup! (Hint: This may be the result of an unspecified view, due to default view name generation.)

Here is a link explain why [this error would happen][1] 

  >  - **This only for the HTML5 file**
  >       -**When u create an HTML file, the basic file will be the below code.**

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
    
    </body>
    </html>

The `<meta charset="UTF-8">` didn't end with `/>` or </meta>
When in the HTML5 file, that should be right. But I think the thymeleaf use the XHTML. So the `<meta>` should remember to close.