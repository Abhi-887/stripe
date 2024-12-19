<template>
  <!-- Filter Header -->
  <div class="bg-[#f9f3f4] px-6 py-4 mb-4 flex justify-between items-center">
    <h2 class="text-[14px] custom-font-weight nunito-sans-custom uppercase">
      FILTERS
    </h2>
    <button
      @click="resetFilters"
      :class="['text-[14px]',  'nunito-sans-custom', 'text-[#7A7A7A]', customFontWeightClass]"
    >
      Reset All
    </button>
  </div>

  <div class="filter-bar bg-white p-4 max-w-sm">
    <!-- Winning Bid Slider -->
    <div class="filter-section mb-6">
      <h3 class="font-semibold text-[12px] mb-2 uppercase raleway-custom">Winning Bid</h3>
      <div class="flex items-center justify-between">
        <input type="range" v-model="winningBidMin" :min="1000" :max="1000000" step="1000" class="w-full appearance-none h-1 bg-[#B8B8B8] cursor-pointer">
        <input type="range" v-model="winningBidMax" :min="1000" :max="1000000" step="1000" class="w-full appearance-none h-1 bg-[#B8B8B8] cursor-pointer">
      </div>
      <div class="flex justify-between text-xs text-gray-600 mt-2">
        <span>${{ winningBidMin.toLocaleString() }}</span>
        <span>${{ winningBidMax.toLocaleString() }}</span>
      </div>
    </div>

    <!-- Reserve Price Slider -->
    <div class="filter-section mb-6">
      <h3 class="font-semibold text-[12px] mb-2 uppercase raleway-custom">Reserve Price</h3>
      <div class="flex items-center justify-between">
        <input type="range" v-model="reservePriceMin" :min="1000" :max="1000000" step="1000" class="w-full appearance-none h-1 bg-[#B8B8B8] cursor-pointer">
        <input type="range" v-model="reservePriceMax" :min="1000" :max="1000000" step="1000" class="w-full appearance-none h-1 bg-[#B8B8B8] cursor-pointer">
      </div>
      <div class="flex justify-between text-xs text-gray-600 mt-2">
        <span>${{ reservePriceMin.toLocaleString() }}</span>
        <span>${{ reservePriceMax.toLocaleString() }}</span>
      </div>
    </div>

    <!-- Additional Filter Sections -->
    <template v-for="filter in additionalFilters" :key="filter.name">
      <details class="filter-section mb-4" @toggle="updateDropdown(filter.stateKey)">
        <summary class="font-semibold text-[12px] mb-2 cursor-pointer flex items-center uppercase raleway-custom">
          <span>{{ filter.name }}</span>
          <div class="triangle ml-2 mb-1" :class="{ 'rotate-180': dropdownStates[filter.stateKey] }"></div>
        </summary>
        <transition name="slide-fade">
          <div v-show="dropdownStates[filter.stateKey]" class="pl-4 max-h-[400px] overflow-y-auto">
            <div v-for="option in filter.options" :key="option.value" class="flex items-center my-2">
              <input type="checkbox" :id="option.value" :value="option.value" v-model="filter.model" class="mr-2 custom-checkbox" />
              <label :for="option.value" class="text-[14px] nunito-sans-light">{{ option.value }}</label>
            </div>
          </div>
        </transition>
      </details>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      winningBidMin: 1000,
      winningBidMax: 1000000,
      reservePriceMin: 1000,
      reservePriceMax: 1000000,
      selectedDistilleries: [],
      dropdownStates: {
        distilleries: false,
        region: false,
        strength: false,
        lotLocation: false,
        bottleSize: false,
        whiskyType: false,
        age: false,
        distilleryStatus: false,
      },
      additionalFilters: [
        {
          name: "Type",
          stateKey: "Type",
          model: [],
          options: [
            { value: "Red"},
            { value: "White"},
            { value: "Sparkling / Champagne"},
            { value: "Rose"},
            { value: "Fortified"},
            { value: "WOther (Spirits, Liqueur etc)"},
          ],
        },
        {
          name: "Country",
          stateKey: "Country",
          model: [],
          options: [
            { value: "Australia", count: 5 },
            { value: "New Zealand", count: 10 },
            { value: "France", count: 8 },
            { value: "Italy", count: 8 },
            { value: "Spain", count: 8 },
            { value: "Other", count: 8 },
          ],
        },
        {
          name: "Variety",
          stateKey: "Variety",
          model: [],
          options: [
            { value: "Shiraz"},
            { value: "Red Burgundy"},
            { value: "White Burgundy"},
            { value: "Cabernet Sauvignon"},
            { value: "Nebbiolo"},
            { value: "Pinot Noir"},
            { value: "Red Bordeaux"},
            { value: "Red Blend"},
            { value: "Red Rhone"},
            { value: "Chardonnay"},
            { value: "Champagne"},
            { value: "Riesling"},
            { value: "Grenache"},
            { value: "Cabernet Blend"},
            { value: "Cabernet Merlot"},
            { value: "Cabernet Shiraz"},
            { value: "Sangiovese"},
          ],
        },
        {
          name: "Regions",
          stateKey: "Regions",
          model: [],
          options: [
            { value: "Barossa Valley"},
              { value: "South Australia"},
                { value: "McLaren Vale"},
                  { value: "Hunter Valley"},
                    { value: "Coonawarra"},
                      { value: "Yarra Valley"},
                        { value: "Clare Valley"},
                          { value: "Margaret River"},
                            { value: "Barossa"},
                              { value: "Barolo DOCG"},
                                { value: "Eden Valley"},
                                  { value: "Adelaide Hills"},
                                    { value: "Langhorne Creek"},
                                      { value: "Grampians"},
                                        { value: "Heathcote"},
                                          { value: "Mornington Peninsula"},
                                            { value: "St-Julien"},
                                              { value: "Canberra District"},

          ],
        },
      ],
    };
  },
  computed: {
    customFontWeightClass() {
      // Apply 'custom-font-weight' only if any filter is active
      return this.filtersActive ? 'custom-font-weight' : '';
    },
    filtersActive() {
      return (
        this.winningBidMin > 1000 ||
        this.winningBidMax < 1000000 ||
        this.reservePriceMin > 1000 ||
        this.reservePriceMax < 1000000 ||
        this.selectedDistilleries.length > 0 ||
        this.additionalFilters.some(filter => filter.model.length > 0)
      );
    },
  },
  methods: {
    resetFilters() {
      this.winningBidMin = 1000;
      this.winningBidMax = 1000000;
      this.reservePriceMin = 1000;
      this.reservePriceMax = 1000000;
      this.selectedDistilleries = [];
      this.additionalFilters.forEach(filter => (filter.model = []));
    },
    updateDropdown(dropdown) {
      this.dropdownStates[dropdown] = !this.dropdownStates[dropdown];
    },
  },
};
</script>



<style scoped>
/* Triangle arrow for dropdown */
.triangle {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 7px solid #000;
  transition: transform 0.2s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}


/* Custom Checkbox Style */
.custom-checkbox {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #8A2432;
  background-color: white;
  cursor: pointer;
  outline: none;
  position: relative;
}

.custom-checkbox:checked {
  background-color: #8A2432;
}
.custom-font-weight {
 font-weight: 700;
}
.custom-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 0px;
  width: 5px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}



/* Custom style for the range slider thumb (the circular dot) */
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #B8B8B8; /* Set the circular dot color */
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #7A7A7A; /* Set the circular dot color */
  cursor: pointer;
}

/* Optional: hover effect for the range thumb */
input[type="range"]:hover::-webkit-slider-thumb {
  background: #a8a8a8; /* Slightly darker shade on hover */
}

input[type="range"]:hover::-moz-range-thumb {
  background: #a8a8a8; /* Slightly darker shade on hover */
}

</style>
