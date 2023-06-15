Feature: Crawl website
  Crawl website to retrieve schedule each events,
  that is to say we take hours, place, images , description for one event.

  @LiveMusicProduction
  Scenario: Crawl Live Music Production website
    Given I am on "https://livemusic.ch/concerts-suisse-romande/"
    When I display all events du site
    And I crawl all elements "#spectacles > .spectacles__item"
    Then Crawl is finished

  @VilleDeLausanne
  Scenario: Crawl Ville de Lausanne website
    Given I am on "https://www.lausanne.ch/agenda-et-actualites/Nouvel-agenda.html?page=50"
    Then I should see ".agenda-event-item-container" Element
    When I crawl all elements ".agenda-events-container > .agenda-event-item-container a"
    Then Crawl is finished

  @OpusOne
  Scenario: Crawl Opus one  website
    Given I am on "https://opus-one.ch/agenda/"
    When I display all events du site
    And I crawl all elements ".event-month a.double-bouttons__btn--info"
    Then Crawl is finished

  @Payot @Nouveau
  Scenario: Crawl Payot  website in Nouveau section
    Given I am on "https://mobile.payot.ch/Default.aspx?t=n&cId=0"
    When I display all events du site
    And I crawl all elements ".right-col > h1 > a"
    Then Crawl is finished

  @Payot @MeilleuresVentes
  Scenario: Crawl Payot  website in Meilleures Ventes section
    Given I am on "https://mobile.payot.ch/Default.aspx?t=b&cId=0"
    When I display all events du site
    And I crawl all elements ".right-col > h1 > a"
    Then Crawl is finished

  @Payot @SelectionPayot
  Scenario: Crawl Payot  website in Selection Payot section
    Given I am on "https://mobile.payot.ch/Default.aspx?t=s&cId=0"
    When I display all events du site
    And I crawl all elements ".right-col > h1 > a"
    Then Crawl is finished

  @SmsGagnant
  Scenario: Crawl SmsGagnant  website
    Given I am on "https://sms-gagnant.ch/"
    When I crawl all elements ".show_promo_preview"
    Then Crawl is finished
