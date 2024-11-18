# ForgeInput

A configurable input field with support for labels, value binding, and error messages.

## Usage

```vue
<ForgeInput v-model="text" label="Name" />
<ForgeInput
  v-model="text"
  label="Password"
  errorMessage="This field is required."
/>
