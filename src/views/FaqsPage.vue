<template>
  <div class="py-16">
    <div class="container mx-auto pb-12 max-w-4xl">
      <!-- Title -->
      <h2 class="text-3xl font-normal text-center uppercase raleway-custom text-[#8a2432] mb-8">
        {{ title }}
      </h2>

      <!-- Tabs -->
      <div class="flex justify-center space-x-4 mb-6 border-b border-gray-300">
        <button
          class="px-4 py-2 font-medium text-sm relative"
          :class="{
            'text-[#000] font-bold': activeTab === null,
            'text-[#000] hover:text-[#8a2432]': activeTab !== null
          }"
          @click="activeTab = null"
        >
          All
          <span
            v-if="activeTab === null"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-[#000] rounded-t-md"
          ></span>
        </button>

        <button
          v-for="(category, index) in faqs"
          :key="index"
          class="px-4 py-2 font-medium text-sm relative"
          :class="{
            'text-[#000] font-bold': activeTab === index,
            'text-[#000] hover:text-[#8a2432]': activeTab !== index
          }"
          @click="activeTab = index"
        >
          {{ category.category }}
          <span
            v-if="activeTab === index"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-[#000] rounded-t-md"
          ></span>
        </button>
      </div>

      <!-- FAQ Content -->
      <div v-for="(category, index) in filteredFaqs" :key="index" class="mb-8">
        <h3
          class="text-2xl font-normal raleway-custom text-[#8a2432] uppercase mb-4 tracking-wide"
        >
          {{ category.category }}
        </h3>

        <div v-for="(faq, faqIndex) in category.faqs" :key="faqIndex">
          <div class="border-b hover:border-black">
            <button
              class="w-full text-base nunito-sans-light flex justify-between items-center px-6 py-4 text-left text-[#000] font-semibold focus:outline-none"
              @click="toggle(index, faqIndex)"
            >
              {{ faq.question }}
              <span
                v-html="activeIndex === `${index}-${faqIndex}` 
                  ? '<i class=\'fa-solid fa-angle-up\'></i>' 
                  : '<i class=\'fa-solid fa-angle-down\'></i>'"
                class="text-sm text-gray-500 font-normal transform transition-transform duration-300"
              ></span>
            </button>

            <transition name="slide-down">
              <div
                v-show="activeIndex === `${index}-${faqIndex}`"
                class="overflow-hidden px-6 text-[#3D3D3D]"
                ref="accordionContent"
              >
                <div class="py-4 nunito-sans-light text-base">
                  {{ faq.answer }}
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <SiteFooter />
  </div>
</template>

<script>
import SiteFooter from "@/components/SiteFooter.vue";

export default {
  name: "FaqAccordion",
  components: {
    SiteFooter,
  },
  props: {
    title: {
      type: String,
      default: "Frequently Asked Questions",
    },
    faqs: {
      type: Array,
      default: () => [
        {
          category: "General",
          faqs: [
            { question: "How do I register with you?", answer: "Lorem ipsum dolor sit amet." },
            { question: "How do I log in?", answer: "Lorem ipsum dolor sit amet." },
            { question: "How do I change my password?", answer: "Lorem ipsum dolor sit amet." },
          ],
        },
        {
          category: "Buying",
          faqs: [
            { question: "How do I search for an item?", answer: "Lorem ipsum dolor sit amet." },
            { question: "How do I place a bid?", answer: "Lorem ipsum dolor sit amet." },
            { question: "What do I do if I don't like the items?", answer: "Lorem ipsum dolor sit amet." },
          ],
        },
        {
          category: "Selling",
          faqs: [
            { question: "How do I sell an item?", answer: "Lorem ipsum dolor sit amet." },
            { question: "How do I track my items?", answer: "Lorem ipsum dolor sit amet." },
            { question: "What happens if my item doesn't sell?", answer: "Lorem ipsum dolor sit amet." },
          ],
        },
      ],
    },
  },
  data() {
    return {
      activeTab: null,
      activeIndex: null,
    };
  },
  computed: {
    filteredFaqs() {
      if (this.activeTab === null) {
        return this.faqs;
      }
      return [this.faqs[this.activeTab]];
    },
  },
  methods: {
    toggle(categoryIndex, faqIndex) {
      const index = `${categoryIndex}-${faqIndex}`;
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1280px;
}

/* Smooth Slide Down Transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 300px; /* Adjust as needed */
  opacity: 1;
}
</style>
