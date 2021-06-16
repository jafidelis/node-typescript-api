import path from 'path';
import modeAlias from 'module-alias';

const files = path.resolve(__dirname, '../..');

modeAlias.addAliases({
  '@src': path.join(files, 'src'),
  '@test': path.join(files, 'test'),
});
