"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var days = 10; // Cache will store data for 10 days
var hoursInDay = 24 * days;
var hourInMS = 1000 * 60 * 60 * hoursInDay;
exports.default = Object.freeze({
    SECRET: '!v_(@#"}{!#RFE',
    CACHE: {
        MAX_AGE: 1000 * 60 * 60 * hourInMS,
        /*
            MAX_SIZE
            Considered 10k object size for a single cache store
            10 objects X 10 kb = 100 KB
            100 objects X 10kb = 1000 KB = 1 MB (Approx)
            1000 objects X  10kb = 10 MB <- Thousand object are default now
            10000 objects X  10kb = 100 MB
        */
        MAX_SIZE: 0,
        PER_OBJECT_SIZE: 1,
    },
    HTTP_REQUEST: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    },
    HTTP_CODE: {
        SUCCESS: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORISED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        REQUEST_TIMEOUT: 408,
        INTERNAL_SERVER_ERROR: 500,
        BAD_GATEWAY: 502,
        SERVICE_UNAVAILABLE: 503,
        FAILURE: 520
    },
    TIME: {
        START: '00:00:00',
        END: '23:59:59'
    },
    TDC_USER_PRILIVEGES: {
        TDC_ADMIN_PRIV_ID: 10,
        TDC_DATA_OWNER_PRIV_ID: 11
    },
    jwtTokenType: 'Bearer',
    pagination: {
        page: 0,
        limit: 10
    },
    IS_SHOW_SQL_MESSAGE: true,
    IS_SHOW_JOI_ERROR_MESSAGE: true,
    JOI_ERROR_MESSAGE: 'Invalid request data. Please review request and try again.',
    DATE_FORMAT_REG_EX: {
        YYYY_MM_DD: /^\d{4}-\d{2}-\d{2}$/
    },
});
//# sourceMappingURL=constants.js.map