// Eleventy-configuratie. Hier hoef je normaal niets aan te veranderen.
export default function (eleventyConfig) {
  // Deze mappen worden ongewijzigd meegekopieerd naar de gepubliceerde site.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addGlobalData("jaar", String(new Date().getFullYear()));

  // Datum in het Nederlands, bijvoorbeeld "22 september 2026".
  eleventyConfig.addFilter("datum", (waarde) => {
    if (!waarde) return "";
    const d = waarde instanceof Date ? waarde : new Date(waarde);
    if (isNaN(d)) return String(waarde);
    return new Intl.DateTimeFormat("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(d);
  });

  // Het uitgelichte item: het eerste met het vinkje aan, anders het nieuwste.
  eleventyConfig.addFilter("uitgelicht", (lijst) =>
    (lijst || []).find((i) => i.data.uitgelicht) || (lijst || [])[0]
  );

  // Dezelfde lijst zonder dat ene item.
  eleventyConfig.addFilter("zonder", (lijst, item) =>
    (lijst || []).filter((i) => i !== item)
  );

  // Welke soorten komen er voor, in de volgorde waarin ze voorkomen.
  eleventyConfig.addFilter("soorten", (lijst) =>
    [...new Set((lijst || []).map((i) => i.data.soort).filter(Boolean))]
  );

  // Alle actueel-items, nieuwste eerst.
  eleventyConfig.addCollection("actueel", (api) =>
    api.getFilteredByGlob("src/actueel/*.md").sort((a, b) => b.data.datum - a.data.datum)
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
