import date from "lume/plugins/date.ts";
import json_ld from "lume/plugins/json_ld.ts";
import metas from "lume/plugins/metas.ts";
import robots from "lume/plugins/robots.ts";
import icons from "lume/plugins/icons.ts";
import sass from "lume/plugins/sass.ts";
import postcss from "lume/plugins/postcss.ts";
import purgecss from "lume/plugins/purgecss.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import og_images from "lume/plugins/og_images.ts";
import favicon from "lume/plugins/favicon.ts";
import svgo from "lume/plugins/svgo.ts";
import transform_images from "lume/plugins/transform_images.ts";
import inline from "lume/plugins/inline.ts";
import sitemap from "lume/plugins/sitemap.ts";

export default function () {
    return (site: Lume.Site) => {
        site.use(date());
        site.use(json_ld());
        site.use(metas());
        site.use(robots());
        site.use(icons());
        site.use(sass());
        site.use(postcss());
        site.use(purgecss());
        site.use(lightningCss());
        site.add("[.css]");
        site.add("/css/styles.scss");
        //site.use(og_images());
        //site.use(favicon());
        site.use(svgo());
        site.add([".svg"]);
        site.use(transform_images());
        site.add("/media");
        site.use(inline());
        site.use(sitemap());
        site.add("/js/main.js");
    }
}