<template>
  <div class="navbar bg-base-100">
    <div>
      <a class="btn-ghost btn text-xl normal-case"
        >Energy Assistant Stadel 15</a
      >
    </div>

    <div class="flex-1">
      <div class="join mx-auto">
        <input
          class="join-item btn w-16"
          type="radio"
          name="options"
          aria-label="Live"
          checked
        />
        <input
          class="join-item btn w-16"
          type="radio"
          name="options"
          aria-label="Heute"
        />
        <input
          class="join-item btn w-16"
          type="radio"
          name="options"
          aria-label="Woche"
        />
        <input
          class="join-item btn w-16"
          type="radio"
          name="options"
          aria-label="Monat"
        />
        <input
          class="join-item btn w-16"
          type="radio"
          name="options"
          aria-label="Jahr"
        />
        <input
          class="join-item btn w-16"
          type="radio"
          name="options"
          aria-label="Gesamt"
        />
      </div>
    </div>

    <div class="flex-none">
      <select data-choose-theme class="select-ghost select w-full max-w-xs">
        <option value="">Light</option>
        <option value="dark">Dark</option>
        <option value="bumblebee">bumblebee</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
