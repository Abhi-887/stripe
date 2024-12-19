<template>
    <div class="flex justify-between items-center mb-6 bg-[#f9f3f4] px-6 py-2">
      <!-- Total Lots Count -->
      <div class="text-sm text-[#5C5C5C] nunito-sans-light">
        Total Lots: <span class="text-black">{{ lotCount }}</span>
      </div>
  
      <!-- Sort By Dropdown -->
      <div class="relative">
        <label class="mr-2 text-sm text-[#5C5C5C] nunito-sans-light">Sort By:</label>
        <div class="dropdown-container w-40" @click="toggleDropdown('sortOrder')">
          <div 
            class="dropdown-select text-sm text-[#000] nunito-sans-light" 
            :class="{ rotate: isSortOrderOpen }"
            role="button" 
            tabindex="0"
          >
            {{ sortOrderText }}
          </div>
          <div v-if="isSortOrderOpen" class="dropdown-options text-sm text-[#000] nunito-sans-light shadow-lg shadow-gray-300">
            <div v-for="option in sortOptions" :key="option" @click="selectSortOrder(option)" class="dropdown-option w-40">
              {{ option }}
            </div>
          </div>
        </div>
      </div>
  
      <!-- Show Dropdown -->
      <div class="relative">
        <label class="mr-2 text-sm text-[#5C5C5C] nunito-sans-light">Show:</label>
        <div class="dropdown-container w-14" @click="toggleDropdown('itemsPerPage')">
          <div 
            class="dropdown-select text-sm text-[#000] nunito-sans-light" 
            :class="{ rotate: isItemsPerPageOpen }"
            role="button" 
            tabindex="0"
          >
            {{ itemsPerPage }}
          </div>
          <div v-if="isItemsPerPageOpen" class="dropdown-options w-14 shadow-lg shadow-gray-300">
            <div v-for="size in [30, 45, 60]" :key="size" @click="setItemsPerPage(size)" class="dropdown-option text-sm text-[#000] nunito-sans-light">
              {{ size }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      lotCount: {
        type: Number,
        required: true
      },
      sortOptions: {
        type: Array,
        default: () => ['Price', 'Date', 'Title']
      },
      sortOrderText: {
        type: String,
        default: 'Default'
      },
      itemsPerPage: {
        type: Number,
        default: 30
      }
    },
    data() {
      return {
        isSortOrderOpen: false,
        isItemsPerPageOpen: false,
      };
    },
    methods: {
      toggleDropdown(type) {
        if (type === 'sortOrder') {
          this.isSortOrderOpen = !this.isSortOrderOpen;
          this.isItemsPerPageOpen = false;
        } else if (type === 'itemsPerPage') {
          this.isItemsPerPageOpen = !this.isItemsPerPageOpen;
          this.isSortOrderOpen = false;
        }
      },
      selectSortOrder(option) {
        this.$emit('updateSortOrder', option);
        this.isSortOrderOpen = false;
      },
      setItemsPerPage(size) {
        this.$emit('updateItemsPerPage', size);
        this.isItemsPerPageOpen = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .dropdown-select::after {
    content: "▼";
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    color: black;
    pointer-events: none;
    transition: transform 0.2s ease;
  }
  
  .dropdown-select.rotate::after {
    transform: translateY(-50%) rotate(180deg);
  }
  
  .dropdown-container {
    display: inline-block;
    position: relative;
  }
  
  .dropdown-select {
    padding: 8px 12px;
    border: 1px solid #ccc;
    cursor: pointer;
    padding-right: 30px;
  }
  
  .dropdown-options {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid #8a2432;
    z-index: 10;
  }
  
  .dropdown-option {
    padding: 8px 12px;
    cursor: pointer;
  }
  
  .dropdown-option:hover {
    background-color: #fde7e9;
  }
  
  .dropdown-select:focus {
    outline: none;
    border-color: #8a2432;
  }
  </style>
  