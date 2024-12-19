<template>
    <div class="bg-[#f9f5f6] pb-5">
        <!-- Breadcrumb Navigation -->
        <div class="container px-5 py-8 mx-auto text-sm text-gray-600 xl:px-4 lg:px-12 md:px-16 sm:px-8">
            <nav aria-label="Breadcrumb nunito-sans-light">
                <ol class="flex list-reset">
                    <li>
                        <a href="#" class="text-[#B8B8B8]">Home</a>
                        <span class="mx-2 text-[#B8B8B8]">></span>
                    </li>
                    <li>
                        <a href="#" class="text-[#B8B8B8]">Cart Overview</a>
                        <span class="mx-2 text-[#B8B8B8]">></span>
                    </li>
                    <li>
                        <a href="#" class="text-[#B8B8B8]">Select Delivery Address</a>
                        <span class="mx-2 text-[#B8B8B8]">></span>
                    </li>
                    <li>
                        <span class="text-[#3D3D3D]">Review Order</span>
                    </li>
                </ol>
            </nav>
        </div>
        <div class="py-10">
            <div class="max-w-4xl mx-auto">
                <!-- Progress Bar -->
                <div class="flex items-center justify-between">
                    <div class="text-center">
                        <router-link to="/cart">
                            <div
                                class="w-8 h-8 flex items-center justify-center bg-[#E496A1] text-black rounded-full mx-auto">
                                1
                            </div>
                        </router-link>
                        <p class="md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 mt-2">Cart
                            Overview</p>
                    </div>
                    <div class="flex-1 border-t border-[#E496A1] -mt-7"></div>
                    <div class="text-center">
                        <router-link to="/cart/address">
                            <div
                                class="w-8 h-8 flex items-center justify-center bg-[#E496A1] text-black rounded-full mx-auto">
                                2
                            </div>
                            <p class="md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 mt-2">Select
                                Address</p>
                        </router-link>
                    </div>
                    <div class="flex-1 border-t border-[#d9c6c8] -mt-7"></div>
                    <div class="text-center">
                        <div
                            class="w-8 h-8 flex items-center justify-center bg-[#F9E7E9] text-black rounded-full mx-auto">
                            3
                        </div>
                        <p class="md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 mt-2">Review Order
                        </p>
                    </div>
                    <div class="flex-1 border-t border-[#d9c6c8] -mt-7"></div>
                    <div class="text-center">
                        <div
                            class="w-8 h-8 flex items-center justify-center bg-[#F9E7E9] text-black rounded-full mx-auto">
                            4
                        </div>
                        <p class="md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 mt-2">Make Payment
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="container p-10 mx-auto bg-white border border-red-200 rounded-lg wapper-max">
            <p class="mb-10 md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700">
                {{ cartItems.length }} items in your bag.
            </p>

            <div v-if="cartItems.length">
                <!-- Table Header -->
                <div
                    class="grid items-center justify-center grid-cols-12 gap-4 py-2 mb-4 font-semibold text-gray-700 border-t border-b border-gray-300">
                    <div
                        class="col-span-2 md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">
                        Image
                    </div>
                    <div
                        class="col-span-2 md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">
                        Lot No.
                    </div>
                    <div
                        class="col-span-4 md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">
                        Name
                    </div>
                    <div
                        class="col-span-2 md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">
                        Quantity
                    </div>
                    <div
                        class="col-span-2 md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">
                        Price
                    </div>
                </div>

                <!-- Loop over cart items -->
                <div v-for="item in cartItems" :key="item.id" class="mb-4">
                    <div class="grid items-center grid-cols-12 gap-4 py-4 justify-items-center">
                        <!-- Image Column -->
                        <div class="flex justify-center col-span-2">
                            <img :src="item.product_image ? `https://awa.gprlive.com/${item.product_image}` : 'default-image.jpg'"
                                :alt="item.product_name" class="object-cover w-16 h-16 rounded-md" />
                        </div>

                        <!-- Lot No. Column -->
                        <div
                            class="col-span-2 md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">
                            {{ item.lot_no || 'N/A' }}
                        </div>

                        <!-- Name Column -->
                        <div
                            class="col-span-4 md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">
                            {{ item.product_name }}
                        </div>

                        <!-- Quantity Column -->
                        <div
                            class="col-span-2 md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">
                            {{ item.quantity }} {{ item.unit || 'pcs' }}
                        </div>

                        <!-- Price Column -->
                        <div
                            class="col-span-2 md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700 text-center">
                            £{{ parseFloat(item.price).toFixed(2) }}
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="text-center text-gray-700">Your cart is empty.</p>
            </div>
        </div>

        <div class="container mx-auto bg-[#f9f5f6] mt-10">
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <!-- Left Section -->
                <div class="col-span-2 p-10 bg-white border border-red-200 rounded-lg">
                    <!-- Delivery Address -->
                    <div>
                        <div class="flex items-start justify-between">
                            <div>
                                <h2 class="text-lg font-semibold text-gray-700 nunito-sans-dark">Shipping Address</h2>
                                <p id="shipping-name" class="mt-2 text-lg text-gray-700 nunito-sans-dark">Loading...</p>
                                <div class="text-gray-700 text-md nunito-sans-light">
                                    <p id="shipping-address">Loading...</p>
                                    <p id="shipping-country">Loading...</p>
                                    <p id="shipping-phone">Loading...</p>
                                </div>
                            </div>
                            <a href="#" class="">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </a>
                        </div>
                        <hr class="my-4">
                    </div>

                    <!-- Billing Address -->
                    <div>
                        <div class="flex items-start justify-between">
                            <div>
                                <h2 class="text-lg font-semibold text-gray-700 nunito-sans-dark">Billing Address</h2>
                                <p id="billing-name" class="mt-2 text-lg text-gray-700 nunito-sans-dark">Loading...</p>
                                <div class="text-gray-700 text-md nunito-sans-light">
                                    <p id="billing-address">Loading...</p>
                                    <p id="billing-country">Loading...</p>
                                    <p id="billing-phone">Loading...</p>
                                </div>
                            </div>
                            <a href="#" class="">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Right Section -->
                <div class="flex flex-col">
                    <div class="p-10 bg-white border border-red-200 rounded-lg">
                        <h2 class="mb-3 text-lg font-semibold text-gray-700 nunito-sans-dark">Billing</h2>

                        <!-- Sub Total -->
                        <div class="flex justify-between mb-2">
                            <p class="text-lg font-semibold text-gray-700 nunito-sans-dark">Sub Total</p>
                            <p class="text-lg font-semibold text-gray-700 nunito-sans-dark">
                                ${{ subTotal.toFixed(2) }}
                            </p>
                        </div>

                        <!-- VAT -->
                        <!-- <div class="flex justify-between mb-2">
                            <p class="text-lg text-gray-700 nunito-sans-light">VAT</p>
                            <p class="text-lg text-gray-700 nunito-sans-dark">
                                ${{ vat.toFixed(2) }}
                            </p>
                        </div> -->

                        <!-- Delivery Charge -->
                        <!-- <div class="flex justify-between mb-2">
                            <p class="text-lg text-gray-700 nunito-sans-light">Delivery Charge</p>
                            <p class="text-lg text-gray-700 nunito-sans-dark">
                                ${{ deliveryCharge.toFixed(2) }}
                            </p>
                        </div> -->

                        <hr class="my-4">

                        <!-- Total Amount -->
                        <div class="flex justify-between font-semibold">
                            <p class="text-lg text-gray-700 nunito-sans-dark">Total Amount</p>
                            <p class="text-lg text-gray-700 nunito-sans-dark">
                                ${{ totalAmount.toFixed(2) }}
                            </p>
                        </div>
                    </div>

                    <!-- Confirm Order Button -->
                    <button
                        class="mt-auto bg-[#8a2432] border md:text-lg lg:text-lg sm:text-base text-[12px] border-[#8a2432] text-white sm:py-3 py-2 xl:px-6 lg:px-6 md:px-4 sm:px-4 px-5 hover:border-[#8a2432] transition hover:bg-white hover:text-[#8a2432] nunito-sans-light"
                        @click="confirmOrder">
                        Confirm Order
                    </button>
                </div>
            </div>
        </div>


    </div>
