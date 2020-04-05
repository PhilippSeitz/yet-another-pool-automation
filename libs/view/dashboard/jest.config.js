module.exports = {
  name: 'view-dashboard',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/view/dashboard',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
