<script>
	import { goto } from '$app/navigation';
</script>

<div class="landing-page">
    <div class="content-container">
        <div class="text-center mt-10">
            <p class="text-7xl underline"><snap class="text-red-800">Meal</snap><span>Bridge</span></p>
            <p class="mt-5 my-10">
                <strong>MealBridge</strong> is a platform that connects food donors with people in need, ensuring
                that surplus food is distributed to shelters, NGOs, and individuals facing food insecurity.
            </p>
        </div>
        <p class="text-3xl font-bold my-3 mb-1">About Us</p>

        <div>
            <button
                class="bg-catp-green text-white text-xl px-3 py-1 rounded-md mt-3"
                on:click={() => {
                    goto('/create');
                }}>Login or Signup</button
            >
        </div>
        <h2 style="font-size: 18px; font-weight: bold;" class="pt-4">Our Mission</h2>
        <p>
            We aim to reduce food waste and hunger by making food donation simple, efficient, and accessible
            to everyone.
        </p>

        <h2 style="font-size: 18px; font-weight: bold;">How It Works</h2>
        <ul>
            <li><strong>Donors</strong>: List surplus food available for donation.</li>
            <li><strong>Recipients</strong>: Browse available food and request what they need.</li>
            <li><strong>Distribution</strong>: Donors and recipients coordinate for pickup or delivery.</li>
        </ul>

        <h2 style="font-size: 18px; font-weight: bold;">Why Choose MealBridge?</h2>
        <ul>
            <li>📍 Easy-to-use platform for food donations</li>
            <li>🏠 Connects donors with verified shelters and NGOs</li>
            <li>🌱 Reduces food waste and supports sustainability</li>
            <li>🤝 Encourages community-driven social impact</li>
        </ul>

        <h2 style="font-size: 18px; font-weight: bold;">Get Involved</h2>
        <p>Join us in making a difference. Start donating, receiving, or volunteering today!</p>
    </div>
</div>

<style>
    .landing-page {
        position: relative;
        min-height: 100vh;
        width: 100%;
        padding: 0 2rem;
    }

    .landing-page::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(background.jpeg);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        filter: blur(5px);
        opacity: 0.6;
        z-index: -1;
    }

    .content-container {
        position: relative;
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        background-color: rgba(255, 255, 255, 0.85);
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
</style>



