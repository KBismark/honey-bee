const i4w = require('import-for-web');
//Pass the compiler to I4W before parsing or bundling
i4w.transform(require('./compiler').translate);
i4w.bundle();
