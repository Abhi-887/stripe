<template>
    <!-- Top Banner -->
    <TopBanner :title="bannerData.title" :description="bannerData.description"
        :longDescription="bannerData.longDescription" />

    <!-- Registration Fee and Benefits Section -->
    <div class="bg-white py-16">
        <section class="container mx-auto flex flex-col md:flex-row items-center md:items-start">
            <!-- Left Column - Benefits of Registering -->
            <div class="md:w-1/2 px-6 md:px-12 text-center md:text-left">
                <h2 class="text-3xl font-semibold mb-6">Why Register with Wickman’s Wine Auctioneers?</h2>
                <p class="text-lg text-gray-700 mb-4">
                    Join us today and become a part of the most exclusive wine auction community. With a one-time $10 registration fee, you'll gain access to:
                </p>
                <ul class="list-disc text-left text-gray-600 space-y-2 mb-6">
                    <li>Access to exclusive wine auctions and collectibles</li>
                    <li>Expert valuation and auction advice</li>
                    <li>Personalized notifications for upcoming auctions</li>
                    <li>Transparent, secure bidding and payment system</li>
                    <li>Special offers for registered sellers and buyers</li>
                </ul>
                <p class="text-lg font-bold mb-4">
                    Only $10 to get started—an investment that unlocks a world of opportunities.
                </p>
            </div>

            <!-- Right Column - Registration Payment Form -->
            <div class="md:w-1/2 px-6 md:px-12 text-center md:text-left mt-10 md:mt-0">
                <h3 class="text-2xl font-semibold mb-4">Complete Your Registration Payment</h3>
                <p class="text-lg text-gray-700 mb-6">
                    Secure your spot today by paying the one-time registration fee of $10. This fee is required to begin participating in auctions, get access to our full range of services, and start bidding or selling your wines.
                </p>

                <!-- Payment Button or Form (Mockup for Now) -->
                <button @click="handlePayment" class="w-full md:w-auto py-3 px-6 bg-[#8a2432] text-white text-xl rounded-md hover:bg-[#6b1c26] transition duration-300">
                    Pay $10 Now
                </button>

                <!-- Optional Additional Info -->
                <p class="text-sm text-gray-500 mt-6">
                    By proceeding, you confirm that you have read and agree to our <a href="#" class="text-[#8a2432]">Terms and Conditions</a>.
                </p>
            </div>
        </section>
    </div>

    <!-- Footer -->
    <SiteFooter />
</template>

<script>
import SiteFooter from '@/components/SiteFooter.vue';
import TopBanner from '@/components/TopBanner.vue';

export default {
    components: {
        SiteFooter,
        TopBanner,
    },
    data() {
        return {
            // Sample data to pass to the TopBanner
            bannerData: {
                title: 'Complete Your Registration',
                description: 'Secure your spot with a one-time registration fee of $10 and start participating in auctions.',
                longDescription: 'Wickman’s Wine Auctioneers is your trusted platform for buying and selling fine wines and collectibles. Join us today to gain access to exclusive wine auctions, personalized notifications, and expert auction advice. With just a small fee of $10, you will be able to unlock a world of opportunities and become part of a thriving wine auction community.'
            }
        };
    },
    methods: {
        handlePayment() {
            // Handle the payment processing logic here
            // For now, it's just a log and redirect to payment success page
            alert("Payment successful! Redirecting to the payment confirmation page...");
            // After payment, redirect to another page or show confirmation
            this.$router.push({ name: 'PaymentConfirmation' });
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 1280px;
}

/* Custom styles for the registration page */
.bg-white {
    background-color: white;
}

h2, h3 {
    color: #333;
}

ul {
    padding-left: 20px;
}

button {
    font-size: 1.125rem;
}

button:hover {
    background-color: #6b1c26;
}


.text-gray-700 {
    color: #4a4a4a;
}
</style>
