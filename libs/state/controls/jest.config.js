module.exports = {
  name: 'state-controls',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/state/controls',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
