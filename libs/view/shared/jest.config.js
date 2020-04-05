module.exports = {
  name: 'view-shared',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/view/shared',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
