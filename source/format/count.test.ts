import { expect } from "chai";
import { it } from "mocha";
import { formatCount, parseCount } from "./count.js";

it("formats counts as expected", function () {
  // Fails on NodeJS20 on Windows
  // https://github.com/oliversalzburg/js-utils/actions/runs/9069549841/job/24919347525
  this.timeout(5000);

  expect(formatCount(-1)).to.equal("-1");
  expect(formatCount(0)).to.equal("0");
  expect(formatCount(1)).to.equal("1");
  expect(formatCount(10)).to.equal("10");
  expect(formatCount(100)).to.equal("100");
  expect(formatCount(1000)).to.equal("1K");
  expect(formatCount(1234)).to.equal("1.234K");
});

it("parses counts as expected", function () {
  const testCount = function (count: number, inputLocale?: string, input?: string) {
    const locales = inputLocale
      ? [inputLocale]
      : "af,af-ZA,ar,ar-AE,ar-BH,ar-DZ,ar-EG,ar-IQ,ar-JO,ar-KW,ar-LB,ar-LY,ar-MA,ar-OM,ar-QA,ar-SA,ar-SY,ar-TN,ar-YE,az,az-AZ,az-AZ,be,be-BY,bg,bg-BG,bs-BA,ca,ca-ES,cs,cs-CZ,cy,cy-GB,da,da-DK,de,de-AT,de-CH,de-DE,de-LI,de-LU,dv,dv-MV,el,el-GR,en,en-AU,en-BZ,en-CA,en-CB,en-GB,en-IE,en-JM,en-NZ,en-PH,en-TT,en-US,en-ZA,en-ZW,eo,es,es-AR,es-BO,es-CL,es-CO,es-CR,es-DO,es-EC,es-ES,es-ES,es-GT,es-HN,es-MX,es-NI,es-PA,es-PE,es-PR,es-PY,es-SV,es-UY,es-VE,et,et-EE,eu,eu-ES,fa,fa-IR,fi,fi-FI,fo,fo-FO,fr,fr-BE,fr-CA,fr-CH,fr-FR,fr-LU,fr-MC,gl,gl-ES,gu,gu-IN,he,he-IL,hi,hi-IN,hr,hr-BA,hr-HR,hu,hu-HU,hy,hy-AM,id,id-ID,is,is-IS,it,it-CH,it-IT,ja,ja-JP,ka,ka-GE,kk,kk-KZ,kn,kn-IN,ko,ko-KR,kok,kok-IN,ky,ky-KG,lt,lt-LT,lv,lv-LV,mi,mi-NZ,mk,mk-MK,mn,mn-MN,mr,mr-IN,ms,ms-BN,ms-MY,mt,mt-MT,nb,nb-NO,nl,nl-BE,nl-NL,nn-NO,ns,ns-ZA,pa,pa-IN,pl,pl-PL,ps,ps-AR,pt,pt-BR,pt-PT,qu,qu-BO,qu-EC,qu-PE,ro,ro-RO,ru,ru-RU,sa,sa-IN,se,se-FI,se-FI,se-FI,se-NO,se-NO,se-NO,se-SE,se-SE,se-SE,sk,sk-SK,sl,sl-SI,sq,sq-AL,sr-BA,sr-BA,sr-SP,sr-SP,sv,sv-FI,sv-SE,sw,sw-KE,syr,syr-SY,ta,ta-IN,te,te-IN,th,th-TH,tl,tl-PH,tn,tn-ZA,tr,tr-TR,tt,tt-RU,ts,uk,uk-UA,ur,ur-PK,uz,uz-UZ,uz-UZ,vi,vi-VN,xh,xh-ZA,zh,zh-CN,zh-HK,zh-MO,zh-SG,zh-TW,zu,zu-ZA".split(
          ",",
        );

    locales.forEach(locale => {
      const formatted = input ?? formatCount(count, locale);
      const parsed = parseCount(formatted, locale);

      if (parsed !== count) {
        const parts = new Intl.NumberFormat(locale).formatToParts(count);
        const literal = parts
          .filter(p => p.type !== "literal")
          .map(
            part =>
              `${part.type}:${part.value
                .split("")
                .map(char => `U+${char.charCodeAt(0).toString(16).padStart(4, "0")}`)
                .join(", ")}`,
          );
        expect(parsed).to.equal(count, `Failed for locale '${locale}': '${literal.join(", ")}'`);
      }
    });
  };

  testCount(-1, "en-US", "-1");
  testCount(0, "en-US", "0");
  testCount(1, "en-US", "1");
  testCount(10, "en-US", "10");
  testCount(100, "en-US", "100");
  testCount(1000, "en-US", "1K");
  testCount(1234, "en-US", "1.234K");
  testCount(-1234);
});
