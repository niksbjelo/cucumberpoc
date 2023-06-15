module.exports = {
  resultJson: "",
  scriptByWebsite: () => {
    this.returnString = this.isPlayWright ? "" : "return";
    return {
      LiveMusicProduction: {
        scriptNbUrlEvents: (selectors) => `
          ${this.returnString} Array.from(document.querySelectorAll("${selectors}")).length
        `,
        scriptListUrlEvents: (selectors) => `
          const elems = Array.from(document.querySelectorAll("${selectors}"))
          ${this.returnString} elems.map((elem) => elem.getAttribute('href'));
        `,
        scriptGetTitle: `
            ${this.returnString} document.querySelector(".performance__title").textContent.trim() ?? ""`,
        scriptGetSubTitle: `
            ${this.returnString} document.querySelector(".detail-subtitle")?.textContent.trim() ?? ""`,
        scriptGetDate: `
          ${this.returnString} document.querySelector(".performance__controls__head")?.textContent.trim().split('|')[0]  ?? ""
        `,
        scriptGetPlace: `
          ${this.returnString} document.querySelector(".performance__controls__head")?.textContent.trim().split('|')[1]  ?? ""
        `,
        scriptGetImage: `
          ${this.returnString} document.querySelector(".performance__info__pic > img")?.getAttribute('src')`,
        scriptGetDescription: `
        ${this.returnString} Array.from(document.querySelectorAll(".performance__info__content > p")).map((p) => p.textContent.trim()).join('   ') ?? ""
        `,
        scriptGetInfo: ` ${this.returnString} document.querySelector(".performance__info__content__last-minute").textContent.trim() ?? ""`,
      },
      VilleDeLausanne: {
        scriptListUrlEvents: (selectors) => `
          const elems = Array.from(document.querySelectorAll("${selectors}"))
          ${this.returnString} elems.map((elem) => elem.getAttribute('href'));
        `,
        scriptGetTitle: `
            ${this.returnString} document.querySelector(".detail-title-main").textContent.trim() ?? ""`,
        scriptGetSubTitle: `
            ${this.returnString} document.querySelector(".single-event__tour")?.textContent.trim() ?? ""`,
        scriptGetDate: `
          ${this.returnString} document.querySelector("div.agenda-detail-body > div.detail-body-practical > div:nth-child(1) > div:nth-child(2)")?.textContent.trim()  ?? ""
        `,
        scriptGetPlace: `
          ${this.returnString} document.querySelector(".detail-location")?.textContent.trim()  ?? ""
        `,
        scriptGetImage: `
          ${this.returnString} document.querySelector(".hero-item img")?.getAttribute('src')`,
        scriptGetDescription: `
          ${this.returnString} Array.from(document.querySelectorAll(".detail-body-description > p")).map((p) => p.textContent.trim()).join('   ').trim() ?? ""
        `,
        scriptGetInfo: `${this.returnString} document.querySelector(".agenda-detail-body > div.detail-body-practical > div:nth-child(3) > div.info")?.textContent.trim()`,
      },
      OpusOne: {
        selectorToBeCounted: ".event-month",
        scriptNbUrlEvents: (selectors) => `
          ${this.returnString} Array.from(document.querySelectorAll("${selectors}")).length
          `,
        scriptListUrlEvents: (selectors) => `
              const elems = Array.from(document.querySelectorAll("${selectors}"))
              ${this.returnString} elems.map((elem) => elem.getAttribute('href'));
            `,
        scriptGetTitle: `
            ${this.returnString} document.querySelector(".single-event__title")?.textContent.trim() ?? ""`,
        scriptGetSubTitle: `
            ${this.returnString} document.querySelector(".single-event__tour")?.textContent.trim() ?? ""`,
        scriptGetDate: `
            ${this.returnString} document.querySelector(".event-card__date")?.textContent.trim()  ?? ""
        `,
        scriptGetPlace: `
            ${this.returnString} document.querySelector(".event-card__where")?.textContent.trim()  ?? ""
        `,
        scriptGetPrice: `
            ${this.returnString} document.querySelector(".one-ticket__price")?.textContent.trim()  ?? ""
        `,
        scriptGetImage: `
            ${this.returnString} document.querySelector(".header-carousel__img img")?.getAttribute('src')`,
        scriptGetDescription: `
            ${this.returnString} Array.from(document.querySelectorAll(".block--chapo > p, .block--text > p")).map((p) => p?.textContent.trim()).join('   ').trim() ?? ""
        `,
        scriptGetStyle: `
            ${this.returnString} document.querySelector(".single-event__style > .single-event__hashtag")?.textContent.trim()  ?? ""
        `,
        scriptGetInfo: `${this.returnString} document.querySelector(".agenda-detail-body > div.detail-body-practical > div:nth-child(3) > div.info")?.textContent`,
      },
      Payot: {
        selectorToBeCounted: ".outer-list-item",
        clickMoreEvents: "#MainContent_linkbtPlus",
        scriptNbUrlEvents: (selectors) => `
          ${this.returnString} Array.from(document.querySelectorAll("${selectors}")).length
          `,
        scriptListUrlEvents: (selectors) => `
              const elems = Array.from(document.querySelectorAll("${selectors}"))
              ${this.returnString} elems.map((elem) => elem.getAttribute('href'));
            `,
        scriptGetTitle: `
            ${this.returnString} document.querySelector(".main-infos > h1")?.textContent.trim() ?? ""`,
        scriptGetSubTitle: `
            ${this.returnString} document.querySelector(".main-infos > h1 > .subtitle")?.textContent.trim() ?? ""`,
        scriptGetDate: `
            const dtElements = document.getElementsByTagName('dt');
            let result = "";
            for (let i = 0; i < dtElements.length; i++) {
              const dtElement = dtElements[i];

              if (dtElement.textContent.trim() === 'Parution') {
                const ddElement = dtElement.nextElementSibling;
                if (ddElement && ddElement.tagName === 'DD') {
                  result = ddElement.textContent.trim();
                  break;
                }
              }
            }
            ${this.returnString} result
        `,
        scriptGetPlace: `
            ${this.returnString} ""
        `,
        scriptGetPrice: `
            ${this.returnString} document.querySelector(".prix-payot")?.textContent.trim() ?? ""
        `,
        scriptGetImage: `
            ${this.returnString} document.querySelector(".main-image > button > img")?.getAttribute('src')`,
        scriptGetDescription: `
            ${this.returnString} document.querySelector('#MainContent_RadPageAuthorBio')?.textContent.trim() ?? ""
        `,
        scriptGetStyle: `
            ${this.returnString} ""
        `,
        scriptGetInfo: `
            const Info = {}
            const dtElements = document.getElementsByTagName('dt');
            let result = "";
            for (let i = 0; i < dtElements.length; i++) {
              const dtElement = dtElements[i];

              if (dtElement.textContent.trim() === 'Éditeur') {
                const ddElement = dtElement.nextElementSibling;
                if (ddElement && ddElement.tagName === 'DD') {
                  Info["Éditeur"] = ddElement.textContent.trim();
                  break;
                }
              }
            }
        Info["Auteurs"] = Array.from(document.querySelectorAll(".authors li")).map((e)=> e.textContent.trim()).join(', ');
        Info["Description Auteurs"] = document.querySelector('#MainContent_RadPageAuthorBio')?.textContent.trim() ?? "";
        Info["Chronique"] = document.querySelector('.chroniqueContent:last-child')?.textContent.trim() ?? "";
        ${this.returnString} JSON.stringify(Info)`,
      },
      SmsGagnant: {
        scriptListUrlEvents: (selectors) => `
          const elems = Array.from(document.querySelectorAll("${selectors}"))
          ${this.returnString} elems.map((elem) => elem.getAttribute('href')).filter((value, index, self) => value !== null &&  self.indexOf(value) === index);
        `,
        scriptGetTitle: `
            ${this.returnString} document.querySelector(".shipping-detail > strong").textContent.trim() ?? ""`,

        scriptGetDate: `
                const durationString = document.querySelector(".compte_a_rebours.info-type-1").textContent.trim();
                const [, jours, heures, minutes, secondes] = durationString.match(/(\\d+) jours (\\d+):(\\d+):(\\d+)/);
                const currentDate = new Date();

                currentDate.setDate(currentDate.getDate() + parseInt(jours-1));
                currentDate.setHours(currentDate.getHours() + parseInt(heures));
                currentDate.setMinutes(currentDate.getMinutes() + parseInt(minutes));
                currentDate.setSeconds(currentDate.getSeconds() + parseInt(secondes));

                ${this.returnString}  currentDate.toLocaleDateString('fr-FR', { year: '2-digit', month: '2-digit', day: '2-digit' });
            `,
        scriptGetPlace: `
                const element = document.querySelector(".shipping-detail");
                ${this.returnString} Array.from(element.childNodes)
                .filter((node) => node.nodeType === Node.TEXT_NODE)
                .map((node) => node.textContent.trim())
                .join(" ").trim();
           `,
        scriptGetImage: `
          ${this.returnString} document.querySelector(".lslide.active > img")?.getAttribute('src')`,
        scriptGetDescription: `
                let isTrigger = false;
                let move = 0
                let description = "";
                const pTab = Array.from(document.querySelectorAll(".presentation_detail_text > p"))

                for (let i = 0; i < pTab.length; i++) {
                    console.log(pTab[i].html)
                    let p = pTab[i]
                    if (p.outerHTML == "<p>&nbsp;</p>" && move < 2) {
                        isTrigger = !isTrigger;
                        move++
                    }
                    console.log(isTrigger);
                    if (isTrigger) {
                        description = description + " " + p.textContent
                    }
                };
               ${this.returnString} description
        `,
        scriptGetInfo: `
                let info = {};
                const pTab = Array.from(document.querySelectorAll(".shipping-detail > p"))

                for (let i = 0; i < pTab.length; i++) {
                    info[i] = pTab[i].textContent
                };

               ${this.returnString} JSON.stringify(info)`,
      },
    };
  },
};
