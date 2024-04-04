<template>
  <button
      class="btn"
      :class="getButtonClasses(props)"
      :disabled="props.disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  primary: Boolean,
  danger: Boolean,
  outline: Boolean,
  disabled: Boolean
});

const getButtonClasses = (props) => {
  const classes = ['btn'];
  if (props.primary) {
    classes.push('is-primary');
  }
  if (props.danger) {
    classes.push('is-danger');
  }
  if (props.outline) {
    classes.push('outline');
  }
  return classes;
};
</script>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  padding: 12px 16px;
  border-radius: 8px;
  color: var(--white);
  background-color: var(--primary);
  border: none;
  transition: box-shadow .15s ease-in-out;
}

.btn-primary {
  color: var(--white);
  background-color: var(--primary);
  border: none;
}

.btn-danger {
  color: var(--white);
  background-color: var(--error);
  border: none;
}

.btn-danger-outline {
  color: var(--error);
  background-color: var(--white);
  border: 1px solid var(--error);
  box-shadow: none;
}

.btn:disabled {
  cursor: not-allowed;
  color: var(--grey);
  background-color: var(--white);
  border: 1px solid var(--grey);
  box-shadow: none;
}

.btn:hover {
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.16);
}
</style>