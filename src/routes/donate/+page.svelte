<script lang="ts">
    export let foodname: string = '';
    export let description: string = '';
    export let location: string = '';
    export let quantity: number = 1;
    export let expirationDate: string = '';
    export let imageFile: File | null = null;
    
    let imagePreview: string | null = null;
    
    // List of major Indian districts by state
    const indianDistricts = [
        // Andhra Pradesh
        "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari",
        // Karnataka
        "Bangalore Urban", "Bangalore Rural", "Belgaum", "Bellary", "Bidar", "Vijayapura", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Kalaburagi", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Ramanagara", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Yadgir",
        // Kerala
        "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad",
        // Tamil Nadu
        "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar",
        // Telangana
        "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Kumuram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri",
        // Maharashtra
        "Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Latur", "Akola", "Jalgaon", "Ahmednagar", "Dhule", "Satara", "Nanded", "Parbhani", "Sangli", "Chandrapur", "Jalna", "Beed", "Buldhana", "Yavatmal", "Wardha", "Ratnagiri", "Sindhudurg", "Gadchiroli", "Gondia", "Washim", "Hingoli",
        // Delhi
        "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi",
        // Gujarat
        "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Kutch", "Anand", "Bharuch", "Mehsana", "Patan", "Amreli", "Valsad", "Kheda", "Surendranagar", "Banaskantha", "Sabarkantha", "Navsari", "Porbandar", "Dang", "Narmada", "Tapi", "Dahod", "Panchmahal", "Botad", "Morbi", "Aravalli", "Chhota Udaipur", "Mahisagar", "Gir Somnath", "Devbhoomi Dwarka",
        // Uttar Pradesh
        "Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Mathura", "Muzaffarnagar", "Ayodhya", "Sultanpur", "Raebareli", "Unnao", "Hapur", "Mirzapur", "Bulandshahr", "Sitapur", "Etawah", "Azamgarh", "Rampur", "Barabanki", "Basti", "Gonda", "Hardoi", "Etah", "Jaunpur", "Shahjahanpur", "Budaun", "Amroha", "Bahraich", "Lakhimpur Kheri", "Shamli",
        // Punjab
        "Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Gurdaspur", "Ferozepur", "Sangrur", "Pathankot", "Faridkot", "Moga", "Rupnagar", "Kapurthala", "Fatehgarh Sahib", "Nawanshahr", "Mansa", "Barnala", "Tarn Taran", "Fazilka", "Malerkotla"
    ].sort();
    
    function handleImageUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            imageFile = file;
            
            // Create preview URL
            imagePreview = URL.createObjectURL(file);
            
            // Clean up the preview URL when component is destroyed
            return () => {
                if (imagePreview) URL.revokeObjectURL(imagePreview);
            };
        }
    }
</script>

<div>
    <p class="text-4xl text-center">Donate Food Item</p>
    <div class="h-[1.5px] bg-catp-overlay0 mx-12 my-2"></div>
    <form>
        <div class="grid grid-cols-2 gap-6 m-8">
            <div>
                <label class="text-black text-base ml-2 mb-0.5" for="_name">Food Name</label><br>
                <input 
                    id="_name" 
                    bind:value={foodname} 
                    placeholder="Food Item name" 
                    class="p-2 border-2 border-orange-500/30 rounded-lg w-full focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 transition-all duration-200" 
                />
            </div>
            
            <div>
                <label class="text-black text-base ml-2 mb-0.5" for="_location">Location</label><br>
                <select 
                    id="_location" 
                    bind:value={location} 
                    class="p-2 border-2 border-orange-500/30 rounded-lg w-full focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 transition-all duration-200"
                >
                    <option value="">Select a district</option>
                    {#each indianDistricts as district}
                        <option value={district}>{district}</option>
                    {/each}
                </select>
            </div>
            
            <div>
                <label class="text-black text-base ml-2 mb-0.5" for="_description">Description</label><br>
                <textarea 
                    id="_description" 
                    bind:value={description} 
                    placeholder="Describe the food item" 
                    class="p-2 border-2 border-orange-500/30 rounded-lg w-full focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 transition-all duration-200" 
                    rows="3"
                ></textarea>
            </div>
            
            <div>
                <label class="text-black text-base ml-2 mb-0.5" for="_expirationDate">Expiration Date</label><br>
                <input 
                    id="_expirationDate" 
                    type="date" 
                    bind:value={expirationDate} 
                    class="p-2 border-2 border-orange-500/30 rounded-lg w-full focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 transition-all duration-200" 
                />
            </div>
            
            <div class="col-span-2">
                <label class="text-black text-base ml-2 mb-0.5" for="_quantity">Quantity: {quantity}</label><br>
                <input 
                    id="_quantity" 
                    type="range" 
                    bind:value={quantity} 
                    min="1" 
                    max="100" 
                    class="w-full h-2 bg-orange-500/30 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all duration-200" 
                />
            </div>
            
            <div class="col-span-2">
                <label class="text-black text-base ml-2 mb-0.5" for="_image">Food Image <span class="text-red-500">*</span></label><br>
                <div class="flex flex-col items-center">
                    {#if imagePreview}
                        <img src={imagePreview} alt="Preview" class="mb-2 w-64 h-64 object-cover rounded-lg border-2 border-orange-500/30" />
                    {:else}
                        <div class="mb-2 w-64 h-64 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-orange-500/30">
                            <p class="text-gray-500">Image preview</p>
                        </div>
                    {/if}
                    <input 
                        id="_image" 
                        type="file" 
                        accept="image/*" 
                        on:change={handleImageUpload} 
                        required 
                        class="p-2 border-2 border-orange-500/30 rounded-lg w-full focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 transition-all duration-200" 
                    />
                </div>
            </div>
        </div>
        
        <div class="flex justify-center mb-8">
            <button 
                type="submit" 
                class="bg-orange-500/80 hover:bg-orange-500/90 text-white font-bold py-2 px-8 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2" 
            >
                Submit Donation
            </button>
        </div>
    </form>
</div>