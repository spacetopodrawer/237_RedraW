import morgan from 'morgan';

const format = process.env.NODE_ENV === 'development' 
  ? 'dev'
  : ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

export const logger = morgan(format, {
  skip: (req, res) => process.env.NODE_ENV === 'test'
});