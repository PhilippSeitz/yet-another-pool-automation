module.exports = {
  name: 'pool-client',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/pool-client',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
