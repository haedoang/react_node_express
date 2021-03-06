export default {
    USER: "/api/user/",
    USER_LOGIN: "/api/user/login",
    USER_LOGOUT: "/api/user/logout",
    DOCUMENT_CREATE: "/api/document/new",
    DOCUMENT_LIST: "/api/document",
    DOCUMENT_INFO: (id) => ("/api/document/" + id),
    DOCUMENT_SAVE: (id) => ("/api/document/" + id),
    DOCUMENT_DELETE: (id) => ("/api/document/" + id),
    DOCUMENT_PREVIEW: "/api/document/preview",
    PDF_PATH: (path) => ("/uploads" + path),
    MIXED_PDF_PATH: (path) => ("/mixed" + path),
    CONSULT_CREATE: "/api/consult/new",
    CONSULT_ADD : "/api/consult/add",
    CONSULT_ID : (id) => ("/api/consult/" + id),
    CONSULT_STOP: (id) => ("/api/consult/finish/" + id),
    CONSULT_ERROR: (id) => ("/api/consult/error/" + id),
    CONSULT_CHECK_CURRENT: "/api/consult/current",
    SEND_SMS : "/api/user/sms",
    CONSULT_DOCU_INFO: (url) => ("/api/consult/docu/" + url),
    API_DOCUMENT : "/api/document/",
    CONSULT_LIST: "/api/consult"
};
