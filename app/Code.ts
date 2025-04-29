type Env = 'WEBHOOK_URL'

/** GASから環境変数を引き出す */
const getEnvPropertyOrThrow = (property: Env): string => {
  const env = PropertiesService.getScriptProperties().getProperty(property)
  if (!env) throw new Error(`Environment variable ${property} is not set`)
  return env
}

/** Slack Webhook経由でSlackに投稿する */
const postToSlack = (): void => {
  const payload = {
    text: '<!channel> Happy New Year!! :tada:'
  }
  const url = getEnvPropertyOrThrow('WEBHOOK_URL')
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  }

  UrlFetchApp.fetch(url, options)
}

/** 新年の挨拶をする */
const postNewYear = (): void => {
  const nowDate = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'MM/dd')
  if (nowDate === '01/01') postToSlack()
}
