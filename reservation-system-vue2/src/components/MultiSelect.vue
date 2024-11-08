<template>
  <div class="multi-select-autocomplete">
    <!-- Display selected items -->
    <div class="selected-items">
      <span
        v-for="(item, index) in selectedItems"
        :key="index"
        class="selected-item"
      >
        {{ item.name }}
        <button @click="removeItem(index)" class="remove-btn">x</button>
      </span>
    </div>

    <!-- Input field for autocomplete -->
    <div class="flex gap-2 relative">
        <input
            class="w-full h-[50px] px-2"
            type="text"
            v-model="search"
            @input="filterOptions"
            @keydown.down="navigateDown"
            @keydown.up="navigateUp"
            @keydown.enter="selectItem"
            @mouseenter="filterOptions"
            @focus="filterOptions"
            v-on:focus="filterOptions"
            placeholder="Type to search..."
        >
        <span @click="handleDropdown" class="transform rotate-180 text-lg h-[50px] flex items-center justify-center cursor-pointer absolute right-2 font-extrabold">&#94;</span>
    </div>
    <!-- Dropdown for autocomplete suggestions -->
    <ul v-if="filteredOptions.length && search || isOpen" class="dropdown">
      <li
        v-for="(option, index) in filteredOptions"
        :key="option.id"
        :class="{ highlighted: index === activeOptionIndex }"
        @mousedown.prevent="selectOption(option)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { SET_SELECTED_BRANCHES } from '../store/reservations'
export default {
    name: 'MutiSelect',
    props: {
        options: {
            type: Array,
            required: true
        },
        reset: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            search: '',
            selectedItems: [],
            filteredOptions: [],
            activeOptionIndex: -1,
            isOpen: false
        };
    },
    watch: {
        reset(newVal) {
            if (newVal) {
                this.selectedItems = [];
            }
        }
    },
    methods: {
        handleDropdown() {
            this.isOpen = !this.isOpen;
        },
        filterOptions() {
            // Filter options based on the search term
            const lowerSearch = this.search.toLowerCase();
            this.filteredOptions = this.options
                .filter(
                (option) =>
                    option.name.toLowerCase().includes(lowerSearch) &&
                    !this.selectedItems.includes(option) && !option.accepts_reservations
                )
                .slice(0, 10); // Limit the results to top 10 matches

            // Reset active option index when filtering
            this.activeOptionIndex = -1;
        },
        navigateDown() {
            if (this.activeOptionIndex < this.filteredOptions.length - 1) {
                this.activeOptionIndex++;
            }
        },
        navigateUp() {
            if (this.activeOptionIndex > 0) {
                this.activeOptionIndex--;
            }
        },
        selectItem() {
            if (this.activeOptionIndex > -1) {
                this.selectOption(this.filteredOptions[this.activeOptionIndex]);
            }
        },
        selectOption(option) {
            this.selectedItems.push(option);
            this.search = '';
            this.filteredOptions = [];
            this.$store.dispatch(SET_SELECTED_BRANCHES, this.selectedItems);
            this.$emit('update:selectedItems', this.selectedItems);
        },
        removeItem(index) {
            this.selectedItems.splice(index, 1);
            this.$emit('update:selectedItems', this.selectedItems);
        }
    }
};
</script>

<style scoped>
.multi-select-autocomplete {
  width: 100%;
  max-width: 300px;
}
.selected-items {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5em;
}
.selected-item {
  background-color: #d3d3d3;
  border-radius: 3px;
  padding: 0.25em 0.5em;
  margin: 0.2em;
  display: flex;
  align-items: center;
}
.remove-btn {
  margin-left: 0.5em;
  border: none;
  background: none;
  cursor: pointer;
}
.dropdown {
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.dropdown li {
  padding: 0.5em;
  cursor: pointer;
}
.dropdown li.highlighted {
  background-color: #ddd;
}
</style>
