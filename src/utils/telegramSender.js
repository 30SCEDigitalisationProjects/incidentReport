import { CONSTANTS } from "./constants";

export const saveToLocal = (key, value) => {
  localStorage.setItem(key, value);
};

export const getFromLocal = (key) => {
  return localStorage.getItem(key);
};

export const checkIfActivityHasStarted = () => {
  let doesNatureOfIncidentExist =
    getFromLocal(CONSTANTS.FORM_ITEM_KEYS.NATURE_OF_INCIDENT) !== null;
  let doesDateExist = getFromLocal(CONSTANTS.FORM_ITEM_KEYS.DATE) != null;
  let doesTimeExist = getFromLocal(CONSTANTS.FORM_ITEM_KEYS.TIME) !== null;
  let doesNameExist = getFromLocal(CONSTANTS.FORM_ITEM_KEYS.NAME) !== null;
  let doesNricExist = getFromLocal(CONSTANTS.FORM_ITEM_KEYS.NRIC) !== null;
  let doesLocationExist =
    getFromLocal(CONSTANTS.FORM_ITEM_KEYS.LOCATION) !== null;
  let doesDescriptionExist =
    getFromLocal(CONSTANTS.FORM_ITEM_KEYS.DESCRIPTION) !== null;
  let doesUpdateExist = getFromLocal(CONSTANTS.FORM_ITEM_KEYS.UPDATES) !== null;
  let doesNokInformedExist =
    getFromLocal(CONSTANTS.FORM_ITEM_KEYS.NOK_INFORMED) !== null;
  let doesPocNameExist =
    getFromLocal(CONSTANTS.FORM_ITEM_KEYS.POC_NAME) !== null;
  let doesPocNumberExist =
    getFromLocal(CONSTANTS.FORM_ITEM_KEYS.POC_NUMBER) !== null;

  let isActivityStarted =
    doesNatureOfIncidentExist &&
    doesDateExist &&
    doesTimeExist &&
    doesNameExist &&
    doesNricExist &&
    doesLocationExist &&
    doesDescriptionExist &&
    doesUpdateExist &&
    doesNokInformedExist &&
    doesPocNameExist &&
    doesPocNumberExist;
  return isActivityStarted;
};

export const removeFromLocal = (key) => {
  localStorage.removeItem(key);
};

export const sendIncidentMessage = async () => {
  const natureOfIncident = getFromLocal(
    CONSTANTS.FORM_ITEM_KEYS.NATURE_OF_INCIDENT
  );
  const date = getFromLocal(CONSTANTS.FORM_ITEM_KEYS.DATE);
  const time = getFromLocal(CONSTANTS.FORM_ITEM_KEYS.TIME);
  const name = getFromLocal(CONSTANTS.FORM_ITEM_KEYS.NAME);
  const nric = getFromLocal(CONSTANTS.FORM_ITEM_KEYS.NRIC);
  const location = getFromLocal(CONSTANTS.FORM_ITEM_KEYS.LOCATION);
  const description = getFromLocal(CONSTANTS.FORM_ITEM_KEYS.DESCRIPTION);
  const update = getFromLocal(CONSTANTS.FORM_ITEM_KEYS.UPDATES);
  const nokInformed =
    getFromLocal(CONSTANTS.FORM_ITEM_KEYS.NOK_INFORMED) === "true"
      ? "YES"
      : "NO";
  const pocName = getFromLocal(CONSTANTS.FORM_ITEM_KEYS.POC_NAME);
  const pocNumber = getFromLocal(CONSTANTS.FORM_ITEM_KEYS.POC_NUMBER);

  const caseID = date.substring(0, 4);

  let doesTimeExcoOsExist =
    getFromLocal(CONSTANTS.FORM_ITEM_KEYS.TIME_EXCO_OS) !== null;
  let doesTimeGsocExist =
    getFromLocal(CONSTANTS.FORM_ITEM_KEYS.TIME_GSOC) !== null;
  let doesCaseNumberExist =
    getFromLocal(CONSTANTS.FORM_ITEM_KEYS.CASE_NUMBER) !== null;
  let doesActionByOsExist =
    getFromLocal(CONSTANTS.FORM_ITEM_KEYS.ACTION_BY_OS) !== null;

  const timeExcoOs = doesTimeExcoOsExist
    ? getFromLocal(CONSTANTS.FORM_ITEM_KEYS.TIME_EXCO_OS)
    : "";

  const timeGsoc = doesTimeGsocExist
    ? getFromLocal(CONSTANTS.FORM_ITEM_KEYS.TIME_GSOC)
    : "";

  const caseNumber = doesCaseNumberExist
    ? getFromLocal(CONSTANTS.FORM_ITEM_KEYS.CASE_NUMBER)
    : "XX";

  const actionByOs = doesActionByOsExist
    ? getFromLocal(CONSTANTS.FORM_ITEM_KEYS.ACTION_BY_OS)
    : "NIL";

  const message = `NDP INCIDENT REPORT (Case ID:${caseID}/#${caseNumber})\n\n1. NATURE OF INCIDENT\n${natureOfIncident}\n\n2. DATE/ TIME OF INCIDENT\n${date}/ ${time}\n\n3. PARTICULARS OF INDIVIDUAL\n${name}/ ${nric}/ SMC\n\n4. LOCATION OF INCIDENT\n${location}\n\n5. BRIEF DESCRIPTION\n${description}\n\n6. UPDATES\n${update}\n\n7. NOK INFORMED\n${nokInformed}\n\n8. HHQ (GSOC/3 DIV/ HQ SCE) INFORMED\n-EXCO OS: ${timeExcoOs}\n-GSOC: ${timeGsoc}\n\n9. REPORTED BY\nMAJ Dixon Koh, Incident Mgmt IC SMC\n\n10. ACTION REQUIRED BY OS OFFICE\n${actionByOs}\n\n11. POC \n${pocName}\n${pocNumber}`;

  const url = `https://hook.eu2.make.com/5wmtbd2mqzs8jlafrci42cmlflketyrz`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CONSTANTS.CHANNELS.INCIDENT_REPORTING_CHAT,
      text: message,
    }),
  });

  // await fetch(testUrl, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     chat_id: CONSTANTS.CHANNELS.TEST_INCIDENT_REPORTING_CHAT,
  //     text: message,
  //   }),
  // });
};
