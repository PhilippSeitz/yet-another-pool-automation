module.exports = {
  name: 'view-header',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/view/header',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
