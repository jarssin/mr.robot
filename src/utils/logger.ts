const RESET = '\x1b[0m';
const TEXT = '%s';
const resetAfterLog = (color: any) => `${color}${TEXT}${RESET}`;

export const COLORS = {
  DEFAULT: resetAfterLog('\x1b[0m'),
  GREEN: resetAfterLog('\x1b[32m'),
  RED: resetAfterLog('\x1b[31m'),
};

const log = (msg: string, ...args: any[]) => {
  console.log(COLORS.DEFAULT, msg, ...args);
};

const success = (msg?: string, ...args: any[]) => {
  console.log(COLORS.GREEN, `✅ ${msg}`, ...args);
};

const error = (msg?: string, ...args: any[]) => {
  console.error(COLORS.RED, `🚨 ${msg}`, ...args);
};

export default {
  log,
  success,
  error,
};
