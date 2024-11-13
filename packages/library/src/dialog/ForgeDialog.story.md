# Forge Dialog

A modal dialog component that provides a way to present content in a focused overlay window.

See the Source on how to use this component with props:

```vue
<ForgeDialog title="My Dialog" description="This is the description of my Dialog." />
```

See the Source on how to use this component with slots:

```vue
<ForgeDialog>
  <template #triggerText>
    Open Dialog <span>🚀</span>
  </template>
  <template #title>
    <span style="font-size: 24px; font-weight: bold; color: tomato;">My Dialog</span>
  </template>
  <h3>Welcome to this awesome dialog! 🎉</h3>
  <p>This is a multi-line description showing off some cool features.</p>
  <ul>
    <li>✨ First amazing point</li>
    <li>🚀 Second incredible feature</li>
    <li>🎨 Third awesome capability</li>
  </ul>
  <p>Feel free to explore everything this dialog has to offer!</p>
  <template #closeText>
    Close
  </template>
</ForgeDialog>
```

## Props

| Prop Name   | Type   | Required | Default | Description                                    |
|-------------|--------|----------|---------|------------------------------------------------|
| title       | string | No       | -       | The title text to display in the dialog header |
| description | string | No       | -       | The description text to display in the dialog body |
| triggerText | string | No       | 'Open'  | Text to display in the trigger button         |
| closeText   | string | No       | 'Close' | Text to display in the close button           |

## Slots

| Slot Name   | Description                              |
|-------------|------------------------------------------|
| default     | Content to display in the dialog body    |
| title       | Custom title content                     |
| triggerText | Custom trigger button content            |
| closeText   | Custom close button content              |
