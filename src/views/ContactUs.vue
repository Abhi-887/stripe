<template>
    <div class="container mx-auto p-6">
        <!-- Contact Us Section -->
        <section>
            <h2 class="text-3xl raleway-custom text-[#8a2432] uppercase mb-6">Contact Us</h2>
            <p class="text-lg text-gray-700 mb-4">
                Have a question, concern, or need assistance? Reach out to us through the form below or use the provided
                contact details. We're here to help!
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Contact Form -->
                <div>
                    <h3 class="text-2xl  text-[#8a2432] mb-4">Send Us a Message</h3>
                    <form @submit.prevent="submitForm" class="space-y-4">
                        <div>
                            <label for="name" class="block text-gray-700 font-medium mb-2">Your Name</label>
                            <input type="text" id="name" v-model="form.name"
                                class="w-full border border-gray-300 p-3 focus:ring-[#8a2432] focus:outline-none"
                                placeholder="Enter your name" required />
                        </div>
                        <div>
                            <label for="email" class="block text-gray-700 font-medium mb-2">Your Email</label>
                            <input type="email" id="email" v-model="form.email"
                                class="w-full border border-gray-300  p-3 focus:ring-[#8a2432] focus:outline-none"
                                placeholder="Enter your email" required />
                        </div>
                        <div>
                            <label for="message" class="block text-gray-700 font-medium mb-2">Your Message</label>
                            <textarea id="message" v-model="form.message"
                                class="w-full border border-gray-300  p-3 focus:ring-[#8a2432] focus:outline-none"
                                rows="5" placeholder="Type your message here" required></textarea>
                        </div>
                        <button type="submit"
                            class="bg-[#8a2432] text-white px-6 py-3 hover:bg-[#7a202c] transition duration-200">
                            Submit
                        </button>
                    </form>
                </div>

                <!-- Contact Details -->
                <div>
                    <h3 class="text-2xl  text-[#8a2432] mb-4">Get in Touch</h3>
                    <ul class="text-gray-700 space-y-4">
                        <li>
                            <span>Email:</span>
                            <a href="mailto:support@wiskii.com" class="text-[#8a2432] hover:underline">
                              
                            </a>
                        </li>
                        <li>
                            <span>Phone:</span>
                            <a href="tel:+123456789" class="text-[#8a2432] hover:underline">
                             
                            </a>
                        </li>
                        <li>
                            <span>Address:</span>
                        </li>
                    </ul>

                    <!-- Social Media Links -->
 
                </div>
            </div>
        </section>
    </div>

    <!-- Footer -->
    <SiteFooter />
</template>

<script>
import SiteFooter from "@/components/SiteFooter.vue";

export default {
    components: {
        SiteFooter,
    },
    data() {
        return {
            form: {
                name: "",
                email: "",
                message: "",
            },
        };
    },
    methods: {
        submitForm() {
            // Mock form submission logic
            if (this.form.name && this.form.email && this.form.message) {
                alert(
                    `Thank you, ${this.form.name}. Your message has been received! We’ll get back to you at ${this.form.email}.`
                );
                // Reset form
                this.form.name = "";
                this.form.email = "";
                this.form.message = "";
            }
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 1280px;
}
</style>