</template>
<script>
import axios from 'axios';
import { useCartStore } from '@/stores/cart';
import { loadStripe } from '@stripe/stripe-js';

export default {
    computed: {
        // Access cart items from the Pinia store
        cartItems() {
            const cartStore = useCartStore();
            return cartStore.cartItems;
        },

        // Calculate the total amount for cart (in cents, as Stripe requires the smallest currency unit)
        totalAmount() {
            const cartStore = useCartStore();
            return cartStore.cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0) ; // Convert to cents
        },

        subTotal() {
            return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        },
    },

    methods: {
        // Fetch user data from API
        fetchUserData(token) {
            return axios.get('https://awa.gprlive.com/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        },

        // Fetch cart data from API
        fetchCartData(userId, token) {
            return axios.get(`https://awa.gprlive.com/api/carts?user_id=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        },

        // Fetch Stripe publishable key and create checkout session
        async createCheckoutSession() {
            try {
                // Step 1: Retrieve the token from session storage
                const token = sessionStorage.getItem('token');
                console.log('Token from sessionStorage:', token); // Debug: Log token
                if (!token) {
                    console.warn('No token found in session storage.');
                    return;
                }

                // Step 2: Fetch the Stripe publishable key
                const response = await axios.get('https://awa.gprlive.com/api/stripe-key', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Stripe Key Response:', response.data); // Debug: Log the response

                const { publishableKey } = response.data;
                if (!publishableKey) {
                    console.error('Publishable key not found.');
                    return;
                }

                // Step 3: Initialize Stripe with the publishable key
                const stripe = await loadStripe(publishableKey);
                if (!stripe) {
                    console.error('Failed to initialize Stripe.');
                    return;
                }
                console.log('Stripe initialized successfully.');

                // Step 4: Map cart data to Stripe's required format
                const lineItems = this.cartItems.map(item => {
                    console.log('Processing item:', item); // Debug: Log each cart item
                    return {
                        price_data: {
                            currency: 'aud',  // Replace 'usd' with your currency (e.g., 'aud')
                            product_data: {
                                name: item.product_name, // Adjusted to match your cart data field
                            },
                            unit_amount: Math.round(parseFloat(item.price) * 100), // Convert price to cents
                        },
                        quantity: item.quantity || 1, // Default quantity to 1 if null
                    };
                });
                console.log('Formatted Line Items:', lineItems); // Debug: Log formatted line items

                // Step 5: Create the checkout session
                const checkoutResponse = await axios.post('https://awa.gprlive.com/api/create-checkout-session', {
                    line_items: lineItems, // Pass formatted line items
                    totalAmount: this.totalAmount, // Pass total amount for backend validation
                    userId: 1, // Use the actual user ID
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Checkout Session Response:', checkoutResponse.data); // Debug: Log backend response

                const { sessionId } = checkoutResponse.data;
                if (!sessionId) {
                    console.error('Session ID not received from the backend.');
                    return;
                }

                // Step 6: Redirect to Stripe Checkout
                const result = await stripe.redirectToCheckout({ sessionId });
                console.log('Stripe redirect result:', result); // Debug: Log redirect result
                if (result.error) {
                    console.error('Error redirecting to checkout:', result.error.message);
                }
            } catch (error) {
                console.error('Error creating checkout session:', error.response?.data || error.message); // Debug: Log errors
            }
        },


        // Main method to handle the order confirmation and trigger Stripe checkout
        confirmOrder() {
            this.createCheckoutSession();
        },

        // Main method to fetch user and cart data
        async fetchCartDataHandler() {
            const token = sessionStorage.getItem('token');
            console.log('Token from sessionStorage (fetchCartDataHandler):', token); // Log the token
            if (!token) {
                console.warn('No token found in session storage.');
                return;
            }

            try {
                // Fetch user data
                const userResponse = await this.fetchUserData(token);
                console.log('User Data Response:', userResponse.data); // Log user data
                const user = userResponse.data.user;

                if (!user || !user.id) {
                    console.error('Invalid user data or user ID missing.');
                    return;
                }

                // Fetch cart data
                const cartResponse = await this.fetchCartData(user.id, token);
                console.log('Cart Data Response:', cartResponse.data); // Log cart data
                if (cartResponse && cartResponse.data && Array.isArray(cartResponse.data.data)) {
                    const cartStore = useCartStore();
                    cartStore.setCartData(cartResponse.data.data.map(item => ({
                        ...item,
                        quantity: item.quantity || 1,  // Ensure quantity is always set
                    })));
                } else {
                    console.warn('No cart data available.');
                }
            } catch (error) {
                console.error('Error fetching data:', error.response?.data || error.message);
            }
        }
    },

    mounted() {
        this.fetchCartDataHandler();
    }
};
document.addEventListener("DOMContentLoaded", loadAddresses);

// Load selected addresses from API
async function loadAddresses() {
    try {
        const billingAddressId = getQueryParam("billing_id");
        const shippingAddressId = getQueryParam("shipping_id");

        if (!billingAddressId) {
            console.error("Billing address ID is missing in the query parameters.");
            return;
        }

        const [billingResponse, shippingResponse] = await Promise.all([
            fetchAddressById(billingAddressId),
            shippingAddressId ? fetchAddressById(shippingAddressId) : null,
        ]);

        // Update Billing Address
        if (billingResponse) {
            updateAddressUI("billing", billingResponse);
        }

        // Update Shipping Address
        if (shippingResponse) {
            updateAddressUI("shipping", shippingResponse);
        }
    } catch (error) {
        console.error("Error fetching addresses:", error);
    }
}

// Fetch address by ID
async function fetchAddressById(addressId) {
    try {
        const response = await fetch(`https://awa.gprlive.com/api/addresses/${addressId}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch address with ID ${addressId}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Update the address information in the UI
function updateAddressUI(type, address) {
    document.querySelector(`#${type}-name`).textContent =
        `${address.first_name} ${address.last_name}`;
    document.querySelector(`#${type}-address`).textContent =
        `${address.address}, ${address.city}, ${address.state}, ${address.postal_code}`;
    document.querySelector(`#${type}-country`).textContent =
        address.country;
    document.querySelector(`#${type}-phone`).textContent =
        address.phone || "No contact available";
}

// Utility: Extract query parameter value
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
</script>
