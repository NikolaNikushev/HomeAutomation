release=default

install:
	yarn
build-ios: install
	expo build:ios --release-channel ${release}
build-android: install
	expo build:android --release-channel ${release}
publish: install
	expo publish --release-channel ${release}
upload-ios: install
	expo upload:ios --id ${id}
upload-android: install
	expo upload:android --id ${id}
build: build-ios build-android
upload: upload-ios upload-android
