export enum ApiTargets {
  BOOTSTRAP = '/accounts/bootstrap',
  SEARCH = 'search/query',
  QTREE = 'search/qtree',
  BIGQUERY = 'search/bigquery',
  EXPORT = 'export/',
  SERVICE_AUTHOR_NETWORK = 'vis/author-network',
  SERVICE_PAPER_NETWORK = 'vis/paper-network',
  SERVICE_WORDCLOUD = 'vis/word-cloud',
  SERVICE_METRICS = 'metrics',
  SERVICE_OBJECTS = 'objects',
  SERVICE_OBJECTS_QUERY = 'objects/query',
  SERVICE_CITATION_HELPER = 'citation_helper',
  SERVICE_AUTHOR_AFFILIATION_EXPORT = 'authoraff',
  MYADS_STORAGE = 'vault',
  MYADS_NOTIFICATIONS = 'vault/_notifications',
  AUTHOR_AFFILIATION_SEARCH = 'author-affiliation/search',
  AUTHOR_AFFILIATION_EXPORT = 'author-affiliation/export',
  RESOLVER = 'resolver',
  CSRF = 'accounts/csrf',
  USER = 'accounts/user',
  USER_DATA = 'vault/user-data',
  SITE_CONFIGURATION = 'vault/configuration',
  TOKEN = 'accounts/token',
  LOGOUT = 'accounts/logout',
  REGISTER = 'accounts/register',
  VERIFY = 'accounts/verify',
  DELETE = 'accounts/user/delete',
  RESET_PASSWORD = 'accounts/reset-password',
  CHANGE_PASSWORD = 'accounts/change-password',
  CHANGE_EMAIL = 'accounts/change-email',
  RECOMMENDER = 'recommender',
  GRAPHICS = 'graphics',
  FEEDBACK = 'feedback/slack',
  LIBRARY_IMPORT_CLASSIC_AUTH = 'harbour/auth/classic',
  LIBRARY_IMPORT_CLASSIC_MIRRORS = 'harbour/mirrors',
  LIBRARY_IMPORT_CLASSIC_TO_BBB = 'biblib/classic',
  LIBRARY_IMPORT_ADS2_AUTH = 'harbour/auth/twopointoh',
  LIBRARY_IMPORT_ADS2_TO_BBB = 'biblib/twopointoh',
  LIBRARY_IMPORT_ZOTERO = 'harbour/export/twopointoh/zotero',
  LIBRARY_IMPORT_MENDELEY = 'harbour/export/twopointoh/mendeley',
  LIBRARY_IMPORT_CREDENTIALS = 'harbour/user',
  ORCID_PREFERENCES = 'orcid/preferences',
  ORCID_NAME = 'orcid/orcid-name',
  LIBRARIES = 'biblib/libraries',
  LIBRARY_TRANSFER = 'biblib/transfer',
  DOCUMENTS = 'biblib/documents',
  PERMISSIONS = 'biblib/permissions',
  REFERENCE = 'reference/text',
}