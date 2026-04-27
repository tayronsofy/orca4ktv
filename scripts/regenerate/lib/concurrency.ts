// Concurrency cap for API requests. Default 3 parallel, configurable via REGEN_CONCURRENCY env var.

import pLimit from 'p-limit';

const concurrency = Number(process.env.REGEN_CONCURRENCY) || 3;
export const limit = pLimit(concurrency);
export const concurrencyValue = concurrency;
