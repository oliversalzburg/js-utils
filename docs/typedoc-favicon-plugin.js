import { Application, Renderer } from "typedoc";

/**
 * Adds a <link> tag to the generated documentation to point to the favicon.
 * @param {Application} app - The typedoc application.
 */
export function load(app) {
  app.renderer.on(Renderer.EVENT_BEGIN, () => {
    app.renderer.hooks.on("head.begin", () => {
      return [
        {
          tag: "link",
          props: { rel: "icon", href: `${app.options.getValue("hostedBaseUrl")}favicon.ico` },
          children: [],
        },
      ];
    });
  });
}
