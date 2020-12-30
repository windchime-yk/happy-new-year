type Env = 'WEBHOOK_URL'

const getEnvProperty = (property: Env): string => PropertiesService.getScriptProperties().getProperty(property)

const postToSlack = (): void => {
  const payload = {
    text: 'Happy New Year!! :tada:'
  }
  const url = getEnvProperty('WEBHOOK_URL')
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  }

  UrlFetchApp.fetch(url, options)
}

const postNewYear = (): void => {
  const nowDate = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'MM/dd')
  if (nowDate === '01/01') postToSlack()
}
