import { WHITELIST_DOMAINS } from '~/utils/constants';
import { env } from '~/config/environment';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';

// CORS stands for Cross-Origin Resource Sharing. It allows us to make requests to our API from a different domain.
export const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests in development mode (Postman, Insomnia, etc.)
        // When using Postman, the origin is null
        if (!origin && env.BUILD_MODE === 'dev') {
            return callback(null, true); // null means no errors, and true means we allow the origin
        }

        // Check if the origin is in the whitelist
        if (WHITELIST_DOMAINS.includes(origin)) {
            return callback(null, true);
        }

        return callback(
            new ApiError(
                StatusCodes.FORBIDDEN,
                `${origin} not allowed by our CORS Policy.`
            )
        );
    },

    // Some legacy browsers (IE11, various SmartTVs) choke on 204
    optionsSuccessStatus: 200,

    credentials: true, // Credentials are cookies, authorization headers or TLS client certificates.
};
