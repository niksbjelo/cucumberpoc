Feature: Crawl website
  Crawl website to retrieve schedule each events,
  that is to say we take hours, place, images , description for one event.


  Scenario: Crawl Live Music Production website
    Given I am on "https://livemusic.ch/concerts-suisse-romande/"
    When I crawl in element "#spectacles" all elements ".spectacles__item"
