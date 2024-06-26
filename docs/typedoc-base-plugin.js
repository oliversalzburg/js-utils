import { Application, Renderer } from "typedoc";

/**
 * Adds a <base> tag to the generated documentation.
 * @param {Application} app - The typedoc application.
 */
export function load(app) {
  app.renderer.on(Renderer.EVENT_BEGIN, () => {
    app.renderer.hooks.on("head.begin", context => {
      if (context.page.url !== "index.html") {
        return undefined;
      }

      return {
        tag: "base",
        props: { href: app.options.getValue("hostedBaseUrl") },
        children: [],
      };
    });
  });
}
