/**
 * Путь к файлу из public/ с учётом адреса сайта.
 * Локально сайт живёт в корне (/), а на GitHub Pages — в подпапке (/имя-репозитория/).
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
