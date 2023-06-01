module.exports = {
  scriptByWebsite: () => {
    return {
      "@LiveMusicProductionJson":[],
      LiveMusicProduction: {
        scriptListUrlEvents: (selector, selectors) => `
     const elems = Array.from(document.querySelectorAll("${selector} > ${selectors}"))
     elems.map((elem) => elem.getAttribute('href'));
    `,
        scriptGetTitle: `
            document.querySelector(".performance__title").textContent
          `,
        scriptGetDate: `
          document.querySelector(".performance__controls__head")?.textContent.split('|')[0].replaceAll(/(\\n|\\t)/g, '').trim()  ?? ""
        `,
        scriptGetPlace: `
          document.querySelector(".performance__controls__head")?.textContent.split('|')[1].replaceAll(/(\\n|\\t)/g, '').trim()  ?? ""
        `,
        scriptGetImage: `
          document.querySelector(".performance__info__pic > img")?.getAttribute('src')
        `,
        scriptGetDescription: `
        Array.from(document.querySelectorAll(".performance__info__content > p")).map((p) => p.textContent).join('   ').replaceAll(/(\\n|\\t)/g, '').trim() ?? ""
        `,
        scriptGetInfo: ``,
      },
    };
  },
};
