# Learning Tailwind

Styling web projects is an age-old debate and everyone has their own opinion. Here are a few different patterns/technologies you might find in modern web projects:

[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - The OG, basic, built-in, and most widely supported styling language for the web. It's been around for a long time and is very powerful. It's also very verbose and can be difficult to work with. It is _very_ difficult to enforce consistency across a project.

[SASS](https://sass-lang.com/) - A CSS preprocessor that adds a lot of functionality to CSS. Very similar to CSS, it adds a lot of methods for writing less boiler plate, but is still the same idea as CSS. Generally preferred to raw CSS in every scenario.

[CSS Modules](https://github.com/css-modules/css-modules) - A way to scope CSS to a specific component. This is a great way to enforce consistency and avoid naming collisions. It's rather verbose and keeps CSS and your styling files separate.

[JSS](https://cssinjs.org/?v=v10.10.0) - Declare CSS classes in JavaScript as classes. Helps to keep both styling and the component together. However, it might be more difficult to read and adds a fair amount of boilerplate while also ruining intellisense.

[Styled Components](https://styled-components.com/) - A way to write CSS in JavaScript. This is the best way to keep raw CSS/SASS together in the same file (for React, at least). It can be a bit combersome to declare more components

[Tailwind](https://tailwindcss.com/) - Tailwind provides small 'utility' classes that can be used to style elements. It's a bit of a different way of thinking about styling, but it's very powerful and can be used to create very consistent styling across a project.

## Examples

Where you might normally write the below

```html
<div className="class-1">
  <p className="text-1">Some text</p>
  <div>
    <style>
      .class-1 {
        background-color: red;
      }

      .text-1 {
        color: blue;
      }
    </style>
  </div>
</div>
```

You can instead write

```html
<div className="bg-red-500">
  <p className="text-blue-500">Some text</p>
  <div></div>
</div>
```

It might take a bit to get used to, but the offical [VS Code Tailwind Extension](https://tailwindcss.com/docs/editor-setup) makes it easy to both lookup new clsses and see the exact CSS that is applied.

## Tips

Use the [VS Code Tailwind Docs](https://marketplace.visualstudio.com/items?itemName=austenc.tailwind-docs) extension to lookup classes and see the exact CSS that is applied.

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> and type the intended action to see the associated Tailwind docs.
