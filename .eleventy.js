const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

    eleventyConfig.addNunjucksFilter("date", (dateObj, format = "yyyy-MM-dd") => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
    });

    eleventyConfig.addGlobalData("site", {
      url: "https://ai-atlas.mosn.me"
    });
    
    eleventyConfig.addCollection("all", collection => {
      return [
        ...collection.getFilteredByGlob("src/pages/**/*.md"),
        ...collection.getFilteredByGlob("src/docs/**/*.md"),
      ].filter(item => !item.data.eleventyExcludeFromCollections);
    });
  
    eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  
    eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
    

    return {
      dir: {
        input: "src",
        includes: "_includes",
        output: "dist"
      },
      templateFormats: ["md", "njk", "html", "xml"],
      markdownTemplateEngine: "njk",
      htmlTemplateEngine: "njk",
      dataTemplateEngine: "njk"
    };
  };
  