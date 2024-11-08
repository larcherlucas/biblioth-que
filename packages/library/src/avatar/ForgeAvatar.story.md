# Forge Avatar

A graphical representation of the user, often used in profile sections.

See the Source on how to use this component.

```vue
<ForgeAvatar
  name="Sybren Willemot"
  src="https://avatars.githubusercontent.com/u/16015740?v=4"
  @status-change="(e) => console.log(e.status)"
/>
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| name | string | Yes | - | The full name of the user to display |
| src | string | No | - | URL of the avatar image. If not provided, will show initials from name |

## Events

| Event Name | Payload | Description |
|------------|---------|-------------|
| status-change | `{ status: 'error' \| 'loaded' }` | Emitted when the image loading status changes |

