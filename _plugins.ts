import date from "lume/plugins/date.ts";
import extract_date from "lume/plugins/extract_date.ts";
import json_ld from "lume/plugins/json_ld.ts";
import metas from "lume/plugins/metas.ts";
import robots from "lume/plugins/robots.ts";
import filter_pages from "lume/plugins/filter_pages.ts";
import google_fonts from "lume/plugins/google_fonts.ts";
import sass from "lume/plugins/sass.ts";
import postcss from "lume/plugins/postcss.ts";
import lightningcss from "lume/plugins/lightningcss.ts";
import purgecss from "lume/plugins/purgecss.ts";
import check_urls from "lume/plugins/check_urls.ts";
import icons from "lume/plugins/icons.ts";
import og_images from "lume/plugins/og_images.ts";
import favicon from "lume/plugins/favicon.ts";
import svgo from "lume/plugins/svgo.ts";
import picture from "lume/plugins/picture.ts";
import transform_images from "lume/plugins/transform_images.ts";
import inline from "lume/plugins/inline.ts";
import sitemap from "lume/plugins/sitemap.ts";
import esbuild from "lume/plugins/esbuild.ts";
import { nl } from "npm:date-fns/locale/nl";


export default function () {
    return (site: Lume.Site) => {

        // Filter(s)
        site.filter("getRelatedPosts", (postList, tags) =>
            postList.filter((post) =>
                tags.some((tag) => post.tags.includes(tag))
            )
        );


        // Plugin(s)
        site.use(date({
            locales: { nl },
        }));
        site.use(extract_date({
            remove: false,
        }));
        site.use(json_ld());
        site.use(metas());
        site.use(robots());
        site.use(filter_pages());
        site.use(google_fonts({
            fonts: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
        }));
        site.use(sass());
        site.add("/css/styles.scss");
        site.use(postcss());
        site.use(lightningcss());
        site.add("[.css]");
        site.add("css/styles.css");
        site.use(purgecss());
        site.use(check_urls());
        site.use(icons({
            folder: "/img/icons",
        }));
        site.use(og_images());
        // site.use(favicon());
        site.use(svgo());
        site.use(picture());
        site.use(transform_images());
        site.add([".svg"]);
        site.add("media");
        site.use(inline());
        site.use(sitemap());
    }
}
