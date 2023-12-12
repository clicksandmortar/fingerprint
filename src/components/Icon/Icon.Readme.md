## Icons


We use [React Icons](https://react-icons.github.io/react-icons/) as our package of choice because it keeps our bundle size relatively low and provides with a ton of icons for almost any use case.


### Non-tech

When setting up the campaign, please use the prefixed, Camelcased name from the docs (2nd in the list of Codes that opens up when you click on an icon). Examples:
```md
FcAddDatabase
Bs0CircleFill
DiChrome
GrBarChart
```
### Usage

```tsx
import { Icon } from './Icon';

const Example = (props) => (
  <Icon icon="FaBeer" {...props} />
);
```

Note that the lib is not typed, so you can use any icon name you want. If you want to see the full list of icons, check the [React Icons](https://react-icons.github.io/react-icons/) website.

As a hack, to have at least SOME type safety, we have a `IconName` type that is a union of all the icons available in the lib:

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| icon | `IconName` | - | The name of the icon to render. |
| size | `number` | `24` | The size of the icon. |
| color | `string` | `currentColor` | The color of the icon. |
| className | `string` | - | The class name to apply to the icon. |
| style | `React.CSSProperties` | - | The style to apply to the icon. |

