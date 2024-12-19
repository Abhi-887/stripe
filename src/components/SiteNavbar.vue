<template>
  <nav class="bg-white border-b sticky top-0 z-50">
    <div class="container  wapper-max mx-auto py-6 xl:px-4 lg:px-12 md:px-16 sm:px-5 px-5">
      <div class="flex justify-between items-center">
        <!-- Logo or Brand Name -->
        <div class="text-4xl font-bold">
          <router-link to="/">
            <img :src="menuData.logo" alt="Whisky Auctioneer" class="nav-logo md:w-full w-44">
          </router-link>
        </div>

        <div class="flex items-center">
          <!-- Icon List -->
          <ul class="flex space-x-4 block lg:hidden">
            <li v-for="iconItem in menuData.iconItems" :key="iconItem.hoverImg">
              <button @click="iconItem.action" class="text-black">
                <img :src="hoveredIcon === iconItem.hoverImg ? iconItem.hoverImg : iconItem.img" alt="icon"
                  class="h-5 w-5" @mouseenter="hoveredIcon = iconItem.hoverImg"
                  @mouseleave="hoveredIcon = iconItem.img">
              </button>
            </li>
          </ul>

          <!-- Mobile Menu Toggle -->
          <div class="block lg:hidden ml-4 mt-1">
            <button @click="toggleMenu" class="text-black w-5 h-5" :aria-expanded="menuOpen.toString()"
              aria-label="Toggle navigation menu">
              <img :src="menuOpen ? require('@/assets/Menu Icon.svg') : require('@/assets/Menu Icon.svg')" alt="Menu">
            </button>
          </div>
        </div>

        <!-- Navbar Links (Visible on Large Screens) -->
        <ul class="hidden lg:flex space-x-8 lg:space-x-10 xl:space-x-14">
          <li v-for="item in menuData.menuItems.filter(item => item.id !== 'only-mobile')" :key="item.label"
            :id="item.id">
            <router-link :to="item.path"
              class="text-black hover:text-[#8a2432] font-medium active:text-red lg:text-sm xl:text-lg text-sm uppercase">
              {{ item.label }}
            </router-link>
          </li>
          <div class="flex items-center space-x-4">
            <li v-for="iconItem in menuData.iconItems" :key="iconItem.hoverImg">
              <button @click="iconItem.action" class="text-black">
                <img :src="hoveredIcon === iconItem.hoverImg ? iconItem.hoverImg : iconItem.img" alt="icon"
                  class="h-5 w-5" @mouseenter="hoveredIcon = iconItem.hoverImg"
                  @mouseleave="hoveredIcon = iconItem.img">
              </button>
            </li>
          </div>
        </ul>
      </div>
    </div>

    <!-- Background Overlay for Search (Top Half) -->
    <transition name="fade">
      <div v-if="searchVisible" class="fixed top-0 left-0 right-0 h-full bg-black bg-opacity-50 z-40"
        @click="performSearch"></div>
    </transition>

    <!-- Search Bar (Slide in from Top) -->
    <transition name="slide-down">
      <div v-if="searchVisible"
        class="fixed top-0 left-0 right-0 py-12 bg-white shadow-md flex flex-col items-center justify-center z-50">

        <!-- Row with buttons aligned correctly -->
        <div class="flex container justify-between w-full px-8 py-4">
          <!-- Left-aligned Live and Past buttons -->
          <!-- Left-aligned Live and Past buttons -->
          <div class="flex space-x-4">
            <button @click="filterByLive(); activeButton = 'live'"
              :class="['px-5 py-2', { 'bg-[#8A24321A]': activeButton === 'live' }]">
              Live
            </button>
            <button @click="filterByPast(); activeButton = 'past'"
              :class="['px-5 py-2', { 'bg-[#8A24321A]': activeButton === 'past' }]">
              Past
            </button>
          </div>


          <!-- Right-aligned Close button -->
          <button @click="performSearch" aria-label="Close search" class="text-black">
            <img src="@/assets/cross.svg" alt="Close Search" />
          </button>
        </div>

        <!-- Search box -->
        <div class="container px-8 ">
          <input type="text" placeholder="Search Auctions"
            class="w-full p-2 border border-black nunito-sans-light sm:text-[14px] text-[12px]" />
        </div>
      </div>
    </transition>

    <!-- Sidebar Menu (Slide in from Right) -->
    <transition name="slide-right">
      <div class="fixed inset-0 z-50 bg-gray-800 bg-opacity-75" v-if="menuOpen" aria-hidden="!menuOpen">
        <div class="absolute right-0 top-0 md:w-2/3 w-full bg-white h-full shadow-lg transition-transform transform"
          :class="{ 'translate-x-0': menuOpen, 'translate-x-full': !menuOpen }">
          <div class="flex justify-between mx-auto wapper-max items-center mt-6 xl:px-4 lg:px-12 md:px-16 sm:px-5 px-5">

          <router-link to="/">
            <button @click="toggleMenu" aria-label="Close navigation menu">
              <img src="@/assets/wickman-logo 2.svg" class="sm:w-full w-44" alt="Wickman Logo">
            </button>
          </router-link>
            <!-- Sidebar Close Button (Always visible on small screens) -->
            <button @click="toggleMenu" aria-label="Close navigation menu">
              <img src="@/assets/cross.svg" class="h-5 w-5 sm:me-0" alt="Close Menu">
            </button>
          </div>
          <div class="wapper-max sm:mx-auto xl:px-6 lg:px-12 md:px-16 sm:px-10 px-5">
            <hr class="border-t border-black y-6 my-6" />
          </div>
          <ul class="flex flex-col sm:px-16 p-8 space-y-4">
            <li @click="toggleMenu" aria-label="Close navigation menu" v-for="item in menuData.menuItems" :key="item.label" class="font-normal text-base">
              <router-link :to="item.path" class="text-black text-lg hover:text-[#8a2432] font-medium">{{ item.label
                }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: 'SiteNavbar',
  data() {
    return {
      menuOpen: false,
      hoveredIcon: null,
      searchVisible: false,
      activeButton: null,
      menuData: {
        logo: require('@/assets/wickman-logo 2.svg'),
        menuItems: [
          { label: "Live Auction", path: "/live-auction", id: "" },
          { label: "Past Auction", path: "/past-auction", id: "" },
          { label: "Buy Wine", path: "/how-buy", id: "" },
          { label: "Sell Wine", path: "/how-sale", id: "" },
          { label: "FAQ", path: "/faqs", id: "only-mobile" },
          { label: "Contact", path: "/contact-us", id: "only-mobile" },
        ],
        iconItems: [
          {
            img: require('@/assets/Search Icon.svg'),
            hoverImg: require('@/assets/search.hover.svg'),
            action: this.performSearch
          },
          {
            img: require('@/assets/Basket Icon.svg'),
            hoverImg: require('@/assets/basket.hover.svg'),
            action: () => this.$router.push('/cart')
          },
          {
            img: require('@/assets/Account Icon.svg'),
            hoverImg: require('@/assets/account-profile.svg'),
            action: this.goToLogin
          }
        ]
      }
    };
  },

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    performSearch() {
      this.searchVisible = !this.searchVisible;
    },
    filterByLive() {
      this.activeButton = 'live';
    },
    filterByPast() {
      this.activeButton = 'past';
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>
<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s ease;
}

.slide-right-enter-from {
  transform: translateX(100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.0s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 0.5;
}
.wapper-max {
  max-width: 1536px !important;
}

.router-link-active.router-link-exact-active {
  color: #8a2432 !important;
}
</style>
