export const PAYMENT_SCENARIOS = {
  donation: {
    nl: {
      text: "Van dit soort avonden word ik arm, dus alle donaties zijn welkom.",
      buttonText: "Doe een vrije gift",
    },
  },
  poker: {
    nl: {
      text: "Je kunt hier je inzet voor vanavond inleggen. Meedoen is niet verplicht en je bepaalt zelf hoeveel je inlegt.",
      buttonText: "Lever inzet in",
    },
  },
  default: {
    nl: {
      text: "Open mijn betaalpagina om een bijdrage te doen.",
      buttonText: "Open betaallink",
    },
  },
};

/**
 * Get payment scenario configuration
 * @param {string} scenario - The scenario key (defaults to 'default')
 * @param {string} language - Language code ('nl' or 'en')
 * @returns {object} Configuration object with text and buttonText
 */
export function getPaymentConfig(scenario = "default", language = "nl") {
  const scenarioConfig = PAYMENT_SCENARIOS[scenario] || PAYMENT_SCENARIOS.default;
  return scenarioConfig[language] || scenarioConfig.nl;
}

/**
 * Get all available scenario keys
 * @returns {string[]} Array of scenario keys
 */
export function getAvailableScenarios() {
  return Object.keys(PAYMENT_SCENARIOS);
}

