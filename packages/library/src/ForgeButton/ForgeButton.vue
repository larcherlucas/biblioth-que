<template>
    <button :class="['forge-button', variant]" :disabled="disabled" @click="onClick">
      <slot />
    </button>
  </template>
  
  <script>
  export default {
    name: "ForgeButton",
    props: {
      variant: {
        type: String,
        default: "primary",
        validator: (value) => ["primary", "secondary", "danger"].includes(value),
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    emits: ["click"],
    methods: {
      onClick() {
        if (!this.disabled) this.$emit("click");
      },
    },
  };
  </script>
  
  <style scoped>
  .forge-button {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
    transition: all 0.3s ease;
  }
  .forge-button.primary {
    background-color: #007bff;
    color: white;
  }
  .forge-button.secondary {
    background-color: #6c757d;
    color: white;
  }
  .forge-button.danger {
    background-color: #dc3545;
    color: white;
  }
  .forge-button:disabled {
    background-color: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
  }
  </style>
  