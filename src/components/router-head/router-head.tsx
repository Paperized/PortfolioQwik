import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="apple-touch-icon" sizes="180x180" href="https://paperized-dev.com/favicon/apple-touch-icon.png"/>
      <link rel="apple-touch-icon-precomposed" sizes="180x180" href="https://paperized-dev.com/favicon/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="https://paperized-dev.com/favicon/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="https://paperized-dev.com/favicon/favicon-16x16.png"/>
      <link rel="manifest" href="https://paperized-dev.com/favicon/site.webmanifest"/>
      <link rel="mask-icon" href="https://paperized-dev.com/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
      <meta name="msapplication-TileColor" content="#da532c"/>
      <meta name="theme-color" content="#000000"/>

      <meta name="robots" content="index, follow"/>

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
