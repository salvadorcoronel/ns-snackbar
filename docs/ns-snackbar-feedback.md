# How to embed dynamic content to NativeScript UI?


## Prepare project

```shell
$ npm i @angular/cli --save-dev
$ npm i @nativescript/schematics --save-dev
```
## Add ns

```xml
<GridLayout>
  <page-router-outlet></page-router-outlet>
  <ns-dynamic-view></ns-dynamic-view>
</GridLayout>
```