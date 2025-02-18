# Try Angular 19

This project built with:
- Ant Design;
- Internationalization;
- Multiple themes (by Ant Design);
- ESLint;
- Unit Tests with code coverage;
- Eanble HttpClient with service;
- Multiple environments;


## Steps for this  project

List out the steps have done within this project:

1. Use UI library: `ng-zorro-antd`, official [documentation](https://ng.ant.design/).

2. Add `@jsverse/transloco` for internatinoalization. Package interface [linkage](https://www.npmjs.com/package/@jsverse/transloco).

Run command `ng add @jsverse/transloco`.


3. Enabling multiple themes, according to [documentation](https://ng.ant.design/docs/customize-theme/en#theme-dynamic-switching). The example repository in [URL](https://github.com/yangjunhan/nz-themes).

Command:   
```
ng generate service services\Theme
```

4. Enabling **eslint** by using [angular-eslint](https://github.com/angular-eslint/angular-eslint).

```
ng add angular-eslint
```

Then:   
```
ng g angular-eslint:add-eslint-to-project
```

5. Enable unit test by using `karma`.

Command: `ng test --code-coverage`.

6. Enable multiple environments.

Command:   
```
ng generate environments
```

## Issues and solutions

### Run test with `NullInjectorError: No provider for ActivatedRoute!`

Add `provideRouter` into the testing module.

```typescript
await TestBed.configureTestingModule({
    imports: [        
        AppComponent
    ],
    providers: [
        provideRouter([]),
        provideNzIcons(icons), 
        provideNzI18n(en_US),
        provideNoopAnimations(),
    ]
}).compileComponents();

```

### [@ant-design/icons-angular]: the icon XXXX does not exist or is not registered. 

Add the missing icon XXXX into file `icons-provider.ts` and ensure `provideNzIcons`.

### Test Service based on HttpClient

[Test HttpClient](https://angular.dev/guide/http/testing)

### Failed to fetch file in `assets\` folder

Add `"src/assets"` into `angular.json` file under `assets` node.


### Test with Transloco 

[Adding Unit Test with Transloco](https://jsverse.gitbook.io/transloco/advanced-topics/unit-testing)
